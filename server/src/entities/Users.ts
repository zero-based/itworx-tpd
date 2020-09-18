import { Field, ObjectType } from "type-graphql";
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserRole } from "./UserRole";

@ObjectType()
@Entity("users", { schema: "hackathon" })
export class Users {
  @Field()
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
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
