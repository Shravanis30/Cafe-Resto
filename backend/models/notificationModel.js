import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
  message: String,
  type: { type: String, enum: ['order', 'reservation'] },
  createdAt: { type: Date, default: Date.now },
  read: { type: Boolean, default: false },
  resourceId: String, // id of the order or reservation
});

export default mongoose.model('Notification', notificationSchema);
