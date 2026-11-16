import Order from "../models/order.model.js";
import User from "../models/user.model.js";
import Razorpay from "razorpay";
import crypto from "crypto";

// console.log("KEY ID:", process.env.RAZORPAY_KEY_ID ? "Loaded" : "Missing");

// console.log("KEY SECRET:", process.env.RAZORPAY_KEY_SECRET ? "Loaded" : "Missing");

const razorpayInstance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
});


// FOR USERS
// export const placeOrder = async(req, res) =>{
//     try{
//         const {items, amount, address} = req.body;
//         const userId = req.userId;
//         const orderData = {
//             items,
//             amount,
//             userId,
//             address,
//             paymentMethod: 'COD',
//             payment: false,
//             date: Date.now()
//         }

//         const newOrder = new Order(orderData)
//         await newOrder.save()

//         await User.findByIdAndUpdate(userId, {cartData: {}})
//         return res.status(200).json({message: "Order placed successfully"})
//     }catch(err){
//         console.log(err)
//         return res.status(500).json({message: "Error placing order"})
//     }
// }

export const placeOrder = async (req, res) => {
    try {
        const { items, amount, address, paymentMethod } = req.body;
        const userId = req.userId;

        if (!items || items.length === 0 || !amount || !address) {
            return res.status(400).json({
                success: false,
                message: "Missing order information"
            });
        }

        const newOrder = new Order({
            items,
            amount,
            userId,
            address,
            paymentMethod: paymentMethod || "cod",
            payment: false,
            date: Date.now()
        });

        await newOrder.save();

        await User.findByIdAndUpdate(userId, {
            cartData: {}
        });

        return res.status(201).json({
            success: true,
            message: "Order placed successfully",
            order: newOrder
        });

    } catch (err) {
        console.log("Place Order Error:", err);

        return res.status(500).json({
            success: false,
            message: "Error placing order"
        });
    }
};

// export const placeOrderWithRazorpay = async(req, res) =>{
//     try{
//         const {items, amount, address} = req.body;
//         const userId = req.userId;
//         const orderData = {
//             items,
//             amount,
//             userId,
//             address,
//             paymentMethod: 'razorpay',
//             payment: false,
//             date: Date.now()
//         }
//         const newOrder = new Order(orderData)
//         await newOrder.save()

//         const options = {
//             amount: amount * 100, // Amount in paise
//             currency: "INR",
//             receipt: newOrder._id.toString(),
//         };
//         const razorpayOrder = await razorpayInstance.orders.create(options);
//         return res.status(200).json({message: "Order placed with Razorpay", order: newOrder, razorpayOrder});
//     }catch(err){
//         console.log(err)
//         return res.status(500).json({message: "Error placing order with Razorpay"})
//     }
// }


export const placeOrderWithRazorpay = async (req, res) => {
    try {
        const { items, amount, address } = req.body;
        const userId = req.userId;

        // Create MongoDB order first
        const newOrder = new Order({
            items,
            amount,
            userId,
            address,
            paymentMethod: "razorpay",
            payment: false,
            date: Date.now()
        });

        await newOrder.save();

        // Create Razorpay order
        const options = {
            amount: Math.round(amount * 100),
            currency: "INR",
            receipt: newOrder._id.toString()
        };

        const razorpayOrder = await razorpayInstance.orders.create(options);

        // IMPORTANT: Save Razorpay Order ID in MongoDB
        newOrder.razorpayOrderId = razorpayOrder.id;
        await newOrder.save();

        return res.status(200).json({
            success: true,
            message: "Razorpay order created successfully",
            order: newOrder,
            razorpayOrder
        });

    } catch (err) {
        console.log("Razorpay Order Error:", err);

        return res.status(500).json({
            success: false,
            message: "Error placing order with Razorpay"
        });
    }
};



// export const verifyRazorpayPayment = async (req, res) => {
//     try {
//         const userId = req.userId;

//         const {
//             razorpay_order_id,
//             razorpay_payment_id,
//             razorpay_signature
//         } = req.body;

//         // Find order using Razorpay order ID
//         const order = await Order.findOne({
//             userId,
//             razorpayOrderId: razorpay_order_id
//         });

//         if (!order) {
//             return res.status(404).json({
//                 message: "Order not found"
//             });
//         }

//         // Generate signature
//         const body = razorpay_order_id + "|" + razorpay_payment_id;

//         const expectedSignature = crypto
//             .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
//             .update(body)
//             .digest("hex");

//         // Verify signature
//         if (expectedSignature !== razorpay_signature) {
//             return res.status(400).json({
//                 message: "Invalid payment signature"
//             });
//         }

//         // Update payment status
//         order.payment = true;
//         order.paymentId = razorpay_payment_id;

//         await order.save();

//         return res.status(200).json({
//             message: "Payment verified successfully"
//         });

//     } catch (error) {
//         console.log("Razorpay Verification Error:", error);

//         return res.status(500).json({
//             message: "Error verifying Razorpay payment",
//             error: error.message
//         });
//     }
// };


// export const verifyRazorpayPayment = async(req, res) =>{
//     try{
//         const userId = req.userId;
//         const {razorpay_order_id, razorpay_payment_id, razorpay_signature} = req.body;

//         const order = await Order.findOne({userId, _id: razorpay_order_id});
//         if(!order){
//             return res.status(404).json({message: "Order not found"})
//         }

//         order.payment = true;
//         await order.save();

//         return res.status(200).json({message: "Razorpay payment verified successfully"})

//     }catch(err){
//         console.log(err)
//         return res.status(500).json({message: "Error verifying Razorpay payment"})
//     }
// }


export const verifyRazorpayPayment = async (req, res) => {
    try {
        const userId = req.userId;

        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature
        } = req.body;

        // Find order using Razorpay Order ID
        const order = await Order.findOne({
            userId,
            razorpayOrderId: razorpay_order_id
        });

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found"
            });
        }

        // Generate payment signature
        const body = razorpay_order_id + "|" + razorpay_payment_id;

        const expectedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(body)
            .digest("hex");

        // Verify signature
        if (expectedSignature !== razorpay_signature) {
            return res.status(400).json({
                success: false,
                message: "Invalid payment signature"
            });
        }

        // Update order
        order.payment = true;
        order.paymentId = razorpay_payment_id;

        await order.save();

        return res.status(200).json({
            success: true,
            message: "Payment verified successfully"
        });

    } catch (error) {
        console.log("Verification Error:", error);

        return res.status(500).json({
            success: false,
            message: "Error verifying Razorpay payment"
        });
    }
};






export const userOrders = async (req, res) =>{
    try{
        const userId = req.userId;
        const orders = await Order.find({userId}).sort({date: -1})
        return res.status(200).json({orders})
    }catch(err){
        console.log(err)
        return res.status(500).json({message: "Error fetching user orders"})
    }
}



// FOR ADMIN

export const allOrders = async (req, res) => {
    try {
        const orders = await Order.find().sort({ date: -1 });

        return res.status(200).json({
            success: true,
            orders
        });

    } catch (err) {
        console.error("All Orders Controller Error:", err);

        return res.status(500).json({
            success: false,
            message: "Error fetching all orders",
            error: err.message
        });
    }
};


export const updateOrderStatus = async (req, res) =>{
    try{
        const {orderId, status} = req.body;
        const order = await Order.findById(orderId)
        if(!order){
            return res.status(404).json({message: "Order not found"})
        }
        order.status = status;
        await order.save();
        return res.status(200).json({message: "Order status updated successfully"})
    }catch(err){
        console.log(err)
        return res.status(500).json({message: "Error updating order status"})
    }
}