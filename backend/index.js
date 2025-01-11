import { config } from "dotenv"; // Load environment variables
import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import rootRouter from "./router/routes.js";

config(); // Initialize dotenv to use environment variables

const app = express();
const prisma = new PrismaClient();

// Middleware setup
app.use(
  cors({
    origin: "*", // Allow all origins (modify if needed for security)
  })
);
app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded request bodies

// Routers
app.use('/api/', rootRouter); // Use rootRouter for /api routes

// Default route (optional)
app.get("/", (req, res) => {
  res.send("Welcome to the API!");
});

// Server initialization
const PORT = process.env.PORT || 3000; // Use .env PORT or default to 3000
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
