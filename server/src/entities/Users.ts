import {
  BaseEntity,
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Roles } from "./Roles";

@Index("role_id_fk_idx", ["roleId"], {})
@Entity("users", { schema: "hackathon" })
export class Users extends BaseEntity {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "user_name", length: 32 })
  userName: string;

  @Column("varchar", { name: "password", length: 32 })
  password: string;

  @Column("varchar", { name: "email", length: 320 })
  email: string;

  @Column("int", { name: "role_id" })
  roleId: number;

  @ManyToOne(() => Roles, (roles) => roles.users, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "role_id", referencedColumnName: "id" }])
  role: Roles;
}
