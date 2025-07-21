import mongoose from 'mongoose';

const tableSchema = new mongoose.Schema({
  name: String,
  status: {
    type: String,
    enum: ['available', 'reserved', 'billed'],
    default: 'available',
  },
});

export default mongoose.model('Table', tableSchema);
