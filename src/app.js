// ---- Server
const express = require('express')
const config = require('./config/config')
const cors = require('cors')
const cookieParser = require('cookie-parser')

// ---- Router
const mainRouter = require('./routes/index')


const app = express();
const PORT = process.env.PORT || 3000
config.mongoInstance()

app.use(cors({
    origin: ['https://www.anunciosuy.com', 'https://anunciosuy.com', 'http://localhost:5173'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));
app.options('*', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.sendStatus(204);
});

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser());
app.use(mainRouter)

const httpServer = app.listen(PORT, () => {
    console.log('Server running on port: ' + PORT)
})