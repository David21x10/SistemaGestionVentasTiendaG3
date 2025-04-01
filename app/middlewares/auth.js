"use strict";

const services = require("../services/services");

function isAuth(req, res, next) {
  if (!req.headers.authorization) return res.status(403).send({ message: "No autorizado" });
  const token = req.header.authorization.split(' ')[1]
  services.decodeToken(token)
      .then(data => {
          req.user = data;
          next();
      })
      .catch(error => {
          res.status(500).send({ message: error.message });
      });
}

function whoAmI() {
  if (!req.headers.authorization) return res.status(403).send({ message: "No autorizado" });
  const token = req.header.authorization.split(' ')[1]
  services.decodeToken(token)
      .then(data => {
          req.body.userId = data;
          next();
      })
      .catch(error => {
          res.status(500).send({ message: error.message });
      })
}

module.exports = { isAuth, whoAmI }