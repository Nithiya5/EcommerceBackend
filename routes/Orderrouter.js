const express = require('express');
const router = express.Router();
const ordercontroller = require('../controller/OrderController');
const auth = require('../middleware/auth');

router.post('/addorder',auth,ordercontroller.createOrder);
router.get('/getorder',auth,ordercontroller.getorder);

module.exports = router;