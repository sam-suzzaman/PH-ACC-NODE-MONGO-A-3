const express = require("express");
const userRouter = express.Router();

// controllers
const { postNewUser } = require("../controllers/userController");

// Routes
userRouter.post("/signup", postNewUser);

module.exports = userRouter;
