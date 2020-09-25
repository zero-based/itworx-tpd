import { EmployeeSkillResponse } from "../types/responses/EmployeeSkillResponse";
import { Arg, Ctx, Int, Mutation, Query, Resolver } from "type-graphql";
import { EmployeeSkillInput } from "../types/inputs/EmployeeSkillInput";
import { validate } from "class-validator";
import { mapToFieldError } from "../utils/mapToFieldError";
import { EmployeeSkills } from "../entities/EmployeeSkills";
import { Skills } from "../entities/Skills";
import { PaginatedEmployeeSkillResponse } from "../types/responses/PaginatedEmployeeSkillResponse";
import { AppContext } from "../types";
import { MoreThan } from "typeorm";
import { EmployeeCertificationResponse } from "../types/responses/EmployeeCertificationResponse";
import { EmployeeCertificationInput } from "../types/inputs/EmployeeCertificationInput";
import { Certifications } from "../entities/Certifications";
import { CertificationProviders } from "../entities/CertificationProviders";
import { EmployeeCertifications } from "../entities/EmployeeCertifications";
import { PaginatedEmployeeCertificationResponse } from "../types/responses/PaginatedEmployeeCertificationResponse";

@Resolver()
export class EmployeeProfileResolver {
  ////////////////////////////////////////////// SKILL //////////////////////////////////////////////
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
            field: "skill",
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
  async EmployeeSkill(
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
            field: "skill",
            message: "Skill does not exist",
          },
        ],
      };
    }
    return { data: employeeSkill };
  }

  // Get 30 EmployeeSkill
  @Query(() => PaginatedEmployeeSkillResponse)
  async EmployeeSkills(
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
            field: "skill",
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

  ////////////////////////////////////////////// Certificates //////////////////////////////////////////////

  // Add Certification
  @Mutation(() => EmployeeCertificationResponse)
  async createEmployeeCertification(
    @Arg("input") input: EmployeeCertificationInput,
    @Ctx() { req }: AppContext
  ): Promise<EmployeeCertificationResponse> {
    const validationErrors = await validate(input);
    if (validationErrors.length > 0) {
      return {
        errors: mapToFieldError(validationErrors),
      };
    }

    // Get Certification Id
    const certification = await Certifications.findOne({
      where: {
        certificationName: input.certificateName,
      },
    });
    if (!certification) {
      return {
        errors: [
          {
            field: "certification",
            message: "Can not find this certification",
          },
        ],
      };
    }

    // Get Certification Provider Id
    const certificationProvider = await CertificationProviders.findOne({
      where: {
        certificationProviderName: input.certificateProvider,
      },
    });
    if (!certificationProvider) {
      return {
        errors: [
          {
            field: "certificationProvider",
            message: "Can not find this Certification Provider",
          },
        ],
      };
    }

    if (
      certification.certificationProviderId !==
      certificationProvider.certificatoinProviderId
    ) {
      return {
        errors: [
          {
            field: "certificationProvider",
            message: "Invalid Certification",
          },
        ],
      };
    }

    return {
      data: await EmployeeCertifications.create({
        employeeId: req.session!.profileId,
        certificationId: certification.certificationId,
        expirationDate: input.expirationDate,
      }).save(),
    };
  }

  // Get A CertificationProvider
  @Query(() => EmployeeCertificationResponse, { nullable: true })
  async EmployeeCertification(
    @Arg("certificationId", () => Int) certificationId: number,
    @Ctx() { req }: AppContext
  ): Promise<EmployeeCertificationResponse | undefined> {
    // Get Certification
    const employeeCertification = await EmployeeCertifications.findOne({
      where: {
        employeeId: req.session!.profileId,
        certificationId: certificationId,
      },
    });

    console.log(employeeCertification);

    if (!employeeCertification) {
      return {
        errors: [
          {
            field: "employeeCertification",
            message: "Employee Certification does not exist",
          },
        ],
      };
    }

    return { data: employeeCertification };
  }

  // Get 30 EmployeeCertification
  @Query(() => PaginatedEmployeeCertificationResponse)
  async EmployeeCertifications(
    @Arg("limit", () => Int) limit: number,
    @Arg("cursor", () => Int, { nullable: true }) cursor: number | null,
    @Ctx() { req }: AppContext
  ): Promise<PaginatedEmployeeCertificationResponse> {
    const requestLimit = Math.min(30, limit);
    const fetchLimit = requestLimit + 1;

    const requests = await EmployeeCertifications.find({
      order: { certificationId: "ASC" },
      where: {
        employeeId: req.session!.profileId,
        ...(cursor ? { certificationId: MoreThan(cursor) } : {}),
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

  // Update EmployeeCertification
  @Mutation(() => EmployeeCertificationResponse, { nullable: true })
  async updateEmployeeCertification(
    @Arg("certificationId", () => Int) certificationId: number,
    @Arg("input") input: EmployeeCertificationInput,
    @Ctx() { req }: AppContext
  ): Promise<EmployeeCertificationResponse | undefined> {
    const employeeCertification = await EmployeeCertifications.findOne({
      where: {
        employeeId: req.session!.profileId,
        certificationId: certificationId,
      },
    });

    if (!employeeCertification) {
      return {
        errors: [
          {
            field: "certificationId",
            message: "Can not find this Certification",
          },
        ],
      };
    }

    const certification = await Certifications.findOne({
      certificationName: input.certificateName,
    });

    if (!certification) {
      return {
        errors: [
          {
            field: "certification",
            message: "Can not find this certification",
          },
        ],
      };
    }

    // Get Certification Provider Id
    const certificationProvider = await CertificationProviders.findOne({
      where: {
        certificationProviderName: input.certificateProvider,
      },
    });
    if (!certificationProvider) {
      return {
        errors: [
          {
            field: "certificationProvider",
            message: "Can not find this Certification Provider",
          },
        ],
      };
    }

    if (
      certification.certificationProviderId !==
      certificationProvider.certificatoinProviderId
    ) {
      return {
        errors: [
          {
            field: "certificationProvider",
            message: "Invalid Certification",
          },
        ],
      };
    }

    const updated = {
      certification: certification,
      expirationDate: input.expirationDate,
    };

    await EmployeeCertifications.update(
      {
        employeeId: req.session!.profileId,
        certificationId: certification.certificationId,
      },
      { ...updated }
    );

    return {
      data: { ...employeeCertification, ...updated } as EmployeeCertifications,
    };
  }

  // Delete EmployeeCertification
  @Mutation(() => Boolean)
  async deleteEmployeeCertification(
    @Arg("certificationId", () => Int) certificationId: number,
    @Ctx() { req }: AppContext
  ): Promise<boolean> {
    await EmployeeCertifications.delete({
      employeeId: req.session!.profileId,
      certificationId: certificationId,
    });
    return true;
  }
}
