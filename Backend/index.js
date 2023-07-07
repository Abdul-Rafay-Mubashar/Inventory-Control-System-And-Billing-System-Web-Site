const Connected=require("./db.js")
const express=require("express")
const cors=require('cors')


Connected();
const app = express()
const port = 5000





app.use(express.json());
app.use(cors());

app.use('/api/Item',require('./routes/ItemData'))
app.use('/api/Customer',require('./routes/CustomerData'))
app.use('/api/Bills',require('./routes/BillData'))
app.use('/api/BillsItems',require('./routes/BillItemData'))



console.log("Ok")


app.listen(port,()=>{
    console.log("Connected To Server",port)
})