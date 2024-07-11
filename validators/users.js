const  {check, validationResult} = require("express-validator") 
const jwt = require("jsonwebtoken") 

// this.name = name,
// this.lastname = lastname,
// this.email = email,
// this.password = password,
// this.profile = profile

const validatorUser = [
    check("name").exists().notEmpty().isLength({min:3, max:24}),
    check("lastname").exists().notEmpty().isLength({min:3, max:24}),
    check("email").exists().notEmpty().isEmail(),
    check("password").exists().notEmpty(),
    check("profile").exists().notEmpty(),
    (request, response, next) => {
        try {
            validationResult(request).throw()
            return next()
        } catch(error) {
            response.status(403).send({errors : error.array()})
        }
    }
]

//  MIDDLEWARE 

const authenticateToken = (req, res, next) => {

    // Recibe el token mediante el header authorization
    const authHeader = req.headers['authorization']
  
    // obtiene el token 
    const token = authHeader && authHeader.split(' ')[1]
  
    // Se valida que el token sea enviado en caso contrario manda un error
    if (token == null) return res.status(401).send({msg : 'No token'})
  
    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
  
      // VERIFICAMOS QUE EL TOKEN COINCIDA CON LA CONTRASENA
      if (err) return  res.status(403).send({msg : 'Token invalid'})
      req.token = user
      next()
    })
  }

  module.exports = {validatorUser, authenticateToken }