const express = require("express");
const dotenv = require("dotenv");
const userRoutes = require("./routes/user.routes");
const taskRoutes = require('./routes/task.routes');
const noteRoutes = require('./routes/note.routes');
const contactRoutes = require('./routes/contact.routes');
const reunionRoutes = require('./routes/reunion.routes');
const db=require("./config/db.js");
const errorHandler = require("./middelwares/errorHandler.js");
// Initialisation
dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;

// Middlewares
app.use(express.json());

// Routes
app.get("/", (req, res) => {
    res.send("API is running...");
});

app.use('/api/users', userRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/notes', noteRoutes);
app.use('/api/contacts', contactRoutes);
app.use('/api/reunions', reunionRoutes);
//middeleware d erreursconst logger = require('morgan');

// Middlewares
app.use(errorHandler);
// Server
app.listen(PORT, async() => {
    await db();
    console.log(`The server is running on: http://localhost:${PORT} in ${process.env.NODE_ENV} Mode`);
});
