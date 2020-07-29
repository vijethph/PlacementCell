const mongoose = require('mongoose');
const Schema = mongoose.Schema

// Create Schema
const companySchema = new Schema({
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

var Company = mongoose.model('company', companySchema);
module.exports = Company;
