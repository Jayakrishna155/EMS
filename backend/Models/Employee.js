const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  mobileNo: {
    type: String,
    required: true,
  },
  designation: {
    type: String,
    enum: ['HR', 'Manager', 'Sales'], // Only allows these values
    required: true,
  },
  gender: {
    type: String,
    enum: ['M', 'F'], // Male or Female
    required: true,
  },
  courses: {
    type: [String], // Array to support multiple selections
    enum: ['MCA', 'BCA', 'BSC', 'BTECH'],
    required: true,
  },
  imgUpload: {
    type: String, // Path or URL to the uploaded file
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now, // Automatically sets the current time
  },
});

module.exports = mongoose.model('Employee', UserSchema);
