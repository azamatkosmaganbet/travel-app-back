const BookingService = require("../service/booking-service");

class BookingController {
  async createBooking(req, res, next) {
    try {
      const {
        date,
        city,
        name,
        phoneNumber,
        userId,
        tourId,
        guideId,
        adults,
        children,
      } = req.body;
      const booking = await BookingService.createBooking(
        date,
        city,
        name,
        phoneNumber,
        userId,
        tourId,
        guideId,
        adults,
        children
      );
      res.status(201).json(booking);
    } catch (error) {
      next(error);
    }
  }

  async getToursByUser(req, res, next) {
    try {
      const { userId } = req.params;
      const tours = await BookingService.getToursByUser(userId);
      res.status(200).json(tours);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new BookingController();
