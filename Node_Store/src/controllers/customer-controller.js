"use strict";

const ValidationContract = require("../validators/fluent-validator");
const repository = require("../repositories/customer-repository");
const md5 = require("md5");
const emailService = require("../services/email-service");
const authService = require("../services/auth-Service");

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
    let contract = new ValidationContract();

    contract.hasMinLen(
      req.body.name,
      3,
      "the name should have at least 3 word "
    );
    contract.isEmail(req.body.isEmail, "the email is invalid ");
    contract.hasMinLen(
      req.body.password,
      6,
      "the password should have at least 6 word "
    );

    if (!contract.isValid()) {
      res
        .status(400)
        .send(contract.errors())
        .end();
      return;
    }

    await repository.create({
      name: req.body.name,
      email: req.body.email,
      password: md5(req.body.password + global.SALT_KEY),
      roles: req.body.roles,
    });

    emailService.send(
      req.body.email,
      "Email de Boas Vindas ao novo Cliente ",
      global.EMAIL_TMPL.replace("{0}", req.body.name)
    );

    res.status(201).send({ message: "Customer Cadastrado com Sucesso" });
  } catch (e) {
    res.status(500).send({
      message: "Failed to process your request",
    });
  }
};

exports.put = async (req, res, next) => {
  try {
    await repository.update(req.params.id, req.body);
    res.status(200).send({ message: "Customer Atualizado com Sucesso" });
  } catch (e) {
    res.status(500).send({
      message: "Failed to process your request",
    });
  }
};

exports.delete = async (req, res, next) => {
  try {
    await repository.delete(req.params.id);
    res.status(200).send({ message: "Customer Excluido com Sucesso" });
  } catch (e) {
    res.status(500).send({
      message: "Failed to process your request",
    });
  }
};

exports.authenticate = async (req, res, next) => {
  try {
    let customer = await repository.authenticate({
      email: req.body.email,
      password: md5(req.body.password + global.SALT_KEY),
    });
 
    if (!customer) {
      res.status(404).send({
        message: "Invalid User",
      });
      return;
    }
    let token = await authService.generateToken({
      id:customer.id,
      email: customer.email,
      name: customer.name,
      roles:customer.roles,
    });

    res
      .status(201)
      .send({
        token: token,
        email: customer.email,
        name: customer.name,
        message: "Customer Cadastrado com Sucesso",
      });
  } catch (e) {
    res.status(500).send({
      message: "Failed to process your request",
    });
  }
};
