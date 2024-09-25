const dotenv = require('dotenv')
const { MongoSingleton } = require('./mongoSingleton')

dotenv.config({ path: './.env' })

const mongoInstance = async () => {
    try {
        await MongoSingleton.getInstance()
    } catch (err) {
        console.error(err)
    }
}

module.exports = { mongoInstance }