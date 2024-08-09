const mongoose = require('mongoose');
const { Schema } = require('.')

const userSchema = new Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  membership: { type: String, required: true },
  status: { type: Boolean, required: true },
  date: { type: Date, required: true },
  email: { type: String, required: false },
  gender: { type: String, required: false },
  age: { type: Number, required: true },
  belt: { type: String, required: true },
  classesInBelt: { type: Number, required: false }
});

const User = mongoose.model('User', userSchema);

module.exports = { User };
