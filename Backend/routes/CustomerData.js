const express = require('express');
const Router = express.Router();
const { body, validationResult } = require('express-validator');
const Customer = require('../schemas/Customer');

Router.post("/Add", [
  body("firstname", "First-Name Is Too Short").isLength({ min: 3 }),
  body("lastname", "Last-Name Is Too Short").isLength({ min: 3 }),
  body('email', 'Invalid email address').isEmail()
], async (req, res) => {
  const { firstname, lastname, phoneno,email } = req.body;
  console.log(req.body)
  const errorsOfBody = validationResult(req);
  if (!errorsOfBody.isEmpty()) {
    return res.json({ errors: errorsOfBody.array() });
  }
  const Customers = await Customer.create({
    firstname: firstname,
    lastname: lastname,
    phoneno: phoneno,
    email:email
  });
  console.log(Customers);
  res.json(Customers);
});

Router.post("/Del", async (req, res) => {

  try {
    const Wait=await Customer.findOneAndDelete({_id:req.body.id})
    res.send({mesg:"Is Deleted"})
  } catch (error) {
    console.log(error)
  }
  
});

Router.post("/Get", async (req, res) => {
  const { customerid } = req.body;
  console.log(customerid)
  console.log(req.body)
  const Bills = await Customer.findOne({_id:customerid})
  res.json(Bills);
});


Router.post("/Search",async(req,res)=>{
  try {
    const searchValue = req.body.search;
    const query = {
      firstname: { $regex: `^${searchValue}`, $options: 'i' }
    };
    const results = await Customer.find(query).exec();
    console.log(results);
    res.json(results);
  } catch (error) {
    res.json({ errors: error.message });
  }
});


Router.post("/Email",async(req,res)=>{
  try {
    const searchValue = req.body.search;
    const query = {
      email: { $regex: `^${searchValue}`, $options: 'i' }
    };
    const results = await Customer.find(query).exec();
    console.log(results);
    res.json(results);
  } catch (error) {
    res.json({ errors: error.message });
  }
});


Router.post("/Phone", async (req, res) => {
  try {
    const searchValue = req.body.search;
    const query = {
      phoneno: { $regex: `^${searchValue}`, $options: 'i' }
    };
    const results = await Customer.find(query).exec();
    console.log(results);
    res.json(results);
  } catch (error) {
    res.json({ errors: error.message });
  }
});


Router.post("/Id", async (req, res) => {
  try {
    const searchValue = req.body.search;
    
    const results = await Customer.find({_id:searchValue});
    console.log(results);
    res.json(results);
  } catch (error) {
    res.json({ errors: error.message });
  }
});



module.exports = Router;