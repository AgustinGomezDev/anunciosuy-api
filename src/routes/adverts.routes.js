const express = require('express')
const AdvertController = require('./../controllers/adverts.controller')
const { authToken } = require('../utils/jwt')

const router = express.Router()

router.get('/adverts', (req, res, next) => {
    try {
        const adverts = AdvertController.get(req, res, next)
    } catch (error) {
        res.status(500).json({
            message: 'Error buscando anuncios.',
            error: error.message
        })
    }
})

router.get('/adverts/:id', (req, res, next) => {
    try {
        const adverts = AdvertController.getById(req, res, next)
    } catch (error) {
        res.status(500).json({
            message: 'Error buscando anuncios.',
            error: error.message
        })
    }
})

router.post('/advert', authToken, (req, res, next) => {
    try {
        const adverts = AdvertController.post(req, res, next)
    } catch (error) {
        res.status(500).json({
            message: 'Error buscando anuncios.',
            error: error.message
        })
    }
})

module.exports = router 