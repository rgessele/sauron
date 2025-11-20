import L from 'leaflet';
import { MDFeModalType } from '../types/vehicle';

// Custom icon configuration for each modal type
export const getVehicleIcon = (modalType?: MDFeModalType): L.DivIcon => {
  let iconHtml = '';
  let className = 'vehicle-marker';
  
  if (!modalType) {
    // Default icon for vehicles without MDFe
    iconHtml = `
      <div style="font-size: 24px; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3));">
        📍
      </div>
    `;
    className += ' no-mdfe';
  } else {
    switch (modalType) {
      case MDFeModalType.RODOVIARIO:
        iconHtml = `
          <div style="font-size: 28px; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3));">
            🚛
          </div>
        `;
        className += ' rodoviario';
        break;
      case MDFeModalType.AEREO:
        iconHtml = `
          <div style="font-size: 28px; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3));">
            ✈️
          </div>
        `;
        className += ' aereo';
        break;
      case MDFeModalType.AQUAVIARIO:
        iconHtml = `
          <div style="font-size: 28px; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3));">
            🚢
          </div>
        `;
        className += ' aquaviario';
        break;
      case MDFeModalType.FERROVIARIO:
        iconHtml = `
          <div style="font-size: 28px; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3));">
            🚂
          </div>
        `;
        className += ' ferroviario';
        break;
    }
  }

  return L.divIcon({
    html: iconHtml,
    className: className,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
  });
};

// Get modal type description in Portuguese
export const getModalTypeDescription = (modalType: MDFeModalType): string => {
  switch (modalType) {
    case MDFeModalType.RODOVIARIO:
      return 'Rodoviário';
    case MDFeModalType.AEREO:
      return 'Aéreo';
    case MDFeModalType.AQUAVIARIO:
      return 'Aquaviário';
    case MDFeModalType.FERROVIARIO:
      return 'Ferroviário';
    default:
      return 'Desconhecido';
  }
};

// Format currency in BRL
export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value);
};

// Format weight
export const formatWeight = (weight: number): string => {
  if (weight >= 1000) {
    return `${(weight / 1000).toFixed(2)} t`;
  }
  return `${weight} kg`;
};
