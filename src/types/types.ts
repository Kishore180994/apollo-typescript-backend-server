export enum PlayerRole {
  BATSMAN = "Batsman",
  BOWLER = "Bowler",
  ALL_ROUNDER = "All-rounder",
  WICKETKEEPER = "Wicket-keeper",
}

export enum BattingStyle {
  RIGHT_HANDED = "Right-handed",
  LEFT_HANDED = "Left-handed",
}

export enum BowlingStyle {
  // Fast Bowling Styles
  RIGHT_ARM_FAST = "Right Arm Fast",
  LEFT_ARM_FAST = "Left Arm Fast",
  RIGHT_ARM_FAST_MEDIUM = "Right Arm Fast Medium",
  LEFT_ARM_FAST_MEDIUM = "Left Arm Fast Medium",
  RIGHT_ARM_MEDIUM = "Right Arm Medium",
  LEFT_ARM_MEDIUM = "Left Arm Medium",

  // Spin Bowling Styles
  RIGHT_ARM_OFF_BREAK = "Right Arm Off Break",
  LEFT_ARM_ORTHODOX = "Left Arm Orthodox",
  RIGHT_ARM_LEG_BREAK = "Right Arm Leg Break",
  LEFT_ARM_UNORTHODOX = "Left Arm Unorthodox", // Also known as Chinaman
}
