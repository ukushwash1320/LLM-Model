# Policy-QA Engine - Project Structure

## 📂 Complete Project Structure

```
clause-comprehend-main/
├── 📄 render.yaml                 # Render deployment configuration
├── 📄 DEPLOYMENT.md              # Deployment guide
├── 📄 package.json               # Frontend dependencies & scripts
├── 📄 .env.local                 # Environment variables
├── 📄 vite.config.ts             # Vite configuration
├── 📄 tailwind.config.ts         # Tailwind CSS configuration
├── 📄 tsconfig.json              # TypeScript configuration
├── 📄 index.html                 # Main HTML template
├── 📄 components.json            # shadcn/ui configuration
├── 📄 eslint.config.js           # ESLint configuration
├── 📄 postcss.config.js          # PostCSS configuration
├── 📄 README.md                  # Project documentation
├── 📄 bun.lockb                  # Bun lockfile
├── 📄 package-lock.json          # NPM lockfile
│
├── 📁 public/                    # Static assets
│   ├── 📄 favicon.ico
│   ├── 📄 placeholder.svg
│   └── 📄 robots.txt
│
├── 📁 src/                       # Frontend source code
│   ├── 📄 App.tsx                # Main App component
│   ├── 📄 App.css                # App styles
│   ├── 📄 main.tsx               # App entry point
│   ├── 📄 index.css              # Global styles
│   ├── 📄 vite-env.d.ts          # Vite type definitions
│   │
│   ├── 📁 components/            # React components
│   │   ├── 📄 DocumentUpload.tsx
│   │   ├── 📄 QueryInterface.tsx
│   │   ├── 📄 ResultsDisplay.tsx
│   │   ├── 📄 SystemArchitecture.tsx
│   │   ├── 📄 WebhookConfig.tsx
│   │   │
│   │   └── 📁 ui/                # shadcn/ui components
│   │       ├── 📄 accordion.tsx
│   │       ├── 📄 alert-dialog.tsx
│   │       ├── 📄 alert.tsx
│   │       ├── 📄 button.tsx
│   │       ├── 📄 card.tsx
│   │       ├── 📄 input.tsx
│   │       ├── 📄 label.tsx
│   │       ├── 📄 switch.tsx
│   │       ├── 📄 tabs.tsx
│   │       ├── 📄 textarea.tsx
│   │       ├── 📄 toast.tsx
│   │       ├── 📄 toaster.tsx
│   │       ├── 📄 tooltip.tsx
│   │       └── 📄 ... (30+ UI components)
│   │
│   ├── 📁 hooks/                 # Custom React hooks
│   │   ├── 📄 use-mobile.tsx
│   │   └── 📄 use-toast.ts
│   │
│   ├── 📁 lib/                   # Utility libraries
│   │   └── 📄 utils.ts
│   │
│   ├── 📁 pages/                 # Page components
│   │   ├── 📄 Index.tsx          # Main page
│   │   └── 📄 NotFound.tsx       # 404 page
│   │
│   └── 📁 services/              # API services
│       ├── 📄 ragService.ts      # RAG analysis service
│       ├── 📄 hackrxApi.ts       # HackRX API integration
│       └── 📄 webhookService.ts  # Webhook notifications
│
├── 📁 api/                       # Backend API server
│   ├── 📄 package.json           # API dependencies & scripts
│   ├── 📄 package-lock.json      # NPM lockfile
│   ├── 📄 tsconfig.json          # TypeScript configuration
│   ├── 📄 server.ts              # Express server
│   │
│   ├── 📁 dist/                  # Compiled JavaScript
│   │   ├── 📄 server.js
│   │   ├── 📄 server.js.map
│   │   ├── 📄 server.d.ts
│   │   └── 📄 server.d.ts.map
│   │
│   └── 📁 node_modules/          # API dependencies
│
├── 📁 scripts/                   # Build & deployment scripts
│   ├── 📄 verify-build.sh        # Unix build verification
│   └── 📄 verify-build.bat       # Windows build verification
│
└── 📁 dist/                      # Production build output
    ├── 📄 index.html
    └── 📁 assets/
        ├── 📄 index-*.css
        └── 📄 index-*.js
```

## 🏗️ Architecture Overview

### Frontend (React + TypeScript + Vite)
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and building
- **UI Library**: shadcn/ui components with Tailwind CSS
- **State Management**: React hooks and context
- **Routing**: React Router for navigation

### Backend (Node.js + Express + TypeScript)
- **Runtime**: Node.js with ES modules
- **Framework**: Express.js for API routes
- **Language**: TypeScript with modern ES features
- **CORS**: Configured for cross-origin requests
- **Health Checks**: Built-in monitoring endpoints

### Key Features
1. **Document Management**: Upload and manage policy documents
2. **Query Interface**: Natural language question processing
3. **RAG Analysis**: Retrieval-Augmented Generation simulation
4. **Webhook Integration**: Real-time notifications
5. **HackRX API**: Competition endpoint integration
6. **Responsive Design**: Mobile-friendly interface

### Deployment Configuration
- **Platform**: Render.com
- **Services**: Separate frontend and API services
- **Environment**: Production-ready with proper CORS
- **Health Monitoring**: Automatic health checks
- **Scaling**: Auto-scaling based on traffic

### Development Workflow
1. **Local Development**: Hot reload for both frontend and API
2. **Build Process**: Automated TypeScript compilation
3. **Testing**: Build verification scripts
4. **Deployment**: Git-based automatic deployment
5. **Monitoring**: Real-time logs and metrics

## 🚀 Quick Start Commands

```bash
# Install dependencies
npm install

# Start development servers
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Verify deployment readiness
./scripts/verify-build.bat
```

## 🌐 Live URLs (After Deployment)

- **Frontend**: https://policy-qa-engine.onrender.com
- **API**: https://policy-qa-api.onrender.com/api/v1
- **Health Check**: https://policy-qa-api.onrender.com/api/v1/health
- **HackRX Endpoint**: https://policy-qa-api.onrender.com/api/v1/hackrx/run

---

**Ready for deployment! 🎉**
