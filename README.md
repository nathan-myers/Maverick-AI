# Content Moderation Software

### Deploy Link : https://maverick-ai.onrender.com/
____

## AI-Powered Content Moderation Software

A modern, real-time content moderation platform powered by TensorFlow.js and advanced AI models to help protect online communities from harmful content.

### Purpose and Vision

This open source project aims to create a scalable, AI-powered content moderation software that can be integrated into various social media platforms and online communities. By offering an API, this software will enable platforms to seamlessly moderate text (and potentially image) content to ensure a safer environment for users. The long-term goal is to develop a robust, versatile solution that can be adopted by social media apps and other online platforms requiring effective content moderation.

In the future, this software API could serve as a comprehensive moderation backbone for various apps, handling moderation tasks across diverse platforms and helping developers maintain community standards. This vision allows the project to expand beyond individual applications, providing a reliable, adaptable, and scalable content moderation service.

### Features

+ 🚀 Real-time content analysis and moderation
+ 🛡️ Detection of multiple content categories:
+ Toxicity and hate speech
+ Spam and scam content
+ Inappropriate language
+ Personal attacks and threats
+ 📊 Detailed analysis reports with confidence scores
+ 💾 Exportable moderation reports
+ ⚡ Built with modern web technologies

### Tech Stack

+ React 18 with TypeScript
+ TensorFlow.js for AI-powered analysis
+ Tailwind CSS for styling
+ Vite for blazing fast development
+ Node js & Supabase for backend
+ Github Actions for CI/CD
+ Docker for containerization

### Getting Started

1. Fork the repository
2. Clone the repository: *git clone https://github.com/yourusername/content-moderation-software.git*

## Running the project

### 1. Via Docker
1. Install dependencies: *npm install* in root directory
2. Start Docker Desktop
3. Run command `docker-compose up --build` in root directory
4. In Docker Desktop, go to Containers section and select 'maverick-ai'. Now click on `3000:80` port to open website in browser

### 2. Via Node JS
1. Install dependencies: *npm install* in root directory
2. Start the development server: *npm run dev* in root directory

### How It Works

The application uses TensorFlow.js toxicity models to analyze text content in real-time. It evaluates content across multiple dimensions including:

+ Toxicity levels
+ Identity-based attacks
+ Insults and threats
+ Obscene content
+ Spam patterns
+ Inappropriate language
   
### Each analysis provides detailed feedback with:

+ Specific content flags
+ Confidence scores
+ Context highlighting
+ Overall toxicity assessment
---

### Data Flow Architecture
```mermaid
sequenceDiagram
    participant GHA as GitHub Actions
    participant GH as GitHub API
    participant SS as Sync Script
    participant SB as Supabase
    participant WEB as Web Frontend
    participant UI as User Interface
    participant TF as TensorFlow.js
    participant HF as HuggingFace API
    
    Note over GHA: Triggers every 6 hours
    
    GHA->>SS: Initialize sync process
    activate SS
    
    SS->>GH: Request contributors list
    Note right of GH: Endpoint: /repos/{owner}/{repo}/contributors
    GH-->>SS: Return contributor data
    
    loop For each contributor
        SS->>GH: Fetch detailed user info
        Note right of GH: Endpoint: /users/{username}
        GH-->>SS: Return user details
        
        SS->>SS: Apply role mapping
        Note right of SS: Map custom roles<br/>Transform data format
        
        SS->>SB: Upsert contributor data
        Note right of SB: Table: contributors
        SB-->>SS: Confirm storage
    end
    
    deactivate SS
    
    WEB->>SB: Request contributors
    activate WEB
    SB-->>WEB: Return contributor list
    
    WEB->>UI: Render contributor grid
    Note right of UI: Display with avatars,<br/>roles, and contribution count
    
    Note over UI: User submits text for moderation
    
    UI->>WEB: Text submission
    
    par AI Analysis
        WEB->>TF: Toxicity classification
        TF-->>WEB: TensorFlow predictions
    and
        WEB->>HF: Text classification
        Note right of HF: Models: toxic-comment & emotions
        HF-->>WEB: HuggingFace predictions
    end
    
    WEB->>WEB: Combine & process predictions
    Note right of WEB: Calculate toxicity scores<br/>Generate content flags
    
    WEB->>UI: Display moderation results
    Note right of UI: Show flags, scores,<br/>and detailed analysis
    
    UI-->>WEB: User interaction
    deactivate WEB
```
---

### Database Schema
```mermaid
erDiagram
    CONTRIBUTORS {
        string github_username PK
        string name
        string avatar_url
        integer contributions
        string role
        timestamp last_updated
    }

    ROLE_MAPPING {
        string username PK
        string role FK
    }

    CUSTOM_ROLES {
        string role_id PK
        string role_name
        string description
        timestamp created_at
    }

    SYNC_LOGS {
        string log_id PK
        timestamp sync_time
        string status
        text error_message
        integer contributors_updated
    }

    MODERATION_RESULTS {
        string result_id PK
        text input_text
        float overall_toxicity
        float spam_score
        integer profanity_count
        float emotional_intensity
        timestamp created_at
        string user_id FK
    }

    CONTENT_FLAGS {
        string flag_id PK
        string result_id FK
        string word
        string flag_type
        string reason
        float confidence
        string context
    }

    AI_PREDICTIONS {
        string prediction_id PK
        string result_id FK
        string model_source
        string model_name
        json raw_prediction
        timestamp prediction_time
    }

    CONTRIBUTORS ||--o{ ROLE_MAPPING : has
    ROLE_MAPPING }o--|| CUSTOM_ROLES : uses
    CONTRIBUTORS ||--o{ SYNC_LOGS : tracked_in
    MODERATION_RESULTS ||--|{ CONTENT_FLAGS : contains
    MODERATION_RESULTS ||--|{ AI_PREDICTIONS : includes
    CONTRIBUTORS ||--o{ MODERATION_RESULTS : requests
```

