import { useState, useMemo } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import { VehicleMarker } from './VehicleMarker';
import { FixedPointMarker } from './FixedPointMarker';
import { NCMFilter } from './NCMFilter';
import { VehicleDetailsPanel } from './VehicleDetailsPanel';
import type { Vehicle } from '../types/vehicle';
import { extractUniqueNCMs, filterVehiclesByNCM } from '../utils/ncmUtils';
import { prfPosts } from '../data/prfPosts';
import { receitaOffices } from '../data/receitaOffices';
import 'leaflet/dist/leaflet.css';
import './VehicleMap.css';

interface VehicleMapProps {
  vehicles: Vehicle[];
}

export const VehicleMap: React.FC<VehicleMapProps> = ({ vehicles }) => {
  const [selectedNCMs, setSelectedNCMs] = useState<string[]>([]);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);

  // Extract all unique NCMs from vehicles
  const availableNCMs = useMemo(() => extractUniqueNCMs(vehicles), [vehicles]);

  // Filter vehicles by selected NCMs
  const filteredVehicles = useMemo(
    () => filterVehiclesByNCM(vehicles, selectedNCMs),
    [vehicles, selectedNCMs]
  );

  // Center map on Curitiba, Paraná
  const center: [number, number] = [-25.4284, -49.2733];
  const zoom = 11;

  const handleVehicleClick = (vehicle: Vehicle) => {
    setSelectedVehicle(vehicle);
  };

  const handleClosePanel = () => {
    setSelectedVehicle(null);
  };

  return (
    <div className="map-container">
      {selectedVehicle && (
        <VehicleDetailsPanel 
          vehicle={selectedVehicle} 
          onClose={handleClosePanel}
        />
      )}
      <div className="map-header">
        <div className="header-top">
          <h1>🚛 Monitoramento de Veículos de Carga - Paraná</h1>
          <NCMFilter
            availableNCMs={availableNCMs}
            selectedNCMs={selectedNCMs}
            onNCMChange={setSelectedNCMs}
          />
        </div>
        <div className="map-stats">
          <span className="stat-item">
            Total de veículos: <strong>{vehicles.length}</strong>
          </span>
          <span className="stat-item">
            Com MDFe: <strong>{vehicles.filter(v => v.mdfe).length}</strong>
          </span>
          <span className="stat-item">
            Filtrados: <strong>{filteredVehicles.length}</strong>
          </span>
          {selectedNCMs.length > 0 && (
            <span className="stat-item filter-active">
              NCMs selecionados: <strong>{selectedNCMs.length}</strong>
            </span>
          )}
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
        {/* Render fixed points (PRF posts and Receita offices) */}
        {prfPosts.map((point) => (
          <FixedPointMarker key={point.id} point={point} />
        ))}
        {receitaOffices.map((point) => (
          <FixedPointMarker key={point.id} point={point} />
        ))}
        {/* Render vehicles */}
        {filteredVehicles.map((vehicle) => (
          <VehicleMarker 
            key={vehicle.id} 
            vehicle={vehicle}
            onClick={handleVehicleClick}
          />
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
        <h3 style={{ marginTop: '1rem' }}>Pontos Fixos</h3>
        <div className="legend-items">
          <div className="legend-item">
            <span className="legend-icon">🚔</span>
            <span>PRF</span>
          </div>
          <div className="legend-item">
            <span className="legend-icon">🏛️</span>
            <span>Receita Estadual</span>
          </div>
        </div>
      </div>
    </div>
  );
};
