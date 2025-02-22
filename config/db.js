const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    mongoose.set("strictQuery", false); 
    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log(`MongoDB подключен: ${conn.connection.host}`.cyan.underline);
  } catch (error) {
    console.error(`Ошибка подключения к MongoDB: ${error.message}`.red.bold);
    process.exit(1);
  }
};

module.exports = connectDB;
