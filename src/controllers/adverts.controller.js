const advertModel = require('../models/adverts.models')

class AdvertController {
    get = async (req, res, next) => {
        try {
            const limit = parseInt(req.query.limit) || 20
            const category = req.query.category || null
            const location = req.query.location || null
            const query = req.query.query || null
            const page = parseInt(req.query.page) || 1;
            const sortBy = req.query.sortBy || 'createdAt';
            const sortOrder = req.query.sortOrder === 'desc' ? -1 : 1;

            const filter = {}
            const skip = (page - 1) * limit

            if (category) filter.category = category
            if (location) filter.location = location
            if (query) {
                const searchWords = query.split(/\s+/).filter(Boolean);
                const searchRegex = searchWords.map(word => new RegExp(word, 'i'));

                filter.$or = [
                    { title: { $in: searchRegex } },
                    { description: { $in: searchRegex } }
                ];
            }

            const adverts = await advertModel.find(filter)
                .sort({ [sortBy]: sortOrder })
                .limit(limit)
                .skip(skip)

            const totalAdverts = await advertModel.countDocuments(filter)

            if (!adverts || adverts.length < 1) return res.status(404).json({ message: 'No se han encontrado anuncios.' })

            return res.status(200).json({ message: 'Anuncios encontrados.', adverts, totalAdverts, totalPages: Math.ceil(totalAdverts / limit), currentPage: page })
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

            if (!title || !description || !category || !location) {
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