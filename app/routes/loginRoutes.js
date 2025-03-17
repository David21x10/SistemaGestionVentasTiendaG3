'use strict'

const express= require("express");
const loginController=require("../controllers/loginController");
const apiRoutes= express.Router();
//const auth= require('../middleware/auth');

apiRoutes.get("/getLogin", async (req, res)=> await loginController.getLogin(req,res)).
post("/insertLogin", async (req, res)=> await loginController.insertLogin(req,res)).
put("/updateLogin", async (req, res)=> await loginController.updateLogin(req,res)).
delete("/deleteLogin", async (req, res)=> await loginController.deleteLogin(req,res));

module.exports=apiRoutes;