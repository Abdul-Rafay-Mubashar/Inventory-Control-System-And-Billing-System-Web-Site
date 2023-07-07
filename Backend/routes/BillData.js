const express = require('express');
const Router = express.Router();
const Bill = require('../schemas/Bill');

Router.post("/Add", async (req, res) => {
  const { customerid,totel } = req.body;
  console.log(req.body)
  const Bills = await Bill.create({
    customerid:customerid,
    totel:totel
  });
  res.json(Bills);
});


Router.post("/Get", async (req, res) => {
  const { customerid } = req.body;
  console.log(req.body)
  const Bills = await Bill.findOne({customerid:customerid})
  res.json(Bills);
});

Router.post("/GetAll", async (req, res) => {
    const { customerid } = req.body;
    const Bills = await Bill.find({customerid:customerid})
    res.json(Bills);
  });

module.exports = Router;