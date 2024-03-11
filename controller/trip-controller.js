const TripService = require("../service/trip-service");

class TripController {
  async createTrip(req, res, next) {
    const { guideId } = req.body;
    const tripData = req.body;
    const { file } = req;
    try {
      const trip = await TripService.createTrip(guideId, tripData, file);
      res.status(201).json(trip);
    } catch (error) {
      next(error);
    }
  }

  async getTripsByGuideId(req, res, next) {
    const { guideId } = req.params;

    try {
      const trips = await TripService.getTripsByGuideId(guideId);
      res.status(200).json(trips);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new TripController();
