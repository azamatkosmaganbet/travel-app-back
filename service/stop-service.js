const RouteModel = require("../models/route-model");
const StopModel = require("../models/stop-model");
const GuideModel = require("../models/guide-model");
const ApiError = require("../exceptions/api-error");
class StopService {
  async createStop(name, description, image, routeId) {
    try {
      const stop = new StopModel({
        name,
        description,
        image: image.filename,
        route: routeId,
      });
      await stop.save();

      // Обновление маршрута с добавленной остановкой
      await RouteModel.findByIdAndUpdate(routeId, {
        $push: { stops: stop._id },
      });

      return stop;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new StopService();
