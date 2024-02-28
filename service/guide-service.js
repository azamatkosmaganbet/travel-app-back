const GuideModel = require("../models/guide-model");
const ApiError = require("../exceptions/api-error");
class GuideService {
  async createGuideRequest(userId, data) {
    const existingRequest = await GuideModel.findOne({
      userId,
      status: "pending",
    });

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
}

module.exports = new GuideService();
