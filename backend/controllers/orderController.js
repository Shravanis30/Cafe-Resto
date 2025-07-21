// import orderModel from "../models/orderModel.js";
// import userModel from "../models/userModel.js"
// import Stripe from "stripe";
// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// //config variables
// const currency = "inr";
// const deliveryCharge = 50;
// const getFrontendURL = (req) => {
//     const origin = req.headers.origin;
//     const whitelist = process.env.FRONTEND_URLS?.split(',').map(url => url.trim()) || [];

//     if (origin && whitelist.includes(origin)) {
//         return origin;
//     }
//     // Fallback to first URL if origin is not present or not allowed
//     return whitelist[0] || 'http://localhost:5173';
// };

// // const placeOrder = async (req, res) => {
// //     try {
// //         const newOrder = new orderModel({
// //             userId: req.body.userId,
// //             items: req.body.items,
// //             amount: req.body.amount,
// //             address: req.body.address,
// //             orderType: req.body.orderType || "delivery",
// //             tableNumber: req.body.tableNumber || null,
// //         });

// //         await newOrder.save();
// //         await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

// //         const line_items = req.body.items.map((item) => ({
// //             price_data: {
// //                 currency: currency,
// //                 product_data: { name: item.name },
// //                 unit_amount: item.price * 100,
// //             },
// //             quantity: item.quantity,
// //         }));

// //         line_items.push({
// //             price_data: {
// //                 currency: currency,
// //                 product_data: { name: "Delivery Charge" },
// //                 unit_amount: deliveryCharge * 100,
// //             },
// //             quantity: 1,
// //         });

// //         // const session = await stripe.checkout.sessions.create({
// //         //     success_url: `${frontend_URL}/verify?success=true&orderId=${newOrder._id}`,
// //         //     cancel_url: `${frontend_URL}/verify?success=false&orderId=${newOrder._id}`,
// //         //     line_items,
// //         //     mode: 'payment',
// //         // });
// //         const session = await stripe.checkout.sessions.create({
// //             success_url: `${frontend_URL}/api/order/verify?success=true&orderId=${newOrder._id}`,
// //             cancel_url: `${frontend_URL}/api/order/verify?success=false&orderId=${newOrder._id}`,
// //             line_items,
// //             mode: 'payment',
// //         });



// //         res.json({ success: true, session_url: session.url });
// //     } catch (error) {
// //         console.log(error);
// //         res.json({ success: false, message: "Error placing order" });
// //     }
// // };


// const placeOrder = async (req, res) => {
//     try {
//         const newOrder = new orderModel({
//             userId: req.body.userId,
//             items: req.body.items,
//             amount: req.body.amount,
//             address: req.body.address,
//             orderType: req.body.orderType || "delivery",
//             tableNumber: req.body.tableNumber || null,
//         });

//         await newOrder.save();
//         await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

//         const line_items = req.body.items.map((item) => ({
//             price_data: {
//                 currency: currency,
//                 product_data: { name: item.name },
//                 unit_amount: item.price * 100,
//             },
//             quantity: item.quantity,
//         }));

//         line_items.push({
//             price_data: {
//                 currency: currency,
//                 product_data: { name: "Delivery Charge" },
//                 unit_amount: deliveryCharge * 100,
//             },
//             quantity: 1,
//         });

//         const frontend_URL = getFrontendURL(req);

//         const session = await stripe.checkout.sessions.create({
//             success_url: `${frontend_URL}/verify?success=true&orderId=${newOrder._id}`,
//             cancel_url: `${frontend_URL}/verify?success=false&orderId=${newOrder._id}`,
//             line_items,
//             mode: 'payment',
//         });


//         res.json({ success: true, session_url: session.url });
//     } catch (error) {
//         console.log(error);
//         res.json({ success: false, message: "Error placing order" });
//     }
// };


// const placeOrderCod = async (req, res) => {
//     try {
//         const newOrder = new orderModel({
//             userId: req.body.userId,
//             items: req.body.items,
//             amount: req.body.amount,
//             address: req.body.address,
//             payment: true,
//             orderType: req.body.orderType || "delivery",
//             tableNumber: req.body.tableNumber || null,
//         });

//         await newOrder.save();
//         await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

//         res.json({ success: true, message: "Order Placed" });
//     } catch (error) {
//         console.log(error);
//         res.json({ success: false, message: "Error placing COD order" });
//     }
// };


// // Listing Order for Admin panel
// const listOrders = async (req, res) => {
//     try {
//         const orders = await orderModel.find({});
//         res.json({ success: true, data: orders })
//     } catch (error) {
//         console.log(error);
//         res.json({ success: false, message: "Error" })
//     }
// }

// // User Orders for Frontend
// const userOrders = async (req, res) => {
//     try {
//         const orders = await orderModel.find({ userId: req.body.userId });
//         res.json({ success: true, data: orders })
//     } catch (error) {
//         console.log(error);
//         res.json({ success: false, message: "Error" })
//     }
// }

