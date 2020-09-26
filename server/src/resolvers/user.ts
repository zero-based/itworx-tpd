import { Resolver, Query, Mutation, Arg, Ctx } from "type-graphql";
import { validate } from "class-validator";

import { AppContext } from "../types";
import { EmployeesProfiles } from "../entities/EmployeesProfiles";
import { UserInput } from "../types/inputs/UserInput";
import { UserResponse } from "../types/responses/UserResponse";
import { Users } from "../entities/Users";
import { mapToFieldError } from "../utils/mapToFieldError";

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
    req.session!.userRole = user.role.roleName;
    req.session!.userName = user.userName;

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
