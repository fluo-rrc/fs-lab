import { employeeRepo } from "../repositories/employeeRepo";

export const employeeService = {
  getDepartments: () => {
    return employeeRepo.getDepartments();
  },

  createEmployee: async (
    firstName: string,
    lastName: string,
    deptName: string,
    token: string,
  ) => {
    const departments = await employeeRepo.getDepartments();
    const departmentExists = departments.some((d) => d.name === deptName);

    // Frontend Business Logic Validations
    if (!departmentExists) {
      return { success: false, error: "Department does not exist." };
    }

    if (firstName.length < 3) {
      return {
        success: false,
        error: "First Name must have at least three characters.",
      };
    }

    try {
      // Send authenticated POST request to the Express backend
      const response = await fetch("http://localhost:3000/api/employees", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ firstName, lastName, deptName }),
      });

      if (!response.ok) {
        // Attempt to parse any error message sent back from Express
        const errorData = await response.json().catch(() => ({}));
        return {
          success: false,
          error:
            errorData.error ||
            "Server authentication failed or request was rejected.",
        };
      }

      return { success: true, error: null };
    } catch (error) {
      console.error("Failed to post employee:", error);
      return { success: false, error: "A network error occurred." };
    }
  },
};
