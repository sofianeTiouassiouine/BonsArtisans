//Définition des modules
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const fs = require('fs');
const productModel = require("./schema/schemaProduct.js");

//Connexion à la base de donnée
mongoose
  .connect("mongodb://localhost/db")
  .then(() => {
    console.log("Connected to mongoDB");
    //Initialiser les produits dans mongoDB
    productModel.remove({}, function (err) {
      console.log('product collection removed from mongoDB')
      fs.readFile('./schema/data/products.json', (err, data) => {
        if (err) throw err;
        let products = JSON.parse(data);
        console.log("Reading products from products.json");
        productModel.insertMany(products, function (error, docs) {
          if (error) {
            throw err;
          } else {
            console.log("Initialize products collection! into mongoDB ");
          }
        });
      });
    });
  })
  .catch((e) => {
    console.log("Error while DB connecting");
    console.log(e);
  });

//On définit notre objet express nommé app
const app = express();

//Body Parser
const urlencodedParser = bodyParser.urlencoded({
  extended: true
});
app.use(urlencodedParser);

app.use(bodyParser.json());

//Définition des CORS
app.use(function (req, res, next) {
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

//Définition du routeur
const router = express.Router();
app.use("/user", router);
app.use("/product", router);
require(__dirname + "/controllers/userController")(router);
require(__dirname + "/controllers/productController")(router);



//Définition et mise en place du port d'écoute
const port = 8800;
app.listen(port, () => console.log(`Listening on port ${port}`));
