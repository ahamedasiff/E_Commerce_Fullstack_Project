import express from 'express'
import { placeOrder,
    placeOrderStripe,
    placeOrderRazorpay,
    allOrders,
    userOrders,
    updateStatus } from "../controllers/orderController.js";
import admintAuth from '../middleware/adminAuth.js'
import authUser from '../middleware/auth.js'

const orderRouter = express.Router()

//Admin Features
orderRouter.post('/list', admintAuth, allOrders)
orderRouter.post('/status', admintAuth, updateStatus)

//Payment Features
orderRouter.post('/place', authUser, placeOrder)
orderRouter.post('/stripe', authUser, placeOrderStripe)
orderRouter.post('/razorpay', authUser, placeOrderRazorpay)

//User Features
orderRouter.post('/user-orders', authUser, userOrders)

export default orderRouter
