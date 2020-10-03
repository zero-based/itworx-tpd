import { Connection } from "typeorm";

import { BaseSeeder } from "./BaseSeeder";
import { Certifications } from "../../src/entities/Certifications";

export class CertificationSeeder implements BaseSeeder {
  public async run(connection: Connection): Promise<any> {
    return connection.getRepository(Certifications).save([
      {
        certificationName: "Certification  1",
        certificationProviderId: 1,
      },
      {
        certificationName: "Certification  2",
        certificationProviderId: 2,
      },
      {
        certificationName: "Certification  3",
        certificationProviderId: 3,
      },
    ]);
  }
}
