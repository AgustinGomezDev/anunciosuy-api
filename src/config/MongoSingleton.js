const mongoose = require('mongoose')

class MongoSingleton {
    static #instance

    constructor() {
        this.#connectMongoDB()
    }

    static getInstance() {
        if (this.#instance) {
            console.info('There is already a connection with MongoDB');
        } else {
            this.#instance = new MongoSingleton()
        }
        return this.#instance
    }

    #connectMongoDB = async () => {
        try {
            await mongoose.connect(process.env.MONGODB_URI)
            console.info('Successfully connected to MongoDB')
        } catch (err) {
            console.error('Could not connect to MongoDB: ' + err)
            process.exit()
        }
    }
}

module.exports = { MongoSingleton }