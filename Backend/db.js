const mongoose=require('mongoose')
const mongooseurl="mongodb://localhost:27017/Inventory-System"


const Connection =()=>{
    mongoose.connect(mongooseurl)
    console.log("Connected")
}

module.exports=Connection;