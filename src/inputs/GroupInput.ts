import { InputType, Field } from "type-graphql";

@InputType()
export class GroupInput {
  @Field()
  name!: string;

  @Field(() => [String], { nullable: true })
  playerIds?: string[]; // Array of Player IDs to be linked to the group
}
