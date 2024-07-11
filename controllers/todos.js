const express = require("express")
const {todosModel} = require("../models/index")

const getAllTodos = (request, response) => {
    try {
        todosModel.getAll()
        .then( (data) => {
              response.send(data[0])
        })
        .catch(error => {
            response.send("error")
        })         
    } catch(error) {
        response.status(500).send({msg:"Error getAll"})
    }
}
const getByIdTodo = (request, response) => {
    try {
        const {id}= request.params
        todosModel.getById(id)
        .then( (data) => {
              response.send(data[0])
        })
        .catch(error => {
            response.send("error")
        })         
    } catch(error) {
        response.send({msg:"Error getByIdTodo", error})
    }
}
const createTodo = (request, response) => {
    try {
        const {body} = request
        const todo = new todosModel (body.title, body.content, body.status, body.iduser, body.idcategory)
        todo.create()
        .then( (data) => {
              response.send(data)
        })
        .catch(error => {
            response.send({msg:"error", error})
        })         
    } catch(error) {
        response.status(500).send({msg:"Error createTodo", error})
    }
}


const deleteTodo = (request, response) => {
    try {
        const {id}= request.params
        todosModel.delete(id)
        .then( (data) => {
              response.send(data)
        })
        .catch(error => {
            response.send("error")
        })         
    } catch(error) {
        response.send({msg:"Error deleteTodo", error})
    }
}

const updateTodo = (request, response) => {
    try {
        const {id} = request.params
        const {body} = request
        const todo = new todosModel (body.title, body.content, body.status, body.iduser, body.idcategory)
        todo.update(id)
        .then( (data) => {
              response.send(data)
        })
        .catch(error => {
            response.send({msg:"error", error})
        })         
    } catch(error) {
        response.status(500).send({msg:"Error createTodo", error})
    }
}


module.exports = {getAllTodos, getByIdTodo, createTodo, deleteTodo, updateTodo}
