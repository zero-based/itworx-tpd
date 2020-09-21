import { Arg, Ctx, Int, Mutation, Query, Resolver } from "type-graphql";
import { MoreThan } from "typeorm";
import { ResourceRequestInput } from "../types/inputs/ResourceRequestInput";
import { ResourceRequests } from "../entities/ResourceRequests";
import { AppContext } from "../types";
import { ResourceRequestResponse } from "../types/responses/ResourceRequestResponse";
import { mapToFieldError } from "../utils/mapToFieldError";
import { validate } from "class-validator";
import { PaginatedResourceRequestResponse } from "../types/responses/PaginatedResourceRequestResponse";

@Resolver()
export class ResourceRequestResolver {
  // Add Resource Request
  @Mutation(() => ResourceRequestResponse)
  async createResourceRequest(
    @Arg("input") input: ResourceRequestInput
  ): Promise<ResourceRequestResponse> {
    const validationErrors = await validate(input);
    if (validationErrors.length > 0) {
      return {
        errors: mapToFieldError(validationErrors),
      };
    }
    return {
      data: await ResourceRequests.create({ ...input }).save(),
    };
  }

  // Get A ResourceRequest
  @Query(() => ResourceRequestResponse, { nullable: true })
  async resourceRequest(
    @Arg("reference_number", () => Int) referenceNumber: number
  ): Promise<ResourceRequestResponse | undefined> {
    const resourceRequest = await ResourceRequests.findOne(referenceNumber);
    if (!resourceRequest) {
      return {
        errors: [
          {
            field: "reference_number",
            message: "No Resource Request At This Reference Number",
          },
        ],
      };
    }

    return { data: resourceRequest };
  }

  // Update ResourceRequest
  @Mutation(() => ResourceRequestResponse, { nullable: true })
  async updateResourceRequest(
    @Arg("reference_number", () => Int) referenceNumber: number,
    @Arg("input") input: ResourceRequestInput
  ): Promise<ResourceRequestResponse | undefined> {
    const resourceRequest = await ResourceRequests.findOne(referenceNumber);
    if (!resourceRequest) {
      return {
        errors: [
          {
            field: "reference_number",
            message: "No Resource Request At This Reference Number",
          },
        ],
      };
    }
    await ResourceRequests.update(referenceNumber, { ...input });
    return { data: { ...resourceRequest, ...input } as ResourceRequests };
  }

  // Delete Resource Request
  @Mutation(() => Boolean)
  async deleteResourceRequest(
    @Arg("reference_number", () => Int) referenceNumber: number
  ): Promise<boolean> {
    await ResourceRequests.delete(referenceNumber);
    return true;
  }

  // Get 30 ResourceRequest
  @Query(() => PaginatedResourceRequestResponse)
  async resourceRequests(
    @Arg("limit", () => Int) limit: number,
    @Arg("cursor", () => Int, { nullable: true }) cursor: number | null,
    @Ctx() { req }: AppContext
  ): Promise<PaginatedResourceRequestResponse> {
    const requestLimit = Math.min(30, limit);
    const fetchLimit = requestLimit + 1;

    const { userRole, userName } = req.session!;
    const requests = await ResourceRequests.find({
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