// const updateStatus = async (req, res) => {
//     console.log(req.body);
//     try {
//         await orderModel.findByIdAndUpdate(req.body.orderId, { status: req.body.status });
//         res.json({ success: true, message: "Status Updated" })
//     } catch (error) {
//         res.json({ success: false, message: "Error" })
//     }

// }

// const verifyOrder = async (req, res) => {
//     const { orderId, success } = req.body;
//     try {
//         if (success === "true") {
//             await orderModel.findByIdAndUpdate(orderId, { payment: true });
//             res.json({ success: true, message: "Paid" })
//         }
//         else {
//             await orderModel.findByIdAndDelete(orderId)
//             res.json({ success: false, message: "Not Paid" })
//         }
//     } catch (error) {
//         res.json({ success: false, message: "Not  Verified" })
//     }

// }

// const verifyOrderGet = async (req, res) => {
//     const { orderId, success } = req.query;

//     try {
//         if (success === "true") {
//             await orderModel.findByIdAndUpdate(orderId, { payment: true });
//             res.redirect(`/myorders`);  // Redirect to a success page
//         } else {
//             await orderModel.findByIdAndDelete(orderId);
//             res.redirect(`/payment-failed`);  // Redirect to a failure page
//         }
//     } catch (error) {
//         res.redirect(`/payment-failed`);
//     }
// };


// export { placeOrder, listOrders, userOrders, updateStatus, verifyOrder, placeOrderCod, verifyOrderGet }


import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Config variables
const currency = "inr";
const deliveryCharge = 50;
const frontendURLs = process.env.FRONTEND_URLS.split(",");

// Dynamically determine the frontend URL based on request origin
const getFrontendURL = (req) => {
  const origin = req.headers.origin;
  return frontendURLs.includes(origin) ? origin : frontendURLs[0]; // fallback to first allowed origin
};

const placeOrder = async (req, res) => {
  try {
    const newOrder = new orderModel({
      userId: req.body.userId,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address,
      orderType: req.body.orderType || "delivery",
      tableNumber: req.body.tableNumber || null,
    });

    await newOrder.save();
    await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

    const line_items = req.body.items.map((item) => ({
      price_data: {
        currency: currency,
        product_data: { name: item.name },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    }));

    line_items.push({
      price_data: {
        currency: currency,
        product_data: { name: "Delivery Charge" },
        unit_amount: deliveryCharge * 100,
      },
      quantity: 1,
    });

    const frontend_URL = getFrontendURL(req);

    const session = await stripe.checkout.sessions.create({
      success_url: `${frontend_URL}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${frontend_URL}/verify?success=false&orderId=${newOrder._id}`,
      line_items,
      mode: "payment",
    });

    res.json({ success: true, session_url: session.url });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error placing order" });
  }
};

const placeOrderCod = async (req, res) => {
  try {
    const newOrder = new orderModel({
      userId: req.body.userId,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address,
      payment: true,
      orderType: req.body.orderType || "delivery",
      tableNumber: req.body.tableNumber || null,
    });

    await newOrder.save();
    await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

    res.json({ success: true, message: "Order Placed" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error placing COD order" });
  }
};

// Listing all orders (Admin)
const listOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    res.json({ success: true, data: orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error listing orders" });
  }
};

// Fetch user-specific orders
const userOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({ userId: req.body.userId });
    res.json({ success: true, data: orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error fetching user orders" });
  }
};

// Update order status
const updateStatus = async (req, res) => {
  try {
    await orderModel.findByIdAndUpdate(req.body.orderId, {
      status: req.body.status,
    });
    res.json({ success: true, message: "Status Updated" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error updating status" });
  }
};

// Verify order payment (API route)
const verifyOrder = async (req, res) => {
  const { orderId, success } = req.body;
  try {
    if (success === "true") {
      await orderModel.findByIdAndUpdate(orderId, { payment: true });
      res.json({ success: true, message: "Paid" });
    } else {
      await orderModel.findByIdAndDelete(orderId);
      res.json({ success: false, message: "Not Paid" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Verification failed" });
  }
};

// Verify order payment (GET route for redirect after Stripe checkout)
const verifyOrderGet = async (req, res) => {
  const { orderId, success } = req.query;

  try {
    if (success === "true") {
      await orderModel.findByIdAndUpdate(orderId, { payment: true });
      res.redirect(`/myorders`);
    } else {
      await orderModel.findByIdAndDelete(orderId);
      res.redirect(`/payment-failed`);
    }
  } catch (error) {
    console.log(error);
    res.redirect(`/payment-failed`);
  }
};

export {
  placeOrder,
  placeOrderCod,
  listOrders,
  userOrders,
  updateStatus,
  verifyOrder,
  verifyOrderGet,
};
