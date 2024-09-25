const dotenv = require('dotenv')
const { MongoSingleton } = require('./MongoSingleton')

dotenv.config({ path: './.env' })

const mongoInstance = async () => {
    try {
        await MongoSingleton.getInstance()
    } catch (err) {
        console.error(err)
    }
}

module.exports = { mongoInstance }