"use strict";

const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const attributes = {
    user: {
      type: DataTypes.STRING(50),
      primaryKey: true,
    },
    password: {
      type: DataTypes.STRING(100),
    },
    rol: {
      type: DataTypes.STRING(50),
    }
  };
  const options = {
    defaultScope: {
      attributes: { exclude: [] },
    },
    scopes: {},
    tableName: "login",
    timestamps: false,
  };
  return sequelize.define("login", attributes, options);
};
