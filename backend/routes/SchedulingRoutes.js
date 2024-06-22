const routes = require("express").Router();
const verifyToken = require("../helpers/verify-token");
const SchedulingController = require("../controller/SchedulingController");

routes.post("/:id/agendar", verifyToken, SchedulingController.scheduling);

routes.delete("/:id", verifyToken, SchedulingController.removeScheduling);

routes.get("/", verifyToken, SchedulingController.getAllScheduling);

module.exports = routes;
