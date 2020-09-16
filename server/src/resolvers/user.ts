import { AppContext } from "../types";
import { EmployeesProfiles } from "../entities/EmployeesProfiles";
import { InvalidCredentialsError } from "../errors/InvalidCredentials";
import { UserInput } from "./types/UserInput";
import { Users } from "../entities/Users";

import { Resolver, Query, Arg, Mutation, Ctx } from "type-graphql";

@Resolver(Users)
export class UserResolver {
  @Query(() => Users, { nullable: true })
  me(@Ctx() { req }: AppContext) {
    var userId = req.session?.userId;
    if (!userId) {
      return null;
    }
    return Users.findOne({ id: userId });
  }

  @Mutation(() => EmployeesProfiles)
  async login(
    @Arg("input") input: UserInput,
    @Ctx() { req }: AppContext
  ): Promise<EmployeesProfiles | undefined> {
    const dbUser = await Users.findOne({ email: input.email });

    if (!dbUser) {
      throw new InvalidCredentialsError("email");
    }

    if (input.password !== dbUser!.password) {
      throw new InvalidCredentialsError("password");
    }

    req.session!.userId = dbUser!.id;

    const employeeProfile = await EmployeesProfiles.findOne({
      employeeEmail: dbUser?.email,
    });

    return employeeProfile;
  }

  @Mutation(() => Boolean)
  logout(@Ctx() { req, res }: AppContext) {
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
