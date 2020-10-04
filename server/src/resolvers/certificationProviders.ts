import { Arg, Authorized, Int, Mutation, Query, Resolver } from "type-graphql";
import { MoreThan } from "typeorm";

import { CertificationProviders } from "../entities/CertificationProviders";
import { CertificationProviderInput } from "../types/inputs/CertificationProviderInput";
import { CertificationProviderResponse } from "../types/responses/CertificationProviderResponse";
import { PaginatedCertificationProviderResponse } from "../types/responses/PaginatedCertificationProviderResponse";
import { UserRole as R } from "../types/UserRole";
import { findOrError } from "../utils/orm/findOrError";
import { paginate } from "../utils/orm/paginate";

@Resolver()
export class CertificationProvidersResolver {
  // Create Certification Provider
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

  // Get Certification Provider
  @Authorized(R.ADMIN)
  @Query(() => CertificationProviderResponse, { nullable: true })
  async certificationProvider(
    @Arg("certificationProviderId", () => Int) certificationProviderId: number
  ): Promise<CertificationProviderResponse | undefined> {
    const [provider, errors] = await findOrError(
      CertificationProviders,
      "certificationProviderId",
      certificationProviderId,
      {
        where: { certificationProviderId },
        relations: ["certifications"],
      }
    );

    return errors ? { errors } : { data: provider };
  }

  // Get Certification Providers
  @Authorized(R.ADMIN)
  @Query(() => PaginatedCertificationProviderResponse, { nullable: true })
  async certificationsProviders(
    @Arg("limit", () => Int) limit: number,
    @Arg("cursor", () => String, { nullable: true }) cursor: string | null
  ): Promise<PaginatedCertificationProviderResponse | undefined> {
    return {
      data: await paginate(CertificationProviders, limit, {
        order: { certificationProviderName: "ASC" },
        where: {
          ...(cursor ? { certificationProviderName: MoreThan(cursor) } : {}),
        },
      }),
    };
  }

  // Update Certification Provider
  @Authorized(R.ADMIN)
  @Mutation(() => CertificationProviderResponse, { nullable: true })
  async updateCertificationProvider(
    @Arg("certificationProviderId", () => Int) certificationProviderId: number,
    @Arg("input") input: CertificationProviderInput
  ): Promise<CertificationProviderResponse | undefined> {
    const [provider, errors] = await findOrError(
      CertificationProviders,
      "certificationProviderId",
      certificationProviderId
    );

    return errors
      ? { errors }
      : {
          data: await CertificationProviders.save({
            ...provider,
            certificationProviderName: input.certificationProviderName,
          } as CertificationProviders),
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
