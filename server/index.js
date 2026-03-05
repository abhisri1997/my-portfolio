const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const githubRoutes = require("./routes/github");
const profileRoutes = require("./routes/profile");

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(
  cors({
    origin: "*",
    methods: ["GET"],
  }),
);
app.use(express.json());

// Routes
app.use("/api/github", githubRoutes);
app.use("/api/profile", profileRoutes);

// Health check
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`Portfolio API server running on http://localhost:${PORT}`);
});
