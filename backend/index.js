const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const app = express()
const mongoose = require('mongoose')
const router = require('./routes/user.route') 

mongoose.connect("mongodb://localhost:27017/dealhandle").then(()=>{
    console.log('Mongo Db is connect ')
})
.catch((err)=>{
    console.log('mongo connect to error',err)
})


app.use(express.json());
app.use(cookieParser())
app.use(express.urlencoded({extended:true}))
app.use(cors())

app.use('/api/dealer', router)
app.listen(8080, console.log('servere connected 8080'))