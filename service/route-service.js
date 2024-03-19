const RouteModel = require("../models/route-model");
const TripModel = require("../models/trip-model");
const GuideModel = require("../models/guide-model");
const ApiError = require("../exceptions/api-error");
class RouteService {
  async createRoute(name, tripId) {
    try {
      const route = new RouteModel({ name, trip: tripId });
      await route.save();

      await TripModel.findByIdAndUpdate(tripId, {
        $push: { routes: route._id },
      });

      
      return route;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new RouteService();
