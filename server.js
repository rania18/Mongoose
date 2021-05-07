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
    

//Use model.find() to Search Your Database
Person.find((err,data)=>{
    if (err) {
        err
    }else{
        console.log(data)
    } 
})

//Use model.findOne() to Return a Single Matching Document from Your Database
Person.findOne({favouriteFoods:{$in:['rouz']}})
.then((data)=>console.log(data))
.catch((err)=>console.log(err))

//Use model.findById() to Search Your Database By _id
Person.findById('6094af369903b13eb86ce5e2', (error ,data)=>{
    if (error) {
        console.log(error)
    } else {
        console.log(data)
    }
})

//Perform Classic Updates by Running Find, Edit, then Save
Person.findOne({name:'rania'},(error ,data)=>{
    if (error) {
        console.log(error)
    }else {
        data.favoriteFoods.push('hamburger')
        console.log(data)
    }
})

//Perform New Updates on a Document Using model.findOneAndUpdate()
Person.findOneAndUpdate({name : 'hatem'}, {age : 20}, (error ,data)=>{
    if (error) {
        console.log(error)
    }else {
        console.log(data)
    }
})

//Delete One Document Using model.findByIdAndRemove
Person.findOneAndRemove({name:'ibrahim'},(error ,data)=>{
    if (error) {
        console.log(error)
    }else {
        console.log(data)
    }
})

//MongoDB and Mongoose - Delete Many Documents with model.remove()
var removeManyPeople = function (done){
    var nameToRemove="Mary";
    Person.remove({name : nameToRemove }, (error , JSONstatus) =>(error ,data)=>{
    if (error) {
        console.log(error)
    } else {
    console.log(null , JSONstatus)
    }
})}

//Chain Search Query Helpers to Narrow Search Results
Person.find({favoriteFoods:{$all:['burritos']}})
.select('-age')
.limit(2)
.sort({name :'asc' })
.exec((error,data)=>{
    if(!error){
        console.log(data)
    }
})

app.listen(5000,()=>{
    console.log('connected...')
})