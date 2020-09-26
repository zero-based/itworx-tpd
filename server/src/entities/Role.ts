import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Users } from "./Users";

@Entity("role", { schema: "hackathon" })
export class Role extends BaseEntity {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "role_name", length: 32 })
  roleName: string;

  @OneToMany(() => Users, (users) => users.role)
  users: Users[];
}
