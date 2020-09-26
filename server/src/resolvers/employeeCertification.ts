import { validate } from "class-validator";
import { CertificationProviders } from "../entities/CertificationProviders";
import { Certifications } from "../entities/Certifications";
import { EmployeeCertifications } from "../entities/EmployeeCertifications";
import { AppContext } from "../types";
import { EmployeeCertificationInput } from "../types/inputs/EmployeeCertificationInput";
import { EmployeeCertificationResponse } from "../types/responses/EmployeeCertificationResponse";
import { PaginatedEmployeeCertificationResponse } from "../types/responses/PaginatedEmployeeCertificationResponse";
import { mapToFieldError } from "../utils/mapToFieldError";
import { Arg, Ctx, Int, Mutation, Query, Resolver } from "type-graphql";
import { MoreThan } from "typeorm";

@Resolver()
export class EmployeeCertification {
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
        certificationName: input.certificationName,
      },
    });
    if (!certification) {
      return {
        errors: [
          {
            field: "certificationName",
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
            field: "certificateProvider",
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
            field: "certificationName",
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
  async employeeCertification(
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

    if (!employeeCertification) {
      return {
        errors: [
          {
            field: "certificationId",
            message: "Employee Certification does not exist",
          },
        ],
      };
    }

    return { data: employeeCertification };
  }

  // Get 30 EmployeeCertification
  @Query(() => PaginatedEmployeeCertificationResponse)
  async employeeCertifications(
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
      certificationName: input.certificationName,
    });

    if (!certification) {
      return {
        errors: [
          {
            field: "certificationName",
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
            field: "certificateProvider",
            message: "Can not find this Certificate Provider",
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
            field: "certificationName",
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
