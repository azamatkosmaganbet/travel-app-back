const GuideModel = require("../models/guide-model");
const UserModel = require("../models/user-model");
const ApiError = require("../exceptions/api-error");
const TripModel = require("../models/trip-model");
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
    );
  }

  async getPendingGuideRequests() {
    return await GuideModel.find({ status: "pending" }).populate("userId");
  }

  async getGuideById(id) {
    const user = await GuideModel.findOne({ userId: id }).populate("userId");

    return user;
  }

  async getGuides() {
    const guides = await GuideModel.find().populate("userId");

    return guides;
  }

}

module.exports = new GuideService();
