import { Arg, Int, Mutation, Query, Resolver } from "type-graphql";
import { MoreThan } from "typeorm";

import { Certifications } from "../entities/Certifications";
import { CertificationResponse } from "../types/responses/CertificationResponse";
import { PaginatedCertificationResponse } from "../types/responses/PaginatedCertificationResponse";

@Resolver()
export class CertificationResolver {
  // Get Certification
  @Query(() => PaginatedCertificationResponse, { nullable: true })
  async certifications(
    @Arg("limit", () => Int) limit: number,
    @Arg("cursor", () => Int, { nullable: true }) cursor: number | null
  ): Promise<PaginatedCertificationResponse | undefined> {
    const requestLimit = Math.min(30, limit);
    const fetchLimit = requestLimit + 1;

    const certificates = await Certifications.find({
      where: {
        ...(cursor ? { certificatoinId: MoreThan(cursor) } : {}),
      },
      take: fetchLimit,
    });
    return {
      data: {
        hasMore: certificates.length == fetchLimit,
        items: certificates.slice(0, requestLimit),
      },
    };
  }

  // Update Certification
  @Mutation(() => CertificationResponse, { nullable: true })
  async updateCertification(
    @Arg("certificationId", () => Int) certificationId: number,
    @Arg("certificationName") certificationName: string
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
    await Certifications.update(certificationId, {
      certificationName,
    });
    return {
      data: {
        ...certification,
        certificationName,
      } as Certifications,
    };
  }

  // Get A Certification
  @Query(() => CertificationResponse, { nullable: true })
  async certification(
    @Arg("certificationId", () => Int) certificationId: number
  ): Promise<CertificationResponse | undefined> {
    const certificate = await Certifications.findOne(certificationId);
    if (!certificate) {
      return {
        errors: [
          {
            field: "certificationId",
            message: "Certificate does not exist",
          },
        ],
      };
    }

    return { data: certificate };
  }

  // Add Certification
  @Mutation(() => CertificationResponse)
  async createCertification(
    @Arg("certificationName") certificationName: string,
    @Arg("certificationProviderId", () => Int) certificationProviderId: number
  ): Promise<CertificationResponse> {
    return {
      data: await Certifications.create({
        certificationName,
        certificationProviderId,
      }).save(),
    };
  }

  // Delete Certification
  @Mutation(() => Boolean)
  async deleteCertification(
    @Arg("certificationId", () => Int) certificationId: number
  ): Promise<boolean> {
    await Certifications.delete(certificationId);
    return true;
  }
}
