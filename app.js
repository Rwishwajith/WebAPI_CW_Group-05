const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const products = require("./routes/prodcuts");
const app = express();

app.use(express.json());


app.listen(27017, () =>{
    console.log("Listening on Port 5000")
});

mongoose.connect("mongodb://localhost/Group05-Cartdb", {useNewUrlParser :true, 
useUnifiedTopology:true}).then(() =>console.log("Successfully Connected to the Cart Database"))
.catch((err)=> console.log("Error has occured when connecting to the database",err));

