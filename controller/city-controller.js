const cityService = require("../service/city-service");

class CityController {
  async createCity(req, res, next) {
    const { name } = req.body;
    const { file } = req;
    try {
      const city = await cityService.createCity(name, file);
      res.status(201).json(city);
    } catch (error) {
      next(error);
    }
  }

  async getCities(req, res, next) {
    try {
      const cities = await cityService.getCities();
      return res.json(cities);
    } catch (e) {
      next(e);
    }
  }

  async getCityWithGuides(req, res, next) {
    try {
      const id = req.params.id;
      const cityWithGuides = await cityService.getUsersInCity(id);
      res.status(200).json(cityWithGuides);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new CityController();
