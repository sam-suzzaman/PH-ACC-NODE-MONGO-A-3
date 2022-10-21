const express = require("express");
const jobRouter = express.Router();

// Controllers
const {
    postingJobHandler,
    getAllJobsOfManager,
    updateAJob,
} = require("../controllers/jobControllers");

// Middlewares
const userAuthMiddleware = require("../middlewares/userAuthMiddleware");
const userAuthorizationHandler = require("../middlewares/userAuthorization");

// Routes

jobRouter.post(
    "/",
    userAuthMiddleware,
    userAuthorizationHandler("HIRING MANAGER"),
    postingJobHandler
);

jobRouter.get(
    "/manager/jobs",
    userAuthMiddleware,
    userAuthorizationHandler("HIRING MANAGER"),
    getAllJobsOfManager
);

jobRouter.patch(
    "/:ID",
    userAuthMiddleware,
    userAuthorizationHandler("HIRING MANAGER"),
    updateAJob
);
module.exports = jobRouter;
