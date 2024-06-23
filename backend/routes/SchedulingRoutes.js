const routes = require("express").Router();
const verifyToken = require("../helpers/verify-token");
const SchedulingController = require("../controller/SchedulingController");

routes.post("/:id/agendar", verifyToken, SchedulingController.scheduling);

routes.delete("/:id/deletar/:idAgendamento", verifyToken, SchedulingController.removeScheduling);

routes.get("/:id/adm", verifyToken, SchedulingController.getAllScheduling);
routes.get("/:id/cliente", verifyToken, SchedulingController.getSchedulingById);

module.exports = routes;
