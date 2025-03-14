// This file contains the AssignmentService class, which provides methods for creating new
// assignments, assigning tasks to members, marking tasks as done, and removing tasks.

import { createAssignment, assignTask, markAsDone, removeTask } from "./api.ts";
import { AssignmentI, CategoryT } from "./types.ts";

export class AssignmentService {
  static async create(
    title: string,
    description: string,
    category: CategoryT
  ): Promise<AssignmentI | null> {
    return await createAssignment(title, description, category);
  }

  static async assign(
    assignmentId: string,
    memberId: string
  ): Promise<boolean> {
    return await assignTask(assignmentId, memberId);
  }

  static async markAsDone(assignmentId: string): Promise<boolean> {
    return await markAsDone(assignmentId);
  }

  static async remove(assignmentId: string): Promise<boolean> {
    return await removeTask(assignmentId);
  }
}
