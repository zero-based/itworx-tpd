import { Resolver, Query, Mutation, Arg, Ctx } from "type-graphql";
import { validate } from "class-validator";

import { AppContext } from "../types";
import { EmployeesProfiles } from "../entities/EmployeesProfiles";
import { UserInput } from "../types/inputs/UserInput";
import { UserResponse } from "../types/responses/UserResponse";
import { Users } from "../entities/Users";
import { mapToFieldError } from "../utils/mapToFieldError";
import { UserRole } from "../entities/UserRole";
import { Role } from "../entities/Role";

@Resolver(Users)
export class UserResolver {
  @Query(() => EmployeesProfiles, { nullable: true })
  me(
    @Ctx() { req }: AppContext
  ): Promise<EmployeesProfiles | undefined> | null {
    var profileId = req.session?.profileId;
    if (!profileId) return null;
    return EmployeesProfiles.findOne(profileId);
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

    const user = await Users.findOne({ email: input.email });
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

    const userRole = await UserRole.findOne(user!.id);
    if (userRole !== undefined) {
      if (userRole.roleId !== null) {
        const role = await Role.findOne(userRole.roleId);
        req.session!.userRole = role!.roleName;
        req.session!.userName = user.userName;
      }
    }

    return { data: profile };
  }

  @Mutation(() => Boolean)
  logout(@Ctx() { req, res }: AppContext): Promise<boolean> {
    return new Promise((resolve) =>
      req.session!.destroy((err) => {
        res.clearCookie("qid");
        if (err) {
          resolve(false);
          return;
        }
        resolve(true);
      })
    );
  }
}
