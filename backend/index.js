const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const DoctorModel = require('./models/Doctordata');
const UserModel = require('./models/UserData');

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect('mongodb+srv://saisudheera9803:Sai2344557@cluster0.gsisntp.mongodb.net/');

// Doctor Signup
app.post('/signup-doctor', (req, res) => {
  const { username, password } = req.body;

  DoctorModel.findOne({ username }).then((doctorByEmail) => {
    if (doctorByEmail) {
      res.json('Username already registered');
      return;
    }

    DoctorModel.findOne({ email: req.body.email }).then((doctorByEmail) => {
      if (doctorByEmail) {
        res.json('Email already registered');
        return;
      }

      DoctorModel.create(req.body).then((doctor) => {
        res.json(doctor);
      }).catch(err => res.json(err));
    });
  });
});


// Doctor Login
app.post('/login-doctor', (req, res) => {
  const { username, password } = req.body;

  DoctorModel.findOne({ username }).then((doctor) => {
    if (!doctor) {
      // User not found
      res.json('User not found');
      return;
    }

    if (doctor.password === password) {
      // Login successful
      res.json('Success');
    } else {
      // Incorrect password
      res.json('Wrong password');
    }
  });
});
// doctor delete
app.delete('/delete-doctor', async (req, res) => {
  const { password } = req.body;
  const username = req.params.username;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    if (user.password !== password) {
      res.status(400).json({ message: 'Incorrect password' });
      return;
    }

    await User.deleteOne({ username });
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


// User Signup
app.post('/signup-user', (req, res) => {
  const { username, password } = req.body;

  UserModel.findOne({ username }).then((userByEmail) => {
    if (userByEmail) {
      res.json('Username already registered');
      return;
    }

    UserModel.findOne({ email: req.body.email }).then((userByEmail) => {
      if (userByEmail) {
        res.json('Email already registered');
        return;
      }

      UserModel.create(req.body).then((user) => {
        res.json(user);
      }).catch(err => res.json(err));
    });
  });
});


// User Login
app.post('/login-user', (req, res) => {
  const { username, password } = req.body;

  UserModel.findOne({ username }).then(user => {
    if (user) {
      // If user found then these 2 cases
      if (user.password === password) {
        res.json("Success");
      } else {
        res.json("Wrong password");
      }
    }
    // If user not found then
    else {
      res.json("No records found! ");
    }
  });
});

app.listen(3001, () => {
  console.log('Server listening on http://localhost:3001');
});
