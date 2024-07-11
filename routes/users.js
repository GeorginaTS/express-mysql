const express = require("express")
const router =express.Router()

const {getAllUsers, getByIdUser, createUser, deleteUser, updateUser, loginUser} = require("../controllers/users")
//const validatorUser = require("../validators/Users")

router.get("/", getAllUsers)
router.get("/:id", getByIdUser)

router.post("/", createUser)
router.delete("/:id", deleteUser)
router.put("/:id", updateUser)

router.post("/login", loginUser)

module.exports = router