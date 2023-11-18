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
      res.status(200).json({message : 'User not found'});
      return;
    }

    if (doctor.password === password) {
      // Login successful
      res.json('Success');
    } else {
      // Incorrect password
      res.status(200).json({message : 'Wrong password'});
    }
  });
});
// doctor delete
app.delete('/delete-doctor', async (req, res) => {
  const { username, password } = req.body;

  const doctor = await DoctorModel.findOne({ username });

  if (!doctor || doctor.password !== password) {
    if (!doctor) {
      res.status(200).json({ message: 'Doctor not found' });
    } else {
      res.status(200).json({ message: 'Incorrect password' });
    }
    return;
  }

  // Delete the doctor
  await DoctorModel.deleteOne({ _id: doctor._id });

  res.status(200).json({ message: 'Doctor deleted successfully' });
});







//doctor-update
app.post('/update-doctor', async (req, res) => {
  const { username, password, phoneNumber, gender, email, name } = req.body;

  try {
    const doctor = await DoctorModel.findOne({ username });

    if (!doctor) {
      // Doctor not found
      return res.status(404).json({ message: 'Doctor not found' });
    }

    if (doctor.password === password) {
      const updatedDoctor = await DoctorModel.findOneAndUpdate(
        { username },
        { phoneNumber, gender, email, name },
        { new: true }
      );

      if (!updatedDoctor) {
        return res.status(404).json({ message: 'Doctor not found' });
      }

      return res.status(200).json({ message: 'Doctor information updated successfully' });
    } else {
      // Incorrect password
      return res.status(400).json({ message: 'Incorrect password' });
    }
  } catch (error) {
    console.error('Error updating doctor information:', error);
    return res.status(500).json({ message: 'Internal server error' });
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

  UserModel.findOne({ username }).then((user) => {
    if (!user) {
      // User not found
      res.status(200).json({message : 'User not found'});
      return;
    }

    if (user.password === password) {
      // Login successful
      res.json('Success');
    } else {
      // Incorrect password
      res.status(200).json({message : 'Wrong password'});
    }
  });
});
//User Delete.
app.delete('/delete-user', async (req, res) => {
  const { username, password } = req.body;

  const user = await UserModel.findOne({ username });

  if (!user || user.password !== password) {
    if (!user) {
      res.status(200).json({ message: 'User not found' });
    } else {
      res.status(200).json({ message: 'Incorrect password' });
    }
    return;
  }

  // Delete the user
  await UserModel.deleteOne({ _id: user._id });

  res.status(200).json({ message: 'User deleted successfully' });
});


app.listen(process.env.PORT || 3000, () => {
  console.log('Server started on port 3000');
});

