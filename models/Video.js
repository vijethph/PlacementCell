const mongoose = require('mongoose');
const Schema = mongoose.Schema

// Create Schema
const videoSchema = new Schema({
  topic: {
    type: String,
    required:true
  },
  subtopic: {
    type: String,
    required: true,
  },
  link: {
      type: String,
      required: true
  }
})

var Video = mongoose.model('video', videoSchema);
module.exports = Video;