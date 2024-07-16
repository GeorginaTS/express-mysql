const express = require("express");

const {categoriesModel} = require("../models/index")

const getAllCategories = (request, response) => {
    try {
        categoriesModel.getAll()
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

const getByIdCategory = (request, response) => {
    try {
        const {id}= request.params
        categoriesModel.getById(id)
        .then( (data) => {
              response.send(data[0])
        })
        .catch(error => {
            response.send("error")
        })         
    } catch(error) {
        response.send({msg:"Error getByIdCategory", error: error.message})
    }
}

module.exports = {getAllCategories, getByIdCategory }