import { Request, Response } from "express";
import { employeeService } from "../services/employeeService";

export const employeeController = {
  getDepartments: async (req: Request, res: Response) => {
    try {
      // Await the service
      const data = await employeeService.getDepartments();
      res.json(data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to fetch departments" });
    }
  },

  createEmployee: async (req: Request, res: Response) => {
    try {
      const { firstName, lastName, deptName } = req.body;

      // Await the service
      const result = await employeeService.createEmployee(
        firstName,
        lastName,
        deptName,
      );

      if (result.success) {
        res.status(201).json({ message: "Employee created" });
      } else {
        res.status(400).json({ error: result.error });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to create employee" });
    }
  },
};
