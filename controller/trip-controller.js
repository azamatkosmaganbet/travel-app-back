const TripService = require("../service/trip-service");

class TripController {
  async createTrip(req, res, next) {
    const { guideId } = req.body;
    const tripData = req.body;
    const { file } = req;
    try {
      const trip = await TripService.createTrip(tripData, file);
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

  async getTrip(req, res, next) {
    const { id } = req.params;

    try {
      const trip = await TripService.getTrip(id);

      res.status(200).json(trip);
    } catch (error) {
      next(error);
    }
  }

  async updateTrip(req, res, next) {
    const { id } = req.params; // Извлекаем id из параметров запроса
    // Обратите внимание, что multer добавляет файл в req.file
    const { file } = req; 

    // Создаем объект обновления, включающий в себя данные из тела запроса
    const updateData = {
      ...req.body,
      // Если изображение было загружено, указываем путь к изображению в updateData
      image: file ? file.filename : req.body.image,
    };

    try {
      // Используем сервис для обновления поездки
      const updatedTrip = await TripService.updateTripById(id, updateData);

      // Отправляем обновленную поездку в качестве ответа клиенту
      res.status(200).json(updatedTrip);
    } catch (error) {
      // Если возникла ошибка, передаем её обработчику ошибок
      next(error);
    }
  }
}

module.exports = new TripController();
