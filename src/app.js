// ---- Server
const express = require('express')
const config = require('./config/config')
const cors = require('cors')
const cookieParser = require('cookie-parser')

// ---- Router
const mainRouter = require('./routes/index')


const app = express();

const PORT = 8080

const httpServer = app.listen(PORT, () => {
    console.log('Server running on port: ' + PORT)
})

config.mongoInstance()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:4173'],
    credentials: true
}))
app.use(cookieParser());

app.use(mainRouter)