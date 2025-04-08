import express from "express"; 
import registerDoctoresController from "../controllers/RegisterDoctoresController.js";

const router = express.Router();

router.route("/").post(registerDoctoresController.register);

export default router;