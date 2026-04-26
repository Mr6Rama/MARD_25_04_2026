export type UserRole = "student" | "mentor";

export type User = {
  id: string;
  name: string;
  role: UserRole;
};
