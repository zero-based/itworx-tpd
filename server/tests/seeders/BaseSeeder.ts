import { Connection } from "typeorm";

export interface BaseSeeder {
  run(connection: Connection): Promise<any>;
}

export type BaseSeederType = new () => BaseSeeder;
