// ---- Server
const express = require('express')
const config = require('./config/config')
const cors = require('cors')
const cookieParser = require('cookie-parser')

// ---- Router
const mainRouter = require('./routes/index')


const app = express();

const PORT = process.env.PORT

const httpServer = app.listen(PORT, () => {
    console.log('Server running on port: ' + PORT)
})

config.mongoInstance()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors({
    origin: [process.env.LOCALHOST_CORS, 'https://www.anunciosuy.com', 'https://anunciosuy.com'],
    credentials: true
}))
app.options('*', cors({
    origin: [process.env.LOCALHOST_CORS, 'https://www.anunciosuy.com', 'https://anunciosuy.com'],
    credentials: true
}));

app.use(cookieParser());

app.use(mainRouter)