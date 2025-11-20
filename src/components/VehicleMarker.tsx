import { Marker, Tooltip } from 'react-leaflet';
import type { Vehicle } from '../types/vehicle';
import { getVehicleIcon, getModalTypeDescription, formatCurrency, formatWeight } from '../utils/vehicleIcons';

interface VehicleMarkerProps {
  vehicle: Vehicle;
}

export const VehicleMarker: React.FC<VehicleMarkerProps> = ({ vehicle }) => {
  const icon = getVehicleIcon(vehicle.mdfe?.modalType);

  const tooltipContent = () => {
    if (!vehicle.mdfe) {
      return (
        <div className="vehicle-tooltip">
          <div className="tooltip-header">
            <strong>Placa:</strong> {vehicle.plate}
          </div>
          <div className="tooltip-info">
            Sem MDFe associado
          </div>
        </div>
      );
    }

    const { mdfe } = vehicle;
    return (
      <div className="vehicle-tooltip">
        <div className="tooltip-header">
          <strong>Placa:</strong> {vehicle.plate}
        </div>
        <div className="tooltip-section">
          <strong>MDFe:</strong> {mdfe.id}
        </div>
        <div className="tooltip-section">
          <strong>Modal:</strong> {getModalTypeDescription(mdfe.modalType)}
        </div>
        <div className="tooltip-section">
          <strong>Carga:</strong> {mdfe.cargoDescription}
        </div>
        <div className="tooltip-section">
          <strong>Peso:</strong> {formatWeight(mdfe.cargoWeight)}
        </div>
        <div className="tooltip-section">
          <strong>Origem:</strong> {mdfe.origin}
        </div>
        <div className="tooltip-section">
          <strong>Destino:</strong> {mdfe.destination}
        </div>
        <div className="tooltip-section">
          <strong>Valor:</strong> {formatCurrency(mdfe.value)}
        </div>
      </div>
    );
  };

  return (
    <Marker 
      position={[vehicle.latitude, vehicle.longitude]} 
      icon={icon}
    >
      <Tooltip direction="top" offset={[0, -10]} opacity={0.95}>
        {tooltipContent()}
      </Tooltip>
    </Marker>
  );
};
