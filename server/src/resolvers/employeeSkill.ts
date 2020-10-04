import { validate } from "class-validator";
import {
  Arg,
  Authorized,
  Ctx,
  Int,
  Mutation,
  Query,
  Resolver,
} from "type-graphql";
import { MoreThan } from "typeorm";

import { EmployeeSkills } from "../entities/EmployeeSkills";
import { Skills } from "../entities/Skills";
import { AppContext } from "../types";
import { EmployeeSkillInput } from "../types/inputs/EmployeeSkillInput";
import { EmployeeSkillResponse } from "../types/responses/EmployeeSkillResponse";
import { PaginatedEmployeeSkillResponse } from "../types/responses/PaginatedEmployeeSkillResponse";
import { mapToFieldError } from "../utils/mapToFieldError";
import { findOrError } from "../utils/orm/findOrError";
import { paginate } from "../utils/orm/paginate";
import { SkillResolver } from "./skill";

@Resolver()
export class EmployeeSkillResolver {
  // Add EmployeeSkill
  @Authorized()
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

    var skill = await Skills.findOne({ skillName: input.skillName });
    if (!skill) {
      const skillResolver = new SkillResolver();
      skill = (await skillResolver.createSkill({ skillName: input.skillName }))
        .data;
    }
    return {
      data: await EmployeeSkills.create({
        employeeId: req.session!.profileId,
        skillId: skill?.skillId,
        experienceLevel: input.experienceLevel,
        lastUsedDate: input.lastUsedDate,
        skill: skill,
      }).save(),
    };
  }

  // Get An EmployeeSkill
  @Authorized()
  @Query(() => EmployeeSkillResponse, { nullable: true })
  async employeeSkill(
    @Arg("skillId", () => Int) skillId: number,
    @Ctx() { req }: AppContext
  ): Promise<EmployeeSkillResponse | undefined> {
    const [employeeSkill, errors] = await findOrError(
      EmployeeSkills,
      "skillId",
      undefined,
      {
        where: {
          employeeId: req.session!.profileId,
          skillId: skillId,
        },
      }
    );

    return errors ? { errors } : { data: employeeSkill };
  }

  // Get EmployeeSkill
  @Authorized()
  @Query(() => PaginatedEmployeeSkillResponse)
  async employeeSkills(
    @Arg("limit", () => Int) limit: number,
    @Arg("cursor", () => Int, { nullable: true }) cursor: number | null,
    @Ctx() { req }: AppContext
  ): Promise<PaginatedEmployeeSkillResponse> {
    return {
      data: await paginate(EmployeeSkills, limit, {
        order: { skillId: "ASC" },
        where: {
          ...(cursor ? { skillId: MoreThan(cursor) } : {}),
          employeeId: req.session!.profileId,
        },
      }),
    };
  }

  // Update EmployeeSkill
  @Authorized()
  @Mutation(() => EmployeeSkillResponse, { nullable: true })
  async updateEmployeeSkill(
    @Arg("skillId", () => Int) skillId: number,
    @Arg("input") input: EmployeeSkillInput,
    @Ctx() { req }: AppContext
  ): Promise<EmployeeSkillResponse | undefined> {
    const [employeeSkill, errors] = await findOrError(
      EmployeeSkills,
      "skillId",
      undefined,
      {
        where: {
          employeeId: req.session!.profileId,
          skillId: skillId,
        },
      }
    );

    if (errors) return { errors };

    var skill = await Skills.findOne({ skillName: input.skillName });

    // Create skill if it doesn't exist
    if (!skill) {
      const skillResolver = new SkillResolver();
      skill = (await skillResolver.createSkill({ skillName: input.skillName }))
        .data;
    }

    return {
      data: await EmployeeSkills.save({
        ...employeeSkill,
        skill,
        experienceLevel: input.experienceLevel,
        lastUsedDate: input.lastUsedDate,
      } as EmployeeSkills),
    };
  }

  // Delete Employee Skill
  @Authorized()
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
