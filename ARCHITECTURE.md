# System Architecture Documentation

## 🏛️ High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                    Policy-QA Engine Frontend                    │
│                      (React + TypeScript)                       │
└─────────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│                     Component Layer                             │
│  ┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐   │
│  │ DocumentUpload  │ │ QueryInterface  │ │ ResultsDisplay  │   │
│  └─────────────────┘ └─────────────────┘ └─────────────────┘   │
│  ┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐   │
│  │ WebhookConfig   │ │SystemArch.      │ │ UI Components   │   │
│  └─────────────────┘ └─────────────────┘ └─────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│                     Services Layer                              │
│  ┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐   │
│  │   RAG Service   │ │  HackRX API     │ │ Webhook Service │   │
│  │                 │ │                 │ │                 │   │
│  │ • Query Parsing │ │ • POST /run     │ │ • Event Notify  │   │
│  │ • Doc Retrieval │ │ • Bearer Auth   │ │ • HTTP POST     │   │
│  │ • LLM Reasoning │ │ • JSON Payload  │ │ • Error Handle  │   │
│  └─────────────────┘ └─────────────────┘ └─────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│                    External Services                            │
│  ┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐   │
│  │   HackRX API    │ │  Webhook URLs   │ │ Document URLs   │   │
│  │ localhost:8000  │ │ Custom Endpoints│ │ File Storage    │   │
│  └─────────────────┘ └─────────────────┘ └─────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
```

## 🔄 Data Flow Architecture

```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   Upload    │───▶│   Query     │───▶│ RAG Analysis│───▶│   Results   │
│ Documents   │    │ Submission  │    │  Processing │    │  Display    │
└─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘
       │                   │                   │                   │
       ▼                   ▼                   ▼                   ▼
┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│Document URLs│    │Query Parser │    │Rule Engine  │    │Toast Notify │
│File Objects │    │Entity Extract│    │LLM Reasoning│    │UI Updates   │
└─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘
                                              │
                                              ▼
                           ┌─────────────────────────────────┐
                           │         Webhook Events          │
                           │                                 │
                           │ • analysis_complete             │
                           │ • api_submission_complete       │
                           │ • error                         │
                           └─────────────────────────────────┘
```

## 📊 RAG Pipeline Details

```
┌─────────────────────────────────────────────────────────────────┐
│                      RAG Analysis Pipeline                      │
└─────────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│  Step 1: Query Parsing                                          │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ • Extract age, procedure, location                      │   │
│  │ • Parse policy duration                                 │   │
│  │ • Identify entity types                                 │   │
│  │ • Structure raw query                                   │   │
│  └─────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│  Step 2: Document Retrieval                                     │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ • Semantic similarity search                            │   │
│  │ • Clause-level matching                                 │   │
│  │ • Relevance scoring                                     │   │
│  │ • Top-K clause selection                                │   │
│  └─────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│  Step 3: Rule Engine                                            │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ • Waiting period validation                             │   │
│  │ • Coverage eligibility check                            │   │
│  │ • Deterministic decision logic                          │   │
│  │ • Amount calculation                                    │   │
│  └─────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│  Step 4: LLM Reasoning                                          │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ • Context augmentation                                  │   │
│  │ • Natural language explanation                          │   │
│  │ • Confidence scoring                                    │   │
│  │ • Justification generation                              │   │
│  └─────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
```

## 🔗 API Integration Flow

```
Frontend Application
        │
        ▼
┌─────────────────┐    HTTP POST     ┌─────────────────┐
│  HackRX API     │─────────────────▶│   HackRX Server │
│  Service        │                  │  localhost:8000 │
│                 │◀─────────────────│                 │
│ • Bearer Auth   │    JSON Response │ • /api/v1/      │
│ • JSON Payload  │                  │ • /hackrx/run   │
│ • Error Handle  │                  │                 │
└─────────────────┘                  └─────────────────┘
        │
        ▼
┌─────────────────┐    HTTP POST     ┌─────────────────┐
│ Webhook Service │─────────────────▶│ Custom Webhook  │
│                 │                  │   Endpoints     │
│ • Event Payload │                  │                 │
│ • HTTP Headers  │                  │ • User Defined  │
│ • Error Retry   │                  │ • Event Handler │
└─────────────────┘                  └─────────────────┘
```

## 🛠️ Technology Stack

### Frontend Technologies
- **React 18**: Component-based UI framework
- **TypeScript**: Type-safe JavaScript
- **Vite**: Fast build tool and dev server
- **Tailwind CSS**: Utility-first CSS framework
- **shadcn/ui**: Modern component library

### State Management
- **React Hooks**: useState, useEffect for local state
- **TanStack Query**: Server state management
- **Context API**: Global state sharing

### Development Tools
- **ESLint**: Code linting and formatting
- **PostCSS**: CSS processing
- **Autoprefixer**: CSS vendor prefixes
- **TypeScript Compiler**: Type checking

### Build & Deployment
- **Vite Build**: Optimized production builds
- **Tree Shaking**: Dead code elimination
- **Code Splitting**: Lazy loading optimization
- **Asset Optimization**: Image and font optimization

## 📁 File Organization Patterns

### Component Structure
```
ComponentName/
├── ComponentName.tsx      # Main component file
├── ComponentName.test.tsx # Unit tests
├── ComponentName.types.ts # TypeScript interfaces
└── index.ts              # Export file
```

### Service Structure
```
serviceName/
├── serviceName.ts         # Main service implementation
├── serviceName.types.ts   # Type definitions
├── serviceName.test.ts    # Service tests
└── index.ts              # Export file
```

### Hook Structure
```
useHookName/
├── useHookName.ts         # Custom hook implementation
├── useHookName.test.ts    # Hook tests
└── index.ts              # Export file
```

This architecture provides a scalable, maintainable, and performant foundation for the Policy-QA Engine with clear separation of concerns and modern development practices.
