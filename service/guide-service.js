const GuideModel = require("../models/guide-model");
const UserModel = require("../models/user-model");
const ApiError = require("../exceptions/api-error");
const TripModel = require("../models/trip-model");
const CityModel = require("../models/city-model");

class GuideService {
  async createGuideRequest(userId, data) {
    const existingRequest = await GuideModel.findOne({
      userId,
      status: "pending",
    });

    const user = await UserModel.findById(userId);
    if (user && user.role === "guide") {
      throw ApiError.BadRequest("Вы уже являетесь гидом");
    }

    if (existingRequest) {
      throw ApiError.BadRequest("Вы уже отправили запрос на становление гида");
    }

    const guideRequest = new GuideModel({
      userId,
      ...data,
    });

    return await guideRequest.save();
  }

  async updateGuideRequestStatus(requestId, status) {
    return await GuideModel.findByIdAndUpdate(
      requestId,
      { status },
      { new: true }
    ).populate("userId");
  }

  async getPendingGuideRequests() {
    return await GuideModel.find({ status: "pending" })
      .populate({
        path: "cities",
        select: "name",
      })
      .populate("userId");
  }

  async getGuideById(id) {
    const user = await GuideModel.findOne({ userId: id })
      .populate("userId")
      .populate("cities");

    return user;
  }

  async getGuides() {
    const guides = await GuideModel.find()
      .populate("userId")
      .populate("cities");

    return guides;
  }

  // async updateGuideRequestStatus(requestId, status) {
  //   const updatedRequest = await GuideModel.findByIdAndUpdate(
  //     requestId,
  //     { status: "accepted" },
  //     { new: true }
  //   );

  //   if (!updatedRequest) {
  //     throw ApiError.BadRequest("Запрос не найден");
  //   }

  //   return updatedRequest;
  // }
}

module.exports = new GuideService();
