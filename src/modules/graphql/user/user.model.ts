import {
  Field,
  GraphQLISODateTime,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import { Gender, LoginType, User as UserDB } from '@prisma/client';
import { RefreshTokenUserModel } from '../refreshTokenUser/refreshTokenUser.model';

registerEnumType(Gender, { name: 'Gender' });
registerEnumType(LoginType, { name: 'LoginType' });
@ObjectType()
export class UserModel {
  @Field(() => String)
  id!: UserDB[`id`];

  @Field(() => GraphQLISODateTime)
  createdAt!: UserDB[`createdAt`];

  @Field(() => GraphQLISODateTime)
  updatedAt!: UserDB[`updatedAt`];

  @Field(() => GraphQLISODateTime, { nullable: true })
  deletedAt?: UserDB[`deletedAt`];

  @Field(() => String, { nullable: true })
  avatarUrl?: UserDB[`avatarUrl`];

  @Field(() => String, { nullable: true })
  name?: UserDB[`name`];

  @Field(() => String, { nullable: true })
  phone?: UserDB[`phone`];

  @Field(() => String, { nullable: true })
  username?: UserDB[`username`];

  @Field(() => String, { nullable: true })
  slug?: UserDB[`slug`];

  @Field(() => String, { nullable: true })
  email?: UserDB[`email`];

  @Field(() => Date, { nullable: true })
  dob?: UserDB[`dob`];

  @Field(() => Gender)
  gender!: UserDB[`gender`];

  @Field(() => String)
  ipv4!: UserDB[`ipv4`];

  @Field(() => LoginType)
  loginType!: UserDB[`loginType`];

  @Field((_type: any) => [RefreshTokenUserModel])
  refreshTokens!: RefreshTokenUserModel[];

  @Field((_type: any) => String, { nullable: true })
  dobFormatted?: String;
}
