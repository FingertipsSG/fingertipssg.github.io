var db = require("./databaseConfig.js");
productsDB = {};

//GET PRODUCTS
productsDB.getProducts = function (shop, callback) {
  console.log(shop);
  var conn = db.getConnection();
  conn.connect(function (err) {
    if (err) {
      console.log(err);
      return callback(err, null);
    } else {
      console.log("Connected!");
      var sql = `SELECT * FROM ` + shop;
      conn.query(sql, function (err, result) {
        conn.end();
        if (err) {
          console.log(err);
          return callback(err, null);
        } else {
          // console.log(result);
          return callback(null, result);
        }
      });
    }
  });
};

// ADD PRODUCT
productsDB.addProducts = function (
  product_name,
  product_description,
  product_price,
  product_image,
  buy_url,
  shop,
  callback
) {
  console.log(
    product_name,
    product_description,
    product_price,
    product_image,
    buy_url,
    shop
  );
  var conn = db.getConnection();
  conn.connect(function (err) {
    if (err) {
      console.log(err);
      return callback(err, null);
    } else {
      console.log("Connected!");

      var sql =
        "INSERT INTO " +
        shop +
        "(product_name, product_description, product_price, product_image, buy_url) VALUES (?,?,?,?,?)";

      conn.query(
        sql,
        [
          product_name,
          product_description,
          product_price,
          product_image,
          buy_url,
        ],
        function (err, result) {
          conn.end();
          if (err) {
            console.log(err);
            return callback(err, null);
          } else {
            console.log(result);
            return callback(null, result);
          }
        }
      );
    }
  });
};

// DELETE PRODUCT
productsDB.deleteProduct = function (product_id, shop, callback) {
  console.log(product_id);
  var conn = db.getConnection();
  conn.connect(function (err) {
    if (err) {
      console.log(err);
      return callback(err, null);
    } else {
      console.log("Connected!");
      var sql = "DELETE FROM " + shop + " WHERE product_id = ?";
      conn.query(sql, [product_id], function (err, result) {
        conn.end();
        if (err) {
          console.log(err);
          return callback(err, null);
        } else {
          console.log(result);
          return callback(null, result);
        }
      });
    }
  });
};

//EDIT PRODUCT
productsDB.editProduct = function (
  productName,
  productDesc,
  productPrice,
  productImage,
  productUrl,
  id,
  shop,
  callback
) {
  var conn = db.getConnection();
  conn.connect(function (err) {
    if (err) {
      console.log(err);
      return callback(err, null);
    } else {
      console.log("Connected!");
      const sql =
        "UPDATE " +
        shop +
        " SET product_name = ?, product_description = ?, product_price = ?, product_image = ?, buy_url = ? WHERE product_id = ?";
      conn.query(
        sql,
        [productName, productDesc, productPrice, productImage, productUrl, id],
        function (err, result) {
          conn.end();
          if (err) {
            console.log(err);
            return callback(err, null);
          } else {
            console.log(result);
            return callback(null, result);
          }
        }
      );
    }
  });
};

// POST createProductTable
productsDB.createProductTable = function (shop, callback) {
  var conn = db.getConnection();
  conn.connect(function (err) {
    if (err) {
      console.log(err);
      return callback(err, null);
    } else {
      console.log("Connected!");

      var sql =
        "CREATE TABLE " +
        shop +
        " ( \
            `product_id` int NOT NULL AUTO_INCREMENT, \
            `product_name` varchar(255) DEFAULT NULL, \
            `product_description` varchar(1500) DEFAULT NULL, \
            `product_price` DECIMAL(5,2) DEFAULT NULL, \
            `product_image` varchar(45) DEFAULT NULL, \
            `buy_url` varchar(255) DEFAULT NULL, \
            PRIMARY KEY (`product_id`) \
          ) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;";
      conn.query(sql, function (err, result) {
        conn.end();
        if (err) {
          console.log(err);
          return callback(err, null);
        } else {
          console.log(result);
          return callback(null, result);
        }
      });
    }
  });
};

// DELETE dropProductTable
productsDB.dropProductTable = function (sName, callback) {
  console.log(sName);
  var conn = db.getConnection();
  conn.connect(function (err) {
    if (err) {
      console.log(err);
      return callback(err, null);
    } else {
      console.log("Connected!");
      var sql = "DROP TABLE toktokchiang." + sName + ";";
      conn.query(sql, function (err, result) {
        conn.end();
        if (err) {
          console.log(err);
          return callback(err, null);
        } else {
          console.log(result);
          return callback(null, result);
        }
      });
    }
  });
};

// TO SEARCH 
productsDB.searchProducts = function (shop, searchQuery, callback) {
  var conn = db.getConnection();
  conn.connect(function (err) {
    if (err) {
      console.log(err);
      return callback(err, null);
    }
    else {
      console.log("Connected!");
      var sql = "SELECT * FROM " + shop + " WHERE product_name LIKE "+ `'%${searchQuery}%'`;
      conn.query(sql, function (err, result) {
        conn.end();
        if (err) {
          console.log(err);
          return callback(err, null);
        } else {
          console.log(result);
          return callback(null, result);
        }
      });
    }
  });
}

module.exports = productsDB;