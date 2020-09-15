import { Column, Entity, OneToMany } from "typeorm";
import { EmployeesProfiles } from "./EmployeesProfiles";

@Entity("managers", { schema: "hackathon" })
export class Managers {
  @Column("varchar", { primary: true, name: "id", length: 36 })
  id: string;

  @Column("varchar", { name: "name", length: 256 })
  name: string;

  @OneToMany(
    () => EmployeesProfiles,
    (employeesProfiles) => employeesProfiles.directManager2
  )
  employeesProfiles: EmployeesProfiles[];
}
