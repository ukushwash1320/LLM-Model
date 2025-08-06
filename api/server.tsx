import express from "express";
import path from "path";
import cors from "cors";
import bodyParser from "body-parser";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const app = express();
const PORT = process.env.PORT || 8000;

// Get __dirname equivalent for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(cors());
app.use(bodyParser.json());

// Serve Vite frontend
const __dirname1 = path.resolve();
app.use(express.static(path.join(__dirname1, "dist")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname1, "dist", "index.html"));
});

// API Endpoint
app.post("/api/v1/hackrx/run", (req, res) => {
  res.json({ status: "success", message: "Webhook received!" });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
