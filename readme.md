# People Hub API

## Setup Instructions

### 1. Clone Project

git clone https://github.com/AbhishekYadav44/people-hub.git

cd people-hub

### 2. Install Dependencies

npm install

### 3. Database Setup

Create MySQL database using:

database.sql


### 4. Environment Configuration

Create .env file:

PORT=3000
MYSQLHOST=localhost
MYSQLUSER=root
MYSQLPASSWORD=your_password
MYSQLDATABASE=peoplehub
MYSQLPORT=3306


### 5. Run Application

npm run dev


Server:

http://localhost:3000


---

# API Documentation


## Department APIs


### 1. Create Department

POST

/departments


Request Body:

{
 "departmentName":"IT"
}



### 2. Get Departments

GET

/departments



### 3. Update Department

PUT

/departments/:id



### 4. Delete Department

DELETE

/departments/:id



---

# Employee APIs


### 1. Add Employee

POST

/employees



Body:

{
 "employeeCode":"EMP001",
 "fullName":"John Doe",
 "email":"john@gmail.com",
 "mobile":"9876543210",
 "departmentId":1,
 "designation":"Developer",
 "salary":50000
}



### 2. Get Employees

GET

/employees


Features:

- Pagination
- Search
- Department filter
- Status filter



### 3. Get Employee By ID

GET

/employees/:id



### 4. Update Employee

PUT

/employees/:id



### 5. Delete Employee

DELETE

/employees/:id



### 6. Update Employee Status

PATCH

/employees/:id/status



Body:

{
 "status":"Inactive"
}



---

# Dashboard

GET

/dashboard


Returns employee and department statistics.



---

# Bonus API

GET

/employees/export


Exports employee data as CSV.


---

# Validations

- Employee Code must be unique
- Email must be unique
- Full Name is mandatory
- Department must exist
- Mobile contains only digits