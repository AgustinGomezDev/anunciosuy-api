const advertModel = require('../models/adverts.models')

class AdvertController {
    get = async (req, res, next) => {
        try {
            const adverts = await advertModel.find()

            if (!adverts || adverts.length < 1) return res.status(404).json({ message: 'No se han encontrado anuncios.' })

            return res.status(200).json({ message: 'Anuncios encontrados.', adverts })
        } catch (error) {
            next(error)
        }
    }

    getById = async (req, res, next) => {
        try {
            const { id } = req.params
            const advert = await advertModel.findOne({ _id: id })

            if (!advert) return res.status(404).json({ message: 'No existe ningún anuncio con esa id.' })

            return res.status(200).json({ message: 'Anuncio encontrado.', advert })
        } catch (error) {
            next(error)
        }
    }

    post = async (req, res, next) => {
        try {
            const { title, description, category, location, price, premium, tags } = req.body

            if (!title || !description || !category || !location || !price) {
                return res.status(400).json({ message: 'Faltan datos para publicar el anuncio.' });
            }

            const advert = {
                title,
                description,
                category,
                location,
                price,
                premium: premium == undefined ? false : premium,
                tags: tags == undefined ? [] : tags,
                userId: req.user._id
            }

            let result = await advertModel.create(advert)
            return res.status(201).json({ message: 'Anuncios publicado correctamente.', advert: result });
        } catch (error) {
            next(error)
        }
    }

    put = async (req, res, next) => {

    }
}

module.exports = new AdvertController()