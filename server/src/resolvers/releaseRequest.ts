import { validate } from "class-validator";
import { Arg, Authorized, Ctx, Int, Mutation, Query, Resolver } from "type-graphql";
import { MoreThan } from "typeorm";

import { ReleaseRequests } from "../entities/ReleaseRequests";
import { AppContext } from "../types";
import { ReleaseRequestInput } from "../types/inputs/ReleaseRequestInput";
import { PaginatedReleaseRequestResponse } from "../types/responses/PaginatedReleaseRequestResponse";
import { ReleaseRequestResponse } from "../types/responses/ReleaseRequestResponse";
import { UserRole as R } from "../types/UserRole";
import { mapToFieldError } from "../utils/mapToFieldError";


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
      return {
        errors: mapToFieldError(validationErrors),
      };
    }

    const employeeExists = await ReleaseRequests.findOne({
      employeeId: input.employeeId,
    });

    if (!employeeExists) {
      return {
        errors: [
          {
            field: "employee_id",
            message: "Incorrect Employee Id",
          },
        ],
      };
    }

    return {
      data: await ReleaseRequests.create({ ...input }).save(),
    };
  }

  // Get A RleaseRequest
  @Authorized(R.ADMIN, R.MANAGER)
  @Query(() => ReleaseRequestResponse, { nullable: true })
  async releaseRequest(
    @Arg("referenceNumber", () => Int) referenceNumber: number
  ): Promise<ReleaseRequestResponse | undefined> {
    const releaseRequest = await ReleaseRequests.findOne(referenceNumber);
    if (!releaseRequest) {
      return {
        errors: [
          {
            field: "referenceNumber",
            message: "Release Request does not exist",
          },
        ],
      };
    }

    return { data: releaseRequest };
  }

  // Update ReleaseRequest
  @Authorized(R.ADMIN, R.MANAGER)
  @Mutation(() => ReleaseRequestResponse, { nullable: true })
  async updateReleaseRequest(
    @Arg("referenceNumber", () => Int) referenceNumber: number,
    @Arg("input") input: ReleaseRequestInput
  ): Promise<ReleaseRequestResponse | undefined> {
    const ReleaseRequest = await ReleaseRequests.findOne(referenceNumber);
    if (!ReleaseRequest) {
      return {
        errors: [
          {
            field: "referenceNumber",
            message: "Release Request does not exist",
          },
        ],
      };
    }

    const employeeExists = await ReleaseRequests.findOne({
      employeeId: input.employeeId,
    });

    if (!employeeExists) {
      return {
        errors: [
          {
            field: "employee_id",
            message: "Incorrect Employee Id",
          },
        ],
      };
    }

    await ReleaseRequests.update(referenceNumber, { ...input });
    return { data: { ...ReleaseRequest, ...input } as ReleaseRequests };
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

  // Get 30 ReleaseRequest
  @Authorized(R.ADMIN, R.MANAGER)
  @Query(() => PaginatedReleaseRequestResponse)
  async releaseRequests(
    @Arg("limit", () => Int) limit: number,
    @Arg("cursor", () => Int, { nullable: true }) cursor: number | null,
    @Ctx() { req }: AppContext
  ): Promise<PaginatedReleaseRequestResponse> {
    const requestLimit = Math.min(30, limit);
    const fetchLimit = requestLimit + 1;

    const { userRole, userName } = req.session!;
    const requests = await ReleaseRequests.find({
      order: { referenceNumber: "ASC" },
      where: {
        ...(cursor ? { referenceNumber: MoreThan(cursor) } : {}),
        ...(userRole === R.MANAGER ? { managerName: userName } : {}),
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
}
