import { Arg, Authorized, Int, Mutation, Query, Resolver } from "type-graphql";
import { MoreThan } from "typeorm";

import { CertificationProviders } from "../entities/CertificationProviders";
import { CertificationProviderInput } from "../types/inputs/CertificationProviderInput";
import { CertificationProviderResponse } from "../types/responses/CertificationProviderResponse";
import { PaginatedCertificationProviderResponse } from "../types/responses/PaginatedCertificationProviderResponse";
import { UserRole as R } from "../types/UserRole";

@Resolver()
export class CertificationProvidersResolver {
  // Get Certification Providers
  @Authorized(R.ADMIN)
  @Query(() => PaginatedCertificationProviderResponse, { nullable: true })
  async certificationsProviders(
    @Arg("limit", () => Int) limit: number,
    @Arg("cursor", () => String, { nullable: true }) cursor: string | null
  ): Promise<PaginatedCertificationProviderResponse | undefined> {
    const requestLimit = Math.min(30, limit);
    const fetchLimit = requestLimit + 1;

    const certificationsProviders = await CertificationProviders.find({
      order: { certificationProviderName: "ASC" },
      where: {
        ...(cursor ? { certificationProviderName: MoreThan(cursor) } : {}),
      },
      take: fetchLimit,
    });
    return {
      data: {
        hasMore: certificationsProviders.length == fetchLimit,
        items: certificationsProviders.slice(0, requestLimit),
      },
    };
  }

  // Update Certification Provider
  @Authorized(R.ADMIN)
  @Mutation(() => CertificationProviderResponse, { nullable: true })
  async updateCertificationProvider(
    @Arg("certificationProviderId", () => Int) certificationProviderId: number,
    @Arg("input") input: CertificationProviderInput
  ): Promise<CertificationProviderResponse | undefined> {
    const certificationProvider = await CertificationProviders.findOne(
      certificationProviderId
    );
    if (!certificationProvider) {
      return {
        errors: [
          {
            field: "certificationProviderId",
            message: "Certification Provider does not exist",
          },
        ],
      };
    }
    await CertificationProviders.update(certificationProviderId, {
      certificationProviderName: input.certificationProviderName,
    });
    return {
      data: {
        ...certificationProvider,
        certificationProviderName: input.certificationProviderName,
      } as CertificationProviders,
    };
  }

  // Get A Certification Provider
  @Authorized(R.ADMIN)
  @Query(() => CertificationProviderResponse, { nullable: true })
  async certificationProvider(
    @Arg("certificationProviderId", () => Int) certificationProviderId: number
  ): Promise<CertificationProviderResponse | undefined> {
    const certificationProvider = await CertificationProviders.findOne({
      where: {
        certificationProviderId: certificationProviderId,
      },
      relations: ["certifications"],
    });
    if (!certificationProvider) {
      return {
        errors: [
          {
            field: "certificationProviderId",
            message: "Certification Provider does not exist",
          },
        ],
      };
    }

    return { data: certificationProvider };
  }

  // Add Certification Provider
  @Authorized(R.ADMIN)
  @Mutation(() => CertificationProviderResponse)
  async createCertificationProvider(
    @Arg("input") input: CertificationProviderInput
  ): Promise<CertificationProviderResponse> {
    return {
      data: await CertificationProviders.create({
        certificationProviderName: input.certificationProviderName,
      }).save(),
    };
  }

  // Delete Certification Provider
  @Authorized(R.ADMIN)
  @Mutation(() => Boolean)
  async deleteCertificationProvider(
    @Arg("certificationProviderId", () => Int) certificationProviderId: number
  ): Promise<boolean> {
    await CertificationProviders.delete(certificationProviderId);
    return true;
  }
}
