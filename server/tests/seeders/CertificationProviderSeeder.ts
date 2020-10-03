import { Connection } from "typeorm";

import { BaseSeeder } from "./BaseSeeder";
import { CertificationProviders } from "../../src/entities/CertificationProviders";

export class CertificationProviderSeeder implements BaseSeeder {
  public async run(connection: Connection): Promise<any> {
    return connection.getRepository(CertificationProviders).save([
      {
        certificationProviderName: "Certification Provider 1",
      },
      {
        certificationProviderName: "Certification Provider 2",
      },
      {
        certificationProviderName: "Certification Provider 3",
      },
    ]);
  }
}
