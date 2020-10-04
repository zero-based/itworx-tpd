import { Arg, Authorized, Int, Mutation, Query, Resolver } from "type-graphql";
import { MoreThan } from "typeorm";

import { Skills } from "../entities/Skills";
import { SkillInput } from "../types/inputs/SkillInput";
import { PaginatedSkillResponse } from "../types/responses/PaginatedSkillResponse";
import { SkillResponse } from "../types/responses/SkillResponse";
import { UserRole as R } from "../types/UserRole";
import { findOrError } from "../utils/orm/findOrError";
import { paginate } from "../utils/orm/paginate";

@Resolver()
export class SkillResolver {
  // Add New Skill
  @Authorized(R.ADMIN)
  @Mutation(() => SkillResponse)
  async createSkill(@Arg("input") input: SkillInput): Promise<SkillResponse> {
    return {
      data: await Skills.create({ skillName: input.skillName }).save(),
    };
  }

  // Get Skill
  @Authorized(R.ADMIN)
  @Query(() => SkillResponse, { nullable: true })
  async skill(
    @Arg("skillId", () => Int) skillId: number
  ): Promise<SkillResponse | undefined> {
    const [skill, errors] = await findOrError(Skills, "skillId", skillId);

    return errors ? { errors } : { data: skill };
  }

  // Get Skills
  @Authorized(R.ADMIN)
  @Query(() => PaginatedSkillResponse)
  async skills(
    @Arg("limit", () => Int) limit: number,
    @Arg("cursor", () => Int, { nullable: true }) cursor: number | null
  ): Promise<PaginatedSkillResponse> {
    return {
      data: await paginate(Skills, limit, {
        order: { skillId: "ASC" },
        where: {
          ...(cursor ? { skillId: MoreThan(cursor) } : {}),
        },
      }),
    };
  }

  // Edit Skill
  @Authorized(R.ADMIN)
  @Mutation(() => SkillResponse, { nullable: true })
  async updateSkill(
    @Arg("skillId", () => Int) skillId: number,
    @Arg("input") input: SkillInput
  ): Promise<SkillResponse | undefined> {
    const [skill, errors] = await findOrError(Skills, "skillId", skillId);
    return errors
      ? { errors }
      : {
          data: await Skills.save({
            ...skill,
            skillName: input.skillName,
          } as Skills),
        };
  }

  // Delete Skill
  @Authorized(R.ADMIN)
  @Mutation(() => Boolean)
  async deleteSkill(
    @Arg("skillId", () => Int) skillId: number
  ): Promise<boolean> {
    await Skills.delete(skillId);
    return true;
  }
}
