import express from 'express';
import isAuth from '../middleware/isAuth.js';
import adminAuth from '../middleware/adminAuth.js';
import { placeOrder, userOrders, allOrders, updateOrderStatus, placeOrderWithRazorpay, verifyRazorpayPayment} from '../controllers/orderController.js';

const orderRoutes = express.Router();

// FOR USERS
orderRoutes.post("/placeorder", isAuth, placeOrder);

orderRoutes.post("/razorpay", isAuth, placeOrderWithRazorpay);

orderRoutes.post("/razorpay/verify", isAuth, verifyRazorpayPayment);

orderRoutes.get("/userorders", isAuth, userOrders);

// FOR ADMIN

orderRoutes.get("/allorders", adminAuth, allOrders);
orderRoutes.put("/updateorderstatus", adminAuth, updateOrderStatus);

export default orderRoutes;