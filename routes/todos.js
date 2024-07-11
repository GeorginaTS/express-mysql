const express = require("express")
const router =express.Router()

const {getAllTodos, getByIdTodo, createTodo, deleteTodo, updateTodo} = require("../controllers/todos")
const validatorTodo = require("../validators/todos")

router.get("/", getAllTodos)
router.get("/:id", getByIdTodo)

router.post("/", validatorTodo, createTodo)
router.delete("/:id", deleteTodo)
router.put("/:id", validatorTodo, updateTodo)

module.exports = router


