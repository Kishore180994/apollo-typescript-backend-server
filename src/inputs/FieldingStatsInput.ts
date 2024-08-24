import { InputType, Field } from "type-graphql";

@InputType()
export class FieldingStatsInput {
  @Field({ nullable: true })
  careerStatsId?: string; // Link to CareerStats if available

  @Field({ defaultValue: 0 })
  catches!: number;

  @Field({ defaultValue: 0 })
  runOuts!: number;

  @Field({ defaultValue: 0 })
  stumpings!: number;
}
