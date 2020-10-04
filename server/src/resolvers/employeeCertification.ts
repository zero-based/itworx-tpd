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
import { paginate } from "../utils/orm/paginate";
import { findOrError } from "../utils/orm/findOrError";

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
    const [provider, errors] = await findOrError(
      CertificationProviders,
      "certificationProviderName",
      undefined,
      {
        where: {
          certificationProviderName: input.certificationProvider,
        },
      }
    );

    if (!provider) return { errors };

    var certification = await Certifications.findOne({
      certificationName: input.certificationName,
    });

    // Create certification if it doesn't exist
    if (!certification) {
      const certificationResolver = new CertificationResolver();
      certification = (
        await certificationResolver.createCertification({
          certificationName: input.certificationName,
          certificationProviderName: provider.certificationProviderName,
        })
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
    const [employeeCertification, errors] = await findOrError(
      EmployeeCertifications,
      "certificationId",
      undefined,
      {
        where: {
          employeeId: req.session!.profileId,
          certificationId: certificationId,
        },
      }
    );

    return errors ? { errors } : { data: employeeCertification };
  }

  // Get EmployeeCertifications
  @Authorized()
  @Query(() => PaginatedEmployeeCertificationResponse)
  async employeeCertifications(
    @Arg("limit", () => Int) limit: number,
    @Arg("cursor", () => Int, { nullable: true }) cursor: number | null,
    @Ctx() { req }: AppContext
  ): Promise<PaginatedEmployeeCertificationResponse> {
    return {
      data: await paginate(EmployeeCertifications, limit, {
        order: { certificationId: "ASC" },
        where: {
          ...(cursor ? { certificationId: MoreThan(cursor) } : {}),
          employeeId: req.session!.profileId,
        },
      }),
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
    const [employeeCertification, certificationErrors] = await findOrError(
      EmployeeCertifications,
      "certificationId",
      undefined,
      {
        where: {
          employeeId: req.session!.profileId,
          certificationId: certificationId,
        },
      }
    );

    if (!employeeCertification) return { errors: certificationErrors };

    // Get Certification Provider Id
    const [provider, providerErrors] = await findOrError(
      CertificationProviders,
      "certificationProvider",
      undefined,
      {
        where: {
          certificationProviderName: input.certificationProvider,
        },
      }
    );

    if (!provider) return { errors: providerErrors };

    var certification = await Certifications.findOne({
      certificationName: input.certificationName,
    });
    if (!certification) {
      const certificationResolver = new CertificationResolver();
      certification = (
        await certificationResolver.createCertification({
          certificationName: input.certificationName,
          certificationProviderName: provider.certificationProviderName,
        })
      ).data;
    }

    return {
      data: await EmployeeCertifications.save({
        ...employeeCertification,
        certification: certification,
        expirationDate: input.expirationDate,
      } as EmployeeCertifications),
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
