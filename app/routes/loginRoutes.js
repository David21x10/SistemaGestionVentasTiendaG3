'use strict'

const express= require("express");
const loginController=require("../controllers/loginController");
const apiRoutes= express.Router();
//const auth= require('../middleware/auth');

apiRoutes.post('/signup', async (req, res)=> await loginController.signUp(req, res))
.post('/signin', async (req, res)=> await loginController.signIn(req, res));


module.exports=apiRoutes;