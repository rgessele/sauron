import type { Vehicle } from '../types/vehicle';
import { formatCurrency, formatWeight, getModalTypeDescription } from '../utils/vehicleIcons';
import './VehicleDetailsPanel.css';

interface VehicleDetailsPanelProps {
  vehicle: Vehicle;
  onClose: () => void;
}

export const VehicleDetailsPanel: React.FC<VehicleDetailsPanelProps> = ({ vehicle, onClose }) => {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const formatRoute = (route?: string[]) => {
    if (!route || route.length === 0) {
      return 'Nenhuma informação disponível';
    }
    return route.join(' → ');
  };

  const getInvoiceKeys = () => {
    if (!vehicle.mdfe || !vehicle.mdfe.invoices || vehicle.mdfe.invoices.length === 0) {
      return [];
    }
    return vehicle.mdfe.invoices.map(invoice => invoice.id);
  };

  const invoiceKeys = getInvoiceKeys();

  return (
    <div className="vehicle-details-panel">
      <div className="panel-header">
        <h2>Detalhes do Veículo</h2>
        <button className="close-button" onClick={onClose} aria-label="Fechar">
          ✕
        </button>
      </div>

      <div className="panel-content">
        {/* Vehicle Information Section */}
        <section className="panel-section">
          <h3>Informações do Veículo</h3>
          <div className="info-grid">
            <div className="info-item">
              <span className="info-label">Placa:</span>
              <span className="info-value">{vehicle.plate}</span>
            </div>
            {vehicle.carrier && (
              <div className="info-item">
                <span className="info-label">Transportadora:</span>
                <span className="info-value">{vehicle.carrier}</span>
              </div>
            )}
            {vehicle.vehicleType && (
              <div className="info-item">
                <span className="info-label">Tipo do Veículo:</span>
                <span className="info-value">{vehicle.vehicleType}</span>
              </div>
            )}
            {vehicle.state && (
              <div className="info-item">
                <span className="info-label">UF:</span>
                <span className="info-value">{vehicle.state}</span>
              </div>
            )}
            {vehicle.status && (
              <div className="info-item">
                <span className="info-label">Status:</span>
                <span className="info-value status-badge">{vehicle.status}</span>
              </div>
            )}
            <div className="info-item">
              <span className="info-label">Última atualização:</span>
              <span className="info-value">{formatDate(vehicle.lastUpdate)}</span>
            </div>
            {vehicle.mdfe && (
              <>
                <div className="info-item">
                  <span className="info-label">Modal:</span>
                  <span className="info-value">{getModalTypeDescription(vehicle.mdfe.modalType)}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Peso da Carga:</span>
                  <span className="info-value">{formatWeight(vehicle.mdfe.cargoWeight)}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Valor:</span>
                  <span className="info-value">{formatCurrency(vehicle.mdfe.value)}</span>
                </div>
              </>
            )}
          </div>
        </section>

        {/* Invoices Section */}
        <section className="panel-section">
          <h3>Notas Fiscais Embarcadas</h3>
          {invoiceKeys.length > 0 ? (
            <div className="invoice-list">
              {invoiceKeys.map((key, index) => (
                <div key={index} className="invoice-item">
                  <span className="invoice-label">NF-e {index + 1}:</span>
                  <span className="invoice-key" title={key}>{key}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="no-data">Nenhuma informação disponível</p>
          )}
        </section>

        {/* Route Section */}
        <section className="panel-section">
          <h3>Rota Prevista (MDFe)</h3>
          {vehicle.mdfe?.route && vehicle.mdfe.route.length > 0 ? (
            <div className="route-display">
              {formatRoute(vehicle.mdfe.route)}
            </div>
          ) : (
            <p className="no-data">Nenhuma informação disponível</p>
          )}
        </section>
      </div>
    </div>
  );
};
