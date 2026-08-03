import express from "express";

import {
    createEmployeeController,
    getEmployeesController,
    getEmployeeByIdController,
    updateEmployeeController,
    deleteEmployeeController,
    updateEmployeeStatusController
} from "../controllers/employeeController.js";


const router = express.Router();


router.post("/", createEmployeeController);

// router.get("/", getEmployeesController);

// router.get("/:id", getEmployeeByIdController);

// router.put("/:id", updateEmployeeController);

// router.delete("/:id", deleteEmployeeController);

// router.patch("/:id/status", updateEmployeeStatusController);


export default router;