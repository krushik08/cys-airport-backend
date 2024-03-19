import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const schema = new Schema(
  {
    flightNo: String,
    departureTime: String,
    arrivalTime: String,
    takenTime: String,
    name: String,
    imgPath: String,
    price: Number,
  },
  {
    collection: 'Flight',
  }
);
export default mongoose.model('Flight', schema);