---

### Deployment
```mermaid
graph TB
    subgraph "Production Environment"
        NGINX[Nginx Server]
        DOCKER[Docker Container]
        ENV[Environment Variables]
        STATIC[Static Assets]
        CACHE[Redis Cache]
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
        subgraph "AI Services"
            TF[TensorFlow.js]
            HF[HuggingFace API]
            MODELS[AI Models Cache]
        end
    end

    subgraph "Monitoring"
        LOGS[Application Logs]
        METRICS[Performance Metrics]
        ALERTS[Alert System]
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
    
    DOCKER --> TF
    DOCKER --> HF
    TF --> MODELS
    HF --> MODELS
    
    DOCKER --> CACHE
    MODELS --> CACHE
    
    DOCKER --> LOGS
    LOGS --> ALERTS
    METRICS --> ALERTS
    
    classDef primary fill:#2563eb,stroke:#fff,stroke-width:2px,color:#fff
    classDef secondary fill:#4b5563,stroke:#fff,stroke-width:2px,color:#fff
    classDef external fill:#059669,stroke:#fff,stroke-width:2px,color:#fff
    classDef ai fill:#9333ea,stroke:#fff,stroke-width:2px,color:#fff
    classDef monitoring fill:#dc2626,stroke:#fff,stroke-width:2px,color:#fff

    class TF,HF,MODELS ai
    class LOGS,METRICS,ALERTS monitoring
```

---

### System Components

```mermaid
graph TB
    subgraph "Frontend Application"
        WEB[Web Interface]
        COMP[React Components]
        HOOKS[React Hooks]
        ROUTE[React Router]
        MOD_UI[Moderation UI]
        
        WEB --> COMP
        COMP --> HOOKS
        WEB --> ROUTE
        COMP --> MOD_UI
    end

    subgraph "Backend Services"
        GHA[GitHub Actions]
        SYNC[Sync Service]
        FETCH[Data Fetcher]
        TRANS[Data Transformer]
        
        subgraph "AI Services"
            TF[TensorFlow Service]
            HF[HuggingFace Service]
            MOD[Moderation Logic]
            
            TF --> MOD
            HF --> MOD
        end
        
        GHA --> SYNC
        SYNC --> FETCH
        FETCH --> TRANS
    end

    subgraph "External APIs"
        GITHUB[GitHub API]
        SUPA[Supabase API]
        HF_API[HuggingFace API]
        
        FETCH --> GITHUB
        TRANS --> SUPA
        HF --> HF_API
    end

    subgraph "Database Layer"
        DB[(Supabase DB)]
        CACHE[Cache Layer]
        MOD_CACHE[Moderation Cache]
        
        SUPA --> DB
        DB --> CACHE
        MOD --> MOD_CACHE
    end

    subgraph "CI/CD Pipeline"
        DOCKER[Docker Container]
        NGINX[Nginx Server]
        ENV[Environment Variables]
        
        DOCKER --> NGINX
        ENV --> DOCKER
    end

    subgraph "Model Management"
        TF_MODELS[TensorFlow Models]
        HF_MODELS[HuggingFace Models]
        MODEL_CACHE[Model Cache]
        
        TF_MODELS --> MODEL_CACHE
        HF_MODELS --> MODEL_CACHE
        MODEL_CACHE --> TF
        MODEL_CACHE --> HF
    end

    WEB --> SUPA
    SYNC --> DB
    MOD_UI --> MOD
    MOD --> DB
    
    classDef primary fill:#2563eb,stroke:#fff,stroke-width:2px,color:#fff
    classDef secondary fill:#4b5563,stroke:#fff,stroke-width:2px,color:#fff
    classDef external fill:#059669,stroke:#fff,stroke-width:2px,color:#fff
    classDef ai fill:#9333ea,stroke:#fff,stroke-width:2px,color:#fff
    classDef cache fill:#ca8a04,stroke:#fff,stroke-width:2px,color:#fff
    
    class WEB,COMP,HOOKS,ROUTE primary
    class GHA,SYNC,FETCH,TRANS secondary
    class GITHUB,SUPA,HF_API external
    class TF,HF,MOD,TF_MODELS,HF_MODELS,MOD_UI ai
    class CACHE,MOD_CACHE,MODEL_CACHE cache
```

---
## Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For more details, refer to the [CONTRIBUTING.md](https://github.com/Swifty9/Maverick-AI/blob/main/CONTRIBUTING.md) file.

## License

#### MIT License - feel free to use this project for your own purposes.
