# Policy-QA Engine - Project Structure

## 📁 Project Overview
A LLM-Powered Intelligent Query-Retrieval System for policy analysis with RAG architecture, semantic search, and explainable decision rationale.

## 🏗️ Complete File Structure

```
clause-comprehend-main/
├── 📄 package.json                    # Project dependencies and scripts
├── 📄 package-lock.json               # Dependency lock file
├── 📄 bun.lockb                       # Bun package manager lock file
├── 📄 .env.local                      # Environment variables (API keys, URLs)
├── 📄 .gitignore                      # Git ignore rules
├── 📄 README.md                       # Project documentation
├── 📄 index.html                      # Main HTML entry point
├── 📄 vite.config.ts                  # Vite build configuration
├── 📄 tsconfig.json                   # TypeScript configuration
├── 📄 tsconfig.app.json               # App-specific TypeScript config
├── 📄 tsconfig.node.json              # Node.js TypeScript config
├── 📄 tailwind.config.ts              # Tailwind CSS configuration
├── 📄 postcss.config.js               # PostCSS configuration
├── 📄 eslint.config.js                # ESLint linting configuration
├── 📄 components.json                 # shadcn/ui components configuration
│
├── 📁 public/                         # Static assets
│   ├── 📄 favicon.ico                 # Website favicon
│   ├── 📄 placeholder.svg             # Placeholder images
│   └── 📄 robots.txt                  # SEO robots file
│
└── 📁 src/                           # Source code directory
    ├── 📄 main.tsx                    # React application entry point
    ├── 📄 App.tsx                     # Root React component
    ├── 📄 App.css                     # Global app styles
    ├── 📄 index.css                   # Global CSS with Tailwind
    ├── 📄 vite-env.d.ts              # Vite environment types
    │
    ├── 📁 components/                 # React components
    │   ├── 📄 DocumentUpload.tsx      # File upload & URL input component
    │   ├── 📄 QueryInterface.tsx      # Query input & sample queries
    │   ├── 📄 ResultsDisplay.tsx      # Analysis results visualization
    │   ├── 📄 SystemArchitecture.tsx  # RAG system architecture diagram
    │   ├── 📄 WebhookConfig.tsx       # Webhook configuration interface
    │   │
    │   └── 📁 ui/                     # shadcn/ui component library
    │       ├── 📄 accordion.tsx       # Accordion UI component
    │       ├── 📄 alert-dialog.tsx    # Alert dialog component
    │       ├── 📄 alert.tsx           # Alert notification component
    │       ├── 📄 aspect-ratio.tsx    # Aspect ratio container
    │       ├── 📄 avatar.tsx          # User avatar component
    │       ├── 📄 badge.tsx           # Badge/tag component
    │       ├── 📄 breadcrumb.tsx      # Navigation breadcrumb
    │       ├── 📄 button.tsx          # Button component variants
    │       ├── 📄 calendar.tsx        # Date picker calendar
    │       ├── 📄 card.tsx            # Card container component
    │       ├── 📄 carousel.tsx        # Image/content carousel
    │       ├── 📄 chart.tsx           # Data visualization charts
    │       ├── 📄 checkbox.tsx        # Checkbox input component
    │       ├── 📄 collapsible.tsx     # Collapsible content
    │       ├── 📄 command.tsx         # Command palette component
    │       ├── 📄 context-menu.tsx    # Right-click context menu
    │       ├── 📄 dialog.tsx          # Modal dialog component
    │       ├── 📄 drawer.tsx          # Slide-out drawer
    │       ├── 📄 dropdown-menu.tsx   # Dropdown menu component
    │       ├── 📄 form.tsx            # Form wrapper component
    │       ├── 📄 hover-card.tsx      # Hover tooltip card
    │       ├── 📄 input-otp.tsx       # OTP input component
    │       ├── 📄 input.tsx           # Text input component
    │       ├── 📄 label.tsx           # Form label component
    │       ├── 📄 menubar.tsx         # Top navigation menubar
    │       ├── 📄 navigation-menu.tsx # Navigation menu component
    │       ├── 📄 pagination.tsx      # Page navigation component
    │       ├── 📄 popover.tsx         # Popover tooltip component
    │       ├── 📄 progress.tsx        # Progress bar component
    │       ├── 📄 radio-group.tsx     # Radio button group
    │       ├── 📄 resizable.tsx       # Resizable panels
    │       ├── 📄 scroll-area.tsx     # Custom scrollbar area
    │       ├── 📄 select.tsx          # Dropdown select component
    │       ├── 📄 separator.tsx       # Visual separator line
    │       ├── 📄 sheet.tsx           # Side sheet component
    │       ├── 📄 sidebar.tsx         # Sidebar navigation
    │       ├── 📄 skeleton.tsx        # Loading skeleton component
    │       ├── 📄 slider.tsx          # Range slider component
    │       ├── 📄 sonner.tsx          # Toast notification system
    │       ├── 📄 switch.tsx          # Toggle switch component
    │       ├── 📄 table.tsx           # Data table component
    │       ├── 📄 tabs.tsx            # Tab navigation component
    │       ├── 📄 textarea.tsx        # Multi-line text input
    │       ├── 📄 toast.tsx           # Toast notification component
    │       ├── 📄 toaster.tsx         # Toast container component
    │       ├── 📄 toggle-group.tsx    # Toggle button group
    │       ├── 📄 toggle.tsx          # Toggle button component
    │       ├── 📄 tooltip.tsx         # Tooltip component
    │       └── 📄 use-toast.ts        # Toast hook utilities
    │
    ├── 📁 hooks/                      # Custom React hooks
    │   ├── 📄 use-mobile.tsx          # Mobile device detection hook
    │   └── 📄 use-toast.ts            # Toast notification hook
    │
    ├── 📁 lib/                        # Utility libraries
    │   └── 📄 utils.ts                # Common utility functions
    │
    ├── 📁 pages/                      # Application pages
    │   ├── 📄 Index.tsx               # Main application page
    │   └── 📄 NotFound.tsx            # 404 error page
    │
    └── 📁 services/                   # API and business logic services
        ├── 📄 ragService.ts           # RAG analysis engine service
        ├── 📄 hackrxApi.ts            # HackRX API integration service
        └── 📄 webhookService.ts       # Webhook notification service
```

