require('dotenv/config')
const express = require('express')
const mongoose = require('mongoose')
const speakeasy = require('speakeasy')
const qrcode = require('qrcode')
const app =  express();

app.use(express.json())
app.use('/', require('./routes/router'))

app.listen(9070, () => {
    console.log('server runnning on port 3000')
})

mongoose.connect(process.env.MONGODB_URL_LOCAL, {
    useNewUrlParser:  true
})
.then(() => console.log("MongoDB connected!"))
.catch((err) => console.log("Connection Failed"))

var secret = speakeasy.generateSecret({
    name: "Gauravs_Authentication"
})

console.log(secret)

qrcode.toDataURL(secret.otpauth_url, (err, data) => {
    console.log(data)
})








