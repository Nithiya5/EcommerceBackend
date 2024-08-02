const user = require('../model/UserModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const register = async(req,res)=>{
    try{
        const {name,email,password} = req.body;
        const exists = await user.findOne({email})
        if(!exists){
        const newuser = new user({
            name,
            email,
            password
        })
        
        await newuser.save();
        res.status(200).send({msg:"User created successfully"})
    }
    else{
        res.status(404).send({msg:"user already exists!!!!"})
    }
    }
    catch(error){
        res.status(500).send({msg:'Internal error',error})
    }
}


const login = async(req,res)=>{
    
    const{email,password}=req.body;
    const exists = await user.findOne({email});
    try{
    if(!exists){
        res.status(400).send({msg:"user not found create new user"})
    }
    const valid = await bcrypt.compare(password,exists.password);
    if(!valid){
        return res.status(400).send({msg:"please provide valid password"});
    }
    const token = jwt.sign({_id : exists._id},'secret_key',{
        expiresIn: "1h",
    })
    res.json({token});
}
catch(error){
   res.status(500).send({msg:"Internal server error",error})
}
}
module.exports = {register,login}