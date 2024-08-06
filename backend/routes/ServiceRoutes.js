const router = require("express").Router();
const ServiceController = require("../controller/ServiceController");

const verifyToken = require("../helpers/verify-token");

router.get("/", ServiceController.getAllServicos);
router.get("/:id", ServiceController.getServiceById);
router.post("/:id/cadastrar", verifyToken, ServiceController.registrarServico);
router.patch("/:id/editar/:servicoId", verifyToken, ServiceController.editarServico);
router.delete("/:id/editar/:servicoId", verifyToken, ServiceController.deletarServico);


module.exports = router;
