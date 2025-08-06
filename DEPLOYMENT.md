# Deployment Guide for Policy-QA Engine on Render

## 🚀 Render Deployment Configuration

This project is configured for deployment on Render using the `render.yaml` file.

### 📋 Prerequisites

1. **GitHub Repository**: Push your code to a GitHub repository
2. **Render Account**: Sign up at [render.com](https://render.com)
3. **Environment Variables**: Configure the required environment variables

### 🔧 Deployment Steps

#### 1. Connect Repository to Render

1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click "New +" → "Blueprint"
3. Connect your GitHub repository containing this project
4. Render will automatically detect the `render.yaml` file

#### 2. Environment Variables

The following environment variables are automatically configured in `render.yaml`:

**Frontend Service (`policy-qa-engine`)**:
- `NODE_ENV`: production
- `VITE_API_BASE_URL`: https://policy-qa-engine.onrender.com/api/v1
- `VITE_API_TOKEN`: 0694fe814b714926217a3ef7bf24ae3247e2e9daff8434cb8084c0d70a942a9b

**API Service (`policy-qa-api`)**:
- `NODE_ENV`: production
- `PORT`: 8000
- `CORS_ORIGIN`: https://policy-qa-engine.onrender.com

#### 3. Services Created

1. **Frontend Service**: `policy-qa-engine`
   - Builds and serves the React/Vite frontend
   - URL: `https://policy-qa-engine.onrender.com`

2. **API Service**: `policy-qa-api`
   - Runs the Express.js API server
   - URL: `https://policy-qa-api.onrender.com`

### 🌐 API Endpoints (Production)

Once deployed, your API will be available at:

- **Base URL**: `https://policy-qa-api.onrender.com/api/v1`
- **Health Check**: `GET /api/v1/health`
- **HackRX Endpoint**: `POST /api/v1/hackrx/run`

### 📡 HackRX Integration

The deployed API includes a mock HackRX endpoint that:
- Accepts document URLs and questions
- Returns structured analysis results
- Logs requests for debugging
- Provides proper CORS headers

**Example Request**:
```bash
curl -X POST https://policy-qa-api.onrender.com/api/v1/hackrx/run \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer 0694fe814b714926217a3ef7bf24ae3247e2e9daff8434cb8084c0d70a942a9b" \
  -d '{
    "documents": ["https://example.com/policy.pdf"],
    "questions": ["What is the coverage for knee surgery?"]
  }'
```

### 🔍 Monitoring

- **Build Logs**: Available in Render dashboard
- **Application Logs**: Real-time logs in Render console
- **Health Checks**: Automatic health monitoring
- **Metrics**: CPU, memory, and request metrics

### 🛠 Local Development vs Production

**Local Development**:
- Frontend: `http://localhost:8082`
- API: `http://localhost:8000`

**Production**:
- Frontend: `https://policy-qa-engine.onrender.com`
- API: `https://policy-qa-api.onrender.com`

### 🔄 Deployment Workflow

1. **Push to GitHub**: Render automatically deploys on push to main branch
2. **Build Process**: 
   - Installs dependencies
   - Builds TypeScript/Vite projects
   - Starts production servers
3. **Health Checks**: Ensures services are running properly
4. **Live Updates**: Zero-downtime deployments

### 📊 Performance Considerations

- **Free Tier**: Services may sleep after inactivity
- **Cold Starts**: First request after sleep may be slower
- **Scaling**: Automatic scaling based on traffic
- **CDN**: Static assets served via CDN

### 🔐 Security

- CORS properly configured for cross-origin requests
- Bearer token authentication for HackRX API
- HTTPS enforced in production
- Environment variables secured

### 🎯 Next Steps After Deployment

1. Test all endpoints with the production URLs
2. Update webhook URLs in external services
3. Monitor logs for any deployment issues
4. Test the complete user flow from frontend to API

---

**Note**: Replace the mock HackRX implementation with the actual HackRX API integration once available.
