import { validate } from "class-validator";
import {
  Arg,
  Authorized,
  Ctx,
  Int,
  Mutation,
  Query,
  Resolver
} from "type-graphql";
import { MoreThan } from "typeorm";

import { ResourceRequests } from "../entities/ResourceRequests";
import { AppContext } from "../types";
import { ResourceRequestInput } from "../types/inputs/ResourceRequestInput";
import { PaginatedResourceRequestResponse } from "../types/responses/PaginatedResourceRequestResponse";
import { ResourceRequestResponse } from "../types/responses/ResourceRequestResponse";
import { UserRole as R } from "../types/UserRole";
import { mapToFieldError } from "../utils/mapToFieldError";


@Resolver()
export class ResourceRequestResolver {
  // Add Resource Request
  @Authorized(R.ADMIN, R.MANAGER)
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
  @Authorized(R.ADMIN, R.MANAGER)
  @Query(() => ResourceRequestResponse, { nullable: true })
  async resourceRequest(
    @Arg("referenceNumber", () => Int) referenceNumber: number
  ): Promise<ResourceRequestResponse | undefined> {
    const resourceRequest = await ResourceRequests.findOne(referenceNumber);
    if (!resourceRequest) {
      return {
        errors: [
          {
            field: "referenceNumber",
            message: "Resource Request does not exist",
          },
        ],
      };
    }

    return { data: resourceRequest };
  }

  // Update ResourceRequest
  @Authorized(R.ADMIN, R.MANAGER)
  @Mutation(() => ResourceRequestResponse, { nullable: true })
  async updateResourceRequest(
    @Arg("referenceNumber", () => Int) referenceNumber: number,
    @Arg("input") input: ResourceRequestInput
  ): Promise<ResourceRequestResponse | undefined> {
    const resourceRequest = await ResourceRequests.findOne(referenceNumber);
    if (!resourceRequest) {
      return {
        errors: [
          {
            field: "referenceNumber",
            message: "Resource Request does not exist",
          },
        ],
      };
    }
    await ResourceRequests.update(referenceNumber, { ...input });
    return { data: { ...resourceRequest, ...input } as ResourceRequests };
  }

  // Delete Resource Request
  @Authorized(R.ADMIN, R.MANAGER)
  @Mutation(() => Boolean)
  async deleteResourceRequest(
    @Arg("referenceNumber", () => Int) referenceNumber: number
  ): Promise<boolean> {
    await ResourceRequests.delete(referenceNumber);
    return true;
  }

  // Get 30 ResourceRequest
  @Authorized(R.ADMIN, R.MANAGER)
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
