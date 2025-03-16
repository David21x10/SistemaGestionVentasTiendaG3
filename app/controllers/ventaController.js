"use strict";

const { where } = require("sequelize");
const db = require("../config/db");
const venta = db.venta;

async function getVenta(req, res) {
  venta
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

const insertVenta = async (req, res) => {
    try {
        
        const ultimaVenta = await venta.findOne({
            order: [['idventa', 'DESC']] 
        });

        const nuevoIdVenta = ultimaVenta ? ultimaVenta.idventa + 1 : 1; 

        const nuevaVenta = await venta.create({
            idventa: nuevoIdVenta,
            ...req.body
        });

        res.status(201).json({ message: 'Venta guardada exitosamente', data: nuevaVenta });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

const deleteVenta = async (req, res) => {
  try {
      const { idventa } = req.body; 

      if (!idventa) {
          return res.status(400).json({ error: "El idventa es requerido" });
      }

      const ventaRemove = await venta.findByPk(idventa);

      if (ventaRemove) {
          await ventaRemove.destroy(); 
          return res.status(200).json({ message: "Venta eliminada de forma exitosa" });
      } else {
          return res.status(404).json({ error: "La venta no fue encontrado" });
      }
  } catch (error) {
      console.error(error);
      return res.status(500).json({ error: error.message });
  }
};

const updateVenta = async (req, res) => {
  try {
      const { idventa, idcliente, idProducto, fechaVenta, cantidadVenta, totalVenta } = req.body;

      if (!idventa) {
          return res.status(400).json({ error: "Se necesita el id de la venta" });
      }

      const ventaUpdate = await venta.findByPk(idventa);

      if (!ventaUpdate) {
          return res.status(404).json({ error: "La venta no fue encontrado" });
      } 

      if (req.body.newIdventa) {
          VentaUpdate.idventa = req.body.newIdventa;
      }
      await ventaUpdate.update({ 
          fechaVenta: fechaVenta || ventaUpdate.fechaVenta,
          cantidadVenta: cantidadVenta || ventaUpdate.cantidadVenta,
          totalVenta: totalVenta || ventaUpdate.totalVenta,
      });

      return res.status(200).json({ message: "Venta actualizada exitosamente", producto: ventaUpdate });
  } catch (error) {
      console.error(error);
      return res.status(500).json({ error: error.message });
  }
};


module.exports = {
  getVenta,
  insertVenta,
  deleteVenta,
  updateVenta
};