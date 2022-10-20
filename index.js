const express = require("express");
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json()); // json parsing
require("dotenv").config(); // dotenv

// Cors
const cors = require("cors");
app.use(cors());

// Routers handlers/middlewares import

// Utilites import

// Database Connection

// main routes

// default route
app.get("/", (req, res) => {
    res.send("Server is Running");
});

app.listen(port, () => {
    console.log(`Listening at port: http://localhost:${port}/`);
});
