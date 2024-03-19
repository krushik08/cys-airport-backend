import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const schema = new Schema(
  {
    firstName: String,
    lastName: String,
    passPortNumber: String,
    DOB: Date,
    passportExpiry: Date,
    gender: String,
    phoneNumber: Number,
    email: String,
    departureAirport: String,
    arrivalAirport: String,
    departureLocation: String,
    departureDate: Date,
    status: String,
    arrivalLocation: String,
    PNRNumber: String,
    createAt: Date,
    baggageTag: [String],
    flightId: {
      type: Schema.Types.ObjectId,
      ref: 'Flight', // Reference to the Flight model
    },
  },
  {
    collection: 'BookFlight',
  }
);
export default mongoose.model('BookFlight', schema);
