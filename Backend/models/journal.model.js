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
      required: false, // Omit this field if references are optional
    },
    authors: {
      type: [String], // Simple array of strings for author names
      required: true,
    },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt
  }
);

const Journal = mongoose.model("Journal", journalSchema);

module.exports = Journal;
