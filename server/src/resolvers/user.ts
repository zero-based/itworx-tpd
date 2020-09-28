import { validate } from "class-validator";
import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";

import { EmployeesProfiles } from "../entities/EmployeesProfiles";
import { Users } from "../entities/Users";
import { AppContext } from "../types";
import { UserInput } from "../types/inputs/UserInput";
import { UserResponse } from "../types/responses/UserResponse";
import { UserRole } from "../types/UserRole";
import { mapToFieldError } from "../utils/mapToFieldError";
import { SESSION_COOKIE_NAME } from "../utils/constants";

@Resolver()
export class UserResolver {
  @Authorized()
  @Query(() => EmployeesProfiles, { nullable: true })
  me(@Ctx() { req }: AppContext): Promise<EmployeesProfiles | undefined> {
    var profileId = req.session?.profileId;
    return EmployeesProfiles.findOne(profileId);
  }

  @Authorized()
  @Query(() => UserRole, { nullable: true })
  role(@Ctx() { req }: AppContext): UserRole | undefined {
    return req.session?.userRole;
  }

  @Mutation(() => UserResponse)
  async login(
    @Arg("input") input: UserInput,
    @Ctx() { req }: AppContext
  ): Promise<UserResponse> {
    const validationErrors = await validate(input);
    if (validationErrors.length > 0) {
      return {
        errors: mapToFieldError(validationErrors),
      };
    }

    const user = await Users.findOne(
      { email: input.email },
      { relations: ["role"] } // eager relation creates ER_DUP_FIELDNAME
    );
    if (!user || input.password !== user.password) {
      return {
        errors: [
          {
            field: "email",
            message: "Incorrect email or password",
          },
        ],
      };
    }

    const profile = await EmployeesProfiles.findOne({
      employeeEmail: user?.email,
    });

    // Save session's data
    req.session!.profileId = profile!.id;
    req.session!.userRole = user.role.roleName.toLowerCase() as UserRole;
    req.session!.userName = user.userName;

    return { data: profile };
  }

  @Authorized()
  @Mutation(() => Boolean)
  logout(@Ctx() { req, res }: AppContext): Promise<boolean> {
    return new Promise((resolve) =>
      req.session!.destroy((err) => {
        res.clearCookie(SESSION_COOKIE_NAME);
        if (err) {
          resolve(false);
          return;
        }
        resolve(true);
      })
    );
  }
}
