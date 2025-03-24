const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const app = express();
const dotenv=require("dotenv")
const authRoute=require("./routes/authRoutes")
dotenv.config()

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
    connectDB();
});