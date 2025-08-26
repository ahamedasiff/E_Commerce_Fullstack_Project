import orderModel from '../models/orderModel.js'
import userModel from '../models/userModel.js'

// Placing order using COD
const placeOrder = async (req, res) => {

    try {
        const { userId, items, amount, address} = req.body

        const orderData = {
            userId,
            items,
            amount,
            address,
            paymentMethod: 'COD',
            payment: false,
            date: Date.now()
        }

        const newOrder = new orderModel(orderData)
        await newOrder.save()

        await userModel.findByIdAndUpdate(userId, {cartData: {}})

        res.json({success : true, message: "Order Placed"})

    } catch (error) {
        console.log(error);
        res.json({success : false, message: error.message})    
    }
    
}

// Placing order using stripe 

const placeOrderStripe = async (req, res) => {
    
}

// Placing order using razorpay

const placeOrderRazorpay = async (req, res) => {
    
}

// All orders Data for Admin Panel
const allOrders = async (req, res) => {
    
}

// user orders Data for frontend
const userOrders = async (req, res) => {
    try {
        const { userId } = req.body

        const orders = await orderModel.find({ userId })
        res.json({success : true, orders})


    } catch (error) {
        console.log(error);
        res.json({success : false, message: error.message}) 
    }    
}

//update order status from Admin Panel
const updateStatus = async (req, res) => {
    
}

export {
    placeOrder,
    placeOrderStripe,
    placeOrderRazorpay,
    allOrders,
    userOrders,
    updateStatus
}