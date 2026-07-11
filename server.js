require("dotenv").config();

const dns = require("dns");
dns.setServers(["8.8.8.8", "1.1.1.1"]);

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const woodRoutes = require("./routes/woods");
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// =========================
// Middleware
// =========================
app.use(
  cors({
    origin: "https://mywoods-fontend.onrender.com",
    credentials: true,
  })
);

app.use(express.json());

// =========================
// Routes
// =========================
app.use("/api/woods", woodRoutes);
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

// =========================
// Test Route
// =========================
app.get("/", (req, res) => {
  res.json({ message: "Server running ✅" });
});

// =========================
// MongoDB Connection
// =========================
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected");

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB Error:", err.message);
    process.exit(1);
  });