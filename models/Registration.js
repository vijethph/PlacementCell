const mongoose = require('mongoose');
const { Timestamp } = require('mongodb');
const Schema = mongoose.Schema

// Create Schema
const registrationSchema = new Schema({
  company_name: {
    type: String,
    required:true
  },
  category: {
    type: String,
    required: true,
  },
  branch: {
      type: String,
      required: true
  },
  eligibility: {
      min_cgpa: {
          type: Number
      },
      backlog: {
          type: Number
      }
  },
  ctc: {
      type: String,
      required: true
  },
  date_open: {
    type: Date,
    default: Date.now
  },
  date_close: {
      type: Date,
      required: true
  },
  link: {
      type: String,
      required: true
  }
})

var Registration = mongoose.model('Registration', registrationSchema);
module.exports = Registration;
