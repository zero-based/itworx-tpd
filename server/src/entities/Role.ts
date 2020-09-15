import { Column, Entity, OneToMany } from "typeorm";
import { UserRole } from "./UserRole";

@Entity("role", { schema: "hackathon" })
export class Role {
  @Column("int", { primary: true, name: "id" })
  id: number;

  @Column("varchar", { name: "role_name", length: 32 })
  roleName: string;

  @OneToMany(() => UserRole, (userRole) => userRole.role)
  userRoles: UserRole[];
}
