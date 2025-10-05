import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import { useEffect, useState } from "react";

import brasilGeoJson from "../data/brasil-states.json";

const MapaInterativo: React.FC = () => {
  const [selectedState, setSelectedState] = useState<string | null>(null);

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

  return (
    <div style={{ width: "100%", height: "600px" }}>
      <MapContainer
        center={[-14.235, -51.9253]} // centro do Brasil
        zoom={4}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; OpenStreetMap'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
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
