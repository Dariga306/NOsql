const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const Product = require("../models/Product");
const { protect, admin } = require("../middleware/authMiddleware");

// ✅ Создание заказа
router.post("/", protect, async (req, res) => {
  try {
    const { products } = req.body;

    if (!products || products.length === 0) {
      return res.status(400).json({ message: "Корзина пуста" });
    }

    let totalPrice = 0;
    const orderItems = [];

    for (const item of products) {
      const product = await Product.findById(item.product);

      if (!product) {
        return res.status(404).json({ message: `Товар с ID ${item.product} не найден` });
      }

      if (product.stock < item.quantity) {
        return res.status(400).json({ message: `Недостаточно товара: ${product.name}` });
      }

      product.stock -= item.quantity;
      await product.save();

      orderItems.push({
        product: item.product,
        quantity: item.quantity,
      });

      totalPrice += product.price * item.quantity;
    }

    const newOrder = new Order({
      user: req.user.id,
      products: orderItems,
      totalPrice,
    });

    await newOrder.save();
    res.status(201).json({ message: "Заказ создан", order: newOrder });
  } catch (error) {
    console.error("Ошибка при создании заказа:", error);
    res.status(500).json({ message: "Ошибка сервера" });
  }
});

// ✅ Получение всех заказов пользователя
router.get("/", protect, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id }).populate("products.product", "name price");
    res.json(orders);
  } catch (error) {
    console.error("Ошибка при получении заказов:", error);
    res.status(500).json({ message: "Ошибка сервера" });
  }
});

// ✅ Получение всех заказов (только для админов)
router.get("/all", protect, admin, async (req, res) => {
  try {
    const orders = await Order.find().populate("user", "name email").populate("products.product", "name price");
    res.json(orders);
  } catch (error) {
    console.error("Ошибка при получении всех заказов:", error);
    res.status(500).json({ message: "Ошибка сервера" });
  }
});

// ✅ Получение заказа по ID
router.get("/:id", protect, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate("products.product", "name price");

    if (!order) {
      return res.status(404).json({ message: "Заказ не найден" });
    }

    res.json(order);
  } catch (error) {
    console.error("Ошибка при получении заказа:", error);
    res.status(500).json({ message: "Ошибка сервера" });
  }
});

// ✅ Удаление заказа (только для админов)
router.delete("/:id", protect, admin, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Заказ не найден" });
    }

    await order.deleteOne();
    res.json({ message: "Заказ удален" });
  } catch (error) {
    console.error("Ошибка при удалении заказа:", error);
    res.status(500).json({ message: "Ошибка сервера" });
  }
});

module.exports = router;
