const Review = require('../models/review-model');
const ApiError = require("../exceptions/api-error");
class ReviewService {
    async createReview(user, reviewer, rating, comment) {
      try {
        const review = new Review({
          user,
          reviewer,
          rating,
          comment
        });
        await review.save();
        return review;
      } catch (error) {
        throw ApiError.BadRequest('Не удалось создать отзыв');
      }
    }
  
    async getReviewsByUser(userId) {
      try {
        let reviews = await Review.find({ user: userId });
    
        if (reviews.length === 0) {
          return { reviews: [], avg: null }; // Объект с пустым массивом отзывов и средним рейтингом null
        }
        
        const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
        const averageRating = totalRating / reviews.length;

       
    
        return {reviews, avg: averageRating};  // Возвращаем массив отзывов и средний рейтинг
      } catch (error) {
        throw ApiError.BadRequest('Не удалось получить отзывы');
      }
    }
  
    // Другие методы, такие как удаление отзыва и т. д.
  }
  
  module.exports = new ReviewService();