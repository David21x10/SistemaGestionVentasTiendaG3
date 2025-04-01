"use strict";

const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const attributes = {
    idCategoria: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombreCategoria: {
      type: DataTypes.STRING(50),
    }

  };
  const options = {
    defaultScope: {
      attributes: { exclude: [] },
    },
    scopes: {},
    tableName: "categoria",
    timestamps: false,
  };
  return sequelize.define("categoria", attributes, options);
};
