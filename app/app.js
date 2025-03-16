"use strict";

const express = require("express");
const cors = require("cors");
const App = express();

//llamado a routers
const clienteRoutes = require('./routes/clienteRoutes');
const productoRoutes = require('./routes/productoRoutes');
const categoriaRoutes = require('./routes/categoriaRoutes');
const ventaRoutes = require('./routes/ventaRoutes');

App.use(
  cors({
    origin: "*", // Reemplaza con el dominio correcto
  })
);

App.use(cors());
App.use(express.json({ limit: "10mb" }));
App.use(express.urlencoded({ extended: false }));

//creacion de endpoints
App.use('/api/Cliente', clienteRoutes);
App.use('/api/Producto', productoRoutes);
App.use('/api/Categoria', categoriaRoutes);
App.use('/api/Venta', ventaRoutes);

module.exports = App;