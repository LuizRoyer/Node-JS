"use strict";

const mongoose = require("mongoose");
const Product = mongoose.model("Product");

exports.get = async() => {
  let res = await Product.find(
    {
      active: true,
    },
    'title description slug  price'
  );
  return res
};

exports.getBySlug = async(slug) => {
  let res =await Product.findOne(
    {
      slug: slug,
      active: true,
    },
    'title description price tags'
  );
  return res;
};

exports.getById = async(id) => {
 return await Product.findById(id);
};

exports.getByTag = async(tag) => {
  let res = await Product.find(
    {
      tags: tag,
      active: true,
    },
    "title description slug  price"
  );
  return res;
};

exports.create = async(data) => {
  let product = new Product(data);
  return  await product.save();
};

exports.update = async (id, data) => {
  return  await Product.findByIdAndUpdate(id, {
    $set: {
      title: data.title,
      description: data.description,
      price: data.price,
      slug: data.slug,
    },
  });
};

exports.delete = async(id) => {
  return await Product.findByIdAndDelete(id);
};
