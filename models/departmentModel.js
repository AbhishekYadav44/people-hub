import db from "../config/db.js";

export const createDepartment = async (departmentName) => {
    const [result] = await db.query(
        "INSERT INTO departments (departmentName) VALUES (?)",
        [departmentName]
    );

    return result;
};

export const getDepartments = async () => {
    const [rows] = await db.query(
        "SELECT * FROM departments"
    );

    return rows;
};

export const getDepartmentByName = async (departmentName) => {
    const [rows] = await db.query(
        "SELECT * FROM departments WHERE departmentName = ?",
        [departmentName]
    );

    return rows;
};

export const getDepartmentById = async (id) => {
    const [rows] = await db.query(
        "SELECT * FROM departments WHERE id = ?",
        [id]
    );

    return rows;
};

export const updateDepartment = async (id, departmentName) => {
    const [result] = await db.query(
        "UPDATE departments SET departmentName = ? WHERE id = ?",
        [departmentName, id]
    );

    return result;
};

export const deleteDepartment = async (id) => {
    const [result] = await db.query(
        "DELETE FROM departments WHERE id = ?",
        [id]
    );

    return result;
};

export const countEmployeesInDepartment = async (departmentId) => {
    const [rows] = await db.query(
        "SELECT COUNT(*) AS totalEmployees FROM employees WHERE departmentId = ?",
        [departmentId]
    );

    return rows[0];
};