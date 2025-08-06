import express, { Request, Response } from "express";
import path from "path";
import cors from "cors";
import bodyParser from "body-parser";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const app = express();
const PORT = process.env.PORT || 10000;

// Get __dirname equivalent for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// CORS configuration for production
const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? process.env.CORS_ORIGIN || 'https://policy-qa-engine.onrender.com'
    : ['http://localhost:3000', 'http://localhost:8080', 'http://localhost:8081', 'http://localhost:8082'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Bearer']
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

// Health check endpoint
app.get('/api/v1/health', (req: Request, res: Response) => {
  res.json({ 
    status: 'healthy', 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// HackRX API Endpoint
app.post("/api/v1/hackrx/run", (req: Request, res: Response) => {
  const { documents, questions } = req.body;
  
  // Log the received data (for debugging)
  console.log('Received HackRX submission:', { 
    documents: documents?.length || 0, 
    questions: questions?.length || 0 
  });
  
  // Mock response matching HackRX API format
  const mockResponse = {
    status: "success",
    message: "Analysis completed successfully",
    timestamp: new Date().toISOString(),
    data: {
      answers: questions?.map((question: string, index: number) => ({
        question,
        answer: `Mock analysis result for question ${index + 1}`,
        confidence: 0.85 + Math.random() * 0.1,
        processing_time_ms: Math.floor(Math.random() * 1000) + 500
      })) || []
    }
  };
  
  res.json(mockResponse);
});

// Serve static files from the frontend build
if (process.env.NODE_ENV === 'production') {
  // In production, serve the built frontend
  const frontendPath = path.join(__dirname, '../../dist');
  app.use(express.static(frontendPath));
  
  app.get("/", (req: Request, res: Response) => {
    res.sendFile(path.join(frontendPath, "index.html"));
  });
} else {
  // In development, just provide a simple response
  app.get("/", (req: Request, res: Response) => {
    res.json({ 
      message: "Policy-QA Engine API Server", 
      endpoints: ["/api/v1/health", "/api/v1/hackrx/run"],
      environment: "development"
    });
  });
}

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
