import db from "../config/db.js";

export const createEmployee = async (
    employeeCode,
    fullName,
    email,
    mobile,
    departmentId,
    designation,
    salary
) => {

    const [result] = await db.query(
        `INSERT INTO employees 
        (employeeCode, fullName, email, mobile, departmentId, designation, salary)
        VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [
            employeeCode,
            fullName,
            email,
            mobile,
            departmentId,
            designation,
            salary
        ]
    );

    return result;
};