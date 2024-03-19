const { Schema, model } = require("mongoose");

const BookingSchema = new Schema({
  date: { type: Date, required: true },
  city: { type: String, required: true },
  name: { type: String, required: true },
  adults: { type: Number, default: 1 }, 
  children: { type: Number, default: 0 },
  phoneNumber: { type: String, required: true },
  tour: { type: Schema.Types.ObjectId, ref: "Trip", required: true },
  guide: { type: Schema.Types.ObjectId, ref: "Guide", required: true },
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

module.exports = model("Booking", BookingSchema);
