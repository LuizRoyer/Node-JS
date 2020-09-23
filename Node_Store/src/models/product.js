"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
  title: {
    type: String,
    required: [true, "the Title is Required"],
    trim: true,
  },
  slug: {
    type: String,
    required: [true, "the Slug is Required"],
    trim: true,
    index: true,
    unique: true,
  },
  description: {
    type: String,
    required: [true, "the Description is Required"],
    trim: true,
  },
  price: {
    type: Number,
    required: [true, "the Price is Required"],
  },
  active: {
    type: Boolean,
    required: [true, "the Active is Required"],
    default: true,
  },
  tags: [
    {
      type: String,
      required: [true, "the Tags is Required"],
    },
  ],
  image: {
    type: String,
    required: false,
    trim: true,
  },
});

module.exports = mongoose.model("Product", schema);
