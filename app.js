const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const products = require("./routes/prodcuts");
const app = express();

app.use(express.json());


app.listen(3000, () =>{
    console.log("Listening on Port 3000")
});

mongoose.connect("mongodb://localhost/Group05-Cartdb", {useNewUrlParser :true, 
useUnifiedTopology:true}).then(() =>console.log("Successfully Connected to the Database"))
.catch((err)=> console.log("Error has occured when connecting to the database",err));



