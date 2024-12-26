# Maverick AI - Content Moderation Platform

[![Deploy Status](https://img.shields.io/badge/deploy-live-success)](https://maverick-ai.onrender.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A powerful, real-time content moderation platform powered by Mistral AI, designed to create safer online spaces through intelligent content analysis.

## 🌟 Key Features

+ 🚀 **Real-time Analysis**
  - Instant content moderation
  - Fast response times
  - Live chat monitoring

+ 🛡️ **Advanced Detection**
  - Toxicity detection
  - Self-harm content identification
  - Threat detection
  - Inappropriate language filtering

+ 🌐 **Chrome Extension**
  - Browser-wide protection
  - Google Meet integration
  - Custom moderation preferences
  - Instant notifications

+ ⚡ **Performance**
  - High accuracy moderation
  - 7B+ parameter AI model
  - Support for 30+ languages
  - 24/7 availability

## 🛠 System Architecture

### Data Flow
```mermaid
flowchart TD
    subgraph Client
        UI[User Interface]
        CE[Chrome Extension]
    end

    subgraph Core_Services
        MM[Moderation Module]
        AI[Mistral AI Engine]
        AP[API Layer]
    end

    subgraph Processing
        TC[Text Classification]
        SA[Sentiment Analysis]
        TD[Threat Detection]
    end

    UI --> |Text Input| MM
    CE --> |Real-time Content| MM
    MM --> |Content Analysis| AI
    AI --> |Results| AP
    AP --> TC & SA & TD
    TC & SA & TD --> |Analysis Results| UI
```

### Deployment Architecture
```mermaid
flowchart TD
    subgraph Development
        LC[Local Development]
        DK[Docker Container]
    end

    subgraph Production
        RD[Render Deployment]
        subgraph Services
            FE[Frontend Static Files]
            BE[Backend API]
        end
    end

    subgraph CI_CD
        GA[GitHub Actions]
        DB[Docker Build]
    end

    LC --> |npm run dev| DK
    DK --> |docker-compose| GA
    GA --> |Build & Test| DB
    DB --> |Deploy| RD
    RD --> FE & BE
```

### System Components
```mermaid
graph TD
    subgraph Frontend
        RC[React Components]
        RT[Router]
        PS[Pages]
        subgraph Components
            FT[Features]
            AB[About]
            TM[Team]
            PR[Pricing]
        end
    end

    subgraph Core_Features
        TM[Text Moderation]
        subgraph Analysis
            TX[Toxicity Detection]
            TH[Threat Analysis]
            EM[Emotional Analysis]
            CR[Credibility Scoring]
        end
    end

    subgraph Integration
        API[API Layer]
        MA[Mistral AI]
        WH[Webhooks]
    end

    RC --> RT
    RT --> PS
    PS --> FT & AB & TM & PR
    FT --> TM
    TM --> TX & TH & EM & CR
    TX & TH & EM & CR --> API
    API --> MA
    MA --> WH
```

## 🛠️ Tech Stack

- Frontend: React 18 + TypeScript
- AI Engine: Mistral-7B
- Styling: Tailwind CSS
- Build Tool: Vite
- Backend: Node.js + Supabase
- CI/CD: Github Actions
- Containerization: Docker

## 🚀 Getting Started

### Prerequisites
- Node.js 16+
- Docker Desktop (for containerized deployment)
- Git

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/maverick-ai.git
cd maverick-ai
```

2. Choose your preferred setup method:

#### Via Docker
```bash
npm install
docker-compose up --build
# Access at http://localhost:3000
```

#### Via Node.js
```bash
npm install
npm run dev
# Access at http://localhost:5173
```

## 🔑 API Configuration

1. Request API access from project maintainers
2. Create `.env.local` file:
```env
VITE_MISTRAL_API_KEY=your_key_here
```

## 🧩 Chrome Extension

Our extension provides real-time content moderation across browsers:

1. Install from Chrome Web Store (coming soon)
2. Configure moderation preferences
3. Enjoy automatic content monitoring
4. Receive instant alerts for harmful content

## 🤝 Contributing

We welcome contributions! See our [Contributing Guidelines](CONTRIBUTING.md) for details.

## 📈 Project Stats

- Growing number of processed content pieces
- Powered by Mistral-7B language model
- Active development and improvements
- 24/7 Real-time Protection

## 🆘 Support & Contact

Need help? Contact our maintainers:

- Siddhesh Rajale ➡️ [![Twitter](https://img.shields.io/twitter/follow/Siddhesh_Rajale?style=social)](https://twitter.com/intent/follow?screen_name=Scholar_js)
- Mehul Pardeshi ➡️ [![Twitter](https://img.shields.io/twitter/follow/Mehul_Pardeshi?style=social)](https://twitter.com/intent/follow?screen_name=MehulPardeshi2)
- Divyesh Mali ➡️ [![Twitter](https://img.shields.io/twitter/follow/Divyesh_Mali?style=social)](https://twitter.com/intent/follow?screen_name=divyesh_mali_)

## 📄 License

MIT License - See [LICENSE](LICENSE) for details.
