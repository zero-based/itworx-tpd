import "reflect-metadata";
import { getConnection } from "typeorm";
import { expect } from "chai";

import { CertificationProviderInput } from "../../src/types/inputs/CertificationProviderInput";
import { CertificationProviders } from "../../src/entities/CertificationProviders";
import { CertificationProvidersResolver } from "../../src/resolvers/certificationProviders";

describe("Certification Provider Resolver Tests", async () => {
  const resolver = new CertificationProvidersResolver();

  it("create with right input", async () => {
    const input = new CertificationProviderInput();
    input.certificationProviderName = "Certification Provider 4";

    const response = await resolver.createCertificationProvider(input);

    expect(response.errors).to.not.exist;
    expect(response.data).to.exist;
    expect(response.data?.certificationProviderId).to.exist;
  });

  it("get certification provider with invalid id", async () => {
    const id = 10;

    const response = await resolver.certificationProvider(id);

    expect(response.errors).to.exist;
    expect(response.errors).to.have.length(1);
    expect(response.errors[0].field).to.equal("certificationProviderId");
    expect(response.data).to.not.exist;
  });

  it("get certification provider with valid id", async () => {
    const id = 1;

    const response = await resolver.certificationProvider(id);

    expect(response.errors).to.not.exist;
    expect(response.data).to.exist;
    expect(response.data?.certificationProviderName).to.exist;
  });

  it("get certifications providers", async () => {
    const cursor = "a";
    const limit = 3;

    const response = await resolver.certificationsProviders(limit, cursor);
    expect(response.errors).to.not.exist;
    expect(response.data).to.exist;
    expect(response.data?.items).to.exist;
    expect(response.data?.hasMore).to.exist;
  });

  it("update with invalid id", async () => {
    const id = 10;
    const input = new CertificationProviderInput();
    input.certificationProviderName = "Updated Certification Provider";

    const response = await resolver.updateCertificationProvider(id, input);

    expect(response.data).to.not.exist;
    expect(response.errors).to.exist;
    expect(response.errors).to.have.length(1);
    expect(response.errors[0].field).to.equal("certificationProviderId");
  });

  it("update with valid id", async () => {
    const id = 1;
    const input = new CertificationProviderInput();
    input.certificationProviderName = "Updated Certification Provider";

    const response = await resolver.updateCertificationProvider(id, input);

    expect(response.errors).to.not.exist;
    expect(response.data).to.exist;

    const updatedResponse = await getConnection()
      .getRepository(CertificationProviders)
      .findOne({
        where: {
          certificationProviderId: id,
        },
      });

    expect(updatedResponse.certificationProviderName).to.equal(
      input.certificationProviderName
    );
  });
});
