const TripModel = require("../models/trip-model");
const UserModel = require("../models/user-model");
const GuideModel = require("../models/guide-model");
const ApiError = require("../exceptions/api-error");
class TripService {
  async createTrip(guideId, tripData, image) {
    try {
      // Проверяем, существует ли гид
      const guide = await GuideModel.findOne({ userId: guideId });

      if (!guide) {
        throw ApiError.BadRequest("Guide not found");
      }

      const selectedCity = tripData.city;
      if (!guide.cities.includes(selectedCity)) {
        throw ApiError.BadRequest(
          "Selected city is not available for the guide"
        );
      }

      // Создаем трип
      const trip = await TripModel.create({
        guide: guideId,
        ...tripData,
        image: image.filename,
      });

      // Добавляем созданный трип в список трипов гида
      guide.trips.push(trip);
      await guide.save();

      return trip;
    } catch (error) {
      throw ApiError.BadRequest("Error creating trip", error);
    }
  }

  async getTripsByGuideId(guideId) {
    try {
      // Проверяем, существует ли гид
      const guide = await UserModel.findById(guideId);

      if (!guide) {
        throw ApiError.BadRequest("Guide not found");
      }

      // Получаем все трипы для данного гида
      const trips = await TripModel.find({ guide: guideId }).populate("guide");

      return trips;
    } catch (error) {
      throw ApiError.BadRequest("Error retrieving trips", error);
    }
  }

  async getTrip(id) {
    try {
      const trip = await TripModel.findById(id)
        .populate("guide")
        .populate({
          path: "routes",
          populate: {
            path: "stops",
          },
        })
        .populate("guide");;

      if (!trip) { 
        throw ApiError.BadRequest("Trip not found");
      }

      return trip
    } catch (e) {
      throw ApiError.BadRequest("Error retrieving trip", e);
    }
  }
}

module.exports = new TripService();
