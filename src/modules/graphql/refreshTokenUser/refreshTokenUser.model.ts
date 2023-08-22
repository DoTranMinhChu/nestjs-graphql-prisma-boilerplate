import { Field, GraphQLISODateTime, ObjectType } from '@nestjs/graphql';
import { RefreshTokenUser as RefreshTokenUserDB } from '@prisma/client';

@ObjectType()
export class RefreshTokenUserModel {
  @Field(() => String)
  id!: RefreshTokenUserDB[`id`];

  @Field(() => GraphQLISODateTime)
  createdAt!: RefreshTokenUserDB[`createdAt`];

  @Field(() => GraphQLISODateTime)
  updatedAt!: RefreshTokenUserDB[`updatedAt`];

  @Field(() => GraphQLISODateTime, { nullable: true })
  deletedAt?: RefreshTokenUserDB[`deletedAt`];

  @Field(() => String)
  refreshToken!: RefreshTokenUserDB[`refreshToken`];

  @Field(() => String)
  userId!: RefreshTokenUserDB[`userId`];
}
