import { expect } from "chai";
import { getConnection } from "typeorm";

import { Skills } from "../../src/entities/Skills";
import { SkillResolver } from "../../src/resolvers/skill";
import { SkillInput } from "../../src/types/inputs/SkillInput";

describe("Skill Resolver Tests", async () => {
  const resolver = new SkillResolver();

  it("create with valid input", async () => {
    const input = new SkillInput();
    input.skillName = "New Skill";

    const response = await resolver.createSkill(input);

    expect(response.errors).to.not.exist;
    expect(response.data).to.exist;
    expect(response.data?.skillId).to.exist;
  });

  it("get skill with valid id", async () => {
    const id = 1;

    const response = await resolver.skill(id);

    expect(response.errors).to.not.exist;
    expect(response.data).to.exist;
    expect(response.data?.skillName).to.exist;
  });

  it("get skill with invalid id", async () => {
    const id = 10;

    const response = await resolver.skill(id);

    expect(response.data).to.not.exist;
    expect(response.errors).to.exist;
    expect(response.errors).to.have.length(1);
    expect(response.errors[0].field).to.equal("skillId");
  });

  it("get skills", async () => {
    const cursor = null;
    const limit = 3;

    const response = await resolver.skills(limit, cursor);

    expect(response.errors).to.not.exist;
    expect(response.data).to.exist;
    expect(response.data?.items).to.exist;
    expect(response.data?.hasMore).to.exist;
  });

  it("update skill with invalid id", async () => {
    const id = 10;
    const input = new SkillInput();
    input.skillName = "Updated Skill";

    const response = await resolver.updateSkill(id, input);

    expect(response.data).to.not.exist;
    expect(response.errors).to.exist;
    expect(response.errors).to.have.length(1);
    expect(response.errors[0].field).to.equal("skillId");
  });

  it("update with valid id", async () => {
    const id = 1;
    const input = new SkillInput();
    input.skillName = "Updated Skill";

    const response = await resolver.updateSkill(id, input);

    expect(response.errors).to.not.exist;
    expect(response.data).to.exist;

    const updatedResponse = await getConnection()
      .getRepository(Skills)
      .findOne(id);
    expect(updatedResponse.skillName).to.equal(input.skillName);
  });

  it("delete with valid id", async () => {
    const id = 1;
    const response = await resolver.deleteSkill(id);

    expect(response).to.be.true;

    const checkDeletion = await getConnection()
      .getRepository(Skills)
      .findOne(id);

    expect(checkDeletion).to.not.exist;
  });
});
