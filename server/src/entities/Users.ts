import { UserRole } from "./UserRole";

import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

@ObjectType()
@Entity("users", { schema: "hackathon" })
export class Users extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Column("int", { primary: true, name: "id" })
  id: number;

  @Field()
  @Column("varchar", { name: "user_name", length: 32 })
  userName: string;

  @Field()
  @Column("varchar", { name: "password", length: 32 })
  password: string;

  @Field()
  @Column("varchar", { name: "email", length: 320 })
  email: string;

  @OneToOne(() => UserRole, (userRole) => userRole.user)
  userRole: UserRole;
}
