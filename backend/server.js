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
import notificationRoutes from './routes/notificationRoute.js';

const app = express();
app.set("trust proxy", 1);

const port = process.env.PORT || 5000;


connectDB();
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:5174',
  'https://cafe-resto-two.vercel.app',
  'https://cafe-resto-production.up.railway.app',
  'https://cafe-resto-5623.vercel.app'

];


const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.error('Blocked by CORS:', origin); // for debugging
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000,
//   max: 100,
//   standardHeaders: true,
//   legacyHeaders: false,
// });
// app.use(limiter);


// Rate limit middleware
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10-minute window
  max: 1000,                // allow 1000 requests per window per IP
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);

app.use(express.json());

app.use("/images", express.static("uploads"));

app.use("/api/user", userRouter);
app.use("/api/food", foodRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);
app.use("/api/reservation", reservationRouter);
app.use('/api/notifications', notificationRoutes);

// ✅ Test Route
app.get("/", (req, res) => {
  res.send("API Working ✅");
});

// ✅ Start Server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
