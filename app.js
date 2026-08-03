import express from "express";
import dotenv from "dotenv";
import db from "./config/db.js"

dotenv.config();

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.send("People Hub API");
});

async function main() {

    const connection = await db.getConnection();

}

main().then(() => {
    console.log("db connected!")
}).catch((e) => {
    console.log(e)
})



const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});