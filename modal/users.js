import mongoose from 'mongoose';
const schema = new mongoose.Schema(
  {
    email: String,
    password: String,
  },
  {
    collection: 'User',
  }
);

export default mongoose.model('User', schema);
