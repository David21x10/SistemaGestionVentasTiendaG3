'use strict'

const express= require("express");
const categoriaController=require("../controllers/categoriaController");
const apiRoutes= express.Router();
//const auth= require('../middleware/auth');

apiRoutes.get("/getCategoria", async (req, res)=> await categoriaController.getCategoria(req,res)).
post("/insertCategoria", async (req, res)=> await categoriaController.insertCategoria(req,res)).
delete("/deleteCategoria", async (req, res)=> await categoriaController.deleteCategoria(req,res)).
put("/updateCategoria", async (req, res)=> await categoriaController.updateCategoria(req,res));

module.exports=apiRoutes;