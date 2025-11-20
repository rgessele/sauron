import React, { useState, useMemo } from 'react';
import type { NCM } from '../types/vehicle';
import './NCMFilter.css';

interface NCMFilterProps {
  availableNCMs: NCM[];
  selectedNCMs: string[];
  onNCMChange: (selectedNCMs: string[]) => void;
}

export const NCMFilter: React.FC<NCMFilterProps> = ({
  availableNCMs,
  selectedNCMs,
  onNCMChange,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  // Filter NCMs based on search term
  const filteredNCMs = useMemo(() => {
    if (!searchTerm) return availableNCMs;
    
    const lowerSearch = searchTerm.toLowerCase();
    return availableNCMs.filter(ncm =>
      ncm.code.includes(lowerSearch) ||
      ncm.description.toLowerCase().includes(lowerSearch)
    );
  }, [availableNCMs, searchTerm]);

  const handleNCMToggle = (ncmCode: string) => {
    const newSelection = selectedNCMs.includes(ncmCode)
      ? selectedNCMs.filter(code => code !== ncmCode)
      : [...selectedNCMs, ncmCode];
    
    onNCMChange(newSelection);
  };

  const handleClear = () => {
    onNCMChange([]);
    setSearchTerm('');
  };

  const handleSelectAll = () => {
    onNCMChange(filteredNCMs.map(ncm => ncm.code));
  };

  return (
    <div className="ncm-filter">
      <div className="ncm-filter-header">
        <button 
          className="ncm-filter-toggle"
          onClick={() => setIsOpen(!isOpen)}
        >
          🔍 Filtrar por NCM
          {selectedNCMs.length > 0 && (
            <span className="ncm-badge">{selectedNCMs.length}</span>
          )}
          <span className={`arrow ${isOpen ? 'open' : ''}`}>▼</span>
        </button>
      </div>

      {isOpen && (
        <div className="ncm-filter-dropdown">
          <div className="ncm-search-box">
            <input
              type="text"
              placeholder="Buscar NCM por código ou descrição..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="ncm-search-input"
            />
          </div>

          <div className="ncm-filter-actions">
            <button onClick={handleSelectAll} className="ncm-action-btn">
              Selecionar todos
            </button>
            <button onClick={handleClear} className="ncm-action-btn">
              Limpar filtro
            </button>
          </div>

          <div className="ncm-list">
            {filteredNCMs.length === 0 ? (
              <div className="ncm-empty">Nenhum NCM encontrado</div>
            ) : (
              filteredNCMs.map((ncm) => (
                <label key={ncm.code} className="ncm-item">
                  <input
                    type="checkbox"
                    checked={selectedNCMs.includes(ncm.code)}
                    onChange={() => handleNCMToggle(ncm.code)}
                  />
                  <div className="ncm-info">
                    <span className="ncm-code">{ncm.code}</span>
                    <span className="ncm-description">{ncm.description}</span>
                  </div>
                </label>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};
