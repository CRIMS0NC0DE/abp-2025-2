// src/controllers/mapController.ts

import { Request, Response, NextFunction } from 'express';
// Importa seus pools de conexão nomeados
import { furnasPool, simaPool, balcarPool } from '../configs/db';

// --- Tipos e Ícones (sem alterações) ---

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

//GeoJSON Helper (sem alterações)
function formatQueryToGeoJSON(rows: any[], tipo: string): GeoJSONFeature[] {
  return rows
    .filter(row => row.lat != null && row.lng != null)
    .map(row => ({
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [parseFloat(row.lng), parseFloat(row.lat)],
      },
      properties: {
        id: row.id,
        nome: row.nome,
        tipo: tipo,
      },
    }));
}

// --- NOVAS FUNÇÕES DO CONTROLLER ---

// 1. Função para buscar pontos do BALCAR
export const getBalcarPoints = async (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log("-> [mapController] Buscando pontos de BALCAR...");
    const resBalcar = await balcarPool.query('SELECT idsitio as id, nome, lat, lng FROM TBSITIO');
    
    const features = formatQueryToGeoJSON(resBalcar.rows, 'sitio_balcar');
    const geoJSONResponse = {
      type: 'FeatureCollection',
      features: features,
    };

    return res.status(200).json(geoJSONResponse);
  } catch (error) {
    console.error("!!! [mapController] ERRO GRAVE (Balcar):", error);
    next(error);
  }
};

// 2. Função para buscar pontos do FURNAS
export const getFurnasPoints = async (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log("-> [mapController] Buscando pontos de FURNAS...");
    const resFurnas = await furnasPool.query('SELECT idsitio as id, nome, lat, lng FROM TBSITIO');

    const features = formatQueryToGeoJSON(resFurnas.rows, 'sitio_furnas');
    const geoJSONResponse = {
      type: 'FeatureCollection',
      features: features,
    };

    return res.status(200).json(geoJSONResponse);
  } catch (error) {
    console.error("!!! [mapController] ERRO GRAVE (Furnas):", error);
    next(error);
  }
};

// 3. Função para buscar pontos do SIMA
export const getSimaPoints = async (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log("-> [mapController] Buscando pontos do SIMA...");
    const resSima = await simaPool.query('SELECT idestacao as id, rotulo as nome, lat, lng FROM TBESTACAO');

    const features = formatQueryToGeoJSON(resSima.rows, 'estacao_sima');
    const geoJSONResponse = {
      type: 'FeatureCollection',
      features: features,
    };

    return res.status(200).json(geoJSONResponse);
  } catch (error) {
    console.error("!!! [mapController] ERRO GRAVE (Sima):", error);
    next(error);
  }
};