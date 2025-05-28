require("dotenv").config()

const express = require('express')
const mongoose = require('mongoose')
const workoutRoutes = require("./routes/workouts")


// Express app
const app = express()


// Middleware
app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})


// Routes
app.use('/api/workouts/', workoutRoutes)


// connect to DB
mongoose.connect(process.env.MONGO_URI)
    .then(() => {

        // listen for request
        app.listen(process.env.PORT, () => {
            console.log("connected to db & listing to port", process.env.PORT)
        })

    })
    .catch((error) => {
        console.log(error)
    })
