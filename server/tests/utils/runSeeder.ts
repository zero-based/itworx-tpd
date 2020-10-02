import { Connection } from "typeorm";
import { BaseSeeder, BaseSeederType } from "../seeders/BaseSeeder";

export const runSeeder = async (
  seederClass: BaseSeederType,
  connection: Connection
): Promise<any> => {
  const seeder: BaseSeeder = new seederClass();
  return seeder.run(connection).catch((err: Error) => console.log(err));
};
