import { EmployeesProfiles } from "../entities/EmployeesProfiles";
import { Authorized, Query, Resolver } from "type-graphql";
import { UserRole as R } from "../types/UserRole";

@Resolver()
export class EmployeeResolver {
  @Authorized(R.ADMIN, R.MANAGER)
  @Query(() => [EmployeesProfiles])
  async managers(): Promise<EmployeesProfiles[]> {
    return await EmployeesProfiles.find({
      where: {
        directManagerId: null,
      },
    });
  }

  @Authorized(R.ADMIN, R.MANAGER)
  @Query(() => [EmployeesProfiles])
  employeesProfiles(): Promise<EmployeesProfiles[]> {
    return EmployeesProfiles.find({});
  }
}
