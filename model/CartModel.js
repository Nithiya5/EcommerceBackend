const mongoose = require('mongoose');
const cartschema = new mongoose.Schema({
    userid:{
        type:String,
        required:true,
        unique:true
    },
    products:[{
        productid:{
            type:String,
            required:true
        },
        quantity:{
            type:Number,
            required:true
        }

    }]
})
const cart = mongoose.model('Cart',cartschema);
module.exports = cart;