const mongoose = require('mongoose');

const DoctorSchema = new mongoose.Schema({
    name : String,
    email: String,
    password: String
})

const DoctorModel = mongoose.model('Doctor',DoctorSchema);

module.exports = DoctorModel;
