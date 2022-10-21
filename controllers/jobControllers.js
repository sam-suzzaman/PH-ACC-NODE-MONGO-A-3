const JobModel = require("../model/JobModel");
const UserModel = require("../model/UserModel");

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

// Candidates handlers
const getAllPostedJobs = async (req, res) => {
    let { sort, filter } = req.query;

    if (sort) {
        const queryText = Object.values(req.query)[0];
        const sort = {};
        sort[queryText] = -1;

        try {
            const data = await JobModel.aggregate([{ $sort: sort }]);

            res.status(201).json({
                status: "success",
                data: data,
            });
        } catch (error) {
            res.status(404).json({
                status: "failed",
                message: error.message,
            });
        }
    } else if (filter) {
        let fieldsCollection = filter.split(",").join(" ");

        const filteredJobs = await JobModel.find({}).select(fieldsCollection);

        try {
            res.status(201).json({
                status: "success",
                data: filteredJobs,
            });
        } catch (error) {
            res.status(404).json({
                status: "failed",
                message: error.message,
            });
        }
    } else {
        try {
            const postedJobs = await JobModel.find({});
            res.status(200).json({
                status: "success",
                data: postedJobs,
            });
        } catch (err) {
            console.log(`getting all posted job error is: ${err.message}`);
            res.status(400).json({
                status: "failed",
                message: err.message,
            });
        }
    }
};

const getJobByID = async (req, res) => {
    const jobID = req.params.ID;
    try {
        const singleJob = await JobModel.findById(jobID);
        // fetch hiring manager
        const hiringManager = singleJob.managerEmail;
        const managerInfo = await UserModel.find({
            email: hiringManager,
        }).select("email role firstName lastName -_id");

        res.status(200).json({
            status: "success",
            jobData: singleJob,
            managerInfo,
        });
    } catch (err) {
        console.log(`getting all posted job error is: ${err.message}`);
        res.status(400).json({
            status: "failed",
            message: err.message,
        });
    }
};

const getsingleJob = async (req, res) => {
    const jobID = req.params.ID;
    try {
        const singleJob = await JobModel.findById(jobID);
        res.status(200).json({
            status: "success",
            jobData: singleJob,
        });
    } catch (err) {
        console.log(`getting all posted job error is: ${err.message}`);
        res.status(400).json({
            status: "failed",
            message: err.message,
        });
    }
};

module.exports = {
    postingJobHandler,
    getAllJobsOfManager,
    updateAJob,
    getAllPostedJobs,
    getJobByID,
    getsingleJob,
};
