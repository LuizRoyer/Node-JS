"use strict";

const mongoose = require("mongoose");
const Order = mongoose.model("Order");

exports.get = async () => {
  let res = await Order.find({}, 'number status  createDate  items.quantity items.price')
    .populate("customer" , 'name')
    .populate("items.product",' title');
  return res;
};

exports.create = async data => {
  let order = new Order(data);
  return await order.save();
};
exports.update = async (id, data) => {
  return await Order.findByIdAndUpdate(id, {
    $set: {
      status: data.status,
    },
  });
};

exports.delete = async id => {
  return await Order.findByIdAndDelete(id);
};
