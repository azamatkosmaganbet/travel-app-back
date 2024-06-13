const RouteModel = require("../models/route-model");
const BookingModel = require("../models/booking-model");
const GuideModel = require("../models/guide-model");
const UserModel = require("../models/user-model");
const TripModel = require("../models/trip-model");
const ApiError = require("../exceptions/api-error");
const MailService = require("../service/mail-service");
class BookingService {  async createBooking(
  date,
  city,
  name,
  phoneNumber,
  userId,
  tourId,
  guideId,
  adults,
  children
) {
  try {
    const tour = await TripModel.findById(tourId);
    if (!tour) {
      throw ApiError.BadRequest("Tour not found");
    }

    // Проверяем существование гида
    const guide = await GuideModel.findOne({ userId: guideId });
    if (!guide) {
      throw ApiError.BadRequest("Guide not found");
    }

    // Получаем информацию о пользователе
    const user = await UserModel.findById(userId);
    if (!user) {
      throw ApiError.BadRequest("User not found");
    }

    // Получаем информацию о гиде (пользователе)
    const guideUser = await UserModel.findById(guideId);
    if (!guideUser) {
      throw ApiError.BadRequest("Guide's user not found");
    }

    const booking = new BookingModel({
      date,
      city,
      name,
      phoneNumber,
      user: userId,
      tour: tourId,
      guide: guideId,
      adults,
      children
    });
    await booking.save();
    console.log(user, guideUser)
    // Формируем сообщение для пользователя
    const userMessage = `
      <p>Ваше бронирование подтверждено.</p>
      <p>Дата: ${date}</p>
      <p>Город: ${city}</p>
      <p>Спасибо за использование нашего сервиса!</p>
    `;
    await MailService.sendMail(
      user.email,
      'Booking Confirmation',
      userMessage
    );

    // Формируем сообщение для гида
    const guideMessage = `
      <p>У вас новое бронирование.</p>
      <p>Дата: ${date}</p>
      <p>Город: ${city}</p>
      <p>Имя: ${user.name} ${user.surname}</p>
      <p>Номер телефона: ${user.phone}</p>
      <p>Пожалуйста, свяжитесь с клиентом для уточнения деталей.</p>
    `;
    await MailService.sendMail(
      guideUser.email,
      'New Booking',
      guideMessage
    );

    return booking;
  } catch (error) {
    throw error;
  }
}


  async getToursByUser(userId) {
    try {
      // Находим все бронирования, связанные с данным пользователем
      const bookings = await BookingModel.find({ user: userId }).populate("tour").populate("guide").populate("user");
      
      // Извлекаем только туры из бронирований
      const tours = bookings

      return tours;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new BookingService();
