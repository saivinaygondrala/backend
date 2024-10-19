const mongoose = require("mongoose");

const journalSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
    },
    title: {
      type: String,
      required: true,
      minlength: [20, "Title must be at least 20 characters long"],
    },
    content: {
      type: String,
      required: true,
      minlength: [200, "Content must be at least of 200 characters long"],
    },
    abstract: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    conclusion: {
      type: String,
      required: true,
    },
    references: {
      type: [String],
      required: false,
    },
    authors: {
      type: [String],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Journal = mongoose.model("Journal", journalSchema);

module.exports = Journal;
