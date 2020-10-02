import { Connection } from "typeorm";

import { Roles } from "../../src/entities/Roles";
import { BaseSeeder } from "./BaseSeeder";

export class RoleSeeder implements BaseSeeder {
  public async run(connection: Connection): Promise<any> {
    return connection.getRepository(Roles).save([
      {
        roleId: 1,
        roleName: "Admin",
      },
      {
        roleId: 2,
        roleName: "Manager",
      },
      {
        roleId: 3,
        roleName: "Employee",
      },
    ]);
  }
}
