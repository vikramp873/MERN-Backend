const mongoose = require('mongoose');



const ProductSchema = new mongoose.Schema({
   name: String,
   price: Number,
   category: String,
   company: String,
   userId: String,

});

module.exports = mongoose.model('productsdatas', ProductSchema);





