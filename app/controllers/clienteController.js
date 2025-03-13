"use strict";

const { where } = require("sequelize");
const db = require("../config/db");
const cliente = db.cliente;

async function getCliente(req, res) {
  cliente
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

const insertCliente = async (req, res) => {
  try {
      const { idcliente } = req.body;

      const existenciaCliente = await cliente.findOne({ where: { idcliente } });
      if (existenciaCliente) {
          return res.status(400).json({ message: 'El cliente ya existe en la base de datos' });
      }

      const newCliente = await cliente.create(req.body);
      res.status(201).json({ message: 'Cliente guardado exitosamente', data: newCliente });
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
  }
};

const deleteCliente = async (req, res) => {
  try {
      const { idcliente } = req.body; 

      if (!idcliente) {
          return res.status(400).json({ error: "El idcliente es requerido" });
      }

      const clienteRemove = await cliente.findByPk(idcliente);

      if (clienteRemove) {
          await clienteRemove.destroy(); 
          return res.status(200).json({ message: "Cliente eliminado de forma exitosa" });
      } else {
          return res.status(404).json({ error: "El cliente no fue encontrado" });
      }
  } catch (error) {
      console.error(error);
      return res.status(500).json({ error: error.message });
  }
};

const updateCliente = async (req, res) => {
  try {
      const { idcliente, nombreCliente, apellidoCliente, direccionCliente, telefonoCliente, correoCliente } = req.body;

      if (!idcliente) {
          return res.status(400).json({ error: "Se necesita el id del cliente" });
      }

      const clienteUpdate = await cliente.findByPk(idcliente);

      if (!clienteUpdate) {
          return res.status(404).json({ error: "El cliente no fue encontrado" });
      } 

      if (req.body.newIdcliente) {
          clienteUpdate.idcliente = req.body.newIdcliente;
      }
      await clienteUpdate.update({ 
          nombreCliente: nombreCliente || clienteUpdate.nombreCliente,
          apellidoCliente: apellidoCliente || clienteUpdate.apellidoCliente,
          direccionCliente: direccionCliente || clienteUpdate.direccionCliente,
          telefonoCliente: telefonoCliente || clienteUpdate.telefonoCliente,
          correoCliente: correoCliente || clienteUpdate.correoCliente 
      });

      return res.status(200).json({ message: "Cliente actualizado exitosamente", cliente: clienteUpdate });
  } catch (error) {
      console.error(error);
      return res.status(500).json({ error: error.message });
  }
};


module.exports = {
  getCliente,
  insertCliente,
  deleteCliente,
  updateCliente
};
