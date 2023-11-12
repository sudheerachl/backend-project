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
  const { email, password } = req.body;

  DoctorModel.findOne({ email }).then((doctor) => {
    if (doctor) {
      res.json('Doctor already registered');
      return;
    }

    DoctorModel.create(req.body).then((newDoctor) => {
      res.json(newDoctor);
    }).catch((err) => {
      res.json(err);
    });
  });
});

// Doctor Login
app.post('/login-doctor', (req, res) => {
  const { email, password } = req.body;

  DoctorModel.findOne({ email }).then((doctor) => {
    if (!doctor) {
      res.json('Doctor not found');
      return;
    }

    if (doctor.password === password) {
      res.json('Login successful');
    } 
    else if(doctor.password != password && doctor){
      res.json('Incorrect password');}
      // Corrected error: Check if user e]xists before printing error message
      else {
        console.error('User does not exist');
      }
    }
  });
});

// User Signup
app.post('/signup-user', (req, res) => {
  const { email, password } = req.body;

  UserModel.findOne({ email }).then((user) => {
    if (user) {
      res.json('User already registered');
      return;
    }

    UserModel.create(req.body).then((newUser) => {
      res.json(newUser);
    }).catch((err) => {
      res.json(err);
    });
  });
});

// User Login
app.post('/login-user', (req, res) => {
  const { email, password } = req.body;

  UserModel.findOne({ email }).then((user) => {
    if (!user) {
      res.json('User not found');
      return;
    }

    if (user.password === password) {
      res.json('Login successful');
    } else {
      // Corrected error: Check if user exists before printing error message
      if (user) {
        res.json('Incorrect password');
      } else {
        console.error('User does not exist');
      }
    }
  });
});

app.listen(3001, () => {
  console.log('Server listening on http://localhost:3001');
});
