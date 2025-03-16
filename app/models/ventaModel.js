"use strict";

const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const attributes = {
    idventa: {
      type: DataTypes.INTEGER(13),
      primaryKey: true,
    },
    idcliente: {
      type: DataTypes.STRING(12),
    },
    idProducto: {
      type: DataTypes.INTEGER(13),
    },
    fechaVenta: {
      type: DataTypes.DATE,
    },
    cantidadVenta: {
      type: DataTypes.INTEGER(10),
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