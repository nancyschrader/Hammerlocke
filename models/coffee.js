const mongoose = require("mongoose");

const coffeeSchema = new mongoose.Schema({
  brand: { type: String, required: true},
  name: { type: String, required: true },
  Taste: { type: String, required: true },
  inStock: Boolean
});

const Coffee = mongoose.model("Coffee", coffeeSchema);

module.exports = Coffee;