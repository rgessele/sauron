import { Marker, Tooltip } from 'react-leaflet';
import type { FixedPoint } from '../types/fixedPoint';
import { getFixedPointIcon, getFixedPointTypeDescription } from '../utils/fixedPointIcons';

interface FixedPointMarkerProps {
  point: FixedPoint;
}

export const FixedPointMarker: React.FC<FixedPointMarkerProps> = ({ point }) => {
  const icon = getFixedPointIcon(point.type);

  const tooltipContent = () => {
    return (
      <div className="fixed-point-tooltip">
        <div className="tooltip-header">
          <strong>{point.name}</strong>
        </div>
        <div className="tooltip-section">
          <strong>Tipo:</strong> {getFixedPointTypeDescription(point.type)}
        </div>
        <div className="tooltip-section">
          <strong>Endereço:</strong> {point.address}
        </div>
        <div className="tooltip-section">
          <strong>Telefone:</strong> {point.phone}
        </div>
        {point.email && (
          <div className="tooltip-section">
            <strong>E-mail:</strong> {point.email}
          </div>
        )}
      </div>
    );
  };

  return (
    <Marker 
      position={[point.latitude, point.longitude]} 
      icon={icon}
    >
      <Tooltip direction="top" offset={[0, -10]} opacity={0.95}>
        {tooltipContent()}
      </Tooltip>
    </Marker>
  );
};
