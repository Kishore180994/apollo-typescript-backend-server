import { InputType, Field } from "type-graphql";

@InputType()
export class BowlingStatsInput {
  @Field({ nullable: true })
  careerStatsId?: string; // Link to CareerStats if available

  @Field({ defaultValue: 0 })
  innings!: number;

  @Field({ defaultValue: 0 })
  overs!: number;

  @Field({ defaultValue: 0 })
  maidens!: number;

  @Field({ defaultValue: 0 })
  runs!: number;

  @Field({ defaultValue: 0 })
  wickets!: number;

  @Field({ defaultValue: 0 })
  bestBowlingWickets!: number;

  @Field({ defaultValue: 0 })
  bestBowlingRuns!: number;

  @Field({ defaultValue: 0 })
  fiveWicketHauls!: number;
}
