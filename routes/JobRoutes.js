const express = require("express");
const jobRouter = express.Router();

// Controllers
const {
    postingJobHandler,
    getAllJobsOfManager,
    updateAJob,
    getAllPostedJobs,
    getJobByID,
    getsingleJob,
} = require("../controllers/jobControllers");

// Middlewares
const userAuthMiddleware = require("../middlewares/userAuthMiddleware");
const userAuthorizationHandler = require("../middlewares/userAuthorization");

// Routes For=Hiring Manager

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
jobRouter.get(
    "/manager/jobs/:ID",
    userAuthMiddleware,
    userAuthorizationHandler("HIRING MANAGER"),
    getsingleJob
);

jobRouter.patch(
    "/:ID",
    userAuthMiddleware,
    userAuthorizationHandler("HIRING MANAGER"),
    updateAJob
);

// Rotes For=Candidate
jobRouter.get(
    "/",
    userAuthMiddleware,
    userAuthorizationHandler("CANDIDATE"),
    getAllPostedJobs
);
jobRouter.get(
    "/:ID",
    userAuthMiddleware,
    userAuthorizationHandler("CANDIDATE"),
    getJobByID
);
module.exports = jobRouter;
