const ApiError = require("../exceptions/api-error");
const guideService = require("../service/guide-service");
const userService = require("../service/user-service");
class GuideController {
  async sendGuideRequest(req, res, next) {
    try { // Меняем на req.body, так как данные приходят в теле запроса

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
}

module.exports = new GuideController();
