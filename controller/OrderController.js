const Order = require('../model/OrderModel');
const User = require('../model/UserModel');
const Cart = require('../model/CartModel');
const Product = require('../model/ProductModel');
const { v4: uuidv4 } = require('uuid');

const createOrder = async (req, res) => {
  try {
    const { name, address, phoneno } = req.body;
    const userId = req.user; 

    
    const user = await User.findById(userId);
    const cart = await Cart.findOne({ userid: userId });

    
    if (!user) {
      console.log("User not found for ID:", userId);
      return res.status(404).json({ message: 'User not found' });
    }
    if (!cart) {
      console.log("Cart not found for user ID:", userId);
      return res.status(404).json({ message: 'Cart not found' });
    }

    
    if (!Array.isArray(cart.products)) {
      console.log("Cart products is not an array for user ID:", userId);
      return res.status(400).json({ message: 'Cart products is not an array' });
    }

   
    let totalAmt = 0;
    for (const item of cart.products) {
      console.log("Processing cart item:", item);

      
      const product = await Product.findOne({ id: item.productid });
      if (!product) {
        console.log(`Product with ID ${item.productid} not found`);
        return res.status(404).json({ message: `Product with ID ${item.productid} not found` });
      }
      totalAmt += product.price * item.quantity; 
    }

    
    const newOrder = new Order({
      orderid : uuidv4(),
      userid: userId,
      name: name || user.name,
      email: user.email,
      address: address || user.address,
      phoneno: phoneno || user.phoneno,
      products: cart.products,
      totalamount: totalAmt,
      orderdate: new Date(),
      estimatedate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
    });

    
    await newOrder.save();
    await Cart.findOneAndDelete({ userid: userId });

    res.status(201).send({msg : " order placed successfully " });
  } 
  catch (error) {
    console.error("Error creating order:", error);
    res.status(500).send({ message: "Internal server error" });
  }
};
const getorder = async (req,res)=>{
  try {
    const userid = req.user;
    const order = await Order.findOne({ userid });
  
  
    if (order) {
        const arr = [];
        for (const item of order.products) {
          const product = await Product.findOne({ id: item.productid });

            if (product) {
                arr.push({
                    title : product.title,
                    description : product.description,
                    price : product.price,
                    category : product.category,
                    image : product.image,
                    quantity: item.quantity,
                   
                });
            }
        }

        res.status(200).json({orderid:order.orderid, products: arr,totalamount:order.totalamount,
          orderdate:order.orderdate,
          estimatedate:order.estimatedate ,
        orderstatus:order.orderstatus});
    } else {
        res.status(404).json({ msg: "Order not found" });
    }
} catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal server error" });
}
}

module.exports = { createOrder,getorder };
