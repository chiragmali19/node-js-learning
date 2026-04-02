import express from "express";

const app = express(); // Create an express app

app.use(express.json()); // Middleware to parse JSON request bodies

import userRouter from "./routes/user.route.js";

app.use("/api/v1/users", userRouter); // Use the user router for /api/v1/users routes   

// example route: http://localhost:4000/api/v1/users/register

export default app;

