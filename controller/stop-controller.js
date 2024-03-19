const stopService = require("../service/stop-service");

class StopController {
  async createStop(req, res) {
    try {
      const { name, description, route } = req.body;
      const { file } = req;
      const stop = await stopService.createStop(name, description,file, route);
      res.status(201).json(stop);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to create stop" });
    }
  }
}

module.exports = new StopController();
