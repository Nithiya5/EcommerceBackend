const mongoose = require('mongoose');
const productschema = new mongoose.Schema({
    id : {
        type:String,
        unique:true
    },
    title:{
        type:String,
        required:[true,'title is required']
        },
    description:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    category:{
        type:String,
    },
    image:{
        type:String,
    },
    rating:[{
        rate:{
           type:Number
        },
        count:{
            type:Number
        }      
}]
})
const product = mongoose.model('Product',productschema);
module.exports = product;