## 🔧 Configuration Files

### Environment Variables (`.env.local`)
```env
VITE_API_BASE_URL=http://localhost:8000/api/v1
VITE_API_TOKEN=0694fe814b714926217a3ef7bf24ae3247e2e9daff8434cb8084c0d70a942a9b
```

### Package Dependencies
- **Frontend Framework**: React 18 + TypeScript
- **Build Tool**: Vite 5
- **UI Framework**: shadcn/ui + Tailwind CSS
- **State Management**: React hooks + TanStack Query
- **Routing**: React Router DOM
- **Form Handling**: React Hook Form + Zod validation
- **Notifications**: Sonner toast system

## 📋 Key Components Description

### Core Application Components
- **DocumentUpload**: Handles file uploads and document URL input
- **QueryInterface**: Natural language query input with sample queries
- **ResultsDisplay**: Visualization of RAG analysis results
- **SystemArchitecture**: Interactive RAG pipeline diagram
- **WebhookConfig**: Webhook endpoint configuration and testing

### Services Layer
- **ragService**: Mock RAG analysis with query parsing, document retrieval, and LLM reasoning
- **hackrxApi**: Integration with HackRX evaluation API endpoints
- **webhookService**: HTTP webhook notifications for events

### UI Component Library
Complete shadcn/ui component set for consistent design system and accessible UI components.

## 🚀 Build & Development Scripts

```json
{
  "dev": "vite",                    // Start development server
  "build": "vite build",           // Production build
  "build:dev": "vite build --mode development",  // Development build
  "lint": "eslint .",              // Code linting
  "preview": "vite preview"        // Preview production build
}
```

## 🎯 Architecture Highlights

- **RAG Implementation**: Retrieval-Augmented Generation with semantic search
- **API Integration**: HackRX submission endpoint with Bearer authentication
- **Webhook System**: Real-time notifications for analysis events
- **Responsive Design**: Mobile-first Tailwind CSS implementation
- **Type Safety**: Full TypeScript coverage with strict configuration
- **Modern Tooling**: Vite for fast development and optimized builds

This structure provides a scalable, maintainable codebase for the Policy-QA Engine with clear separation of concerns and modern React development practices.
