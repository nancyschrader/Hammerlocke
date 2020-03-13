const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const coffeeSchema = new mongoose.Schema({
  brand: { type: String, required: true},
  name: { type: String, required: true },
  taste: { type: String, required: true },
  inStock: { type: Boolean, required: true }
});

const Coffee = mongoose.model("Coffee", coffeeSchema);

module.exports = Coffee;