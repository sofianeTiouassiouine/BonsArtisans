const product = require("./product/lib.js");

module.exports = function(app) {
  app.get("/products", product.products);
  app.post("/addProduct", product.addProduct);
  app.delete("/removeProduct/:_id", product.removeProduct);
  app.put("/updateProduct", product.updateProduct);
};
