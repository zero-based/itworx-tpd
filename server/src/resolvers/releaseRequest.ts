import { ReleaseRequestInput } from "../types/inputs/ReleaseRequestInput";
import { Arg, Ctx, Int, Mutation, Query, Resolver } from "type-graphql";
import { ReleaseRequestResponse } from "../types/responses/ReleaseRequestResponse";
import { validate } from "class-validator";
import { mapToFieldError } from "../utils/mapToFieldError";
import { ReleaseRequests } from "../entities/ReleaseRequests";
import { AppContext } from "../types";
import { MoreThan } from "typeorm";
import { PaginatedReleaseRequestResponse } from "../types/responses/PaginatedReleaseRequestResponse";

@Resolver()
export class ReleaseRequestResolver {
  // Add Release Request
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
  @Query(() => ReleaseRequestResponse, { nullable: true })
  async releaseRequest(
    @Arg("reference_number") reference_number: number
  ): Promise<ReleaseRequestResponse | undefined> {
    const releaseRequest = await ReleaseRequests.findOne(reference_number);
    if (!releaseRequest) {
      return {
        errors: [
          {
            field: "reference_number",
            message: "No Release Request At This Reference Number",
          },
        ],
      };
    }

    return { data: releaseRequest };
  }

  // Update ReleaseRequest
  @Mutation(() => ReleaseRequestResponse, { nullable: true })
  async updateReleaseRequest(
    @Arg("reference_number") reference_number: number,
    @Arg("input") input: ReleaseRequestInput
  ): Promise<ReleaseRequestResponse | undefined> {
    const ReleaseRequest = await ReleaseRequests.findOne(reference_number);
    if (!ReleaseRequest) {
      return {
        errors: [
          {
            field: "reference_number",
            message: "No Release Request At This Reference Number",
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

    await ReleaseRequests.update(reference_number, { ...input });
    return { data: { ...ReleaseRequest, ...input } as ReleaseRequests };
  }

  // Delete Release Request
  @Mutation(() => Boolean)
  async deleteReleaseRequest(
    @Arg("reference_number") reference_number: number
  ): Promise<boolean> {
    await ReleaseRequests.delete(reference_number);
    return true;
  }

  // Get 30 ReleaseRequest
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
        ...(userRole === "manager" ? { managerName: userName } : {}),
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
