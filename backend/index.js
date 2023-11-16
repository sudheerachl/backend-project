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
app.delete('/delete-doctor', (req, res) => {
  const { username, password } = req.body;

  DoctorModel.findOne({ username }).then((doctor) => {
    if (!doctor) {
      // User not found
      res.json('User not found');
      return;
    }

    if (doctor.password === password) {
      // Delete the doctor
      DoctorModel.deleteOne({ _id: doctor._id }).then(() => {
        res.json('Deleted successfully');
      }).catch((err) => {
        res.json('Error deleting doctor');
      });
    } else {
      // Incorrect password
      res.json('Wrong password');
    }
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
app.delete('/delete-doctor', (req, res) => {
  const { username, password } = req.body;

  DoctorModel.findOne({ username }).then((doctor) => {
    if (!doctor) {
      // User not found
      res.json('User not found');
      return;
    }

    if (doctor.password === password) {
      // Delete the doctor
      DoctorModel.deleteOne({ _id: doctor._id }).then(() => {
        res.json('Deleted successfully');
      }).catch((err) => {
        res.json('Error deleting doctor');
      });
    } else {
      // Incorrect password
      res.json('Wrong password');
    }
  });
});
//doctor-update
app.post('/login-doctor', (req, res) => {
  const { username, password,phoneNumber,gender,email,name  } = req.body;

  DoctorModel.findOne({ username }).then((doctor) => {
    if (!doctor) {
      // User not found
      res.json('User not found');
      return;
    }

    if (doctor.password === password) {
       UserModel.findOneAndUpdate({ username }, { phoneNumber, gender, email, name }, { new: true }).then((updatedDoctor) => {
          if (!updatedDoctor) {
            res.status(404).json({ message: 'Doctor not found' });
            return;
          }

          res.status(200).json({ message: 'Doctor information updated successfully' });
        }).catch((err) => {
          console.error('Error updating user information:', err);
          res.status(500).json({ message: 'Internal server error' });
        });
      }
      res.json('Success');
    } else {
      // Incorrect password
      res.json('Wrong password');
    }
  });
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
//User Delete.
app.delete('/delete-user', (req, res) => {
  const { username, password } = req.body;

  UserModel.findOne({ username }).then((user) => {
    if (!user) {
      // User not found
      res.json('User not found');
      return;
    }

    if (user.password === password) {
      // Delete the doctor
      UserModel.deleteOne({ _id: user._id }).then(() => {
        res.json('Deleted successfully');
      }).catch((err) => {
        res.json('Error deleting doctor');
      });
    } else {
      // Incorrect password
      res.json('Wrong password');
    }
  });
});


app.listen(3001, () => {
  console.log('Server listening on http://localhost:3001');
});
