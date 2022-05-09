var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var bcrypt = require("bcrypt");

var userSchema = new Schema({
  name: String,
  email: { type: String, required: true },
  password: { type: String, required: true },

});


