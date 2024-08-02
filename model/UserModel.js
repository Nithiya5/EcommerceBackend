const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')
const Userschema =  new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:[true,'email is required'],
        unique:true
    },
    password:{
        type:String,
        required:[true,'password is required']
    }
})

Userschema.pre('save', async function(next){
    if(!this.isModified('password')){
        return next();
    }
    const salt = await bcrypt.genSalt(10); //it hash into ten bytes if the paramater 
    // value goes to **100** increase the computation power will be increased, so use 10 as default
    this.password = await bcrypt.hash(this.password,salt);
    next();
})
const user = mongoose.model('User',Userschema);
module.exports = user;