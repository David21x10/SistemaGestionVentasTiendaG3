"use strict";

const { where } = require("sequelize");
const db = require("../config/db");
const categoria = db.categoria;

async function getCategoria(req, res) {
  categoria
    .findAll()
    .then((result) => {
      res.status(200).send({ result });
    })
    .catch((error) => {
      res
        .status(500)
        .send({ message: error.message || "Sucedió un errror inesperado" });
    });
}

const insertCategoria = async (req, res) => {
    try {
      const { nombreCategoria } = req.body;
  
      if (!nombreCategoria) {
        return res
          .status(400)
          .json({ error: "Todos los campos son obligatorios" });
      }
  
      const existenciaCategoria = await categoria.findOne({
        where: { nombreCategoria }, 
      });
      
      if (existenciaCategoria) {
        return res.status(400).json({ message: "La categoría ya está insertada" });
      }
  
      const result = await categoria.create({
        nombreCategoria,
      });
  
      res.status(201).json(result);
    } catch (error) {
      console.error("Error al insertar el registro:", error);
      res.status(500).json({ error: "Error al insertar el registro" });
    }
  };
  

const deleteCategoria = async (req, res) => {
  try {
      const { idCategoria } = req.body; 

      if (!idCategoria) {
          return res.status(400).json({ error: "El idCategoria es requerido" });
      }

      const categoriaRemove = await categoria.findByPk(idCategoria);

      if (categoriaRemove) {
          await categoriaRemove.destroy(); 
          return res.status(200).json({ message: "La categoria se elimino de forma exitosa" });
      } else {
          return res.status(404).json({ error: "La categoria no fue encontrado" });
      }
  } catch (error) {
      console.error(error);
      return res.status(500).json({ error: error.message });
  }
};

const updateCategoria = async (req, res) => {
  try {
      const { idCategoria, nombreCategoria } = req.body;

      if (!idCategoria) {
          return res.status(400).json({ error: "Se necesita el id de categoria" });
      }

      const categoriaUpdate = await categoria.findByPk(idCategoria);

      if (!categoriaUpdate) {
          return res.status(404).json({ error: "La categoria no fue encontrada" });
      } 

      if (req.body.newIdcategoria) {
          categoriaUpdate.idCategoria = req.body.newIdcategoria;
      }
      await categoriaUpdate.update({ 
          nombreCategoria: nombreCategoria || categoriaUpdate.nombreCategoria,
      });

      return res.status(200).json({ message: "La categoria se actualizo exitosamente", categoria: categoriaUpdate });
  } catch (error) {
      console.error(error);
      return res.status(500).json({ error: error.message });
  }
};


module.exports = {
  getCategoria,
  insertCategoria,
  deleteCategoria,
  updateCategoria
};