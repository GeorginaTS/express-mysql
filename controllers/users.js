const express = require("express");
const { usersModel } = require("../models/index");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")


const getAllUsers = (request, response) => {
  try {
    usersModel
      .getAll()
      .then((data) => {
        response.send(data[0]);
      })
      .catch((error) => {
        response.send("error");
      });
  } catch (error) {
    response.status(500).send({ msg: "Error getAll" });
  }
};
const getByIdUser = (request, response) => {
  try {
    const { id } = request.params;
    usersModel
      .getById(id)
      .then((data) => {
        response.send(data[0]);
      })
      .catch((error) => {
        response.send("error");
      });
  } catch (error) {
    response.send({ msg: "Error getByIdUser", error });
  }
};
const createUser = (request, response) => {
  try {
    const { body } = request;
    const saltRounds = 10;
    bcrypt.genSalt(saltRounds, function (err, salt) {
      bcrypt.hash(body.password, salt, function (err, hash) {
        const user = new usersModel(
          body.name,
          body.lastname,
          body.email,
          hash,
          body.profile
        );
        user
          .create()
          .then((data) => {
            response.send(data);
          })
          .catch((error) => {
            response.send({ msg: "error", error });
          });
      });
    });
  } catch (error) {
    response.status(500).send({ msg: "Error createUser", error });
  }
};

const deleteUser = (request, response) => {
  try {
    const { id } = request.params;
    usersModel
      .delete(id)
      .then((data) => {
        response.send(data);
      })
      .catch((error) => {
        response.send("error");
      });
  } catch (error) {
    response.send({ msg: "Error deleteUser", error });
  }
};

const updateUser = (request, response) => {
  try {
    const { id } = request.params;
    const { body } = request;
    const saltRounds = 10;
    bcrypt.genSalt(saltRounds, function (err, salt) {
      bcrypt.hash(body.password, salt, function (err, hash) {
        const user = new usersModel(
          body.name,
          body.lastname,
          body.email,
          hash,
          body.profile
        );
        user
          .update(id)
          .then((data) => {
            response.send(data);
          })
          .catch((error) => {
            response.send({ msg: "error", error });
          });
      });
    });
  } catch (error) {
    response.status(500).send({ msg: "Error createUser", error });
  }
};

const loginUser = async (request, response) => {
  try {
    const { body } = request;
    const inputPassword = body.password;

    usersModel.getById(id).then((data) => {
      const user = data[0];
      console.log(user);
      if (user.length > 0) {
        const hashPassword = user.password;
        bcrypt.compare(inputPassword, hashPassword, (err, result) => {
          if (err) {
            response.status(404).json({
              msg: "Error bcrypt.compare",
              hashPassword,
              inputPassword,
            });
          }
          if (result) {
            const token = jwt.sign({ user }, SecretToken, {
              expiresIn: "3600s",
            });
            response.status(200).json({
              msg: `Login OK . Token created ${user.name}`,
              token,
              user,
            });
          } else {
            response
              .status(404)
              .json({ msg: "Password not correct", user, inputPassword });
          }
        });
      } else {
      }
    });
  } catch (error) {
    response.status(500).send("Error loginUser user", request.body);
  }
};

module.exports = {
  getAllUsers,
  getByIdUser,
  createUser,
  deleteUser,
  updateUser,
  loginUser,
};
