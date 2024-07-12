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
        if(data[0].length>0) {
          response.status(200).send(data[0]);
        } else {
          response.status(404).send({msg: "Error user not found", id});
        }
      })
      .catch((error) => {
        response.status(400).send({msg:"Error getById", id});
      });
  } catch (error) {
    response.status(500).send({ msg: "Error getByIdUser", error,message });
  }
};
const createUser = async (request, response) => {
  try {
    const { body } = request;
    const saltRounds = 10;
    const salt = await new Promise((resolve, reject) => 
      bcrypt.genSalt(saltRounds, (err, salt) => err ? reject(err) : resolve(salt))
    );

    const hash = await new Promise((resolve, reject) =>
      bcrypt.hash(body.password, salt, (err, hash) => err ? reject(err) : resolve(hash))
    );

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
            response.status(201).send({msg:"User Created", data:user});
          })
          .catch((error) => {
            response.send({ msg: "Error create", error: error.message });
          });
  } catch (error) {
    response.status(500).send({ msg: "Error createUser", error: error.message });
  }
};

const deleteUser = (request, response) => {
  try {
    const { id } = request.params;
    usersModel
      .delete(id)
      .then((data) => {
        if(data[0].affectedRows > 0) {
          response.send({msg:"deleted", data, id});
        } else {
          response.send({msg:"User not found", id})
        }
      })
      .catch((error) => {
        response.send({msg:"error delete", id});
      });
  } catch (error) {
    response.status(500).send({ msg: "Error deleteUser", error: error.message });
  }
};

const updateUser = (request, response) => {
  try {
    const { id } = request.params;
    const { body } = request;
    const saltRounds = 10;
    bcrypt.genSalt(saltRounds, function (err, salt) {
      bcrypt.hash(body.password, salt,  function (err, hash) {
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
            if(data[0].affectedRows > 0) {
              response.send({msg:"updated", data, user, id});
            } else {
              response.send({msg:"User not found", id})
            }
          })
          .catch((error) => {
            response.send({ msg: "Error updating user", error });
          });
      });
    });
  } catch (error) {
    response.status(500).send({ msg: "Error createUser", error });
  }
};

const loginUser = (request, response) => {
  try {
    const { body } = request;
    const inputPassword = body.password;

    usersModel.getByEmail(body.email)
    .then((data) => {
      const user = data[0][0];
      console.log(user);
      console.log("inputpassword:", inputPassword)
       if (user.password) {
        // const hashPassword = /^\$2b\$/.test(user.password) ? '$2a$' + user.password.slice(4) : user.password;
        // hashPassword = user.password;
        console.log("user.password", user.password)

        bcrypt.compare(user.password, inputPassword, (err, result) => {
            
          if (err) {
            response.send({
              msg: "Error bcrypt.compare",
              err,
              hashPassword,
              inputPassword
            });
          }
          console.log("result", result)
          if (result) {
            const token = jwt.sign({ user }, SecretToken, {
              expiresIn: "3600s",
            });
            response.send({
              msg: `Login OK . Token created ${user.name}`,
              token,
              user,
            });
          } else {
            response.status(400)
              .send({ msg: "Password not correct"});
          }
          });
      } else {
        response
        .status(404)
        .json({ msg: "User not found", user });
      }
    })
    .catch((error) => {
      response.send({ msg: "error Email", error });
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
