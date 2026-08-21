export const memberRoles = ["sporcu", "antrenor"] as const;
export type MemberRole = (typeof memberRoles)[number];

export const planBranches = ["basketbol", "voleybol", "jimnastik", "yuzme"] as const;
export type PlanBranch = (typeof planBranches)[number];

export const coachLevels = [
  "1. Kademe",
  "2. Kademe",
  "3. Kademe",
  "Yardımcı Antrenör",
  "Antrenör",
] as const;
export type CoachLevel = (typeof coachLevels)[number];

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

export const courseKinds = ["bireysel", "grup"] as const;
export type CourseKind = (typeof courseKinds)[number];

export type Profile = {
  id: string;
  full_name: string;
  email?: string;
  role: MemberRole;
  avatar_url?: string;
  show_on_homepage?: boolean;
};

export type CoachCredential = {
  id?: string;
  coach_id: string;
  branch: PlanBranch;
  level: CoachLevel;
};

export type Course = {
  id: string;
  coach_id: string;
  title: string;
  branch: PlanBranch;
  weekday: Weekday;
  start_time: string;
  end_time: string;
  kind: CourseKind;
  notes: string;
  coach_name?: string;
  athlete_ids: string[];
};

export type HomepageCoach = {
  id: string;
  full_name: string;
  avatar_url: string;
  credentials: Array<{ branch: PlanBranch; level: CoachLevel }>;
};

export function isMemberRole(value: string): value is MemberRole {
  return memberRoles.includes(value as MemberRole);
}

export function isPlanBranch(value: string): value is PlanBranch {
  return planBranches.includes(value as PlanBranch);
}

export function isCoachLevel(value: string): value is CoachLevel {
  return coachLevels.includes(value as CoachLevel);
}

export function isWeekday(value: string): value is Weekday {
  return weekdays.includes(value as Weekday);
}

export function isCourseKind(value: string): value is CourseKind {
  return courseKinds.includes(value as CourseKind);
}

/** Normalize Postgres time "18:00:00" → "18:00" */
export function formatTimeLabel(value: string) {
  return value.slice(0, 5);
}
