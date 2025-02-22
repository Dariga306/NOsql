const express = require("express");
const Product = require("../models/Product");
const { protect, admin } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, admin, async (req, res) => {
  try {
    const { name, price, description, image, stock } = req.body;

    if (!name || !price || !description || !image || stock == null) {
      return res.status(400).json({ message: "Все поля обязательны" });
    }

    const product = new Product({ name, price, description, image, stock });
    const savedProduct = await product.save();

    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(500).json({ message: "Ошибка создания товара", error: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Ошибка при загрузке товаров" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Товар не найден" });

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Ошибка загрузки товара" });
  }
});

router.put("/:id", protect, admin, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Товар не найден" });

    const { name, price, description, image, stock } = req.body;

    product.name = name || product.name;
    product.price = price || product.price;
    product.description = description || product.description;
    product.image = image || product.image;
    product.stock = stock != null ? stock : product.stock;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: "Ошибка обновления товара" });
  }
});

router.delete("/:id", protect, admin, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Товар не найден" });

    await product.deleteOne();
    res.json({ message: "Товар удалён" });
  } catch (error) {
    res.status(500).json({ message: "Ошибка удаления товара" });
  }
});

module.exports = router;
