"use strict";

const ValidationContract = require("../validators/fluent-validator");
const repository = require("../repositories/product-repository");

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

exports.getBySlug = async (req, res, next) => {
  try {
    let data = await repository.getBySlug(req.params.slug);
    res.status(200).send(data);
  } catch (e) {
    res.status(500).send({
      message: "Failed to process your request",
    });
  }
};

exports.getById = async (req, res, next) => {
  try {
    let data = await repository.getById(req.params.id);
    res.status(200).send(data);
  } catch (e) {
    res.status(500).send({
      message: "Failed to process your request",
    });
  }
};

exports.getByTag = async (req, res, next) => {
  try {
    let data = await repository.getByTag(req.params.tag);
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
      req.body.title,
      3,
      "the title should have at least 3 word "
    );
    contract.hasMinLen(
      req.body.slug,
      3,
      "the title slug have at least 3 word "
    );
    contract.hasMinLen(
      req.body.description,
      3,
      "the description should have at least 3 word "
    );

    if (!contract.isValid()) {
      res
        .status(400)
        .send(contract.errors())
        .end();
      return;
    }
    await repository.create(req.body);
    res.status(201).send({ message: "Produto Cadastrado com Sucesso" });
  } catch (e) {
    res.status(500).send({
      message: "Failed to process your request",
    });
  }
};

exports.put = async (req, res, next) => {
  try {
    await repository.update(req.params.id, req.body);
    res.status(200).send({ message: "Produto Atualizado com Sucesso" });
  } catch (e) {
    res.status(500).send({
      message: "Failed to process your request",
    });
  }
};

exports.delete = async (req, res, next) => {
  try {
    await repository.delete(req.params.id);
    res.status(200).send({ message: "Produto Excluido com Sucesso" });
  } catch (e) {
    res.status(500).send({
      message: "Failed to process your request",
    });
  }
};
