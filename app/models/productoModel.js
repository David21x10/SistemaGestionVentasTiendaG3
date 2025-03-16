"use strict";

const { DataTypes } = require("sequelize");
const db = require("../config/db");
const categoriaModel = require("./categoriaModel");

module.exports = (sequelize) => {
  const attributes = {
    idproducto: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    idCategoria: {
      type: DataTypes.INTEGER,
      references: {
        model: categoriaModel,
        key: "idCategoria",
      },
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
      type: DataTypes.INTEGER,
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