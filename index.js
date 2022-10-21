const express = require("express");
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json()); // json parsing
require("dotenv").config(); // dotenv

// Cors
const cors = require("cors");
app.use(cors());

// Routers handlers/middlewares import
const userRouter = require("./routes/userRoutes");
const jobRouter = require("./routes/JobRoutes");

// Utilites import

// Database Connection
const DBConnectionHandler = require("./utilities/DBConnectionHandler");
DBConnectionHandler();

// main routes
app.use("/user", userRouter);
app.use("/jobs", jobRouter);

// default route
app.get("/", (req, res) => {
    res.send("Server is Running");
});

app.listen(port, () => {
    console.log(`Listening at port: http://localhost:${port}/`);
});
