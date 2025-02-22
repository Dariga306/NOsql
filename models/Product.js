const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true, trim: true }, // Убираем дублирующийся .index()
    price: { type: Number, required: true, min: 0 },
    description: { type: String, required: true, trim: true },
    image: { type: String, required: true, trim: true },
    stock: { type: Number, required: true, default: 0, min: 0 },
  },
  { timestamps: true }
);

// ❌ УДАЛЯЕМ ЭТУ СТРОКУ, потому что `unique: true` уже создаёт индекс
// productSchema.index({ name: 1 });

const Product = mongoose.models.Product || mongoose.model("Product", productSchema);
module.exports = Product;
