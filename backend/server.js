// import express from "express"
// import cors from 'cors'
// import { connectDB } from "./config/db.js"
// import userRouter from "./routes/userRoute.js"
// import foodRouter from "./routes/foodRoute.js"
// import 'dotenv/config'
// import cartRouter from "./routes/cartRoute.js"
// import orderRouter from "./routes/orderRoute.js"
// import reservationRouter from './routes/reservationRoutes.js';
// import rateLimit from 'express-rate-limit';

// // app config
// const app = express()
// const port = process.env.PORT || 4000;


// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 min
//   max: 100, // limit each IP to 100 requests per windowMs
// });
// app.use(limiter);

// // middlewares
// app.use(express.json())
// const allowedOrigins = process.env.CORS_ORIGIN?.split(',').map(origin => origin.trim());

// app.use(cors({
//   origin: function (origin, callback) {
//     if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
//     return callback(new Error('Not allowed by CORS'));
//   },
//   credentials: true,
// }));

// app.options('*', cors({
//   origin: function (origin, callback) {
//     if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
//     return callback(new Error('Not allowed by CORS'));
//   },
//   credentials: true
// }));



// // db connection
// connectDB()

// // api endpoints
// app.use("/api/user", userRouter)
// app.use("/api/food", foodRouter)
// app.use("/images", express.static('uploads'))
// app.use("/api/cart", cartRouter)
// app.use("/api/order", orderRouter)
// app.use('/api/reservation', reservationRouter);
// app.get("/", (req, res) => {
//   res.send("API Working")
// });

// app.listen(port, () => console.log(`Server started on http://localhost:${port}`))


import express from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";
import 'dotenv/config';

import { connectDB } from "./config/db.js";
import userRouter from "./routes/userRoute.js";
import foodRouter from "./routes/foodRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
import reservationRouter from './routes/reservationRoutes.js';

// Connect DB
connectDB();

// App
const app = express();
const port = process.env.PORT || 5000;

// Rate Limit
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});
app.use(limiter);

// JSON Parser
app.use(express.json());

// ✅ CORS Setup
const allowedOrigins = process.env.CORS_ORIGIN?.split(',').map(o => o.trim()) || [];

// app.use(cors({
//   origin: function (origin, callback) {
//     if (!origin || allowedOrigins.includes(origin)) {
//       return callback(null, true);
//     }
//     console.log(`Blocked by CORS: ${origin}`);
//     return callback(new Error("Not allowed by CORS"));
//   },
//   credentials: true,
// }));

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
    return callback(new Error("Not allowed by CORS"));
  },
  credentials: true,
}));
// Images
app.use("/images", express.static("uploads"));


// Routes
app.use("/api/user", userRouter);
app.use("/api/food", foodRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);
app.use("/api/reservation", reservationRouter);

app.get("/", (req, res) => {
  res.send("API Working");
});

// Server
app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
