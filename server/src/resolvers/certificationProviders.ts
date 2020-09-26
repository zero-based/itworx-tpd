import { Arg, Authorized, Int, Mutation, Query, Resolver } from "type-graphql";
import { MoreThan } from "typeorm";

import { CertificationProviders } from "../entities/CertificationProviders";
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
    @Arg("cursor", () => Int, { nullable: true }) cursor: number | null
  ): Promise<PaginatedCertificationProviderResponse | undefined> {
    const requestLimit = Math.min(30, limit);
    const fetchLimit = requestLimit + 1;

    const certificatesProviders = await CertificationProviders.find({
      where: {
        ...(cursor ? { certificatoinProviderId: MoreThan(cursor) } : {}),
      },
      take: fetchLimit,
    });
    return {
      data: {
        hasMore: certificatesProviders.length == fetchLimit,
        items: certificatesProviders.slice(0, requestLimit),
      },
    };
  }

  // Update Certification Provider
  @Authorized(R.ADMIN)
  @Mutation(() => CertificationProviderResponse, { nullable: true })
  async updateCertificationProvider(
    @Arg("certificationProviderId", () => Int) certificationProviderId: number,
    @Arg("certificationProviderName") certificationProviderName: string
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
      certificationProviderName,
    });
    return {
      data: {
        ...certificationProvider,
        certificationProviderName,
      } as CertificationProviders,
    };
  }

  // Get A Certificate Provider by ID
  @Authorized(R.ADMIN)
  @Query(() => CertificationProviderResponse, { nullable: true })
  async certificateProviderById(
    @Arg("certificationProviderId", () => Int) certificationProviderId: number
  ): Promise<CertificationProviderResponse | undefined> {
    const certificateProvider = await CertificationProviders.findOne(
      certificationProviderId
    );
    if (!certificateProvider) {
      return {
        errors: [
          {
            field: "certificationProviderId",
            message: "Certificate Provider does not exist",
          },
        ],
      };
    }

    return { data: certificateProvider };
  }

  // Add Certification Provider
  @Authorized(R.ADMIN)
  @Mutation(() => CertificationProviderResponse)
  async createCertificationProvider(
    @Arg("certificationProviderName") certificationProviderName: string
  ): Promise<CertificationProviderResponse> {
    return {
      data: await CertificationProviders.create({
        certificationProviderName,
      }).save(),
    };
  }

  // Delete Certification Provider
  @Authorized(R.ADMIN)
  @Mutation(() => Boolean)
  async deleteCertificateProvider(
    @Arg("certificationProviderId", () => Int) certificationProviderId: number
  ): Promise<boolean> {
    await CertificationProviders.delete(certificationProviderId);
    return true;
  }

  // Get A Certificate Provider by Name
  @Authorized(R.ADMIN)
  @Query(() => CertificationProviderResponse, { nullable: true })
  async certificateProviderByName(
    @Arg("certificationProviderName") certificationProviderName: string
  ): Promise<CertificationProviderResponse | undefined> {
    const certificateProvider = await CertificationProviders.findOne({
      where: {
        certificationProviderName: certificationProviderName,
      },
    });
    if (!certificateProvider) {
      return {
        errors: [
          {
            field: "certificationProviderName",
            message: "Certificate Provider does not exist",
          },
        ],
      };
    }

    return { data: certificateProvider };
  }
}
