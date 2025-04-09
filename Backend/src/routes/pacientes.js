import express from "express";
import pacienteController from "../controllers/pacientesController.js";
const router = express.Router();

router.route("/").get(pacienteController.getPacientes)


router.route("/:id")
.put(pacienteController.updatePacientes)
.delete(pacienteController.deletePacientes)

export default router;