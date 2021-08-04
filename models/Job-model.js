const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: [true, "Company required"],
      maxlength: 25,
    },
    position: {
      type: String,
      required: [true, "Position required"],
      maxlength: 25,
    },
    status: {
      type: String,
      enum: ["interview", "declined", "pending"],
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "User required"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Job", JobSchema);
