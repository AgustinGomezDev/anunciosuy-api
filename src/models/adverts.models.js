const mongoose = require('mongoose')

const collection = 'adverts'

const advertSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        require: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    state: {
        type: String,
        enum: ['active', 'inactive', 'paused', 'deleted', 'sold'],
        default: 'active',
        required: true
    },
    premium: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
    views: {
        type: Number,
        default: 0
    },
    tags: {
        type: [String],
        default: []  
    },
    rating: {
        score: { type: Number, min: 0, max: 5, default: 0 },
        totalRatings: { type: Number, default: 0 }, // absolute valuation
        numberOfRatings: { type: Number, default: 0 } // number of reviews
    }
})

const advertModel = mongoose.model(collection, advertSchema)

module.exports = advertModel