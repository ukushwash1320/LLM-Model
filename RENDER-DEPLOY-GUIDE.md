# Render Deployment Guide

## 🚀 Quick Deployment Steps

### 1. Push to GitHub
```bash
git add .
git commit -m "Fix render deployment configuration"
git push origin main
```

### 2. Create Services on Render

#### Frontend Service (policy-qa-engine)
- **Type**: Web Service
- **GitHub Repo**: Connect your repository
- **Branch**: main
- **Build Command**: `npm install && npm run build`
- **Start Command**: `npx serve -s dist -l 3000`
- **Environment Variables**:
  - `NODE_ENV=production`
  - `VITE_API_BASE_URL=https://policy-qa-api.onrender.com/api/v1`
  - `VITE_API_TOKEN=0694fe814b714926217a3ef7bf24ae3247e2e9daff8434cb8084c0d70a942a9b`

#### API Service (policy-qa-api)
- **Type**: Web Service
- **GitHub Repo**: Same repository
- **Branch**: main
- **Root Directory**: `api`
- **Build Command**: `npm install && npm run build`
- **Start Command**: `npm start`
- **Environment Variables**:
  - `NODE_ENV=production`
  - `PORT=10000`
  - `CORS_ORIGIN=https://policy-qa-engine.onrender.com`

### 3. Deployment with Blueprint (Recommended)

Instead of manual setup, use the `render.yaml` blueprint:

1. Go to Render Dashboard
2. Click "New" → "Blueprint"
3. Connect your GitHub repository
4. Select the repository containing `render.yaml`
5. Click "Apply"

## 🔧 Key Fixes Applied

1. **Fixed API URL**: Changed from self-referencing to correct API service URL
2. **Fixed Start Command**: Frontend now uses `serve` to serve static files
3. **Fixed Port**: API uses port 10000 (Render's default)
4. **Fixed Health Check**: API health check uses `/api/v1/health`
5. **Added Serve Package**: Added `serve` for static file serving

## 📋 Deployment URLs

- **Frontend**: https://policy-qa-engine.onrender.com
- **API**: https://policy-qa-api.onrender.com/api/v1
- **Health Check**: https://policy-qa-api.onrender.com/api/v1/health
- **HackRX Endpoint**: https://policy-qa-api.onrender.com/api/v1/hackrx/run

## 🐛 Common Issues & Solutions

### Build Failures
- Ensure all dependencies are in `package.json`
- Check that build commands match your scripts
- Verify TypeScript compilation succeeds locally

### Health Check Failures
- API must respond to GET requests on health check path
- Ensure server starts on the correct port
- Check CORS configuration

### CORS Errors
- Verify `CORS_ORIGIN` environment variable
- Check that frontend URL matches CORS settings
- Ensure both services are deployed successfully

## ✅ Verification Checklist

Before deployment:
- [ ] `npm run build` succeeds locally
- [ ] `cd api && npm run build` succeeds
- [ ] Health check endpoint responds
- [ ] Environment variables are set correctly
- [ ] CORS is configured properly

After deployment:
- [ ] Frontend loads without errors
- [ ] API health check returns 200
- [ ] CORS allows frontend to call API
- [ ] HackRX endpoint accepts POST requests

---

**Ready to deploy! 🚀**
