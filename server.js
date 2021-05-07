const express = require('express')
const app = express()

const Person = require('./models/Person')

require('dotenv').config()

const mongoose = require('mongoose')
mongoose.connect(process.env.DB_URI,{ useUnifiedTopology: true, useNewUrlParser: true , useNewUrlParser: true },(err)=>{
    if (err)
        throw err;

        console.log('db connecte')
})

app.use(express.json());


//Create and Save a Record of a Model
app.post("/newperson", (req, res) => {
    const {name,age,favoriteFoods}=req.body
    const newPerson = new Person({
        name ,
        age ,
        favoriteFoods 
    });
        newPerson
            .save()
            .then((data) => res.status(200).json(data))
            .catch((err) => res.status(400).json(err));
    });





app.listen(5000,()=>{
    console.log('connected...')
})