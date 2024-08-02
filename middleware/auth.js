const jwt = require('jsonwebtoken');

const auth = (req,res,next)=>{
    const token = req.header('Authorization').split(" ")[1];
    // const token = req.header('Authorization').replace("Bearer","");
    //getting the token from the header//
    //we can also use the split to make the array the bearer secret key provided by the user
    //after the key is realeased it will give the "secret key provided by the user"
    //to verify the token we use jwt.verify and the secret key
    if(!token) return res.status(401).json({error:"Token is required"})
    try{
        const decoded = jwt.verify(token,"secret_key");
        req.user = decoded._id;//user id is sent it will compare with that 
        next();
        console.log(req.user)
    }
    catch(error){
         res.status(200).send({msg:"Invalid token"})
    }
}
module.exports = auth;