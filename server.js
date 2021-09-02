const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const config = require('config')
const mongoose = require('mongoose')
const path = require('path')

const firebaseService = require("./services/firebase")

const port = process.env.PORT || config.get('app.port') 

const app = express()

const authRoute = require('./routes/auth')
const otpRoute = require('./routes/otp')
const productRoute = require('./routes/product')
const vendorRoute = require('./routes/vendor')
const categoryRoute = require('./routes/category')
const orderRoute = require('./routes/order')
const dashboardRoute = require('./routes/dashboard')

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static("client"))

app.use('/api/v1/auth',authRoute)
app.use('/api/v1/otp',otpRoute)
app.use('/api/v1/product',productRoute)
app.use('/api/v1/vendor',vendorRoute)
app.use('/api/v1/category',categoryRoute)
app.use('/api/v1/order',orderRoute)
app.use('/api/v1/dashboard',dashboardRoute)

app.use('/admin',express.static(path.join(__dirname, '/client/index.html')))
app.all('*',(req,res)=>{
  res.sendFile('index.html',{ root: path.join(__dirname, '/client/')})
})

app.listen(port,async()=>{
    console.log("Running on port: "+port)
    try{
        console.log(`mongodb+srv://${config.get("mongodb.user")}:${config.get("mongodb.password")}@${config.get("mongodb.host")}/${config.get("mongodb.database")}?retryWrites=true&w=majority`)

        mongoose.connect(`mongodb+srv://${config.get("mongodb.user")}:${config.get("mongodb.password")}@${config.get("mongodb.host")}/${config.get("mongodb.database")}?retryWrites=true&w=majority`, 
        {useNewUrlParser: true, useUnifiedTopology: true})
        
        console.log("Connected to database")
    }catch(e){
        console.log("Unable to connect to the mongodb database")
    }
})