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

import { EmployeesProfiles } from "../entities/EmployeesProfiles";
import { ReleaseRequests } from "../entities/ReleaseRequests";
import { AppContext } from "../types";
import { ReleaseRequestInput } from "../types/inputs/ReleaseRequestInput";
import { PaginatedReleaseRequestResponse } from "../types/responses/PaginatedReleaseRequestResponse";
import { ReleaseRequestResponse } from "../types/responses/ReleaseRequestResponse";
import { UserRole as R } from "../types/UserRole";
import { mapToFieldError } from "../utils/mapToFieldError";
import { findOrError } from "../utils/orm/findOrError";
import { paginate } from "../utils/orm/paginate";

@Resolver()
export class ReleaseRequestResolver {
  // Add Release Request
  @Authorized(R.ADMIN, R.MANAGER)
  @Mutation(() => ReleaseRequestResponse)
  async createReleaseRequest(
    @Arg("input") input: ReleaseRequestInput
  ): Promise<ReleaseRequestResponse> {
    const validationErrors = await validate(input);
    if (validationErrors.length > 0) {
      return { errors: mapToFieldError(validationErrors) };
    }

    const [, managerErrors] = await findOrError(
      EmployeesProfiles,
      "managerName",
      undefined,
      {
        where: {
          name: input.managerName,
          directManagerId: null,
        },
      }
    );

    if (managerErrors) return { errors: managerErrors };

    const [, employeeErrors] = await findOrError(
      EmployeesProfiles,
      "employeeId",
      input.employeeId
    );

    if (employeeErrors) return { errors: employeeErrors };

    return {
      data: await ReleaseRequests.create({ ...input }).save(),
    };
  }

  // Get A ReleaseRequest
  @Authorized(R.ADMIN, R.MANAGER)
  @Query(() => ReleaseRequestResponse, { nullable: true })
  async releaseRequest(
    @Arg("referenceNumber", () => Int) referenceNumber: number
  ): Promise<ReleaseRequestResponse | undefined> {
    const [releaseRequest, errors] = await findOrError(
      ReleaseRequests,
      "referenceNumber",
      referenceNumber
    );

    return errors ? { errors } : { data: releaseRequest };
  }

  // Get ReleaseRequest
  @Authorized(R.ADMIN, R.MANAGER)
  @Query(() => PaginatedReleaseRequestResponse)
  async releaseRequests(
    @Arg("limit", () => Int) limit: number,
    @Arg("cursor", () => Int, { nullable: true }) cursor: number | null,
    @Ctx() { req }: AppContext
  ): Promise<PaginatedReleaseRequestResponse> {
    const { userRole, userName } = req.session!;
    return {
      data: await paginate(ReleaseRequests, limit, {
        order: { referenceNumber: "ASC" },
        where: {
          ...(cursor ? { referenceNumber: MoreThan(cursor) } : {}),
          ...(userRole === R.MANAGER ? { managerName: userName } : {}),
        },
      }),
    };
  }

  // Update ReleaseRequest
  @Authorized(R.ADMIN, R.MANAGER)
  @Mutation(() => ReleaseRequestResponse, { nullable: true })
  async updateReleaseRequest(
    @Arg("referenceNumber", () => Int) referenceNumber: number,
    @Arg("input") input: ReleaseRequestInput
  ): Promise<ReleaseRequestResponse | undefined> {
    const [releaseRequest, releaseRequestErrors] = await findOrError(
      ReleaseRequests,
      "referenceNumber",
      referenceNumber
    );

    if (releaseRequestErrors) return { errors: releaseRequestErrors };

    const [, managerErrors] = await findOrError(
      EmployeesProfiles,
      "managerName",
      undefined,
      {
        where: {
          name: input.managerName,
          directManagerId: null,
        },
      }
    );

    if (managerErrors) return { errors: managerErrors };

    const [, employeeErrors] = await findOrError(
      EmployeesProfiles,
      "employeeId",
      input.employeeId
    );

    if (employeeErrors) return { errors: employeeErrors };

    return {
      data: await ReleaseRequests.save({
        ...releaseRequest,
        ...input,
      } as ReleaseRequests),
    };
  }

  // Delete Release Request
  @Authorized(R.ADMIN, R.MANAGER)
  @Mutation(() => Boolean)
  async deleteReleaseRequest(
    @Arg("referenceNumber", () => Int) referenceNumber: number
  ): Promise<boolean> {
    await ReleaseRequests.delete(referenceNumber);
    return true;
  }
}
