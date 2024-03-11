const ApiError = require("../exceptions/api-error");
const guideService = require("../service/guide-service");
const userService = require("../service/user-service");
class GuideController {
  async sendGuideRequest(req, res, next) {
    try {
      // Меняем на req.body, так как данные приходят в теле запроса

      const { userId, data } = req.body;

      await guideService.createGuideRequest(userId, data);

      // Возвращаем ответ клиенту
      res.json({ success: true, message: "Запрос успешно отправлен" });
    } catch (err) {
      next(err); // Прокидываем ошибку в следующий middleware для обработки
    }
  }

  async getPendingGuideRequests(req, res, next) {
    try {
      const pendingRequests = await guideService.getPendingGuideRequests();
      res.json({ success: true, pendingRequests });
    } catch (error) {
      next(error);
    }
  }

  async getGuideById(req, res, next) {
    try {
      const id = req.params.id;
      const user = await guideService.getGuideById(id);

      if (!user) {
        throw ApiError.BadRequest("Гид не найден");
      }

      return res.json(user);
    } catch (e) {
      next(e);
    }
  }

  async getGuides(req, res, next) {
    try {
      const users = await guideService.getGuides();
      return res.json(users);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new GuideController();
