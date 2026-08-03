import db from "../config/db.js";


export const createEmployee = async (employeeCode,fullName,email, mobile,departmentId, designation,salary) => {

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


export const getEmployeeByCode = async (employeeCode) => {

    const [rows] = await db.query(
        "SELECT * FROM employees WHERE employeeCode = ?",
        [employeeCode]
    );

    return rows;
};


export const getEmployeeByEmail = async (email) => {

    const [rows] = await db.query(
        "SELECT * FROM employees WHERE email = ?",
        [email]
    );

    return rows;
};


export const departmentExists = async (departmentId) => {

    const [rows] = await db.query(
        "SELECT * FROM departments WHERE id = ?",
        [departmentId]
    );

    return rows;
};


export const getEmployees = async (limit,offset,search,departmentId,status) => {

    let query = `
        SELECT 
        employees.*,
        departments.departmentName
        FROM employees
        LEFT JOIN departments
        ON employees.departmentId = departments.id
        WHERE 1=1
    `;

    let values = [];


    if (search) {
        query += " AND fullName LIKE ?";
        values.push(`%${search}%`);
    }


    if (departmentId) {
        query += " AND departmentId = ?";
        values.push(departmentId);
    }


    if (status) {
        query += " AND status = ?";
        values.push(status);
    }


    query += " LIMIT ? OFFSET ?";

    values.push(limit, offset);


    const [rows] = await db.query(query, values);

    return rows;
};



export const getEmployeeById = async (id) => {

    const [rows] = await db.query(
        `
        SELECT 
        employees.*,
        departments.departmentName
        FROM employees
        JOIN departments
        ON employees.departmentId = departments.id
        WHERE employees.id = ?
        `,
        [id]
    );

    return rows;
};



export const updateEmployee = async (
    id,
    fullName,
    email,
    mobile,
    departmentId,
    designation,
    salary
) => {

    const [result] = await db.query(
        `
        UPDATE employees
        SET 
        fullName=?,
        email=?,
        mobile=?,
        departmentId=?,
        designation=?,
        salary=?
        WHERE id=?
        `,
        [
            fullName,
            email,
            mobile,
            departmentId,
            designation,
            salary,
            id
        ]
    );

    return result;
};



export const deleteEmployee = async (id) => {

    const [result] = await db.query(
        "DELETE FROM employees WHERE id=?",
        [id]
    );

    return result;
};



export const updateEmployeeStatus = async (id, status) => {

    const [result] = await db.query(
        "UPDATE employees SET status=? WHERE id=?",
        [
            status,
            id
        ]
    );

    return result;
};



export const getEmployeeStats = async () => {

    const [employees] = await db.query(
        "SELECT COUNT(*) AS totalEmployees FROM employees"
    );


    const [departments] = await db.query(
        "SELECT COUNT(*) AS totalDepartments FROM departments"
    );


    return {
        totalEmployees: employees[0].totalEmployees,
        totalDepartments: departments[0].totalDepartments
    };
};