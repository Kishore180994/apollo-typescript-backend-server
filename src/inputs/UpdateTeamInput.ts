import { InputType, Field, ID } from "type-graphql";

@InputType()
export class UpdateTeamInput {
  @Field({ nullable: true })
  name?: string;

  @Field(() => ID, { nullable: true })
  matchId?: string; // Optionally link to a different Match

  @Field(() => [ID], { nullable: true })
  playerIds?: string[]; // Optionally update the list of Player IDs linked to the team
}
