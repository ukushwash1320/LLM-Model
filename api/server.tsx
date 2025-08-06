import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import path from "path";

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(bodyParser.json());

// Webhook endpoint
app.post("/api/v1/hackrx/run", (req, res) => {
  console.log("Webhook data:", req.body);
  res.json({ status: "success", data: req.body });
});

// Serve Vite frontend
app.use(express.static(path.join(__dirname, "../dist")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../dist/index.html"));
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
