import { validate } from "class-validator";
import { EmployeeSkills } from "../entities/EmployeeSkills";
import { Skills } from "../entities/Skills";
import { AppContext } from "../types";
import { EmployeeSkillInput } from "../types/inputs/EmployeeSkillInput";
import { EmployeeSkillResponse } from "../types/responses/EmployeeSkillResponse";
import { PaginatedEmployeeSkillResponse } from "../types/responses/PaginatedEmployeeSkillResponse";
import { mapToFieldError } from "../utils/mapToFieldError";
import { Arg, Ctx, Int, Mutation, Query, Resolver } from "type-graphql";
import { MoreThan } from "typeorm";

@Resolver()
export class EmployeeSkillResolver {
  // Add EmployeeSkill
  @Mutation(() => EmployeeSkillResponse)
  async createEmployeeSkill(
    @Arg("input") input: EmployeeSkillInput,
    @Ctx() { req }: AppContext
  ): Promise<EmployeeSkillResponse> {
    const validationErrors = await validate(input);
    if (validationErrors.length > 0) {
      return {
        errors: mapToFieldError(validationErrors),
      };
    }

    const skill = await Skills.findOne({ skillName: input.skillName });
    if (!skill) {
      return {
        errors: [
          {
            field: "skillName",
            message: "Can not find this skill",
          },
        ],
      };
    }
    return {
      data: await EmployeeSkills.create({
        employeeId: req.session!.profileId,
        skillId: skill?.skillId,
        experienceLevel: input.experienceLevel,
        lastUsedDate: input.lastUsedDate,
      }).save(),
    };
  }

  // Get An EmployeeSkill
  @Query(() => EmployeeSkillResponse, { nullable: true })
  async employeeSkill(
    @Arg("skillId", () => Int) skillId: number,
    @Ctx() { req }: AppContext
  ): Promise<EmployeeSkillResponse | undefined> {
    const employeeSkill = await EmployeeSkills.findOne({
      where: {
        employeeId: req.session!.profileId,
        skillId: skillId,
      },
    });
    if (!employeeSkill) {
      return {
        errors: [
          {
            field: "skillId",
            message: "Skill does not exist",
          },
        ],
      };
    }
    return { data: employeeSkill };
  }

  // Get 30 EmployeeSkill
  @Query(() => PaginatedEmployeeSkillResponse)
  async employeeSkills(
    @Arg("limit", () => Int) limit: number,
    @Arg("cursor", () => Int, { nullable: true }) cursor: number | null,
    @Ctx() { req }: AppContext
  ): Promise<PaginatedEmployeeSkillResponse> {
    const requestLimit = Math.min(30, limit);
    const fetchLimit = requestLimit + 1;

    const requests = await EmployeeSkills.find({
      order: { skillId: "ASC" },
      where: {
        ...(cursor ? { skillId: MoreThan(cursor) } : {}),
        employeeId: req.session!.profileId,
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

  // Update EmployeeSkill
  @Mutation(() => EmployeeSkillResponse, { nullable: true })
  async updateEmployeeSkill(
    @Arg("skillId", () => Int) skillId: number,
    @Arg("input") input: EmployeeSkillInput,
    @Ctx() { req }: AppContext
  ): Promise<EmployeeSkillResponse | undefined> {
    const employeeSkill = await EmployeeSkills.findOne({
      where: {
        employeeId: req.session!.profileId,
        skillId: skillId,
      },
    });

    if (!employeeSkill) {
      return {
        errors: [
          {
            field: "skillId",
            message: "Can not find this skill",
          },
        ],
      };
    }

    const skill = await Skills.findOne({
      skillName: input.skillName,
    });

    if (!skill) {
      return {
        errors: [
          {
            field: "skillName",
            message: "Can not find this skill",
          },
        ],
      };
    }

    const updated = {
      skillId: skill.skillId,
      experienceLevel: input.experienceLevel,
      lastUsedDate: input.lastUsedDate,
    };

    await EmployeeSkills.update(
      { employeeId: req.session!.profileId, skillId: skill.skillId },
      { ...updated }
    );

    return { data: { ...employeeSkill, ...updated } as EmployeeSkills };
  }

  // Delete Employee Skill
  @Mutation(() => Boolean)
  async deleteEmployeeSkill(
    @Arg("skillId", () => Int) skillId: number,
    @Ctx() { req }: AppContext
  ): Promise<boolean> {
    await EmployeeSkills.delete({
      employeeId: req.session!.profileId,
      skillId: skillId,
    });
    return true;
  }
}
