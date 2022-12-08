const mongoose = require("mongoose");

const bookSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please give title"],
    trim: true,
    maxLength: 20,
  },
  author: {
    type: String,
    required: [true, "Please provide Author name"],
    trim: true,
    maxLength: 20,
  },
  publication: {
    type: String,
    trim: true,
    default: "Unknown",
    maxLength: 20,
  },
  year: {
    type: Number,
  },
});

module.exports = mongoose.model("Books", bookSchema);
