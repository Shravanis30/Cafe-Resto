// import Table from '../models/tableModel.js';
// import Reservation from '../models/reservationModel.js';
// import Stripe from 'stripe';
// // import userModel from '../models/userModel.js';

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
// const FRONTEND_URL = process.env.FRONTEND_URL;

// export const getTables = async (req, res) => {
//   const tables = await Table.find();
//   res.json({ tables });
// };



// // export const bookTable = async (req, res) => {
// //   const { tableId } = req.body;
// //   const userId = req.body.userId;

// //   const table = await Table.findById(tableId);
// //   if (!table || table.status !== 'available') {
// //     return res.status(400).json({ message: 'Table not available' });
// //   }

// //   const amount = 10000;

// //   const reservation = await Reservation.create({
// //     table: tableId,
// //     userId,
// //     amount,
// //     paymentId: '',
// //     status: 'unpaid',
// //   });

// //   const session = await stripe.checkout.sessions.create({
// //     payment_method_types: ['card'],
// //     line_items: [
// //       {
// //         price_data: {
// //           currency: 'inr',
// //           product_data: { name: `Table Reservation - ${table.name}` },
// //           unit_amount: amount,
// //         },
// //         quantity: 1,
// //       },
// //     ],
// //     mode: 'payment',
// //     success_url: `${FRONTEND_URL}/verify-reservation?success=true&reservationId=${reservation._id}`,
// //     cancel_url: `${FRONTEND_URL}/verify-reservation?success=false&reservationId=${reservation._id}`,
// //   });

// //   await Table.findByIdAndUpdate(tableId, { status: 'reserved' });

// //   res.json({ success: true, session_url: session.url });
// // };

// export const bookTable = async (req, res) => {
//   const { tableId } = req.body;
//   const userId = req.body.userId; // ✅ Corrected

//   const table = await Table.findById(tableId);
//   if (!table || table.status !== 'available') {
//     return res.status(400).json({ message: 'Table not available' });
//   }

//   const amount = 10000;

//   const reservation = await Reservation.create({
//     table: tableId,
//     userId,
//     amount,
//     paymentId: '',
//     status: 'unpaid',
//   });

//   const session = await stripe.checkout.sessions.create({
//     payment_method_types: ['card'],
//     line_items: [
//       {
//         price_data: {
//           currency: 'inr',
//           product_data: { name: `Table Reservation - ${table.name}` },
//           unit_amount: amount,
//         },
//         quantity: 1,
//       },
//     ],
//     mode: 'payment',
//     success_url: `${FRONTEND_URL}/verify-reservation?success=true&reservationId=${reservation._id}`,
//     cancel_url: `${FRONTEND_URL}/verify-reservation?success=false&reservationId=${reservation._id}`,
//   });

//   await Table.findByIdAndUpdate(tableId, { status: 'reserved' });

//   res.json({ success: true, session_url: session.url });
// };


// export const verifyReservation = async (req, res) => {
//   const { reservationId, success } = req.query; // 👈 From query string (Stripe success/cancel redirect)

//   if (!reservationId) return res.status(400).json({ success: false, message: 'Reservation ID missing' });

//   const reservation = await Reservation.findById(reservationId);
//   if (!reservation) return res.status(404).json({ success: false, message: 'Reservation not found' });

//   if (success === 'true') {
//     await Reservation.findByIdAndUpdate(reservationId, { status: 'paid' });
//     res.redirect(`${FRONTEND_URL}/reservation-success`);
//   } else {
//     await Table.findByIdAndUpdate(reservation.table, { status: 'available' }); // Release table
//     await Reservation.findByIdAndDelete(reservationId); // Remove reservation
//     res.redirect(`${FRONTEND_URL}/reservation-failed`);
//   }
// };


// export const listReservations = async (req, res) => {
//   const reservations = await Reservation.find().populate('table').populate('userId');
//   res.json({ success: true, data: reservations });
// };


// // ✅ Add this in reservationController.js or tableController.js

// export const createTable = async (req, res) => {
//   try {
//     const { name } = req.body;
//     const newTable = await Table.create({ name });
//     res.status(201).json({ success: true, data: newTable });
//   } catch (error) {
//     res.status(500).json({ success: false, message: 'Failed to create table' });
//   }
// };

import dotenv from "dotenv";
import Table from '../models/tableModel.js';
import Reservation from '../models/reservationModel.js';
import Stripe from 'stripe';

dotenv.config(); // If not already called in entry file

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
// const FRONTEND_URLS = process.env.FRONTEND_URLS || 'http://localhost:5173';

const ALL_URLS = process.env.FRONTEND_URLS?.split(',') || [];
const FRONTEND_URLS = ALL_URLS[0]; // Choose the first one or based on logic

// ✅ Get Available Tables
export const getTables = async (req, res) => {
  const tables = await Table.find();
  res.json({ tables });
};

// ✅ Book Table and create Stripe checkout session
export const bookTable = async (req, res) => {
  const { tableId } = req.body;
  const userId = req.body.userId;

  const table = await Table.findById(tableId);
  if (!table || table.status !== 'available') {
    return res.status(400).json({ message: 'Table not available' });
  }

  const amount = 10000; // Rs.100

  const reservation = await Reservation.create({
    table: tableId,
    userId,
    amount,
    paymentId: '',
    status: 'unpaid',
  });

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'inr',
          product_data: { name: `Table Reservation - ${table.name}` },
          unit_amount: amount,
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    // success_url: `${FRONTEND_URL}/verify-reservation?success=true&reservationId=${reservation._id}`,
    // cancel_url: `${FRONTEND_URL}/verify-reservation?success=false&reservationId=${reservation._id}`,
    success_url: `${FRONTEND_URLS}/verify-reservation?success=true&reservationId=${reservation._id}`,
    cancel_url: `${FRONTEND_URLS}/verify-reservation?success=false&reservationId=${reservation._id}`,

  });

  // Tentatively reserve the table
  await Table.findByIdAndUpdate(tableId, { status: 'reserved' });

  res.json({ success: true, session_url: session.url });
};

// ✅ Verify Reservation — now correctly handles GET from frontend
export const verifyReservation = async (req, res) => {
  const { reservationId, success } = req.query;

  if (!reservationId) {
    return res.status(400).json({ message: "Reservation ID missing" });
  }

  const reservation = await Reservation.findById(reservationId);
  if (!reservation) {
    return res.status(404).json({ message: "Reservation not found" });
  }

  if (success === 'true') {
    await Reservation.findByIdAndUpdate(reservationId, { status: 'paid' });
    return res.redirect(`${FRONTEND_URLS}/reservation-success`);
  } else {
    await Table.findByIdAndUpdate(reservation.table, { status: 'available' });
    await Reservation.findByIdAndDelete(reservationId);
    return res.redirect(`${FRONTEND_URLS}/reservation-failed`);
  }
};


// ✅ Admin: Get all reservations
export const listReservations = async (req, res) => {
  const reservations = await Reservation.find()
    .populate('table')
    .populate('userId');
  res.json({ success: true, data: reservations });
};

// ✅ Admin: Create new table
export const createTable = async (req, res) => {
  try {
    const { name } = req.body;
    const newTable = await Table.create({ name });
    res.status(201).json({ success: true, data: newTable });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to create table' });
  }
};

