export type StageType = "login" | "stage" | "final";

export interface Stage {
  id: number;
  type: StageType;
  title: string;
  hint: string;
  passcode: string;
  successMessage: string;
}

export const STAGES: Stage[]　= [
  {
    id: 0,
    type: "login",
    title: "Security Check",
    hint: "What was the savings amount we looked at recently? (Enter 4 digits)",
    passcode: "4500",
    successMessage: "Correct! That's our future fund. Let's start the hunt!"
  },
  {
    id: 1,
    type: "stage",
    title: "Stage 1: Late-Night Cravings",
    hint: "Where is our late-night joy packed? Go find the physical passcode card hidden there!",
    passcode: "8888", 
    successMessage: "Found it! Nothing beats late-night noodles."
  },
  {
    id: 2,
    type: "stage",
    title: "Stage 2: Game Night Memory",
    hint: "What was the date we first played Mahjong together? (Format: MMDD)",
    passcode: "0127",
    successMessage: "Exactly! Such a fun memory."
  },
  {
    id: 3,
    type: "final",
    title: "Final Stage: Captured Moments",
    hint: "The thing that knows our memories best holds the final password. Search inside it!",
    passcode: "0530", 
    successMessage: "Mission Accomplished! Happy Birthday!"
  }
];