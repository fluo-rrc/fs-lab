import express from "express";
import cors from "cors";
import { employeeController } from "./controllers/employeeController";
import { clerkMiddleware, requireAuth } from "@clerk/express";

const app = express();
app.use(cors());
app.use(express.json()); // Allows Express to read JSON bodies

app.use(clerkMiddleware());

// The Routes
app.get("/api/employees", employeeController.getDepartments);
app.post("/api/employees", requireAuth(), employeeController.createEmployee);

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
