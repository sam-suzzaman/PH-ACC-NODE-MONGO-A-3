const express = require("express");
const userRouter = express.Router();

// middlewares
const userAuthMiddleware = require("../middlewares/userAuthMiddleware");

// controllers
const {
    postNewUser,
    userLoginHandler,
    getMe,
} = require("../controllers/userController");

// Routes
userRouter.post("/signup", postNewUser);
userRouter.post("/login", userLoginHandler);
userRouter.get("/me", userAuthMiddleware, getMe);

module.exports = userRouter;
