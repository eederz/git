const express = require("express");
const morgan = require('morgan');
const config = require("./config");

const app = express();

app.use(morgan('dev'));
app.use(express.json()),
app.use(express.urlencoded({extended:true}))
const clientes = require("./modulos/clientes/rutas");
const error = require('./red/errors');

//config
app.set("port", config.app.port);

//rutas
app.use("/api/clientes", clientes);
app.use(error);
module.exports = app;
