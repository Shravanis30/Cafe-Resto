// correctly workign on frontend

// import express from "express";
// import cors from "cors";
// import rateLimit from "express-rate-limit";
// import 'dotenv/config';

// import { connectDB } from "./config/db.js";
// import userRouter from "./routes/userRoute.js";
// import foodRouter from "./routes/foodRoute.js";
// import cartRouter from "./routes/cartRoute.js";
// import orderRouter from "./routes/orderRoute.js";
// import reservationRouter from './routes/reservationRoutes.js';

// // Connect DB
// connectDB();

// // App
// const app = express();
// const port = process.env.PORT || 5000;

// // Rate Limit
// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000,
//   max: 100
// });
// app.use(limiter);

// // JSON Parser
// app.use(express.json());
// app.set("trust proxy", 1); // trust the first proxy (required for rate limiting and correct IP logging)

// // ✅ CORS Setup
// const allowedOrigins = process.env.CORS_ORIGIN?.split(',').map(o => o.trim()) || [];

// // app.use(cors({
// //   origin: function (origin, callback) {
// //     if (!origin || allowedOrigins.includes(origin)) {
// //       return callback(null, true);
// //     }
// //     console.log(`Blocked by CORS: ${origin}`);
// //     return callback(new Error("Not allowed by CORS"));
// //   },
// //   credentials: true,
// // }));

// app.use(cors({
//   origin: (origin, callback) => {
//     if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
//     return callback(new Error("Not allowed by CORS"));
//   },
//   credentials: true,
// }));
// // Images
// app.use("/images", express.static("uploads"));


// // Routes
// app.use("/api/user", userRouter);
// app.use("/api/food", foodRouter);
// app.use("/api/cart", cartRouter);
// app.use("/api/order", orderRouter);
// app.use("/api/reservation", reservationRouter);

// app.get("/", (req, res) => {
//   res.send("API Working");
// });

// // Server
// app.listen(port, () => {
//   console.log(`🚀 Server running at http://localhost:${port}`);
// });



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

const app = express();
const port = process.env.PORT || 5000;

// 👉 Required when behind a proxy like Railway or Vercel for IP-based middlewares
app.set("trust proxy", 1);

// 🚀 DATABASE
connectDB();

// ✅ CORS SETUP
const allowedOrigins = process.env.CORS_ORIGIN?.split(',').map(origin => origin.trim());

// ✅ CORS Middleware
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    console.log("❌ CORS blocked origin:", origin);
    return callback(new Error("Not allowed by CORS"));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
};
app.use(cors(corsOptions));
// Allow preflight requests globally
app.options('*', cors(corsOptions));

// ✅ Rate Limiting - AFTER setting trust proxy
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);

// ✅ JSON Body Parser
app.use(express.json());

// ✅ Static Files
app.use("/images", express.static("uploads"));

// ✅ All Routes
app.use("/api/user", userRouter);
app.use("/api/food", foodRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);
app.use("/api/reservation", reservationRouter);

// ✅ Test Route
app.get("/", (req, res) => {
  res.send("API Working ✅");
});

// ✅ Start Server
app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
