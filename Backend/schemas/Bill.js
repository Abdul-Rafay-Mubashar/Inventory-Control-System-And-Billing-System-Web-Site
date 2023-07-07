const mongoose = require('mongoose');
const { Schema } = mongoose;

const BillInfo = new Schema({
  customerid: {
    type: String,
    required: true,
  },
  totel:{
    type: String,
    required: true,
  }
});


module.exports = mongoose.model('Bill', BillInfo);