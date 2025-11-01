import { MapContainer, TileLayer, GeoJSON, Pane } from "react-leaflet";
import { useEffect, useState } from "react";
import L, { type LatLngExpression } from 'leaflet';
import brasilGeoJson from "../data/brasil-states.json";

const API_URLS = {
  balcar: 'http://localhost:3001/api/mapa/balcar',
  furnas: 'http://localhost:3001/api/mapa/furnas',
  sima: 'http://localhost:3001/api/mapa/sima',
};

interface MapaProps {
  source: 'balcar' | 'furnas' | 'sima';
}

const createIcon = (color: string) => new L.Icon({
    iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${color}.png`,
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

const icones = {
    sitio_balcar: createIcon('blue'),
    sitio_furnas: createIcon('green'),
    estacao_sima: createIcon('red'),
    default: createIcon('grey') // Ícone padrão para tipos não mapeados
};



const MapaInterativo: React.FC<MapaProps> = ({ source }) => {
  const [pontosData, setPontosData] = useState<any | null>(null);
  const [selectedState, setSelectedState] = useState<string | null>(null);
  
  
  useEffect(() => {
    // Escolhe a URL correta com base na prop
    const url = API_URLS[source]; 
    fetch(url) // Chama a API específica
      .then(response => response.json())
      .then(data => {
        setPontosData(data);
      })
      .catch(error => console.error(`Erro ao buscar dados de ${source}:`, error));
  }, [source])


  const onEachState = (feature: any, layer: any) => {
    layer.on({
      click: () => {
        setSelectedState(feature.properties.name);
      },
    });
    layer.bindTooltip(feature.properties.name, {
      permanent: false,
      direction: "center",
    });
  };

   const onEachPoint = (feature: any, layer: any) => {
    if (feature.properties && feature.properties.nome) {
        const popupContent = `
            <strong>${feature.properties.nome}</strong>
            <br>
            Tipo: ${feature.properties.tipo}
        `;
        layer.bindPopup(popupContent);
    }
  };

  
  const pointToLayer = (feature: any, latlng: LatLngExpression) => {
    const tipo = feature.properties.tipo as keyof typeof icones;
    const icon = icones[tipo] || icones.default;
    return L.marker(latlng, { icon });
  };


  return (
    <div style={{ width: "90%", height: "600px", display: "flex", justifyContent: "center", alignItems: "center"}}>
      <MapContainer
        center={[-14.235, -51.9253]} // centro do Brasil
        zoom={4}
        style={{ height: "100%", width: "100%", display: "flex", justifyContent: "center", alignItems:"center", marginLeft: "165px" }} 
      >
        <TileLayer
          attribution='&copy; OpenStreetMap'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Pane name="estados" style={{ zIndex: 410 }}>
          <GeoJSON
            data={brasilGeoJson as any}
            onEachFeature={onEachState}
            style={() => ({
              color: "#555",
              weight: 1,
              fillColor: "#00A884",
              fillOpacity: 0.4,
            })}
          />
        </Pane>
    <Pane name="pontos" style={{ zIndex: 420 }}>
      {pontosData && (
          <GeoJSON
            data={pontosData}
            onEachFeature={onEachPoint}
            pointToLayer={pointToLayer}
          />
        )}
    </Pane>
      </MapContainer>


      

      {selectedState && (
        <div
          style={{
            position: "absolute",
            bottom: 20,
            left: 20,
            background: "#fff",
            padding: "10px 20px",
            borderRadius: "8px",
            boxShadow: "0 0 10px rgba(0,0,0,0.1)",
          }}
        >
          <strong>Estado selecionado:</strong> {selectedState}
        </div>
      )}
    </div>
  );
};

export default MapaInterativo;
