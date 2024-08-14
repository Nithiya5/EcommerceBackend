const express = require('express');
const router = express.Router();
const productcontroller = require('../controller/ProductController')
const auth = require("../middleware/auth")

router.get('/products',productcontroller.getallproducts);
router.post('/addproduct',auth,productcontroller.addproduct);
router.patch('/editproduct/:id',auth,productcontroller.editproduct);
router.delete('/deleteproduct/:id',auth,productcontroller.deleteproduct);

module.exports = router;