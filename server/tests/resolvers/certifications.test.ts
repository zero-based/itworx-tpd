import "reflect-metadata";
import { getConnection } from "typeorm";
import { expect } from "chai";

import { CertificationInput } from "../../src/types/inputs/CertificationInput";
import { Certifications } from "../../src/entities/Certifications";
import { CertificationResolver } from "../../src/resolvers/certifications";
import { CertificationProviders } from "../../src/entities/CertificationProviders";

describe("Certification Resolver Tests", async () => {
  const resolver = new CertificationResolver();

  it("create with wrong input", async () => {
    const input = new CertificationInput();
    input.certificationName = "Certification 4";
    input.certificationProviderName = "Wrong Provider";

    const certificationProvider = await getConnection()
      .getRepository(CertificationProviders)
      .findOne(input.certificationProviderName);

    expect(certificationProvider).to.not.exist;
  });

  it("create with right input", async () => {
    const input = new CertificationInput();
    input.certificationName = "Certification 4";
    input.certificationProviderName = "Certification Provider 2";

    const checkIfAvailable = await getConnection()
      .getRepository(CertificationProviders)
      .findOne({
        where: {
          certificationProviderName: input.certificationProviderName,
        },
      });

    expect(checkIfAvailable).to.exist;

    const response = await resolver.createCertification(input);

    expect(response.errors).to.not.exist;
    expect(response.data).to.exist;
    expect(response.data?.certificationId).to.exist;
  });

  it("get certification with invalid id", async () => {
    const id = 10;

    const response = await resolver.certification(id);

    expect(response.data).to.not.exist;
    expect(response.errors).to.exist;
    expect(response.errors).to.have.length(1);
    expect(response.errors[0].field).to.equal("certificationId");
  });

  it("get certification with valid id", async () => {
    const id = 1;

    const response = await resolver.certification(id);

    expect(response.errors).to.not.exist;
    expect(response.data).to.exist;
    expect(response.data?.certificationName).to.exist;
  });

  it("get certifications", async () => {
    const cursor = "a";
    const limit = 3;

    const response = await resolver.certifications(limit, cursor);

    expect(response.errors).to.not.exist;
    expect(response.data).to.exist;
    expect(response.data?.items).to.exist;
    expect(response.data?.hasMore).to.exist;
  });

  it("update with invalid id", async () => {
    const id = 10;
    const input = new CertificationInput();
    input.certificationName = "Updated Certification ";
    input.certificationProviderName = "Certification Provider 1";

    const response = await resolver.updateCertification(id, input);

    expect(response.data).to.not.exist;
    expect(response.errors).to.exist;
    expect(response.errors).to.have.length(1);
    expect(response.errors[0].field).to.equal("certificationProviderName");
  });

  it("update with valid id", async () => {
    const id = 1;
    const input = new CertificationInput();
    input.certificationName = "Updated Certification";
    input.certificationProviderName = "Certification Provider 2";

    const response = await resolver.updateCertification(id, input);

    expect(response.errors).to.not.exist;
    expect(response.data).to.exist;

    const updatedResponse = await getConnection()
      .getRepository(Certifications)
      .findOne({
        where: {
          certificationId: id,
        },
      });

    expect(updatedResponse.certificationName).to.equal(input.certificationName);
  });

  it("delete with valid id", async () => {
    const id = 1;
    const response = await resolver.deleteCertification(id);

    expect(response).to.be.true;

    const checkDeletion = await getConnection()
      .getRepository(Certifications)
      .findOne(id);

    expect(checkDeletion).to.not.exist;
  });
});
