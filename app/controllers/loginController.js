"use strict";

const { where } = require("sequelize");
const db = require("../config/db");
const login = db.login;

async function getLogin(req, res) {
  login
    .findAll()
    .then((result) => {
      res.status(200).send({ result });
    })
    .catch((error) => {
      res
        .status(500)
        .send({ message: error.message || "sucedió un errror inesperado" });
    });
}

const insertLogin = async (req, res) => {
  try {
      const { user } = req.body;

      const existenciaLogin = await login.findOne({ where: { user } });
      if (existenciaLogin) {
          return res.status(400).json({ message: 'El usuario ya existe en la base de datos' });
      }

      const newLogin = await login.create(req.body);
      res.status(201).json({ message: 'Usuario guardado exitosamente', data: newLogin });
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
  }
};

const deleteLogin = async (req, res) => {
  try {
      const { user } = req.body; 

      if (!user) {
          return res.status(400).json({ error: "El user es requerido" });
      }

      const userRemove = await login.findByPk(user);

      if (userRemove) {
          await userRemove.destroy(); 
          return res.status(200).json({ message: "Usuario eliminado de forma exitosa" });
      } else {
          return res.status(404).json({ error: "El usuario no fue encontrado" });
      }
  } catch (error) {
      console.error(error);
      return res.status(500).json({ error: error.message });
  }
};

const updateLogin = async (req, res) => {
  try {
      const { user, password, rol } = req.body;

      if (!user) {
          return res.status(400).json({ error: "Se necesita el user" });
      }

      const userUpdate = await login.findByPk(user);

      if (!userUpdate) {
          return res.status(404).json({ error: "El usuario no fue encontrado" });
      } 

      if (req.body.newuser) {
          userUpdate.user = req.body.newuser;
      }
      await userUpdate.update({ 
          password: password || userUpdate.password,
          rol: rol || userUpdate.rol
      });

      return res.status(200).json({ message: "Usuario actualizado exitosamente", user: userUpdate });
  } catch (error) {
      console.error(error);
      return res.status(500).json({ error: error.message });
  }
};


module.exports = {
    getLogin,
    insertLogin,
    deleteLogin,
    updateLogin
};
