import { Resolver, Query, Mutation, Arg, Ctx } from "type-graphql";

import { AppContext } from "../types";
import { EmployeesProfiles } from "../entities/EmployeesProfiles";
import { InvalidCredentialsError } from "../errors/InvalidCredentials";
import { UserInput } from "./types/UserInput";
import { Users } from "../entities/Users";

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

  @Mutation(() => EmployeesProfiles)
  async login(
    @Arg("input") { email, password }: UserInput,
    @Ctx() { req }: AppContext
  ): Promise<EmployeesProfiles | undefined> {
    const user = await Users.findOne({ email });

    if (!user) {
      throw new InvalidCredentialsError("email");
    }

    if (password !== user.password) {
      throw new InvalidCredentialsError("password");
    }

    const profile = await EmployeesProfiles.findOne({
      employeeEmail: user?.email,
    });

    // Save session's data
    req.session!.profileId = profile!.id;

    return profile;
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
