const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    products: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
        quantity: { type: Number, required: true, min: 1 },
      },
    ],
    totalPrice: { type: Number, required: true, min: 0 },
    status: { 
      type: String, 
      enum: ["Pending", "Shipped", "Delivered", "Cancelled"], 
      default: "Pending" 
    },
  },
  { timestamps: true }
);

orderSchema.index({ user: 1 });
orderSchema.index({ status: 1 });

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
