const mongoose = require('mongoose');

const DoctorSchema = new mongoose.Schema({
  name: String,
  username: String,
  phoneNumber: String,
  gender: String,
  email: String,
  password: String
});
// Define user schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  gender: { type: String, required: true },
});

// Create user model
const DoctorModel = mongoose.model('Doctor',DoctorSchema);

// Middleware for JWT authentication
const authMiddleware = async (req, res, next) => {
  const token = req.headers['authorization'].split(' ')[1];
  if (!token) {
    return res.status(401).send('Unauthorized');
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decodedToken.userId;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(401).send('Unauthorized');
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).send('Unauthorized');
  }
};



module.exports = DoctorModel;
