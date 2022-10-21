const mongoose = require("mongoose");

const JobSchema = mongoose.Schema({
    managerEmail: {
        type: String,
        required: [true, "Hiring Manager's email is requried"],
        trim: true,
    },
    title: {
        type: String,
        required: [true, "Job must have a title"],
        unique: [true, "Job title must be unique"],
        trim: true,
        minLenght: [3, "Job title is two short"],
        maxLength: [150, "Job title is too long"],
    },
    description: {
        type: String,
        required: [true, "Job must have a description"],
        minLenght: [20, "Job title is two short"],
    },
});

const JobModel = mongoose.model("Job", JobSchema);
module.exports = JobModel;
