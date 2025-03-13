"use strict";

const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const attributes = {
    idcliente: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    nombreCliente: {
      type: DataTypes.STRING(50),
    },
    apellidoCliente: {
      type: DataTypes.STRING(50),
    },
    direccionCliente: {
      type: DataTypes.STRING(100),
    },
    telefonoCliente: {
      type: DataTypes.STRING(8),
    },
    correoCliente: {
      type: DataTypes.STRING(100),
    },
  };
  const options = {
    defaultScope: {
      attributes: { exclude: [] },
    },
    scopes: {},
    tableName: "cliente",
    timestamps: false,
  };
  return sequelize.define("cliente", attributes, options);
};
