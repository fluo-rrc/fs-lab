import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import { organizationData } from "../src/data/organizationData";
import { leadershipData } from "../src/data/leadershipData";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Seeding database...");

  // 1. Seed Departments and Employees
  for (const dept of organizationData) {
    await prisma.department.create({
      data: {
        name: dept.name,
        employees: {
          create: dept.employees.map((emp) => ({
            firstName: emp.firstName,
            lastName: emp.lastName,
          })),
        },
      },
    });
  }

  // 2. Seed Roles and Officers
  for (const leader of leadershipData) {
    await prisma.role.create({
      data: {
        title: leader.role,
        officer: {
          create: {
            firstName: leader.firstName,
            lastName: leader.lastName,
          },
        },
      },
    });
  }

  console.log("Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
