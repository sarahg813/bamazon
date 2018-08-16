CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products(
	id INT NOT NULL AUTO_INCREMENT,
	product_name VARCHAR(255) NOT NULL,
    department_name VARCHAR(255) NOT NULL,
    price INT NOT NULL,
    stock_quantity INT NOT NULL,
	PRIMARY KEY (id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Kindle", "electronics", 79.99, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("TV", "electronics", 899.99, 50);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Candyland", "toys", 12.99, 65);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("teddy bear", "toys", 9.99, 70);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("mascara", "beauty", 12.99, 55);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("lipstick", "beauty", 14.99, 40);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Harry Potter", "books", 8.99, 38);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("The Hunger Games", "books", 7.59, 82);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("dress", "clothing", 29.99, 26);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("pants", "clothing", 49.99, 96);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("sneakers", "clothing", 99.99, 0);

