const  {check, validationResult} = require("express-validator")
const validatorTodo = [
    check("title").exists().notEmpty().isLength({min:3, max:24}),
    check("iduser").exists().notEmpty().isNumeric(),
    check("idcategory").exists().notEmpty().isNumeric(),
    check("status").exists().notEmpty().isNumeric(),
    (request, response, next) => {
        try {
            validationResult(request).throw()
            return next()
        } catch(error) {
            response.status(403).send({errors : error.array()})
        }
    }
]
module.exports = validatorTodo