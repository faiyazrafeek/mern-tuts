const express = require('express')
const colors = require('colors')
const dotenv = require('dotenv').config()
const {errorHandler} = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')
const port = process.env.port ||  5000
const goalRoutes = require('./routes/goalRoutes')
const userRoutes = require('./routes/userRoutes')
const otpRoutes = require('./routes/otpRoutes')
const resetPasswordRoutes = require('./routes/resetPasswordRoutes')


connectDB()
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))



app.use('/api/goals', goalRoutes)
app.use('/api/users', userRoutes)
app.use('/api/otp', otpRoutes)
app.use('/api/forgot-password', resetPasswordRoutes)

app.use(errorHandler)

app.listen(port, ()=> console.log(`Server started on port ${port}`))