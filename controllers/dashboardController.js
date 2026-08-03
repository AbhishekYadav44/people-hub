import { getEmployeeStats } from "../models/employeeModel.js";


export const getDashboardController = async (req, res) => {
    try {

        const stats = await getEmployeeStats();

        return res.status(200).json(stats);

    } catch (error) {

        return res.status(500).json({
            message: error.message
        });

    }
};