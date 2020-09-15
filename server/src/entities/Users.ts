import { Column, Entity, OneToOne } from "typeorm";
import { UserRole } from "./UserRole";

@Entity("users", { schema: "hackathon" })
export class Users {
  @Column("int", { primary: true, name: "id" })
  id: number;

  @Column("varchar", { name: "user_name", length: 32 })
  userName: string;

  @Column("varchar", { name: "password", length: 32 })
  password: string;

  @Column("varchar", { name: "email", length: 320 })
  email: string;

  @OneToOne(() => UserRole, (userRole) => userRole.user)
  userRole: UserRole;
}
