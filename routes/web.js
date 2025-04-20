const { Router } = require("express");

const homeController = require("../controllers/homeController");

function createWebRoutes() {
  const router = Router();

  router.get("/", homeController.homepage);

  return router;
}

module.exports = createWebRoutes;
