const userModel = require('../models/users.model')
const { createHash, isValidPassword } = require('../utils/bcrypt')
const { createToken, decodeJWT } = require('../utils/jwt')

class UserController {
    register = async (req, res, next) => {
        try {
            const { name, phone, email, password, dateOfBirth } = req.body

            if (!name || !phone || !email || !password || !dateOfBirth) {
                return res.status(400).json({ message: 'Faltan datos para el registro.' });
            }

            const user = await userModel.findOne({ email })
            if (user) return res.status(409).json({ message: 'El correo electrónico ya está en uso.' });

            const newUser = {
                name,
                phone,
                email,
                password: createHash(password),
                dateOfBirth
            }

            let result = await userModel.create(newUser)
            return res.status(201).json({ message: 'Usuario registrado correctamente.', user: result });
        } catch (error) {
            next(error)
        }
    }

    login = async (req, res, next) => {
        try {
            const { email, password } = req.body

            if (!email || !password) return res.status(400).json({ message: 'Faltan datos para iniciar sesión.' });

            const user = await userModel.findOne({ email })
            if (!user) return res.status(409).json({ message: 'No existe un usuario con ese correo electrónico.' });

            if (!isValidPassword(user, password)) return res.status(409).json({ message: 'Contraseña o email inválidos.' });

            const accessToken = createToken(user)
            res.cookie(process.env.JWT_COOKIE_KEY, accessToken, { maxAge: 3600000, httpOnly: false, sameSite: 'none', secure: true})

            return res.status(200).json({ message: 'Sesión iniciada', user, accessToken });
        } catch (error) {
            next(error)
        }
    }

    logout = async (req, res, next) => {
        if(req.cookies[process.env.JWT_COOKIE_KEY]){
            const token = req.cookies[process.env.JWT_COOKIE_KEY]
            const user = decodeJWT(token, process.env.JWT_KEY)
            res.clearCookie(process.env.JWT_COOKIE_KEY)
            return res.status(200).json({ message: 'Sesión cerrada', user, token })
        }else{
            return res.status(200).json({ message: 'No hay una sesión iniciada' })
        }
    }
}

module.exports = new UserController()