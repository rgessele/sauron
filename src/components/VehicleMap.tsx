import { MapContainer, TileLayer } from 'react-leaflet';
import { VehicleMarker } from './VehicleMarker';
import type { Vehicle } from '../types/vehicle';
import 'leaflet/dist/leaflet.css';
import './VehicleMap.css';

interface VehicleMapProps {
  vehicles: Vehicle[];
}

export const VehicleMap: React.FC<VehicleMapProps> = ({ vehicles }) => {
  // Center map on Curitiba, Paraná
  const center: [number, number] = [-25.4284, -49.2733];
  const zoom = 11;

  return (
    <div className="map-container">
      <div className="map-header">
        <h1>🚛 Monitoramento de Veículos de Carga - Paraná</h1>
        <div className="map-stats">
          <span className="stat-item">
            Total de veículos: <strong>{vehicles.length}</strong>
          </span>
          <span className="stat-item">
            Com MDFe: <strong>{vehicles.filter(v => v.mdfe).length}</strong>
          </span>
        </div>
      </div>
      <MapContainer 
        center={center} 
        zoom={zoom} 
        style={{ height: '100%', width: '100%' }}
        className="leaflet-map"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {vehicles.map((vehicle) => (
          <VehicleMarker key={vehicle.id} vehicle={vehicle} />
        ))}
      </MapContainer>
      <div className="map-legend">
        <h3>Legenda - Modais de Transporte</h3>
        <div className="legend-items">
          <div className="legend-item">
            <span className="legend-icon">🚛</span>
            <span>Rodoviário</span>
          </div>
          <div className="legend-item">
            <span className="legend-icon">✈️</span>
            <span>Aéreo</span>
          </div>
          <div className="legend-item">
            <span className="legend-icon">🚢</span>
            <span>Aquaviário</span>
          </div>
          <div className="legend-item">
            <span className="legend-icon">🚂</span>
            <span>Ferroviário</span>
          </div>
          <div className="legend-item">
            <span className="legend-icon">📍</span>
            <span>Sem MDFe</span>
          </div>
        </div>
      </div>
    </div>
  );
};
