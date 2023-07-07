const express = require('express')
const Router = express.Router()
const Item=require('../schemas/Items')
const { body, validationResult } = require('express-validator');



Router.post("/ADD",[
    body("name","Name Is Too Short").isLength({min:3}),
    body("item_id","Item Should Cantain Atleast of 9 dight and first letter must be small f").isLength({min:9}),
    body("price", "Price must be a number").isNumeric(),
    body("totel", "Quantatiy must be a number").isNumeric()
], async (req, res) => {
  try {
    const {name,price,totel,item_id,}=req.body;
    const errorsofbody = validationResult(req);
    if (!errorsofbody.isEmpty()) {
      return res.json({ errors: errorsofbody.array() });
    }
    if(price<0||totel<0)
    {
        return res.json({errors:{msg:"Value Of Ammount and price Must be greater then 0"}})
    }
    if(item_id[0]!=='f')
    {
        return res.json({errors:{msg:"Item Should Cantain Atleast of 9 dight and first letter must be small f"}})
    }
    const get=await Item.findOne({name:name})
    if(get)
    {
        return res.json({errors:{msg:"Item For This Name Is Already Registered"}})
    }
    const get2=await Item.findOne({item_id:item_id})
    if(get2)
    {
        return res.json({errors:{msg:"Item For This ID Is Already Registered"}})
    }
    const Items= await Item.create({
        name:name,
        price: price,
        totel:totel ,
        item_id:item_id
    })
    console.log(Items)
    res.json(Items.name +" Is Created")
  } catch (error) {
    res.json({ errors: error.message });
  }
});


Router.post("/Update",[body("ammount", "ammount must be a number").isNumeric()],async(req,res)=>{
  var {item_id,ammount}=req.body;
  console.log(req.body)
  const errorsofbody = validationResult(req);
  if (!errorsofbody.isEmpty()) {
    return res.json({errors:{msg:"Value Of Ammount Must be Number"}})
  }
  const get=await Item.findOne({item_id:item_id})
  if(!get)
  {
      return res.json({errors:{msg:"No Item On This ID Is Present"}})
  }
  if(ammount<0)
  {
      return res.json({errors:{msg:"Value Of Ammount greater then 0"}})
  }
  const get1=await Item.findOne({item_id:item_id})
  var num = Number(ammount);
  num=num+get1.totel;
  console.log(ammount,get1.totel)
  const updatedItem = await Item.findOneAndUpdate(
    { item_id: item_id },
    { $set: { totel: num } },
    { new: true }
  );
  res.json({mes:updatedItem.totel+" "+updatedItem.name+" Are Availible" })

})

Router.post("/Update/price",[body("newprice", "ammount must be a number").isNumeric()],async(req,res)=>{
  const {item_id,newprice}=req.body;
  console.log(item_id,newprice)
  const get=await Item.findOne({item_id:item_id})
  const errorsofbody = validationResult(req);
  if (!errorsofbody.isEmpty()) {
    return res.json({errors:{msg:"Value Of Price Must be Number"}})
  }
  if(!get)
  {
      return res.json({errors:{msg:"No Item On This ID Is Present"}})
  }
  if(newprice<0)
  {
      return res.json({errors:{msg:"Value Of Ammount greater then 0"}})
  }
  const updatedItem = await Item.findOneAndUpdate(
    { item_id: item_id },
    { $set: { price: newprice } },
    { new: true }
  );
  res.json({msg:"New Price Of "+updatedItem.name+" Is "+updatedItem.price})

})


Router.post("/Delete",async(req,res)=>{
  const {item_id}=req.body;
  const get=await Item.findOne({item_id:item_id})
  if(!get)
  {
    return res.json({errors:{msg:"No Item On This ID Is Present"}})
  }
  const mar=await  Item.findOneAndDelete({item_id:item_id})
  res.json({msg:get.name+" Is Deleted"})

})



Router.post("/Search",async(req,res)=>{
  try {
    const searchValue = req.body.search;
    const query = {
      name: { $regex: `^${searchValue}`, $options: 'i' }
    };
    const results = await Item.find(query).exec();
    console.log(results);
    res.json(results);
  } catch (error) {
    res.json({ errors: error.message });
  }
});

Router.post("/GetAll",async(req,res)=>{
  try {
    const Items=await Item.find({})
    res.json(Items);
  } catch (error) {
    res.json({ errors: error.message });
  }
});



Router.post("/Update/Sale",[],async(req,res)=>{
  const items=req.body;
  var a=items.length;
  console.log(items,a)
  var i=0;
  var created=[]
  while(i<a)
  { 
    var {name,noofproduct}=items[i];
    const get1=await Item.findOne({name:name})
        console.log(get1)
    var num = Number(noofproduct);
    var no1=get1.totel-num
    if(no1<0)
    {
      return res.json({errors:{msg:"Totel Must Not Be Negative"}})
    }
    console.log(name,no1)
    const updatedItem = await Item.findOneAndUpdate(
      {name:name},
      { $set: { totel: no1 } },
      { new: true }
    );

    created.push(updatedItem)
    i++;
  }

  res.json({created})
})


module.exports = Router;