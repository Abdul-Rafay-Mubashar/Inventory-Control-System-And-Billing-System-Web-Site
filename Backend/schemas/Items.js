const mongoose = require('mongoose');
const { Schema } = mongoose;

const ItemInfo = new Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  totel: {
    type: Number,
    required: true,
  },
  item_id:{
    type: String,
    required: true,
  }
});


module.exports = mongoose.model('Item', ItemInfo);