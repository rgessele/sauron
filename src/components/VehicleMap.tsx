import { useState, useMemo } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import { VehicleMarker } from './VehicleMarker';
import { FixedPointMarker } from './FixedPointMarker';
import { NCMFilter } from './NCMFilter';
import { VehicleDetailsPanel } from './VehicleDetailsPanel';
import { PlannedRoute } from './PlannedRoute';
import { EffectiveRoute } from './EffectiveRoute';
import type { Vehicle } from '../types/vehicle';
import { extractUniqueNCMs, filterVehiclesByNCM } from '../utils/ncmUtils';
import { prfPosts } from '../data/prfPosts';
import { receitaOffices } from '../data/receitaOffices';
import 'leaflet/dist/leaflet.css';
import './VehicleMap.css';

interface VehicleMapProps {
  vehicles: Vehicle[];
  lastUpdateTime?: Date;
  isPolling?: boolean;
  onTogglePolling?: () => void;
  onRefresh?: () => void;
}

export const VehicleMap: React.FC<VehicleMapProps> = ({ 
  vehicles,
  lastUpdateTime,
  isPolling = false,
  onTogglePolling,
  onRefresh
}) => {
  const [selectedNCMs, setSelectedNCMs] = useState<string[]>([]);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [isLegendVisible, setIsLegendVisible] = useState<boolean>(true);

  // Extract all unique NCMs from vehicles
  const availableNCMs = useMemo(() => extractUniqueNCMs(vehicles), [vehicles]);

  // Filter vehicles by selected NCMs
  const filteredVehicles = useMemo(
    () => filterVehiclesByNCM(vehicles, selectedNCMs),
    [vehicles, selectedNCMs]
  );

  // Center map on Curitiba, Paraná with wider view to show all state
  const center: [number, number] = [-25.4284, -49.2733];
  const zoom = 7;

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
          <div className="logo-container">
            <img src={`${import.meta.env.BASE_URL}logo-sauron.png`} alt="Sauron Logo" className="header-logo" />
            <h1>Sistema de Monitoramento de Cargas</h1>
          </div>
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
          {lastUpdateTime && (
            <span className="stat-item">
              Última atualização: <strong>{lastUpdateTime.toLocaleTimeString('pt-BR')}</strong>
            </span>
          )}
          {onRefresh && (
            <button 
              className="refresh-btn"
              onClick={onRefresh}
              title="Atualizar agora"
            >
              🔄 Atualizar
            </button>
          )}
          {onTogglePolling && (
            <button 
              className={`polling-btn ${isPolling ? 'active' : ''}`}
              onClick={onTogglePolling}
              title={isPolling ? 'Pausar atualizações automáticas' : 'Retomar atualizações automáticas'}
            >
              {isPolling ? '⏸️ Pausar' : '▶️ Retomar'}
            </button>
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
        {/* Render routes for selected vehicle */}
        {selectedVehicle && (
          <>
            {/* Effective route (red) - actual path based on passage records */}
            <EffectiveRoute vehicleId={selectedVehicle.id} />
            {/* Planned route (blue) - based on MDFe route information */}
            {selectedVehicle.mdfe && (
              <PlannedRoute mdfe={selectedVehicle.mdfe} />
            )}
          </>
        )}
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
        <div className="legend-header">
          <h3>Legenda - Modais de Transporte</h3>
          <button 
            className="legend-toggle-btn"
            onClick={() => setIsLegendVisible(!isLegendVisible)}
            aria-label={isLegendVisible ? "Ocultar legenda" : "Exibir legenda"}
          >
            {isLegendVisible ? '✕' : '☰'}
          </button>
        </div>
        {isLegendVisible && (
          <>
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
            <h3 style={{ marginTop: '1rem' }}>Rotas</h3>
            <div className="legend-items">
              <div className="legend-item">
                <span className="route-legend-line route-legend-planned"></span>
                <span>Rota Planejada (MDFe)</span>
              </div>
              <div className="legend-item">
                <span className="route-legend-line route-legend-effective"></span>
                <span>Rota Efetiva</span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
