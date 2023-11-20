const mongoose = require('mongoose');

const DoctorSchema = new mongoose.Schema({
  name: String,
  username: String,
  phoneNumber: String,
  gender: String,
  email: String,
  password: String,
  diseases: [String]
});

// Create model
const DoctorModel = mongoose.model('Doctor',DoctorSchema);

module.exports = DoctorModel;
