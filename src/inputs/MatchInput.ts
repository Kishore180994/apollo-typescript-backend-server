import { InputType, Field } from "type-graphql";

@InputType()
export class MatchInput {
  @Field()
  groupId!: string; // Link to the Group

  @Field(() => [String], { nullable: true })
  teamIds?: string[]; // Array of Team IDs to be linked to the match

  @Field()
  date!: Date;

  @Field()
  maxOvers!: number;
}
