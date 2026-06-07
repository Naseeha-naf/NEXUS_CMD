# Architecture & Documentation

## Architecture Diagram

The system follows a classic Client-Server full-stack architecture with a telemetry simulation loop.

```mermaid
graph TD;
    Client[React Frontend] <-->|REST API / JWT| Server[Node.js / Express Backend]
    Server <-->|Mongoose| DB[(MongoDB Atlas)]
    
    subgraph Backend Services
        Simulator[Telemetry Simulator cron] -->|Generates Data| DB
        Simulator --> RiskEngine[Risk Analysis Engine]
        RiskEngine -->|Calculates Health & Risk| DB
        RiskEngine -->|Generates Alerts| DB
        RiskEngine -->|Generates Predictions| DB
    end
```

## Database Schema (ER Diagram)

```mermaid
erDiagram
    USER {
        ObjectId _id
        String name
        String email
        String password
        String role
    }
    SATELLITE {
        ObjectId _id
        String name
        String missionName
        Date launchDate
        String orbitType
        String status
    }
    TELEMETRY {
        ObjectId _id
        ObjectId satelliteId
        Date timestamp
        Number batteryLevel
        Number temperature
        Number cpuUtilization
        Number signalStrength
    }
    ALERT {
        ObjectId _id
        ObjectId satelliteId
        String message
        String severity
        String metric
        Date timestamp
        Boolean resolved
    }
    PREDICTION {
        ObjectId _id
        ObjectId satelliteId
        Number riskScore
        Number healthScore
        String warningLevel
        Number failureRiskPercentage
        String predictedIssue
        String recommendedAction
    }

    SATELLITE ||--o{ TELEMETRY : generates
    SATELLITE ||--o{ ALERT : triggers
    SATELLITE ||--o{ PREDICTION : has
```

## API Documentation

### Auth API (`/api/auth`)
- `POST /signup` - Register a new operator.
- `POST /login` - Authenticate and receive JWT.
- `GET /me` - Get current user profile (Protected).

### Satellite API (`/api/satellites`)
- `GET /` - Retrieve all satellites.
- `POST /` - Register a new satellite.
- `PUT /:id` - Update satellite details.
- `DELETE /:id` - Remove a satellite.

### Telemetry API (`/api/telemetry`)
- `GET /:satelliteId` - Retrieve latest telemetry stream for a specific satellite.

### Alert API (`/api/alerts`)
- `GET /` - Retrieve all generated alerts.
- `PUT /:id/resolve` - Acknowledge and resolve an alert.

### Prediction API (`/api/predictions`)
- `GET /` - Retrieve all risk predictions.
- `GET /:satelliteId` - Retrieve predictions for a specific satellite.

### Analytics API (`/api/analytics`)
- `GET /dashboard` - Retrieve aggregated data for the Mission Control dashboard (KPIs).
