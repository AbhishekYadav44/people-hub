import express from "express";
import dotenv from "dotenv";
import { initializeDatabase } from "./config/db.js";
import departmentRoutes from "./routes/departmentRoutes.js"
import employeeRoutes from "./routes/employeeRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js"
dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.send("People Hub API");
});

 

app.use("/departments", departmentRoutes);
app.use("/employees", employeeRoutes);
app.use("/dashboard", dashboardRoutes);


await initializeDatabase();

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});