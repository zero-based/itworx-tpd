import {
  BaseEntity,
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToOne,
} from "typeorm";
import { Role } from "./Role";
import { Users } from "./Users";

@Index("role_id_fk_idx", ["roleId"], {})
@Entity("user_role", { schema: "hackathon" })
export class UserRole extends BaseEntity {
  @Column("int", { primary: true, name: "user_id" })
  userId: number;

  @Column("int", { name: "role_id", nullable: true })
  roleId: number | null;

  @ManyToOne(() => Role, (role) => role.userRoles, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "role_id", referencedColumnName: "id" }])
  role: Role;

  @OneToOne(() => Users, (users) => users.userRole, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "user_id", referencedColumnName: "id" }])
  user: Users;
}
