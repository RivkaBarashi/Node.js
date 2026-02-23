const express = require("express");
require("dotenv").config();
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");

const app = express();
connectDB();

app.use(express.json()); // חשוב כדי לקרוא JSON מהבקשה

app.use("/auth", authRoutes); // מחברים את ה‑route

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
