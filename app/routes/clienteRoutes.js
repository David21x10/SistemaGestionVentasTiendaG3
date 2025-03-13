'use strict'

const express= require("express");
const clienteController=require("../controllers/clienteController");
const apiRoutes= express.Router();
//const auth= require('../middleware/auth');

apiRoutes.get("/getCliente", async (req, res)=> await clienteController.getCliente(req,res)).
post("/insertCliente", async (req, res)=> await clienteController.insertCliente(req,res)).
delete("/deleteCliente", async (req, res)=> await clienteController.deleteCliente(req,res)).
put("/updateCliente", async (req, res)=> await clienteController.updateCliente(req,res));

module.exports=apiRoutes;