import L from 'leaflet';
import { FixedPointType } from '../types/fixedPoint';

/**
 * Get icon for fixed points (PRF posts and Receita offices)
 * PRF uses police/shield icons, Receita uses government/building icons
 */
export const getFixedPointIcon = (type: FixedPointType): L.DivIcon => {
  let iconHtml = '';
  let className = 'fixed-point-marker';
  
  switch (type) {
    case FixedPointType.PRF:
      // Police/law enforcement icon for PRF
      iconHtml = `
        <div style="font-size: 28px; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3));">
          🚔
        </div>
      `;
      className += ' prf-marker';
      break;
    case FixedPointType.RECEITA:
      // Government building icon for Receita Estadual
      iconHtml = `
        <div style="font-size: 28px; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3));">
          🏛️
        </div>
      `;
      className += ' receita-marker';
      break;
  }

  return L.divIcon({
    html: iconHtml,
    className: className,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
  });
};

/**
 * Get description for fixed point type
 */
export const getFixedPointTypeDescription = (type: FixedPointType): string => {
  switch (type) {
    case FixedPointType.PRF:
      return 'Polícia Rodoviária Federal';
    case FixedPointType.RECEITA:
      return 'Receita Estadual do Paraná';
    default:
      return 'Desconhecido';
  }
};
