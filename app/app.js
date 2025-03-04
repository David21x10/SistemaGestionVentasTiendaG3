const express = require('express');
const App= express();

App.use(express.json());
App.use(express.urlencoded({extended: false}));

module.exports= App;