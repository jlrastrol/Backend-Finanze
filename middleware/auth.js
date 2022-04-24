require("dotenv").config();

const jwt = require("jsonwebtoken")
const express = require('express')

const auth = express.Router();

module.exports = (req, res, next) => {
    const token = req.headers['access-token'];

    if (token) {
        jwt.verify(token, process.env.JWTPRIVATEKEY, (err, decoded) => {
            if (err) {
                return res.json({ mensaje: 'Token inválida' });
            } else {
                req.decoded = decoded;
                next();
            }
        });
    } else {
        res.send({
            mensaje: 'Token no proveída.'
        });
    }
};