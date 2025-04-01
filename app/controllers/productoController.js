"use strict";

const { where } = require("sequelize");
const db = require("../config/db");
const producto = db.producto;

async function getProducto(req, res) {
  producto
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

const insertProducto = async (req, res) => {
    try {
      const { nombreProducto, idCategoria, descripcionProducto, precioProducto, stockProducto } = req.body;
  
      if (!nombreProducto || !idCategoria || !descripcionProducto || !precioProducto || !stockProducto) {
        return res
          .status(400)
          .json({ error: "Todos los campos son obligatorios" });
      }
  
      const existenciaProducto = await producto.findOne({
        where: { nombreProducto }, 
      });
      
      if (existenciaProducto) {
        return res.status(400).json({ message: "El producto ya está insertado" });
      }
  
      const result = await producto.create({
        nombreProducto,
        idCategoria,
        descripcionProducto,
        precioProducto,
        stockProducto
      });
  
      res.status(201).json(result);
    } catch (error) {
      console.error("Error al insertar el producto:", error);
      res.status(500).json({ error: "Error al insertar el producto" });
    }
  };
  

const deleteProducto = async (req, res) => {
  try {
      const { idproducto } = req.body; 

      if (!idproducto) {
          return res.status(400).json({ error: "El idproducto es requerido" });
      }

      const productoRemove = await producto.findByPk(idproducto);

      if (productoRemove) {
          await productoRemove.destroy(); 
          return res.status(200).json({ message: "Producto eliminado de forma exitosa" });
      } else {
          return res.status(404).json({ error: "El producto no fue encontrado" });
      }
  } catch (error) {
      console.error(error);
      return res.status(500).json({ error: error.message });
  }
};

const updateProducto = async (req, res) => {
  try {
      const { idproducto, idCategoria, nombreProducto, descripcionProducto, precioProducto, stockProducto } = req.body;

      if (!idproducto) {
          return res.status(400).json({ error: "Se necesita el id del producto" });
      }

      const existenciaCategoria = await db.categoria.findOne({ where: { idCategoria } });
      if (!existenciaCategoria) {
          return res.status(400).json({ message: 'No se puede actualizar el producto porque la categoría no existe en la base de datos' });
      }

      const productoUpdate = await producto.findByPk(idproducto);

      if (!productoUpdate) {
          return res.status(404).json({ error: "El producto no fue encontrado" });
      } 

      if (req.body.newIdproducto) {
          productoUpdate.idproducto = req.body.newIdproducto;
      }
      await productoUpdate.update({ 
          nombreProducto: nombreProducto || productoUpdate.nombreProducto,
          idCategoria: idCategoria || productoUpdate.idCategoria,
          descripcionProducto: descripcionProducto || productoUpdate.descripcionProducto,
          precioProducto: precioProducto || productoUpdate.precioProducto,
          stockProducto: stockProducto || productoUpdate.stockProducto,
      });

      return res.status(200).json({ message: "Producto actualizado exitosamente", producto: productoUpdate });
  } catch (error) {
      console.error(error);
      return res.status(500).json({ error: error.message });
  }
};


module.exports = {
  getProducto,
  insertProducto,
  deleteProducto,
  updateProducto
};