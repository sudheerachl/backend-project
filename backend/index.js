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
    else{
    DoctorModel.create(req.body).then((Doctor) => {
      res.json(Doctor);
    })
.catch(err => res.json(err))
  }
})
})

// Doctor Login
app.post('/login-doctor', (req, res) => {
  const { email, password } = req.body;

  DoctorModel.findOne({ email }).then(doctor => {
        if(doctor){
            // If user found then these 2 cases
            if(doctor.password === password) {
                res.json("Success");
            }
            else{
                res.json("Wrong password");
            }
        }
        // If user not found then 
        else{
            res.json("No records found! ");
        }
    })
})

// User Signup
app.post('/signup-usser', (req, res) => {
  const { email, password } = req.body;

  UserrModel.findOne({ email }).then((user) => {
    if (user) {
      res.json('User already registered');
      return;
    }
    else{
    UserModel.create(req.body).then((user) => {
      res.json(user);
    })
.catch(err => res.json(err))
  }
})
})

// User Login
app.post('/login-user', (req, res) => {
  const { email, password } = req.body;

  UserrModel.findOne({ email }).then(user => {
        if(user){
            // If user found then these 2 cases
            if(user.password === password) {
                res.json("Success");
            }
            else{
                res.json("Wrong password");
            }
        }
        // If user not found then 
        else{
            res.json("No records found! ");
        }
    })
})

app.listen(3001, () => {
  console.log('Server listening on http://localhost:3001');
});
