const Product = require("../../schema/schemaProduct.js");

async function addProduct(req, res) {
  const {_id, name, type, price, rating, warranty_years, available } = req.body;
  if (!_id, !name || !type || !price || !rating || !warranty_years || !available) {
    return res.status(400).json({
      text: "Requête invalide"
    });
  }
  const product = {
    _id,
    name,
    type,
    price,
    rating,
    warranty_years,
    available
  };
  try {
    const productData = new Product(product);
    const response = await productData.save();
    if (response) {
      return res.status(200).json({
        succes: true
      });
    } else {
      return res.status(500).json({
        succes: false,
        error: "cannot save product!"
      });
    }
  } catch (error) {
    return res.status(500).json({ error });
  }
}

async function products(req, res) {
  try {
    const products = await Product.find({ });
    return res.status(200).json({
      products
    });
  } catch (error) {
    return res.status(500).json({
      error
    });
  }
}

async function removeProduct(req, res) {
  try {
    const { _id } = req.params;
    console.log(req.params);
    var response = await Product.deleteOne({ _id });
    console.log(response);
    if (response.ok == 1) {
      return res.status(200).json({
        succes: true
      });
    } else {
      return res.status(500).json({
        succes: false,
        error: "cannot delete product!"
      });
    }
  } catch (error) {
    return res.status(500).json({
      error
    });
  }
}

async function updateProduct(req, res) {
  const {_id, name, type, price, rating, warranty_years, available } = req.body;
  if (!_id, !name || !type || !price || !rating || !warranty_years || !available) {
    return res.status(400).json({
      text: "Requête invalide"
    });
  }
  const product = {
    _id,
    name,
    type,
    price,
    rating,
    warranty_years,
    available
  };
  try {
    const response = await Product.updateOne({ _id: product._id }, product );
    console.log(response, product._id);
    if (response.n == 1) {
      return res.status(200).json({
        succes: true
      });
    } else {
      return res.status(500).json({
        succes: false,
        error: "cannot update product!"
      });
    }
  } catch (error) {
    return res.status(500).json({
      error
    });
  }
}

//On exporte nos deux fonctions

exports.products = products;
exports.addProduct = addProduct;
exports.removeProduct = removeProduct;
exports.updateProduct = updateProduct;
