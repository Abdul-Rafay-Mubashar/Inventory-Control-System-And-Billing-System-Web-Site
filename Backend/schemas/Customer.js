const mongoose = require('mongoose');
const { Schema } = mongoose;
const moment = require('moment');

const currentTime = moment().format('HH:mm:ss');

const CustomerInfo = new Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: moment().startOf('day'),
  },
  phoneno: {
    type: String,
    required: true,
  },
  email:{
    type: String,
    required: true,
  },
  time: {
    type: String,
    default: currentTime
  }
});


module.exports = mongoose.model('Customer', CustomerInfo);