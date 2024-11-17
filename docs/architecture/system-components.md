```mermaid
graph TB
    subgraph "Frontend Application"
        WEB[Web Interface]
        COMP[React Components]
        HOOKS[React Hooks]
        ROUTE[React Router]
        
        WEB --> COMP
        COMP --> HOOKS
        WEB --> ROUTE
    end

    subgraph "Backend Services"
        GHA[GitHub Actions]
        SYNC[Sync Service]
        FETCH[Data Fetcher]
        TRANS[Data Transformer]
        
        GHA --> SYNC
        SYNC --> FETCH
        FETCH --> TRANS
    end

    subgraph "External APIs"
        GITHUB[GitHub API]
        SUPA[Supabase API]
        
        FETCH --> GITHUB
        TRANS --> SUPA
    end

    subgraph "Database Layer"
        DB[(Supabase DB)]
        CACHE[Cache Layer]
        
        SUPA --> DB
        DB --> CACHE
    end

    subgraph "CI/CD Pipeline"
        DOCKER[Docker Container]
        NGINX[Nginx Server]
        ENV[Environment Variables]
        
        DOCKER --> NGINX
        ENV --> DOCKER
    end

    WEB --> SUPA
    SYNC --> DB
    
    classDef primary fill:#2563eb,stroke:#fff,stroke-width:2px,color:#fff
    classDef secondary fill:#4b5563,stroke:#fff,stroke-width:2px,color:#fff
    classDef external fill:#059669,stroke:#fff,stroke-width:2px,color:#fff
    
    class WEB,COMP,HOOKS,ROUTE primary
    class GHA,SYNC,FETCH,TRANS secondary
    class GITHUB,SUPA external
