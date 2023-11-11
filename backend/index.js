const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const DoctorModel = require ('./models/Doctordata');
const UserModel = require ('./models/UserData');


const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect('mongodb+srv://saisudheera9803:Sai2344557@cluster0.gsisntp.mongodb.net/');

app.post('/signup-doctor', (req, res)=>{
    // To post / insert data into database...

    const {email, password} = req.body;
    DoctorModel.findOne({email: email})
    .then(user => {
        if(user){
            res.json("Already registered")
        }
        else{
            DoctorModel.create(req.body)
            .then(doctor => res.json(doctor))
            .catch(err => res.json(err))
        }
    })
    
})

app.post('/login-doctor', (req, res)=>{
    // To find record from the database
    const {email, password} = req.body;
    DoctorModel.findOne({email: email})
    .then(user => {
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
app.post('/signup-user', (req, res)=>{
    // To post / insert data into database...

    const {email, password} = req.body;
   UserModel.findOne({email: email})
    .then(user => {
        if(user){
            res.json("Already registered")
        }
        else{
            UserModel.create(req.body)
            .then(doctor => res.json(doctor))
            .catch(err => res.json(err))
        }
    })
    
})

app.post('/login-user', (req, res)=>{
    // To find record from the database
    const {email, password} = req.body;
    UserModel.findOne({email: email})
    .then(user => {
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
    console.log("Server listining on http://127.0.0.1:3001");

});
