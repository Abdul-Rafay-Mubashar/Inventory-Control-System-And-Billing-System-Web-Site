const mongoose = require('mongoose');
const { Schema } = mongoose;

const BillItemInfo = new Schema({
  billno: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  noofproduct: {
    type: Number,
    required: true,
  },
  ammount: {
    type: Number,
    required: true,
  },
});


module.exports = mongoose.model('BillItem', BillItemInfo);