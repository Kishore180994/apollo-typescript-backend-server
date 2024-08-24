import { InputType, Field } from "type-graphql";

@InputType()
export class TeamInput {
  @Field()
  name!: string;

  @Field()
  matchId!: string; // Link to the Match

  @Field(() => [String], { nullable: true })
  playerIds?: string[]; // Array of Player IDs to be linked to the team
}
