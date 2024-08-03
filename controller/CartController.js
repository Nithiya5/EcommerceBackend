const cart = require('../model/CartModel');
const Product = require('../model/ProductModel');

const addtocart = async (req, res) => {
  try{
      
    const userid=req.user;

    const productid=req.body.productid;
    const quantity=req.body.quantity;
    const incart=await cart.findOne({userid});
    if(incart){
        const isProduct = incart.products.find(p => p.productid === productid);
        if (isProduct) {
            isProduct.quantity = (parseInt(isProduct.quantity) + parseInt(quantity)).toString();
        } else {
            incart.products.push({ productid, quantity });
        }
        await incart.save();
        res.send(incart);
    }else{
            const add=new cart({userid,products:[{productid,quantity}]});
            await add.save();
            res.send(add);
        }
    }
catch(err){
    console.log(err);
}
};

const getitem = async (req, res) => {
  try {
      const userid = req.user;
      const Cart = await cart.findOne({ userid });
      let totalprice = 0;
    
      if (Cart) {
          const arr = [];
          for (const item of Cart.products) {
            const product = await Product.findOne({ id: item.productid });
            let totalamt = product.price * item.quantity;
            totalprice += totalamt;
              if (product) {
                  arr.push({
                      title : product.title,
                      description : product.description,
                      price : product.price,
                      category : product.category,
                      image : product.image,
                      quantity: item.quantity,
                      amount:totalamt
                  });
              }
          }

          res.status(200).json({ Subtotal:totalprice,products: arr });
      } else {
          res.status(404).json({ msg: "Cart not found" });
      }
  } catch (error) {
      console.log(error);
      res.status(500).json({ msg: "Internal server error" });
  }
};
const deleteproduct = async (req, res) => {
  try {
      const productid = req.params.id;
      const userid = req.user;
      const Cart = await cart.findOne({ userid });
      
      if (!Cart) {
          return res.status(404).json({ error: "Cart not found" });
      }
       
      for (let i = 0; i < Cart.products.length; i++) {
          if (Cart.products[i].productid.toString() === productid) {
            if (Cart.products.length <= 1) {
              await cart.deleteOne({ userid });
              return res.status(200).json({ msg: "Cart deleted Successfully" });
          } 
           else{
              Cart.products.splice(i, 1); 
              await Cart.save(); 
              return res.status(200).json({ msg: "Deletion successful" });
           }
          }
      }
      return res.status(200).json({ msg: "product not found in the cart" });
  } catch (error) {
      console.log(error);
      res.status(500).json({ msg: "Internal server error" });
  }
};


module.exports = { addtocart , getitem , deleteproduct};
