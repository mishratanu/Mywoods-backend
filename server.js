//npm install.jsonwebtoken

require("dotenv").config();
const dns = require("dns");
dns.setServers(["8.8.8.8", "1.1.1.1"]);

const express = require("express");
const mongoose = require("mongoose");

const woodRoutes = require("./routes/woods");
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth"); // 👈 ADD THIS

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// Middleware
app.use(express.json());

// Routes
app.use("/api/woods", woodRoutes);
app.use("/api/users", userRoutes); // 👈 ADD THIS
app.use("/api/auth", authRoutes);

// Test route
app.get("/", (req, res) => {
    res.send({ message: "Server running ✅" });
});

// Connect DB
mongoose
    .connect(MONGO_URI)
    .then(() => {
        console.log("✅ MongoDB Connected");
        app.listen(PORT, () =>
            console.log(`🚀 Server running on http://localhost:${PORT}`)
        );
    })
    .catch((err) => {
        console.error("❌ MongoDB Error:", err.message);
        process.exit(1);
    });