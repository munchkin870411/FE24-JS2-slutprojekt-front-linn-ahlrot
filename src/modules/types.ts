export type StatusT = "new" | "in progress" | "done";
export type RoleT = "ux" | "dev frontend" | "dev backend";
export type CategoryT = RoleT;

export interface MemberI {
  id: string;
  name: string;
  roles: RoleT[];
}

export interface AssignmentI {
  id: string;
  title: string;
  description: string;
  category: CategoryT;
  status: StatusT;
  assigned: string | null;
  timestamp: number;
}
