import { Connection } from "typeorm";

import { EmployeesProfiles } from "../../src/entities/EmployeesProfiles";
import { BaseSeeder } from "./BaseSeeder";

export class EmployeeProfileSeeder implements BaseSeeder {
  public async run(connection: Connection): Promise<any> {
    return connection.getRepository(EmployeesProfiles).save([
      {
        id: "1",
        name: "Test Admin",
        title: "Admin",
        hiringDate: "2020-01-01",
        function: "Admin",
        directManagerId: null,
        workgroup: "ITWorx",
        employmentType: "Full Time",
        allocationPercentage: 0,
        skillsLastUpdateDate: "2020-01-01",
        employeeEmail: "admin@test.com",
        employeeProfilePicture: null,
        mobileNumber: "012345678911",
        costCenter: "A",
      },
      {
        id: "2",
        name: "Test Manager",
        title: "Manager",
        hiringDate: "2020-01-01",
        function: "Manager",
        directManagerId: "1",
        workgroup: "ITWorx",
        employmentType: "Full Time",
        allocationPercentage: 0,
        skillsLastUpdateDate: "2020-01-01",
        employeeEmail: "manager@test.com",
        employeeProfilePicture: null,
        mobileNumber: "012345678912",
        costCenter: "M",
      },
      {
        id: "3",
        name: "Test Employee",
        title: "Employee",
        hiringDate: "2020-01-01",
        function: "Employee",
        directManagerId: "2",
        workgroup: "ITWorx",
        employmentType: "Part Time",
        allocationPercentage: 0,
        skillsLastUpdateDate: "2020-01-01",
        employeeEmail: "employee@test.com",
        employeeProfilePicture: null,
        mobileNumber: "012345678913",
        costCenter: "E",
      },
    ]);
  }
}
