const mongoose = require("mongoose");
//const uuid = require('uuid');

const config = require("../config/config");

const productSchema = mongoose.Schema(
  {
    _id: { 
      type: Number,
    },
    name: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    rating: {
      type: Number,
      required: true
    },
    warranty_years: {
      type: Number,
      required: true
    },
    available: {
      type: Boolean,
      required: true
    },
  },
  { timestamps: { createdAt: "created_at" } }
);



module.exports = mongoose.model("Product", productSchema);
