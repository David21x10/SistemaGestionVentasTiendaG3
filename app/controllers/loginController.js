"use strict";

const db = require("../config/db");
const User = db.login;
const bcrypt = require('bcrypt');
const service = require('../services/services');
const { Op } = require('sequelize');

async function signUp(req, res) {
    let newPass = undefined;

    await bcrypt.genSalt(10)
        .then(async salts => {
            await bcrypt.hash(req.body['password'], salts)
                .then(hash => newPass = hash)
                .catch(error => console.error(error))
        })
        .catch(error => console.error(error));

    const existingUser = await User.findOne({ where: { user: req.body['user'] } });
    if (existingUser) {
        return res.status(400).send({ message: "El usuario ya existe" });
    }

    User.create({
        user: req.body['user'],
        password: newPass,
        "rol": req.body['rol']
    })
        .then(data => {
            res.status(200).send(data)
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || 'Sucedió un error inesperado'
            });
        });
}

async function signIn(req, res) {
    const user = req.body['user'];
    try {
        const data = await User.findOne({ where: { user: { [Op.eq]: user } } });

        if (!data) {
            return res.status(404).send({ message: 'Usuario no encontrado' });
        }

        const result = bcrypt.compareSync(req.body['password'], data['password']);
        if (result) {
            return res.status(200).send({
                message: 'Logged in',
                user: data['user'],
                rol: data['rol'],
                token: service.createToken(data['user']),
            });
        } else {
            return res.status(500).send({ message: 'Sucedió un error inesperado' });
        }
    } catch (err) {
        return res.status(500).send({
            message: err.message || "Sucedió un error al obtener los registros del usuario",
        });
    }
}


module.exports = { signUp, signIn };
