("use strict");

const mongoose = require("mongoose");
const Customer = mongoose.model("Customer");

exports.authenticate = async data => {
  let res = await Customer.findOne({
    email: data.email,
    password: data.password,
  });
  return res;
};

exports.get = async () => {
  let res = await Customer.find({});
  return res;
};

exports.create = async data => {
  let customer = new Customer(data);
  return await customer.save();
};

exports.update = async (id, data) => {
  return await Customer.findByIdAndUpdate(id, {
    $set: {
      name: data.name,
      email: data.email,
      password: data.password,
    },
  });
};

exports.delete = async id => {
  return await Customer.findByIdAndDelete(id);
};
