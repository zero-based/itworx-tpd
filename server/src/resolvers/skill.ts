import { Arg, Authorized, Int, Mutation, Query, Resolver } from "type-graphql";
import { MoreThan } from "typeorm";

import { Skills } from "../entities/Skills";
import { PaginatedSkillResponse } from "../types/responses/PaginatedSkillResponse";
import { SkillResponse } from "../types/responses/SkillResponse";
import { UserRole as R } from "../types/UserRole";


@Resolver()
export class SkillResolver {
  // Add New Skill
  @Authorized(R.ADMIN)
  @Mutation(() => SkillResponse)
  async createSkill(
    @Arg("skillName") skillName: string
  ): Promise<SkillResponse> {
    return {
      data: await Skills.create({ skillName: skillName }).save(),
    };
  }

  // Edit Skill
  @Authorized(R.ADMIN)
  @Mutation(() => SkillResponse, { nullable: true })
  async updateSkill(
    @Arg("skillId", () => Int) skillId: number,
    @Arg("skillName") skillName: string
  ): Promise<SkillResponse | undefined> {
    const skill = await Skills.findOne(skillId);
    if (!skill) {
      return {
        errors: [
          {
            field: "skillId",
            message: "Skill does not exist",
          },
        ],
      };
    }
    await Skills.update(skillId, { skillName });
    return { data: { ...skill, skillName } as Skills };
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

  // Get A Skill
  @Authorized(R.ADMIN)
  @Query(() => SkillResponse, { nullable: true })
  async skill(
    @Arg("skillId", () => Int) skillId: number
  ): Promise<SkillResponse | undefined> {
    const skill = await Skills.findOne(skillId);
    if (!skill) {
      return {
        errors: [
          {
            field: "skillId",
            message: "Skill does not exist",
          },
        ],
      };
    }

    return { data: skill };
  }

  // Get 30 Skills
  @Authorized(R.ADMIN)
  @Query(() => PaginatedSkillResponse)
  async skills(
    @Arg("limit", () => Int) limit: number,
    @Arg("cursor", () => Int, { nullable: true }) cursor: number | null
  ): Promise<PaginatedSkillResponse> {
    const requestLimit = Math.min(30, limit);
    const fetchLimit = requestLimit + 1;

    const requests = await Skills.find({
      order: { skillId: "ASC" },
      where: {
        ...(cursor ? { skillId: MoreThan(cursor) } : {}),
      },
      take: fetchLimit,
    });

    return {
      data: {
        hasMore: requests.length == fetchLimit,
        items: requests.slice(0, requestLimit),
      },
    };
  }
}
