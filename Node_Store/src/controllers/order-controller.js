"use strict";

const repository = require("../repositories/order-repository");
const guid = require('guid');
const authService = require('../services/auth-Service');

exports.get = async (req, res, next) => {
  try {
    let data = await repository.get();
    res.status(200).send(data);
  } catch (e) {
    res.status(500).send({
      message: "Failed to process your request",
    });
  }
};

exports.post = async (req, res, next) => {
  try {
    //Recuperar o token 
    let token = req.body.token|| req.query.token|| req.headers['x-access-token'];
    // Decodificar o token
    let data = await authService.decodeToken(token);


    await repository.create({
        customer:data.id,
        number:guid.raw().substring(0,6),
        items: req.body.items
    });
    res.status(201).send({ message: "Order Cadastrado com Sucesso" });
  } catch (e) {
    res.status(500).send({
      message: "Failed to process your request",
    });
  }
};

exports.put = async (req, res, next) => {
  try {
    await repository.update(req.params.id, req.body);
    res.status(200).send({ message: "Order Atualizado com Sucesso" });
  } catch (e) {
    res.status(500).send({
      message: "Failed to process your request",
    });
  }
};

exports.delete = async (req, res, next) => {
  try {
    await repository.delete(req.params.id);
    res.status(200).send({ message: "Order Excluido com Sucesso" });
  } catch (e) {
    res.status(500).send({
      message: "Failed to process your request",
    });
  }
};
