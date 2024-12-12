const express = require('express');
require('dotenv').config()
const mongoose = require('mongoose')
const userRoute = require('./routes/userRoute')
const productRoute = require('./routes/productRoute')
const cartRoute = require('./routes/cartRoute')


const app = express()
const cors = require('cors')


// Allow CORS from any origin
app.use(cors());

app.use(express.json());
app.use("/users", userRoute)
app.use("/meal", productRoute)
app.use("/cart", cartRoute )





const MONGO_URI = process.env.MONGO_URI
const PORT = process.env.PORT || 5000




mongoose.connect(MONGO_URI).then(() => {
    console.log("database connected")
    app.listen(PORT, () => {
        console.log(`app running on localhost ${PORT}`)
    })
}).catch((error) => {
    console.log(error) 
}) 