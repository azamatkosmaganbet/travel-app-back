const Message = require("../models/message-model");

class MessageService {
  async sendMessage(senderId, receiverId, content) {
    const message = new Message({
      sender: senderId,
      receiver: receiverId,
      content: content,
    });
    await message.save();
    return message;
  }
}

module.exports = new MessageService();
