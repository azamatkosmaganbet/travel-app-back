const TripModel = require("../models/trip-model");
const UserModel = require("../models/user-model");
const GuideModel = require("../models/guide-model");
const ApiError = require("../exceptions/api-error");
const CityModel = require("../models/city-model");
const fs = require("fs");
class TripService {
  async createTrip(tripData, image) {
    // console.log(tripData, image);
    try {
      // Проверяем, существует ли гид
      const guide = await GuideModel.findOne({ userId: tripData.guideId });

      if (!guide) {
        throw ApiError.BadRequest("Guide not found");
      }

      const city = await CityModel.findById(tripData.city);
      if (!city) {
        throw ApiError.BadRequest("City not found");
      }

      // Создаем трип
      const trip = await TripModel.create({
        guide: tripData.guideId,
        image: image.filename,
        title: tripData.title,
        description: tripData.description,
        day: tripData.day,
        price: tripData.price,
        city: tripData.cityId,
      });
      console.log(trip);
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
        .populate("guide");

      if (!trip) {
        throw ApiError.BadRequest("Trip not found");
      }

      return trip;
    } catch (e) {
      throw ApiError.BadRequest("Error retrieving trip", e);
    }
  }

  async updateTripById(id, updateData) {
    try {
      
      // Используем findByIdAndUpdate для обновления поездки
      const updatedTrip = await TripModel.findByIdAndUpdate(id, updateData, {
        new: true, // Возвращаем обновленный объект
        runValidators: true, // Запускаем валидацию перед обновлением
      })
        .populate("guide")
        .populate({
          path: "routes",
          populate: {
            path: "stops",
          },
        })
        .populate("guide");

      // Если поездка не найдена, выбрасываем исключение
      if (!updatedTrip) {
        throw new Error("Trip not found");
      }

      // Возвращаем обновленную поездку
      return updatedTrip;
    } catch (error) {
      throw new Error(`Error updating trip: ${error.message}`);
    }
  }
}

module.exports = new TripService();
