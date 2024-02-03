const mongoose = require("mongoose");

const searchSchema = new mongoose.Schema({
  keyword: {
    type: String,
    required: true
  },
  searchedAt: {
    type: Date,
    required: true
  }
});

module.exports = mongoose.model("Search", searchSchema);