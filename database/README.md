# Database Structure

This directory contains the database schema and seed data for the vehicle passage tracking system.

## Files

- **schema.sql**: Database table definition for `registro_passagem` (passage records)
- **seed.sql**: Sample SQL script showing how to populate the table with test data

## Table Structure

### registro_passagem

Stores the coordinates recorded when a vehicle passes through a monitoring point.

| Column | Type | Description |
|--------|------|-------------|
| id | SERIAL | Primary key (auto-increment) |
| veiculo_id | INTEGER | Vehicle ID (1-50 for test data) |
| latitude | FLOAT | Latitude coordinate |
| longitude | FLOAT | Longitude coordinate |
| timestamp | TIMESTAMP | Time of passage (defaults to NOW()) |

## Test Data

The system currently runs in **simulation mode** using in-memory data:

- **50 vehicles** with unique IDs (1-50)
- Each vehicle has **multiple passage records** simulating movement along Paraná highways
- Passage records include realistic coordinates from actual highway routes in Paraná state
- Timestamps are distributed over the past 2 hours to simulate real-time data

### Highway Routes Covered

The test data includes movement along these major Paraná highways:
- BR-277: Paranaguá → Curitiba → Foz do Iguaçu
- BR-376: Curitiba → Ponta Grossa → Apucarana
- BR-369: Cascavel → Toledo → Marechal Cândido Rondon
- BR-373: Ponta Grossa → Guarapuava → Candói
- BR-158: Francisco Beltrão → Pato Branco
- BR-487: Campo Mourão → Umuarama
- BR-369: Londrina → Apucarana → Maringá
- BR-272: Guaíra → Terra Roxa
- BR-163: Palmital → Cascavel

### Cities Included

Sample coordinates from these Paraná cities:
- Paranaguá: -25.5161, -48.5227
- Curitiba: -25.4284, -49.2733
- Maringá: -23.4205, -51.9333
- Londrina: -23.3040, -51.1699
- Foz do Iguaçu: -25.5477, -54.5882
- Ponta Grossa: -25.0946, -50.1639
- Cascavel: -24.9578, -53.4590
- Toledo: -24.7136, -53.7428
- Guarapuava: -25.3905, -51.4578
- Apucarana: -23.5511, -51.4608

## Implementation

Currently, the system uses **simulated database polling**:

1. **Data Generation**: `src/data/passageRecordGenerator.ts` creates in-memory passage records
2. **Routes**: `src/data/paranaHighwayRoutes.ts` defines realistic highway routes
3. **Polling**: `src/hooks/useVehiclePositionUpdates.ts` polls for updates every 30 seconds
4. **Display**: Vehicle positions update automatically on the map

## Future Integration

When connecting to a real PostgreSQL database:

1. Run `schema.sql` to create the table structure
2. Populate with real data or use `seed.sql` as a reference
3. Update the polling logic to query the actual database instead of in-memory simulation
4. The current structure is designed to be compatible with future backend integration

## Queries

Example queries for the passage records table:

```sql
-- Get latest position for all vehicles
SELECT DISTINCT ON (veiculo_id) 
  veiculo_id, latitude, longitude, timestamp
FROM registro_passagem
ORDER BY veiculo_id, timestamp DESC;

-- Get all records for a specific vehicle
SELECT * FROM registro_passagem
WHERE veiculo_id = 1
ORDER BY timestamp DESC;

-- Get new records since last query
SELECT * FROM registro_passagem
WHERE timestamp > '2024-01-01 10:00:00'
ORDER BY timestamp ASC;

-- Count vehicles by recent activity
SELECT COUNT(DISTINCT veiculo_id) as active_vehicles
FROM registro_passagem
WHERE timestamp > NOW() - INTERVAL '1 hour';
```
