const product= require('../model/ProductModel');
const { v4: uuidv4 } = require('uuid');
const getallproducts = async(req,res)=>{
    
    try{
    const id = req.params.id;
    const Products = await product.find(id);
    if(Products){ 
        res.status(200).send(Products);
    }
    
    }
    catch(error){
        console.log(error);
        res.status(500).send({msg:'Internal server error'})
    }
   
}


const addproduct = async (req, res) => {
    try {
        const {title, description, price, category, image, rating } = req.body;
        const newProduct = new product({
            id:uuidv4(),
            title,
            description,
            price,
            category,
            image,
            rating:rating.map(r=>({
                rate:r.rate,
                count:r.count
            }))
        });
        await newProduct.save();
        res.status(201).send({msg:"Product added successfully"});
    } catch (error) {
        console.log(error);
        res.status(500).send({ msg: 'Internal server error' });
    }
};

const editproduct = async (req,res)=>{
     try{
        const id = req.params.id;
        const {title, description, price, category, image, rating } = req.body;
        const product1 = await product.findOneAndReplace({ id },{
             'id' : id,
            'title' :title,
            'description':description,
            'price' :price,
            'category' :category,
            'image' :image,
            'rating' : rating.map(r=>({
             rate: r.rate,
             count:r.count
            })),
            
            
       },{new:true});
        if(product1){
          res.status(200).send({msg:"Product updated successfully!!"});
        }
        else{
           res.status(404).send({msg:"Product was not updated successfully!!"});
        }
     }
     catch(error){
          res.status(500).send({msg : 'Internal server error'})
     }
}
const deleteproduct = async(req,res)=>{
    try{
        const id = req.params.id;
        const product2 = await product.findOne({ id });
        if(product2){
        await product.deleteOne({ id })
        res.status(200).send({msg:"Product deleted successfully!!"});
        }
        else{
        res.status(404).send({msg:"Product was not deleted successfully!!"});
        }
    }
    catch(error){
       res.status(500).send({msg:"Internal server error"});
    }
}
module.exports = {
    getallproducts,
    addproduct,
    editproduct,
    deleteproduct
};

