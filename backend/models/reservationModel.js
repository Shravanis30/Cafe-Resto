import mongoose from 'mongoose';

const reservationSchema = new mongoose.Schema({
  table: { type: mongoose.Schema.Types.ObjectId, ref: 'Table' },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  status: { type: String, default: 'paid' },
  amount: Number,
  paymentId: String,
}, { timestamps: true });

export default mongoose.model('Reservation', reservationSchema);
