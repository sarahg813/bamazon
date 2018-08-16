var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require('cli-table');

var table = new Table({
    head: ["ID", "Product", "Department", "Price","Stock Quantity"]
  , colWidths: [5, 20, 15, 8, 18]
});


var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "password",
    database: "bamazon_db"
});

connection.connect(function(err) {
    if (err) {
        throw err;
    } else {
        console.log("connected as id " + connection.threadId + "\n");
        
        managerMenu();
    }
});


function managerMenu() {
    inquirer
        .prompt([
            {
            type: "checkbox",
            name: "command",
            message: "Please select what you would like to do:",
            choices: [
                "View Products for Sale", 
                "View Low Inventory",
                "Add to Inventory",
                "Add New Product"
                ]
            }
        ])
        .then(function(response) {
            var command = response.command.toString();
            
            switch (command) { 

                case "View Products for Sale": 
                    viewProducts();
                    break;
                case "View Low Inventory": 
                    viewLowInventory();
                    break;
                case "Add to Inventory":
                    addToInventory();
                    break;
                case "Add New Product":
                    addNewProduct();
                    break;                    
            } 
        }); 
};

function viewProducts() {
    connection.query("SELECT * FROM products", function(err, res) {
                    
        for (var i=0; i<res.length; i++){
            table.push([res[i].id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity]);
        }
       
        console.log(table.toString());
    
    });
    connection.end();
};

function viewLowInventory() {
    connection.query("SELECT * FROM products", function(err, res) {
                        
        for (var i=0; i<res.length; i++){
            if (res[i].stock_quantity < 5) {
                table.push([res[i].id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity]);
            }
            
        }
    
        console.log(table.toString());
    
    });
    connection.end();
};

function addToInventory() {
    inquirer
        .prompt([
            {
            type: "input",
            name: "addToID",
            message: "Input the ID of the item you want to add more of:"
            },
            {
            type: "input",
            name: "addMore",
            message: "How much do you want to add?"
            }
        ])
        .then(function(data) {
            var addMore = parseInt(data.addMore);
            var itemID = data.addToID;
            
            connection.query("SELECT id, stock_quantity FROM products", function(err, res) {
                var stockAmt = 0;
                var stockId = 0;
    
                if (err) throw err;
                
                for (var i=0; i<res.length; i++){
                    if (res[i].id == itemID){
                    stockAmt = res[i].stock_quantity;
                    stockId = res[i].id;
                    }
                }

                var newAmt = stockAmt + addMore;

                var updateSql = "UPDATE products SET stock_quantity = ? WHERE id = ?";

                connection.query(updateSql, [ newAmt, stockId ], function (error, results, fields) {
                    if (error) throw error;

                    console.log("ID #" + itemID + " has been updated");

                    connection.end();
                });
            });
        });
};

function addNewProduct() {
    inquirer
    .prompt([
        {
        type: "input",
        name: "newProduct",
        message: "Input the PRODUCT NAME of the new item:"
        },
        {
        type: "input",
        name: "productDept",
        message: "Input the DEPARTMENT of the new item:"
        },
        {
        type: "input",
        name: "productPrice",
        message: "Input the PRICE of the new item:"
        },
        {
        type: "input",
        name: "productQuantity",
        message: "Input the QUANTITY of the new item:"
        }
    ])
    .then(function(data) {
       
        connection.query(
            "INSERT INTO products SET ?", {
                product_name: data.newProduct,
                department_name: data.productDept,
                price: data.productPrice,
                stock_quantity: data.productQuantity
            },
            function (error, results, fields) {
                if (error) throw error;
    
                console.log("Number of records inserted: " + results.affectedRows);
    
                connection.end();
            });
    });
}