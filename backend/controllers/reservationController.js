import Table from '../models/tableModel.js';
import Reservation from '../models/reservationModel.js';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const FRONTEND_URL = 'https://cafe-resto-5623.vercel.app';

export const getTables = async (req, res) => {
  const tables = await Table.find();
  res.json({ tables });
};

export const bookTable = async (req, res) => {
  const { tableId } = req.body;
  const userId = req.user._id;

  const table = await Table.findById(tableId);
  if (!table || table.status !== 'available') {
    return res.status(400).json({ message: 'Table not available' });
  }

  const amount = 10000; // ₹100 in paise

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
    success_url: `${FRONTEND_URL}/verify-reservation?success=true&reservationId=${reservation._id}`,
    cancel_url: `${FRONTEND_URL}/verify-reservation?success=false&reservationId=${reservation._id}`,
  });

  await Table.findByIdAndUpdate(tableId, { status: 'reserved' });

  res.json({ success: true, session_url: session.url });
};

export const verifyReservation = async (req, res) => {
  const { reservationId, success } = req.body;

  if (success === 'true') {
    await Reservation.findByIdAndUpdate(reservationId, { status: 'paid' });
    return res.json({ success: true, message: 'Reservation confirmed' });
  } else {
    const reservation = await Reservation.findById(reservationId);
    await Table.findByIdAndUpdate(reservation.table, { status: 'available' });
    await Reservation.findByIdAndDelete(reservationId);
    return res.json({ success: false, message: 'Reservation cancelled' });
  }
};

export const listReservations = async (req, res) => {
  const reservations = await Reservation.find().populate('table').populate('userId');
  res.json({ success: true, data: reservations });
};


// ✅ Add this in reservationController.js or tableController.js

export const createTable = async (req, res) => {
  try {
    const { name } = req.body;
    const newTable = await Table.create({ name });
    res.status(201).json({ success: true, data: newTable });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to create table' });
  }
};
