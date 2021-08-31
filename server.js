const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const config = require('config')
const mongoose = require('mongoose')
const path = require('path')

const firebaseService = require("./services/firebase")


const port = process.env.PORT || config.get('app.port') 

app.use(express.json());


app.listen(27017, () =>{
    console.log("Listening on Port 5000")
});

mongoose.connect("mongodb://localhost/Group05-Cartdb", {useNewUrlParser :true, 
useUnifiedTopology:true}).then(() =>console.log("Successfully Connected to the Cart Database"))
.catch((err)=> console.log("Error has occured when connecting to the database",err));

