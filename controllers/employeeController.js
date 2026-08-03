import { createEmployee,getEmployeeByCode,getEmployeeByEmail,departmentExists,getEmployees,getEmployeeById,updateEmployee,deleteEmployee,
    updateEmployeeStatus
} from "../models/employeeModel.js";

export const createEmployeeController = async (req, res) => {
    try {

        const { employeeCode, fullName, email, mobile, departmentId, designation, salary} = req.body;


        if (!fullName) {
            return res.status(400).json({
                message: "Full name is required"
            });
        }

        const employeeCodeExist = await getEmployeeByCode(employeeCode);

        if (employeeCodeExist.length > 0) {
            return res.status(400).json({
                message: "Employee code already exists"
            });
        }

        const emailExist = await getEmployeeByEmail(email);

        if (emailExist.length > 0) {
            return res.status(400).json({
                message: "Email already exists"
            });
        }

        const department = await departmentExists(departmentId);

        if (department.length === 0) {
            return res.status(400).json({
                message: "Department not found"
            });
        }

        if (mobile && !/^[0-9]+$/.test(mobile)) {
            return res.status(400).json({
                message: "Mobile should contain only digits"
            });
        }

        await createEmployee(
            employeeCode,
            fullName,
            email,
            mobile,
            departmentId,
            designation,
            salary
        );


        return res.status(201).json({
            message: "Employee created successfully"
        });


    } catch (error) {

        return res.status(500).json({
            message: error.message
        });

    }
};

export const getEmployeesController = async (req, res) => {
    try {

        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;

        const offset = (page - 1) * limit;


        const {
            search,
            departmentId,
            status
        } = req.query;


        const employees = await getEmployees(
            limit,
            offset,
            search,
            departmentId,
            status
        );


        return res.status(200).json({
            page,
            limit,
            data: employees
        });


    } catch (error) {

        return res.status(500).json({
            message: error.message
        });

    }
};

export const getEmployeeByIdController = async (req, res) => {
    try {

        const { id } = req.params;

        const employee = await getEmployeeById(id);


        if (employee.length === 0) {
            return res.status(404).json({
                message: "Employee not found"
            });
        }


        return res.status(200).json(employee[0]);


    } catch (error) {

        return res.status(500).json({
            message: error.message
        });

    }
};

export const updateEmployeeController = async (req, res) => {
    try {

        const { id } = req.params;


        const {
            fullName,
            email,
            mobile,
            departmentId,
            designation,
            salary
        } = req.body;


        await updateEmployee(
            id,
            fullName,
            email,
            mobile,
            departmentId,
            designation,
            salary
        );


        return res.status(200).json({
            message: "Employee updated successfully"
        });


    } catch (error) {

        return res.status(500).json({
            message: error.message
        });

    }
};



export const deleteEmployeeController = async (req, res) => {
    try {

        const { id } = req.params;


        await deleteEmployee(id);


        return res.status(200).json({
            message: "Employee deleted successfully"
        });


    } catch (error) {

        return res.status(500).json({
            message: error.message
        });

    }
};



export const updateEmployeeStatusController = async (req, res) => {
    try {

        const { id } = req.params;

        const { status } = req.body;


        if (!["Active", "Inactive"].includes(status)) {
            return res.status(400).json({
                message: "Invalid status"
            });
        }


        await updateEmployeeStatus(id, status);


        return res.status(200).json({
            message: "Employee status updated"
        });


    } catch (error) {

        return res.status(500).json({
            message: error.message
        });

    }
};