import prisma from "../db";

export const employeeRepo = {
  getDepartments: async () => {
    // Fetch all departments and attach their related employees
    return await prisma.department.findMany({
      include: {
        employees: true,
      },
    });
  },

  createEmployee: async (
    firstName: string,
    lastName: string,
    deptName: string,
  ) => {
    // Create the new employee and link them to the department by its unique name
    await prisma.employee.create({
      data: {
        firstName,
        lastName,
        department: {
          connect: { name: deptName },
        },
      },
    });

    // Return the updated list of departments to match your old app behavior
    return await prisma.department.findMany({
      include: {
        employees: true,
      },
    });
  },
};
