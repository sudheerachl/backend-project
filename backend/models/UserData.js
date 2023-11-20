const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: String,
  username: String,
  phoneNumber: String,
  gender: String,
  email: String,
  password: String,
  diseases: [String]
});

const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;
