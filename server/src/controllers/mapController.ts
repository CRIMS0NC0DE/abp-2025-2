

import { Request, Response, NextFunction } from 'express';
import { furnasPool, simaPool, balcarPool } from '../configs/db';


interface PointProperties {
  id: number | string;
  nome: string;
  tipo: string;
}

interface GeoJSONFeature {
  type: 'Feature';
  geometry: {
    type: 'Point';
    coordinates: [number, number];
  };
  properties: PointProperties;
}

//GeoJSON
function formatQueryToGeoJSON(rows: any[], tipo: string): GeoJSONFeature[] {
  return rows
    .filter(row => row.lat != null && row.lng != null) // Garante que temos coordenadas
    .map(row => ({
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [parseFloat(row.lng), parseFloat(row.lat)], // [longitude, latitude]
      },
      properties: {
        id: row.id,     // A query deve retornar uma coluna 'id'
        nome: row.nome, // A query deve retornar uma coluna 'nome'
        tipo: tipo,
      },
    }));
}


export const getGeographicPoints = async (req: Request, res: Response, next: NextFunction) => {
  try {

    console.log("-> [mapController] Buscando pontos geográficos...");

    let allFeatures: GeoJSONFeature[] = [];

   const [resFurnas, resSima, resBalcar] = await Promise.all([
      furnasPool.query('SELECT idsitio as id, nome, lat, lng FROM TBSITIO'),
      simaPool.query('SELECT idestacao as id, rotulo as nome, lat, lng FROM TBESTACAO'),
      balcarPool.query('SELECT idsitio as id, nome, lat, lng FROM TBSITIO')
    ]);

    allFeatures.push(...formatQueryToGeoJSON(resBalcar.rows, 'sitio_balcar'));
    allFeatures.push(...formatQueryToGeoJSON(resFurnas.rows, 'sitio_furnas'));
    allFeatures.push(...formatQueryToGeoJSON(resSima.rows, 'estacao_sima'));

    const geoJSONResponse = {
      type: 'FeatureCollection',
      features: allFeatures,
    };

    return res.status(200).json(geoJSONResponse);
  } catch (error) {
    
    console.error("!!! [mapController] ERRO GRAVE CAPTURADO:", error);
    next(error);
  }
};