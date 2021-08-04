const { StatusCodes } = require("http-status-codes");
const job_model = require("../models/Job-model");
const { BadRequestError, NotFoundError } = require("../errors");

const getAllJobs = async (req, res) => {
  const jobs = await job_model
    .find({ createdBy: req.user.user_id })
    .sort("createdAt");
  res.status(StatusCodes.OK).json({ jobs, count: jobs.length });
};

const getSingleJob = async (req, res) => {
  const job = await job_model.findOne({
    _id: req.params.id,
    createdBy: req.user.user_id,
  });
  if (!job) {
    throw new NotFoundError("job not found");
  }
  res.status(StatusCodes.OK).json(job);
};

const createJob = async (req, res) => {
  console.log(req);
  req.body.createdBy = req.user.user_id;
  const job = await job_model.create(req.body);
  res.status(StatusCodes.CREATED).json({ job });
};

const updateJob = async (req, res) => {
  const { company, position } = req.body;
  if (company === "" || position === "") {
    throw new BadRequestError("Fields can't be empty");
  }
  const job = await job_model.findByIdAndUpdate(
    { _id: req.params.id, createdBy: req.user.user_id },
    req.body,
    { new: true, runValidators: true }
  );

  if (!job) {
    throw new NotFoundError(`No job found`);
  }
  res.status(StatusCodes.OK).json({ job });
};

const deleteJob = async (req, res) => {
  const job = await job_model.findByIdAndDelete({
    _id: req.params.id,
    createdBy: req.user.user_id,
  });

  if (!job) {
    throw new NotFoundError(`No job found`);
  }

  res.status(StatusCodes.OK).send("job succesfully deleted");
};

module.exports = { getSingleJob, getAllJobs, createJob, updateJob, deleteJob };
