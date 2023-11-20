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
// view doctor
app.get('/info-doctor/:username', async (req, res) => {
  try {
    const username = req.params.username;
    const doctor = await DoctorModel.findOne({ username });

    if (!doctor) {
      return res.status(404).send({ message: 'User not found' });
    }

    res.json({
      username: doctor.username,
      email: doctor.email,
      name: doctor.name,
      gender: doctor.gender,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Internal server error' });
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
//user-update
app.post('/update-user', async (req, res) => {
  const { username, password, phoneNumber, gender, email, name } = req.body;

  try {
    const user = await UserModel.findOne({ username });

    if (!user) {
      // User not found
      return res.status(404).json({ message: 'Doctor not found' });
    }

    if (user.password === password) {
      const updatedUser = await UserModel.findOneAndUpdate(
        { username },
        { phoneNumber, gender, email, name },
        { new: true }
      );

      if (!updateduser) {
        return res.status(404).json({ message: 'Doctor not found' });
      }

      return res.status(200).json({ message: 'User information updated successfully' });
    } else {
      // Incorrect password
      return res.status(400).json({ message: 'Incorrect password' });
    }
  } catch (error) {
    console.error('Error updating user information:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});
// view user
app.get('/info-user/:username', async (req, res) => {
  try {
    const username = req.params.username;
    const user = await UserModel.findOne({ username });

    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }

    res.json({
      username: user.username,
      email: user.email,
      name: user.name,
      gender: user.gender,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Internal server error' });
  }
});
app.post('/addDisease', async (req, res) => {
  try {
    const { username, disease } = req.body;

    // Check if the user exists
    let user = await UserModel.findOne({ username });

    if (!user) {
      return res.status(200).json({ message: 'User not found' });
    }

    // Check if the disease already exists for the user
    if (user.diseases.includes(disease)) {
      return res.status(200).json({ message: 'Disease already exists for this user' });
    }

    // Add the new disease to the existing user's diseases
    user.diseases.push(disease);
    await user.save();
    res.json({ message: 'Disease added successfully' });
  } catch (error) {
    console.error('Error adding disease:', error);
    res.status(500).send('Internal Server Error');
  }
});
// getting diseases
app.get('/getDiseases/:username', async (req, res) => {
  try {
    const username = req.params.username;
    const user = await UserModel.findOne({ username });

    if (!user) {
      return res.status(200).json({ message: 'User not found' });
    }

    // Send the diseases array to the frontend
    res.json({message: 'Diseases fetched successfully', diseases: user.diseases });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Internal server error' });
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log('Server started on port 3000');
});

