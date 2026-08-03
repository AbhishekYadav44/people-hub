import {
    createDepartment,
    getDepartments,
    getDepartmentByName,
    getDepartmentById,
    updateDepartment,
    deleteDepartment,
    countEmployeesInDepartment
} from "../models/departmentModel.js";

export const createDepartmentController = async (req, res) => {
    try {
        const { departmentName } = req.body;

        if (!departmentName) {
            return res.status(400).json({
                message: "Department name is required"
            });
        }

        const department = await getDepartmentByName(departmentName);

        if (department.length > 0) {
            return res.status(400).json({
                message: "Department already exists"
            });
        }

        await createDepartment(departmentName);

        return res.status(201).json({
            message: "Department created successfully"
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};

export const getDepartmentsController = async (req, res) => {
    try {
        const departments = await getDepartments();

        return res.status(200).json(departments);

    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};


export const updateDepartmentController = async (req, res) => {
    try {
        const { id } = req.params;
        const { departmentName } = req.body;

        if (!departmentName) {
            return res.status(400).json({
                message: "Department name is required"
            });
        }

        const department = await getDepartmentById(id);

        if (department.length === 0) {
            return res.status(404).json({
                message: "Department not found"
            });
        }

        await updateDepartment(id, departmentName);

        return res.status(200).json({
            message: "Department updated successfully"
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};


export const deleteDepartmentController = async (req, res) => {
    try {
        const { id } = req.params;

        const department = await getDepartmentById(id);

        if (department.length === 0) {
            return res.status(404).json({
                message: "Department not found"
            });
        }

        const employees = await countEmployeesInDepartment(id);

        if (employees.totalEmployees > 0) {
            return res.status(400).json({
                message: "Department cannot be deleted because employees exist"
            });
        }

        await deleteDepartment(id);

        return res.status(200).json({
            message: "Department deleted successfully"
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};