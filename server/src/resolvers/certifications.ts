import { Arg, Authorized, Int, Mutation, Query, Resolver } from "type-graphql";
import { MoreThan } from "typeorm";

import { Certifications } from "../entities/Certifications";
import { CertificationProviders } from "../entities/CertificationProviders";
import { CertificationResponse } from "../types/responses/CertificationResponse";
import { PaginatedCertificationResponse } from "../types/responses/PaginatedCertificationResponse";
import { UserRole as R } from "../types/UserRole";
import { CertificationInput } from "../types/inputs/CertificationInput";

@Resolver()
export class CertificationResolver {
  // Get Certification
  @Authorized(R.ADMIN)
  @Query(() => PaginatedCertificationResponse, { nullable: true })
  async certifications(
    @Arg("limit", () => Int) limit: number,
    @Arg("cursor", () => String, { nullable: true }) cursor: string | null
  ): Promise<PaginatedCertificationResponse | undefined> {
    const requestLimit = Math.min(30, limit);
    const fetchLimit = requestLimit + 1;

    const certifications = await Certifications.find({
      order: { certificationName: "ASC" },
      where: {
        ...(cursor ? { certificationName: MoreThan(cursor) } : {}),
      },
      relations: ["employeeCertifications"],
      take: fetchLimit,
    });
    return {
      data: {
        hasMore: certifications.length == fetchLimit,
        items: certifications.slice(0, requestLimit),
      },
    };
  }

  // Update Certification
  @Authorized(R.ADMIN)
  @Mutation(() => CertificationResponse, { nullable: true })
  async updateCertification(
    @Arg("certificationId", () => Int) certificationId: number,
    @Arg("input") input: CertificationInput
  ): Promise<CertificationResponse | undefined> {
    const provider = await CertificationProviders.findOne({
      where: { certificationProviderName: input.certificationProviderName },
    });
    if (!provider) {
      return {
        errors: [
          {
            field: "certificationProviderName",
            message: "Certification Provider does not exist",
          },
        ],
      };
    }
    const certification = await Certifications.findOne(certificationId);
    if (!certification) {
      return {
        errors: [
          {
            field: "certificationId",
            message: "Certification does not exist",
          },
        ],
      };
    }
    await Certifications.update(certificationId, {
      certificationName: input.certificationName,
      certificationProviderId: provider.certificationProviderId,
    });

    return {
      data: {
        ...certification,
        certificationId: certificationId,
        certificationName: input.certificationName,
        certificationProviderId: provider.certificationProviderId,
      } as Certifications,
    };
  }

  // Get A Certification
  @Authorized(R.ADMIN)
  @Query(() => CertificationResponse, { nullable: true })
  async certification(
    @Arg("certificationId", () => Int) certificationId: number
  ): Promise<CertificationResponse | undefined> {
    const certification = await Certifications.findOne(certificationId);
    if (!certification) {
      return {
        errors: [
          {
            field: "certificationId",
            message: "Certification does not exist",
          },
        ],
      };
    }

    return { data: certification };
  }

  // Add Certification
  @Authorized()
  @Mutation(() => CertificationResponse)
  async createCertification(
    @Arg("input") input: CertificationInput
  ): Promise<CertificationResponse> {
    const provider = await CertificationProviders.findOne({
      where: { certificationProviderName: input.certificationProviderName },
    });
    if (!provider) {
      return {
        errors: [
          {
            field: "certificationProviderName",
            message: "Certification Provider does not exist",
          },
        ],
      };
    }
    return {
      data: await Certifications.create({
        certificationName: input.certificationName,
        certificationProviderId: provider.certificationProviderId,
      }).save(),
    };
  }

  // Delete Certification
  @Authorized(R.ADMIN)
  @Mutation(() => Boolean)
  async deleteCertification(
    @Arg("certificationId", () => Int) certificationId: number
  ): Promise<boolean> {
    await Certifications.delete(certificationId);
    return true;
  }
}
