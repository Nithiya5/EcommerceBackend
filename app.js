const express = require('express');
const app = express();
const bodyparser = require('body-parser')
const mongoose = require('mongoose');
const cors = require('cors');
app.use(express.json());//stores the parsed data in the middleware
app.use(cors());// used to handle the cors error
const productroutes = require('./routes/Productrouter')
const userroutes = require('./routes/Userrouter')
const cartroutes = require('./routes/Cartrouter')
const orderroutes = require('./routes/Orderrouter')
mongoose.connect('mongodb+srv://jayasudhat2022cse:69Lb2LWOBjUepozS@cluster05.olvpemp.mongodb.net/Ecommerce').then(()=>{
    console.log("Connection is successful!!!!");
});

app.set('view engine','ejs');
app.use('/api',productroutes);
app.use('/api',userroutes);
app.use('/api',cartroutes);
app.use('/api',orderroutes)

app.listen(8000,()=>{
    console.log("Listening on port 8000.");
})