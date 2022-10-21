const express = require("express");
const userRouter = express.Router();

// controllers
const {
    postNewUser,
    userLoginHandler,
} = require("../controllers/userController");

// Routes
userRouter.post("/signup", postNewUser);
userRouter.post("/login", userLoginHandler);

module.exports = userRouter;
