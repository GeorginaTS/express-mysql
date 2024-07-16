const express = require("express")
const router =express.Router()

const {getAllStatus , getByIdStatus} = require("../controllers/status")


router.get("/", getAllStatus)
router.get("/:id", getByIdStatus)

module.exports = router