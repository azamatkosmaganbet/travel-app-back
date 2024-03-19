const routeService = require("../service/route-service");

class RouteController {
  async createRoute(req, res) {
    try {
      const { name, tripId } = req.body;
      const route = await routeService.createRoute(name, tripId);
      res.status(201).json(route);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to create route" });
    }
  }
}

module.exports = new RouteController();
