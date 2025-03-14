// this file contains the functions that will be used to interact with the API.
// The functions will be used to fetch data from the API, add new members and assignments,
// assign tasks to members, mark tasks as done, and remove tasks.
// The functions will be used in the application to interact with the API and update
// the state of the application.

import { AssignmentI, CategoryT, MemberI, RoleT } from "./types.ts";

const API_BASE =
  "https://fe24-js2-slutprojekt-back-linn-ahlrot.onrender.com/api";

export async function fetchBoard(): Promise<{
  members: MemberI[];
  assignments: AssignmentI[];
}> {
  try {
    const res = await fetch(`${API_BASE}/board`);
    if (!res.ok) throw new Error(`Failed to fetch board: ${res.statusText}`);
    const data = await res.json();
    return data;
  } catch (error) {
    alert(error);
    // Return empty data to prevent app crashes
    return { members: [], assignments: [] };
  }
}

export async function addMember(
  name: string,
  roles: RoleT[]
): Promise<MemberI | null> {
  try {
    const res = await fetch(`${API_BASE}/members`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, roles }),
    });
    if (!res.ok) throw new Error(`Failed to add member: ${res.statusText}`);
    const member = await res.json();
    return member as MemberI;
  } catch (error) {
    alert(error);
    return null;
  }
}

export async function createAssignment(
  title: string,
  description: string,
  category: CategoryT
): Promise<AssignmentI | null> {
  try {
    const res = await fetch(`${API_BASE}/assignments`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description, category }),
    });
    if (!res.ok)
      throw new Error(`Failed to create assignment: ${res.statusText}`);
    const data = await res.json();
    return data as AssignmentI;
  } catch (error) {
    alert(error);
    return null;
  }
}

export async function assignTask(
  assignmentId: string,
  memberId: string
): Promise<boolean> {
  try {
    const res = await fetch(`${API_BASE}/assignments/assign`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ assignmentId, memberId }),
    });
    if (!res.ok) throw new Error(`Failed to assign task: ${res.statusText}`);
    return true;
  } catch (error) {
    alert(error);
    return false;
  }
}

export async function markAsDone(assignmentId: string): Promise<boolean> {
  try {
    const res = await fetch(`${API_BASE}/assignments/${assignmentId}/done`, {
      method: "PATCH",
    });
    if (!res.ok)
      throw new Error(`Failed to mark task as done: ${res.statusText}`);
    return true;
  } catch (error) {
    alert(error);
    return false;
  }
}

export async function removeTask(assignmentId: string): Promise<boolean> {
  try {
    const res = await fetch(`${API_BASE}/assignments/${assignmentId}`, {
      method: "DELETE",
    });
    if (!res.ok) throw new Error(`Failed to delete task: ${res.statusText}`);
    return true;
  } catch (error) {
    alert(error);
    return false;
  }
}
