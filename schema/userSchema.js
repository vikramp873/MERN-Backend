const mongoose = require('mongoose');


// const connect = async () => {
const userSchema = new mongoose.Schema({
   name: String,
   email: String,
   password: String

});
module.exports = mongoose.model('uers', userSchema);