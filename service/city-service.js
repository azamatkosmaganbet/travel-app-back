const ApiError = require("../exceptions/api-error");
const CityModel = require("../models/city-model");
const GuideModel = require("../models/guide-model");
const UserModel = require("../models/user-model");
class CityService {
  async getCities() {
    const cities = await CityModel.find();
    return cities;
  }

  async createCity(name, image) {
    try {
      const city = new CityModel({ name, image: image.filename });
      await city.save();
      return city;
    } catch (error) {
      throw ApiError.BadRequest("Failed to create city");
    }
  }

  async getUsersInCity(id) {
    try {
      const city = await CityModel.findById(id);
      if (!city) {
        throw new Error("Город не найден");
      }

      const guides = await GuideModel.find({ cities: city._id }).populate("userId");

      const cityWithGuides = {
        city: city,
        guides: guides,
      };

      return cityWithGuides;
    } catch (e) {
      throw ApiError.BadRequest("Failed to create city");
    }
  }
}

module.exports = new CityService();
