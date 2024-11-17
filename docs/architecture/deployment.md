graph TB
    subgraph "Production Environment"
        NGINX[Nginx Server]
        DOCKER[Docker Container]
        ENV[Environment Variables]
        STATIC[Static Assets]
    end

    subgraph "Build Process"
        NPM[npm build]
        VITE[Vite Bundler]
        TS[TypeScript Compiler]
    end

    subgraph "Version Control"
        GIT[Git Repository]
        GHA[GitHub Actions]
        SECRETS[GitHub Secrets]
    end

    subgraph "External Services"
        GITHUB[GitHub API]
        SUPABASE[Supabase]
    end

    GIT --> GHA
    SECRETS --> GHA
    GHA --> NPM
    NPM --> VITE
    VITE --> TS
    TS --> DOCKER
    DOCKER --> NGINX
    ENV --> DOCKER
    STATIC --> NGINX
    
    classDef primary fill:#2563eb,stroke:#fff,stroke-width:2px,color:#fff
    classDef secondary fill:#4b5563,stroke:#fff,stroke-width:2px,color:#fff
    classDef external fill:#059669,stroke:#fff,stroke-width:2px,color:#fff