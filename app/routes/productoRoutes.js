'use strict'

const express= require("express");
const productoController=require("../controllers/productoController");
const apiRoutes= express.Router();
//const auth= require('../middleware/auth');

apiRoutes.get("/getProducto", async (req, res)=> await productoController.getProducto(req,res)).
post("/insertProducto", async (req, res)=> await productoController.insertProducto(req,res)).
delete("/deleteProducto", async (req, res)=> await productoController.deleteProducto(req,res)).
put("/updateProducto", async (req, res)=> await productoController.updateProducto(req,res));

module.exports=apiRoutes;