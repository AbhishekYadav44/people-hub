import express from "express";
import {  createDepartmentController, deleteDepartmentController, getDepartmentsController, updateDepartmentController } from "../controllers/departmentController.js";

const router = express.Router();

router.post("/",createDepartmentController);

router.get("/",getDepartmentsController);
router.put("/:id",updateDepartmentController);
router.delete("/:id",deleteDepartmentController);

export default router;