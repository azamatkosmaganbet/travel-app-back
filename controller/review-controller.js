const reviewService = require('../service/review-service');

class ReviewController {
  async createReview(req, res) {
    const { userId, reviewerId, rating, comment } = req.body;
    try {
      const review = await reviewService.createReview(userId, reviewerId, rating, comment);
      res.json({ success: true, review });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async getReviewsByUser(req, res) {
    const userId = req.params.guideId;
    try {
      const reviews = await reviewService.getReviewsByUser(userId);
      res.json(reviews);
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  // другие методы
}

module.exports = new ReviewController();