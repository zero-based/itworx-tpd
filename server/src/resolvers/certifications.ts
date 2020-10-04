import { Arg, Authorized, Int, Mutation, Query, Resolver } from "type-graphql";
import { MoreThan } from "typeorm";

import { Certifications } from "../entities/Certifications";
import { CertificationProviders } from "../entities/CertificationProviders";
import { CertificationResponse } from "../types/responses/CertificationResponse";
import { PaginatedCertificationResponse } from "../types/responses/PaginatedCertificationResponse";
import { UserRole as R } from "../types/UserRole";
import { CertificationInput } from "../types/inputs/CertificationInput";
import { paginate } from "../utils/orm/paginate";
import { findOrError } from "../utils/orm/findOrError";

@Resolver()
export class CertificationResolver {
  // Create Certification
  @Authorized()
  @Mutation(() => CertificationResponse)
  async createCertification(
    @Arg("input") input: CertificationInput
  ): Promise<CertificationResponse> {
    const [provider, errors] = await findOrError(
      CertificationProviders,
      "certificationProviderName",
      undefined,
      {
        where: { certificationProviderName: input.certificationProviderName },
      }
    );

    return !provider
      ? { errors }
      : {
          data: await Certifications.create({
            certificationName: input.certificationName,
            certificationProviderId: provider.certificationProviderId,
          }).save(),
        };
  }

  // Get Certification
  @Authorized(R.ADMIN)
  @Query(() => CertificationResponse, { nullable: true })
  async certification(
    @Arg("certificationId", () => Int) certificationId: number
  ): Promise<CertificationResponse | undefined> {
    const [certification, errors] = await findOrError(
      Certifications,
      "certificationId",
      certificationId
    );

    return errors ? { errors } : { data: certification };
  }

  // Get Certifications
  @Authorized(R.ADMIN)
  @Query(() => PaginatedCertificationResponse, { nullable: true })
  async certifications(
    @Arg("limit", () => Int) limit: number,
    @Arg("cursor", () => String, { nullable: true }) cursor: string | null
  ): Promise<PaginatedCertificationResponse | undefined> {
    return {
      data: await paginate(Certifications, limit, {
        order: { certificationName: "ASC" },
        where: {
          ...(cursor ? { certificationName: MoreThan(cursor) } : {}),
        },
        relations: ["employeeCertifications"],
      }),
    };
  }

  // Update Certification
  @Authorized(R.ADMIN)
  @Mutation(() => CertificationResponse, { nullable: true })
  async updateCertification(
    @Arg("certificationId", () => Int) certificationId: number,
    @Arg("input") input: CertificationInput
  ): Promise<CertificationResponse | undefined> {
    const [certification, certificationErrors] = await findOrError(
      Certifications,
      "certificationId",
      certificationId
    );

    if (certificationErrors) return { errors: certificationErrors };

    const [provider, providerErrors] = await findOrError(
      CertificationProviders,
      "certificationProviderName",
      undefined,
      {
        where: {
          certificationProviderName: input.certificationProviderName,
        },
      }
    );

    return providerErrors
      ? { errors: providerErrors }
      : {
          data: await Certifications.save({
            ...certification,
            certificationName: input.certificationName,
            certificationProviderId: provider?.certificationProviderId,
          } as Certifications),
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
