'use strict'

const express= require("express");
const ventaController=require("../controllers/ventaController");
const apiRoutes= express.Router();
//const auth= require('../middleware/auth');

apiRoutes.get("/getVenta", async (req, res)=> await ventaController.getVenta(req,res)).
post("/insertVenta", async (req, res)=> await ventaController.insertVenta(req,res)).
delete("/deleteVenta", async (req, res)=> await ventaController.deleteVenta(req,res)).
put("/updateVenta", async (req, res)=> await ventaController.updateVenta(req,res)).
get("/getUltimoIdVenta", async (req, res)=> await ventaController.getUltimoIdVenta(req,res));

module.exports=apiRoutes;