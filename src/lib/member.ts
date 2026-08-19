export const memberRoles = ["sporcu", "antrenor"] as const;
export type MemberRole = (typeof memberRoles)[number];

export const planBranches = ["basketbol", "voleybol", "jimnastik", "yuzme"] as const;
export type PlanBranch = (typeof planBranches)[number];

export const weekdays = [
  "Pazartesi",
  "Salı",
  "Çarşamba",
  "Perşembe",
  "Cuma",
  "Cumartesi",
  "Pazar",
] as const;
export type Weekday = (typeof weekdays)[number];

export type Profile = {
  id: string;
  full_name: string;
  role: MemberRole;
};

export type TrainingPlan = {
  id: string;
  athlete_id: string;
  coach_id: string;
  title: string;
  branch: PlanBranch;
  weekday: string;
  notes: string;
  created_at: string;
  athlete?: Pick<Profile, "id" | "full_name">;
};

export function isMemberRole(value: string): value is MemberRole {
  return memberRoles.includes(value as MemberRole);
}

export function isPlanBranch(value: string): value is PlanBranch {
  return planBranches.includes(value as PlanBranch);
}
