import { User } from "../entities/User";
import { Resolver, Query } from "type-graphql";

@Resolver()
export class UserResolver {
  @Query(() => User)
  me(): User {
    return {
      email: "server@email.com",
      password: "serverPassword",
    };
  }
}
