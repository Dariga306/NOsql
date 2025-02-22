require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("./config/db");
const Product = require("./models/Product");
const User = require("./models/User");
const Order = require("./models/Order");
require("colors");

const sampleProducts = [
  {
    name: "Laptop",
    price: 999.99,
    description: "High-performance gaming laptop",
    image: "laptop.jpg",
    stock: 10,
  },
  {
    name: "Smartphone",
    price: 499.99,
    description: "Latest smartphone with high-resolution camera",
    image: "smartphone.jpg",
    stock: 20,
  },
  {
    name: "Headphones",
    price: 99.99,
    description: "Noise-canceling wireless headphones",
    image: "headphones.jpg",
    stock: 15,
  },
];

const seedDatabase = async () => {
  try {
    await connectDB();

    if (process.argv[2] === "--destroy") {
      await Product.deleteMany();
      await User.deleteMany();
      await Order.deleteMany();
      console.log("Данные удалены!".red.bold);
      process.exit();
    }

    await Product.deleteMany();
    await User.deleteMany();
    await Order.deleteMany();

    await Product.insertMany(sampleProducts);

    console.log("Данные загружены!".green.bold);
    process.exit();
  } catch (error) {
    console.error(`Ошибка: ${error.message}`.red.bold);
    process.exit(1);
  }
};

seedDatabase();
