import { Resolver, Query, Mutation, Arg, Ctx, ObjectType } from "type-graphql";

import RegularResponse from "./types/RegularResponse";
import { AppContext } from "../types";
import { EmployeesProfiles } from "../entities/EmployeesProfiles";
import { FieldError } from "./types/FieldError";
import { UserInput } from "./types/UserInput";
import { Users } from "../entities/Users";

@ObjectType()
export class userResponse extends RegularResponse(
  FieldError,
  EmployeesProfiles
) {}

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

  @Mutation(() => userResponse)
  async login(
    @Arg("input") { email, password }: UserInput,
    @Ctx() { req }: AppContext
  ): Promise<userResponse> {
    const user = await Users.findOne({ email });
    if (!user) {
      return {
        errors: [
          {
            field: "email",
            message: "Incorrect email",
          },
        ],
      };
    }
    if (password !== user.password) {
      return {
        errors: [
          {
            field: "password",
            message: "Incorrect password",
          },
        ],
      };
    }
    const profile = await EmployeesProfiles.findOne({
      employeeEmail: user?.email,
    });
    // Save session's data
    req.session!.profileId = profile!.id;
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
