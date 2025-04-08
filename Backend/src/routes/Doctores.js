import express from "express";
import DoctoresController from "../controllers/DoctoresController.js";

const router = express.Router();

router.route("/").get(DoctoresController.getDoctores)


router.route("/:id")
.put(DoctoresController.updateDoctores)
.delete(DoctoresController.deleteDoctores);

export default router;