import { Arg, Authorized, Int, Mutation, Query, Resolver } from "type-graphql";
import { MoreThan } from "typeorm";

import { Certifications } from "../entities/Certifications";
import { CertificationProviders } from "../entities/CertificationProviders";
import { CertificationResponse } from "../types/responses/CertificationResponse";
import { PaginatedCertificationResponse } from "../types/responses/PaginatedCertificationResponse";
import { UserRole as R } from "../types/UserRole";

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

    const certificates = await Certifications.find({
      order: { certificationName: "ASC" },
      where: {
        ...(cursor ? { certificationName: MoreThan(cursor) } : {}),
      },
      relations: ["employeeCertifications"],
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
  @Authorized(R.ADMIN)
  @Mutation(() => CertificationResponse, { nullable: true })
  async updateCertification(
    @Arg("certificationId", () => Int) certificationId: number,
    @Arg("certificationName") certificationName: string,
    @Arg("certificationProviderName")
    certificationProviderName: string
  ): Promise<CertificationResponse | undefined> {
    const provider = await CertificationProviders.findOne({
      where: { certificationProviderName: certificationProviderName },
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
      certificationName,
      certificationProviderId: provider.certificatoinProviderId,
    });
    return {
      data: {
        ...certification,
        certificationName,
      } as Certifications,
    };
  }

  // Get A Certification
  @Authorized(R.ADMIN)
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
  @Authorized()
  @Mutation(() => CertificationResponse)
  async createCertification(
    @Arg("certificationName") certificationName: string,
    @Arg("certificationProviderName")
    certificationProviderName: string
  ): Promise<CertificationResponse> {
    const provider = await CertificationProviders.findOne({
      where: { certificationProviderName: certificationProviderName },
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
        certificationName,
        certificationProviderId: provider.certificatoinProviderId,
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
