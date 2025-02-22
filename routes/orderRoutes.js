const express = require("express");
const Order = require("../models/Order");
const { protect, admin } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, async (req, res) => {
  try {
    let { orderItems, shippingAddress, paymentMethod, itemsPrice, taxPrice, shippingPrice, totalPrice } = req.body;

    if (!orderItems || orderItems.length === 0) {
      return res.status(400).json({ message: "Корзина пуста" });
    }

    const order = new Order({
      user: req.user._id,
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  } catch (error) {
    console.error("Ошибка при создании заказа:", error);
    res.status(500).json({ message: "Ошибка сервера" });
  }
});

router.get("/", protect, admin, async (req, res) => {
  try {
    const orders = await Order.find().populate("user", "name email");
    res.json(orders);
  } catch (error) {
    console.error("Ошибка при получении заказов:", error);
    res.status(500).json({ message: "Ошибка сервера" });
  }
});

router.get("/:id", protect, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate("user", "name email");

    if (!order) {
      return res.status(404).json({ message: "Заказ не найден" });
    }

    res.json(order);
  } catch (error) {
    console.error("Ошибка при получении заказа:", error);
    res.status(500).json({ message: "Ошибка сервера" });
  }
});

router.put("/:id/pay", protect, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Заказ не найден" });
    }

    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.email_address,
    };

    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } catch (error) {
    console.error("Ошибка при обновлении статуса заказа:", error);
    res.status(500).json({ message: "Ошибка сервера" });
  }
});

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
