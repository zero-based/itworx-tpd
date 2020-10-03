import { Connection } from "typeorm";

import { BaseSeeder } from "./BaseSeeder";
import { Skills } from "../../src/entities/Skills";

export class SkillSeeder implements BaseSeeder {
  public async run(connection: Connection): Promise<any> {
    return connection.getRepository(Skills).save([
      {
        skillName: "Skill 1",
      },
      {
        skillName: "Skill 2",
      },
      {
        skillName: "Skill 3",
      },
    ]);
  }
}
