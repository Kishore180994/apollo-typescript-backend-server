import { InputType, Field } from "type-graphql";
import { CareerStatsInput } from "./CareerStatsInput.js";
import { BattingStyle, PlayerRole } from "../types/types.js";

@InputType()
export class PlayerInput {
  @Field()
  name!: string;

  @Field()
  role!: PlayerRole;

  @Field()
  battingStyle!: BattingStyle;

  @Field({ nullable: true })
  bowlingStyle?: string;

  @Field(() => [String], { nullable: true })
  groupIds?: string[];

  @Field(() => [String], { nullable: true })
  teamIds?: string[];

  @Field(() => CareerStatsInput, { nullable: true })
  careerStats?: CareerStatsInput;
}
