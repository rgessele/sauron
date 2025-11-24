-- Tabela de registro de passagem de veículos
-- Esta tabela armazena as coordenadas registradas quando um veículo passa por um ponto de monitoramento
CREATE TABLE registro_passagem (
    id SERIAL PRIMARY KEY,
    veiculo_id INTEGER NOT NULL,
    latitude FLOAT NOT NULL,
    longitude FLOAT NOT NULL,
    timestamp TIMESTAMP DEFAULT NOW()
);

-- Índice para melhorar performance das consultas por veículo
CREATE INDEX idx_registro_passagem_veiculo ON registro_passagem(veiculo_id);

-- Índice para melhorar performance das consultas por timestamp
CREATE INDEX idx_registro_passagem_timestamp ON registro_passagem(timestamp);

-- Índice composto para consultas de últimas posições por veículo
CREATE INDEX idx_registro_passagem_veiculo_timestamp ON registro_passagem(veiculo_id, timestamp DESC);
