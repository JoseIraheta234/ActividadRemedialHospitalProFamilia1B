import express from 'express';
import registerPacienteController from '../controllers/registerPacientesController.js';

const router = express.Router();

router.route("/").post((registerPacienteController.registerPacientes));
router.route("/verifyCodeEmail").post(registerPacienteController.verifyCodeEmail);

export default router;