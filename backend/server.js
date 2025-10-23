require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const taskRoutes = require("./routes/taskRoutes");

const app = express();
app.use(cors());
app.use(express.json());

const MONGO_URL=process.env.MONGO_URL ;
const PORT=process.env.PORT || 3000;

console.log("Project started");

app.use("/api/tasks", taskRoutes);


connectDB(MONGO_URL)
.then(async() => {

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);    
    })
})
.catch((err) => {

    console.error("Failed to connect to MongoDB", err);
});