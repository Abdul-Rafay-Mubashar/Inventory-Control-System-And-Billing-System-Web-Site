const express = require('express');
const Router = express.Router();
const BillItem = require('../schemas/BillItem');
const { findOneAndDelete } = require('../schemas/Customer');


Router.post("/Add", [], async (req, res) => {
  // console.log(req.body)
  const list=req.body;
  const listSize=list.length;
  var i=0;
    const createdItems = [];
  while (i<listSize) {
    const { billno,name, noofproduct,ammount } = list[i];
    const A={
      a:billno,
      b:ammount
    }
    console.log(A)
    const createdItem = await BillItem.create({
      billno: billno,
      name: name,
      noofproduct: noofproduct,
      ammount:ammount
    });
    console.log(createdItem)
    createdItems.push(createdItem);
    i++;
  }
  
  res.json(createdItems);
});

Router.post("/Get", [
], async (req, res) => {

  const { customerid } = req.body;
  console.log(req.body)
  const Bills = await BillItem.find({billno:customerid})
  res.json(Bills)
});


Router.post("/Delete/:id", [
], async (req, res) => {
    const ok=findOneAndDelete({_id:req.param.id})
});


module.exports = Router;