"use strict";

const { DataTypes } = require("sequelize");
const clienteModel = require("./clienteModel");
const productoModel = require("./productoModel");

module.exports = (sequelize) => {
  const attributes = {
    idventa: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    idcliente: {
      type: DataTypes.STRING(12),
            references: {
              model: clienteModel,
              key: "idcliente",
            },
    },
    idProducto: {
      type: DataTypes.INTEGER,
            references: {
              model: productoModel,
              key: "idProducto",
            },
    },
    fechaVenta: {
      type: DataTypes.DATE,
    },
    cantidadVenta: {
      type: DataTypes.INTEGER,
    },
    totalVenta: {
        type: DataTypes.DECIMAL(10, 2),
      },

  };
  const options = {
    defaultScope: {
      attributes: { exclude: [] },
    },
    scopes: {},
    tableName: "venta",
    timestamps: false,
  };
  return sequelize.define("venta", attributes, options);
};