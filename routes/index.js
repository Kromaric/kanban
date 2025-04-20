const createApiRoutes = require("./api");
const createWebRoutes = require("./web");
const { Router } = require("express");

function createRoutes() {
  const router = Router();

  router.use("/api", createApiRoutes());
  router.use("/", createWebRoutes());

  return router;
}

module.exports = createRoutes;
