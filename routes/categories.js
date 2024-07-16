const express = require("express")
const router =express.Router()

const {getAllCategories , getByIdCategory} = require("../controllers/categories")


router.get("/", getAllCategories)
router.get("/:id", getByIdCategory)

module.exports = router