"use strict";

const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const attributes = {
    idproducto: {
      type: DataTypes.INTEGER(13),
      primaryKey: true,
    },
    nombreProducto: {
      type: DataTypes.STRING(50),
    },
    descripcionProducto: {
      type: DataTypes.STRING(50),
    },
    precioProducto: {
      type: DataTypes.DECIMAL(10, 2),
    },
    stockProducto: {
      type: DataTypes.INTEGER(10),
    },

  };
  const options = {
    defaultScope: {
      attributes: { exclude: [] },
    },
    scopes: {},
    tableName: "producto",
    timestamps: false,
  };
  return sequelize.define("producto", attributes, options);
};