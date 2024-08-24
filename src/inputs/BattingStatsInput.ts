import { InputType, Field } from "type-graphql";

@InputType()
export class BattingStatsInput {
  @Field({ nullable: true })
  careerStatsId?: string; // Link to CareerStats if available

  @Field({ defaultValue: 0 })
  innings!: number;

  @Field({ defaultValue: 0 })
  runs!: number;

  @Field({ defaultValue: 0 })
  ballsFaced!: number;

  @Field({ defaultValue: 0 })
  fours!: number;

  @Field({ defaultValue: 0 })
  sixes!: number;

  @Field({ defaultValue: 0 })
  highestScore!: number;

  @Field({ defaultValue: 0 })
  fifties!: number;

  @Field({ defaultValue: 0 })
  hundreds!: number;

  @Field({ defaultValue: 0 })
  notOuts!: number;
}
