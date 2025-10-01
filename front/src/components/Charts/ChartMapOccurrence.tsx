import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet'; 

const occurrences = [
  { id: 1, position: [-22.9068, -43.1729], name: "Queimada no Rio de Janeiro" },
  { id: 2, position: [-15.8267, -47.9218], name: "Alerta de seca em Brasília" },
  { id: 3, position: [-12.9747, -38.4767], name: "Risco de enchente em Salvador" },
  { id: 4, position: [-3.7319, -38.5267], name: "Foco de incêndio em Fortaleza" },
  { id: 5, position: [-23.5505, -46.6333], name: "Poluição do ar em São Paulo" },
];

const defaultIcon = L.icon({
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
    shadowSize: [41, 41]
});

export function ChartMapOccurrence() {
  const initialPosition: [number, number] = [-14.235, -51.9253];

  return (
    <MapContainer center={initialPosition} zoom={4} style={{ height: '400px', width: '100%' }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {occurrences.map(occurrence => (
        <Marker 
            key={occurrence.id} 
            position={[occurrence.position[0], occurrence.position[1]]}
            icon={defaultIcon}
        >
          <Popup>
            {occurrence.name}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}