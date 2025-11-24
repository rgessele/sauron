import React, { useState, useMemo } from 'react';
import type { MalhaFiscal } from '../types/vehicle';
import './MalhaFiscalFilter.css';

interface MalhaFiscalFilterProps {
  availableMalhas: MalhaFiscal[];
  selectedMalhas: string[];
  onMalhaChange: (selectedMalhas: string[]) => void;
}

export const MalhaFiscalFilter: React.FC<MalhaFiscalFilterProps> = ({
  availableMalhas,
  selectedMalhas,
  onMalhaChange,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  // Filter malhas based on search term
  const filteredMalhas = useMemo(() => {
    if (!searchTerm) return availableMalhas;
    
    const lowerSearch = searchTerm.toLowerCase();
    return availableMalhas.filter(malha =>
      malha.code.toLowerCase().includes(lowerSearch) ||
      malha.description.toLowerCase().includes(lowerSearch)
    );
  }, [availableMalhas, searchTerm]);

  const handleMalhaToggle = (malhaCode: string) => {
    const newSelection = selectedMalhas.includes(malhaCode)
      ? selectedMalhas.filter(code => code !== malhaCode)
      : [...selectedMalhas, malhaCode];
    
    onMalhaChange(newSelection);
  };

  const handleClear = () => {
    onMalhaChange([]);
    setSearchTerm('');
  };

  const handleSelectAll = () => {
    onMalhaChange(filteredMalhas.map(malha => malha.code));
  };

  return (
    <div className="malha-filter">
      <div className="malha-filter-header">
        <button 
          className="malha-filter-toggle"
          onClick={() => setIsOpen(!isOpen)}
        >
          ⚠️ Filtrar por Malha Fiscal
          {selectedMalhas.length > 0 && (
            <span className="malha-badge">{selectedMalhas.length}</span>
          )}
          <span className={`arrow ${isOpen ? 'open' : ''}`}>▼</span>
        </button>
      </div>

      {isOpen && (
        <div className="malha-filter-dropdown">
          <div className="malha-search-box">
            <input
              type="text"
              placeholder="Buscar malha por código ou descrição..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="malha-search-input"
            />
          </div>

          <div className="malha-filter-actions">
            <button onClick={handleSelectAll} className="malha-action-btn">
              Selecionar todos
            </button>
            <button onClick={handleClear} className="malha-action-btn">
              Limpar filtro
            </button>
          </div>

          <div className="malha-list">
            {filteredMalhas.length === 0 ? (
              <div className="malha-empty">Nenhuma malha fiscal encontrada</div>
            ) : (
              filteredMalhas.map((malha) => (
                <label key={malha.code} className="malha-item">
                  <input
                    type="checkbox"
                    checked={selectedMalhas.includes(malha.code)}
                    onChange={() => handleMalhaToggle(malha.code)}
                  />
                  <div className="malha-info">
                    <span className="malha-code">{malha.code}</span>
                    <span className="malha-description">{malha.description}</span>
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
