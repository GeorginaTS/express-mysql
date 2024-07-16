const express = require("express");

const {statusModel} = require("../models/index")

const getAllStatus = (request, response) => {
    try {
        statusModel.getAll()
        .then( (data) => {
              response.send(data[0])
        })
        .catch(error => {
            response.send("error")
        })         
    } catch(error) {
        response.status(500).send({msg:"Error getAll Status"})
    }
}

const getByIdStatus = (request, response) => {
    try {
        const {id}= request.params
        statusModel.getById(id)
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

module.exports = {getAllStatus, getByIdStatus }