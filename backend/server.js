const express = require("express");
const dotenv = require("dotenv");

// Initialisation
dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;

// Middlewares
app.use(express.json());

// Routes
app.get("/", (req, res) => {
    res.json("API is running...");
});

// Server
app.listen(PORT, () => {
    console.log(`The server is running on: http://localhost:${PORT} in ${process.env.NODE_ENV} Mode`);
});
