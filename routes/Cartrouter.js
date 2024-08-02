const express = require('express');
const router = express.Router();
const cartcontroller = require('../controller/CartController');
const auth = require('../middleware/auth');

router.post('/addtocart',auth,cartcontroller.addtocart);
router.get('/getitem',auth,cartcontroller.getitem);
router.delete('/deletecartproduct/:id',auth,cartcontroller.deleteproduct);

module.exports = router;
