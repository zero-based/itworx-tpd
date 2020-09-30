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
import { CertificationProviders } from "../entities/CertificationProviders";
import { Certifications } from "../entities/Certifications";
import { EmployeeCertifications } from "../entities/EmployeeCertifications";
import { AppContext } from "../types";
import { EmployeeCertificationInput } from "../types/inputs/EmployeeCertificationInput";
import { EmployeeCertificationResponse } from "../types/responses/EmployeeCertificationResponse";
import { PaginatedEmployeeCertificationResponse } from "../types/responses/PaginatedEmployeeCertificationResponse";
import { mapToFieldError } from "../utils/mapToFieldError";
import { CertificationResolver } from "./certifications";

@Resolver()
export class EmployeeCertification {
  // Add Employee Certification
  @Authorized()
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

    var certification = await Certifications.findOne({
      certificationName: input.certificationName,
    });
    if (!certification) {
      const certificationResolver = new CertificationResolver();
      certification = (
        await certificationResolver.createCertification(
          input.certificationName,
          certificationProvider.certificationProviderName
        )
      ).data;
    }

    return {
      data: await EmployeeCertifications.create({
        employeeId: req.session!.profileId,
        certificationId: certification?.certificationId,
        expirationDate: input.expirationDate,
        certification: certification,
      }).save(),
    };
  }

  // Get A CertificationProvider
  @Authorized()
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
  @Authorized()
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
  @Authorized()
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

    var certification = await Certifications.findOne({
      certificationName: input.certificationName,
    });
    if (!certification) {
      const certificationResolver = new CertificationResolver();
      certification = (
        await certificationResolver.createCertification(
          input.certificationName,
          certificationProvider.certificationProviderName
        )
      ).data;
    }

    const updated = {
      certification: certification,
      expirationDate: input.expirationDate,
    };

    await EmployeeCertifications.update(
      {
        employeeId: req.session!.profileId,
        certificationId: certification?.certificationId,
      },
      { ...updated }
    );

    return {
      data: { ...employeeCertification, ...updated } as EmployeeCertifications,
    };
  }

  // Delete EmployeeCertification
  @Authorized()
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
