const mongoose = require('mongoose')
const { Schema } = mongoose;

const postSchema = new Schema({
  FirstName: String, // String is shorthand for {type: String}
  LastName: String,
  Age: Number,
  date: { type: Date, default: Date.now },
  hidden: { type: Boolean, default: false }
});

module.exports = mongoose.model('Post', postSchema);
