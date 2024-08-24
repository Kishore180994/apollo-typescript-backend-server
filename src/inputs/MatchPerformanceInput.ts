import { InputType, Field } from "type-graphql";

@InputType()
export class MatchPerformanceInput {
  @Field()
  matchId!: string; // Link to the Match

  @Field()
  playerId!: string; // Link to the Player

  @Field({ nullable: true })
  battingStatsId?: string; // Optionally link to BattingStats

  @Field({ nullable: true })
  bowlingStatsId?: string; // Optionally link to BowlingStats

  @Field({ nullable: true })
  fieldingStatsId?: string; // Optionally link to FieldingStats
}
