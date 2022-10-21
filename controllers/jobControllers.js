const JobModel = require("../model/JobModel");

const postingJobHandler = async (req, res) => {
    const jobData = req.body;

    try {
        const job = await JobModel.create(jobData);
        res.status(201).json({
            status: "success",
            data: job,
        });
    } catch (err) {
        console.log(`posting job error is: ${err.message}`);
        res.status(400).json({
            status: "failed",
            message: err.message,
        });
    }
};

const getAllJobsOfManager = async (req, res) => {
    try {
        const loggedInmanagerEmail = req.user[0].email;

        const jobList = await JobModel.find({
            managerEmail: loggedInmanagerEmail,
        });

        res.status(201).json({
            status: "success",
            data: jobList,
        });
    } catch (error) {
        console.log(`getting manager job error is: ${err.message}`);
        res.status(400).json({
            status: "failed",
            message: err.message,
        });
    }
};

const updateAJob = async (req, res) => {
    const jobID = req.params.ID;
    try {
        const updatedJob = await JobModel.findByIdAndUpdate(jobID, req.body, {
            new: true,
            runValidators: true,
        });

        res.status(200).json({
            status: "success",
            data: updatedJob,
        });
    } catch (err) {
        console.log(`getting manager job error is: ${err.message}`);
        res.status(400).json({
            status: "failed",
            message: err.message,
        });
    }
};

module.exports = { postingJobHandler, getAllJobsOfManager, updateAJob };
