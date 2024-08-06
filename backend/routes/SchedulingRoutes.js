const routes = require("express").Router();
const verifyToken = require("../helpers/verify-token");
const SchedulingController = require("../controller/SchedulingController");

routes.post("/:id/agendar", SchedulingController.scheduling);

routes.delete("/:id/deletar/:idAgendamento", verifyToken, SchedulingController.removeScheduling);

routes.get("/:id/adm", SchedulingController.getAllScheduling);
routes.get("/:id/cliente", SchedulingController.getSchedulingById);
routes.get("/:id/horarios", SchedulingController.getAvailableTimeslots);

module.exports = routes;
