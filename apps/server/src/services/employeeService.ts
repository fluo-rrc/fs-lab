import { employeeRepo } from "../repositories/employeeRepo";

export const employeeService = {
  getDepartments: async () => {
    // Await the database call
    return await employeeRepo.getDepartments();
  },

  createEmployee: async (
    firstName: string,
    lastName: string,
    deptName: string,
  ) => {
    // Await the database call to check existing departments
    const departments = await employeeRepo.getDepartments();
    const departmentExists = departments.some((d) => d.name === deptName);

    if (!departmentExists)
      return { success: false, error: "Department does not exist." };
    if (firstName.length < 3)
      return {
        success: false,
        error: "First Name must have at least three characters.",
      };

    // Await the creation of the new employee
    await employeeRepo.createEmployee(firstName, lastName, deptName);
    return { success: true };
  },
};
