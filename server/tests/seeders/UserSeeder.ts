import { Connection } from "typeorm";

import { Users } from "../../src/entities/Users";
import { BaseSeeder } from "./BaseSeeder";

export class UserSeeder implements BaseSeeder {
  public async run(connection: Connection): Promise<any> {
    return connection.getRepository(Users).save([
      {
        id: 1,
        userName: "Test Admin",
        email: "admin@test.com",
        password: "admin password",
        roleId: 1,
      },
      {
        id: 2,
        userName: "Test Manager",
        email: "manager@test.com",
        password: "manager password",
        roleId: 2,
      },
      {
        id: 3,
        userName: "Test Employee",
        email: "employee@test.com",
        password: "employee password",
        roleId: 3,
      },
    ]);
  }
}
