const RouteModel = require("../models/route-model");
const BookingModel = require("../models/booking-model");
const GuideModel = require("../models/guide-model");
const TripModel = require("../models/trip-model");
const ApiError = require("../exceptions/api-error");
class BookingService {
  async createBooking(
    date,
    city,
    name,
    phoneNumber,
    userId,
    tourId,
    guideId,
    adults,
    children
  ) {
    try {
      const tour = await TripModel.findById(tourId);
      console.log(tour);
      if (!tour) {
        throw ApiError.BadRequest("Tour not found");
      }

      // Проверяем существование гида
      const guide = await GuideModel.findOne({ userId: guideId });
      if (!guide) {
        throw ApiError.BadRequest("Guide not found");
      }

      const booking = new BookingModel({
        date,
        city,
        name,
        phoneNumber,
        user: userId,
        tour: tourId,
        guide: guideId,
        adults,
        children
      });
      await booking.save();
      return booking;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new BookingService();
