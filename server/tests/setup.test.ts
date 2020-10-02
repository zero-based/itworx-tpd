import path from "path";
import { createConnection, getConnection } from "typeorm";
import { BaseSeederType } from "./seeders/BaseSeeder";
import { EmployeeProfileSeeder } from "./seeders/EmployeeProfileSeeder";
import { RoleSeeder } from "./seeders/RoleSeeder";
import { UserSeeder } from "./seeders/UserSeeder";
import { runSeeder } from "./utils/runSeeder";

before(async () => {
  const connection = await createConnection({
    type: "sqlite",
    database: ":memory:",
    dropSchema: true,
    synchronize: true,
    logging: false,
    entities: [path.join(__dirname, "../src/entities/*.[jt]s")],
  });

  // Seeding
  const seeders: BaseSeederType[] = [
    RoleSeeder,
    UserSeeder,
    EmployeeProfileSeeder,
  ];

  for (const seeder of seeders) {
    await runSeeder(seeder, connection);
  }
});

after(() => {
  const connection = getConnection();
  return connection.close();
});
