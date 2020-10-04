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
import { ResourceRequests } from "../entities/ResourceRequests";
import { AppContext } from "../types";
import { ResourceRequestInput } from "../types/inputs/ResourceRequestInput";
import { PaginatedResourceRequestResponse } from "../types/responses/PaginatedResourceRequestResponse";
import { ResourceRequestResponse } from "../types/responses/ResourceRequestResponse";
import { UserRole as R } from "../types/UserRole";
import { findOrError } from "../utils/orm/findOrError";
import { mapToFieldError } from "../utils/mapToFieldError";
import { paginate } from "../utils/orm/paginate";

@Resolver()
export class ResourceRequestResolver {
  // Create Resource Request
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

    const inputRequestsCount = input.requestsCount ?? 1;
    for (var i = 0; i < inputRequestsCount - 1; i++) {
      await ResourceRequests.create({ ...input }).save();
    }
    return {
      data: await ResourceRequests.create({ ...input }).save(),
    };
  }

  // Get Resource Request
  @Authorized(R.ADMIN, R.MANAGER)
  @Query(() => ResourceRequestResponse, { nullable: true })
  async resourceRequest(
    @Arg("referenceNumber", () => Int) referenceNumber: number
  ): Promise<ResourceRequestResponse | undefined> {
    const [resourceRequest, errors] = await findOrError(
      ResourceRequests,
      "referenceNumber",
      referenceNumber
    );

    return errors ? { errors } : { data: resourceRequest };
  }

  // Get Resource Requests
  @Authorized(R.ADMIN, R.MANAGER)
  @Query(() => PaginatedResourceRequestResponse)
  async resourceRequests(
    @Arg("limit", () => Int) limit: number,
    @Arg("cursor", () => Int, { nullable: true }) cursor: number | null,
    @Ctx() { req }: AppContext
  ): Promise<PaginatedResourceRequestResponse> {
    const { userRole, userName } = req.session!;
    return {
      data: await paginate(ResourceRequests, limit, {
        order: { referenceNumber: "ASC" },
        where: {
          ...(cursor ? { referenceNumber: MoreThan(cursor) } : {}),
          ...(userRole === R.MANAGER ? { managerName: userName } : {}),
        },
      }),
    };
  }

  // Update Resource Request
  @Authorized(R.ADMIN, R.MANAGER)
  @Mutation(() => ResourceRequestResponse, { nullable: true })
  async updateResourceRequest(
    @Arg("referenceNumber", () => Int) referenceNumber: number,
    @Arg("input") input: ResourceRequestInput,
    @Ctx() { req }: AppContext
  ): Promise<ResourceRequestResponse | undefined> {
    const validationErrors = await validate(input);
    if (validationErrors.length > 0) {
      return {
        errors: mapToFieldError(validationErrors),
      };
    }

    const [resourceRequest, resourceRequestErrors] = await findOrError(
      ResourceRequests,
      "referenceNumber",
      referenceNumber
    );

    if (resourceRequestErrors) return { errors: resourceRequestErrors };

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

    const managerStatus = ["Open", "Cancelled", "On Hold"];
    const tpdStatus = [
      "Open",
      "Cancelled",
      "On Hold",
      "Moved",
      "Pending Hiring Request",
      "Hired",
      "Pending Outsourcing Request",
      "Outsourced",
      "Over allocated",
    ];

    if (
      (req.session!.userRole === R.MANAGER &&
        !managerStatus.includes(input.status)) ||
      (req.session!.userRole === R.ADMIN && !tpdStatus.includes(input.status))
    ) {
      return {
        errors: [
          {
            field: "status",
            message: "Please Enter A Valid Status",
          },
        ],
      };
    }

    const inputRequestsCount = input.requestsCount ?? 1;
    const resourceRequestsCount = resourceRequest?.requestsCount ?? 1;

    for (var i = 0; i < inputRequestsCount - resourceRequestsCount; i++) {
      await ResourceRequests.create({ ...input }).save();
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
}
