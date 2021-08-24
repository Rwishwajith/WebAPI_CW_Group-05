const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose')

mongoose.connect("mongodb://localhost/Group05-Cartdb", {userNewUrlParser :true, 
useUnifiedTopology:true}).then(() =>console.log("Successfully Connected to the Database"))
.catch((err)=> console.log("Error has occured when connecting to the database"));


app.listen(3000, () =>{
    console.log("Listening on Port 3000")
});