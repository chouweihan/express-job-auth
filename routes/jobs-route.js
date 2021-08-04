const express = require("express");
const router = express.Router();
const {
  getSingleJob,
  getAllJobs,
  createJob,
  updateJob,
  deleteJob,
} = require("../controllers/jobs-controller");

router.post("/", createJob);
router.get("/", getAllJobs);
router.get("/:id", getSingleJob);
router.patch("/:id", updateJob);
router.delete("/:id", deleteJob);

module.exports = router;
