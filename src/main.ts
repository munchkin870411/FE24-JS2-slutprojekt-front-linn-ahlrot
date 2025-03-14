// SCRUM BOARD APPLICATION

// A task management application for development teams with the following features:

// - Three-column board (New, In Progress, Done)
// - Task management (create, assign, mark as done, delete)
// - Team member management with specialized roles
// - Filtering and sorting capabilities (only applies to "in progress" tasks)
// - Role-based filtering (UX, Frontend, Backend)
// - Member-based filtering
// - Sorting by timestamp or title

import { fetchBoard, addMember } from "./modules/api.ts";
import { AssignmentService } from "./modules/AssignmentService.ts";
import { renderAssignments } from "./modules/render.ts";
import { RoleT, CategoryT, MemberI, AssignmentI } from "./modules/types.ts";
import {
  filterAndSortAssignments,
  setupSortAndFilters,
  getCurrentFilterOptions,
} from "./modules/sort.js";

const memberForm = document.querySelector("#addMemberForm") as HTMLFormElement;
const taskForm = document.querySelector("#addTaskForm") as HTMLFormElement;

// Store all data globally to avoid refetching when filters change
let allMembers: MemberI[] = [];
let allAssignments: AssignmentI[] = [];

async function init() {
  const scrumData = await fetchBoard();
  allMembers = scrumData.members;
  allAssignments = scrumData.assignments;

  renderAssignments(allAssignments, allMembers);

  setupSortAndFilters(allMembers, applyFiltersAndSort);

  // Set up form event listeners
  memberForm!.addEventListener("submit", async (event) => {
    event.preventDefault();
    const name = (document.querySelector("#memberName") as HTMLInputElement)
      .value;
    const roles = Array.from(
      (document.querySelector("#memberRoles") as HTMLSelectElement)
        .selectedOptions
    ).map((o) => o.value as RoleT);
    await addMember(name, roles);
    location.reload();
  });

  taskForm!.addEventListener("submit", async (event) => {
    event.preventDefault();
    const title = (document.querySelector("#taskTitle") as HTMLInputElement)
      .value;
    const description = (
      document.querySelector("#taskDescription") as HTMLInputElement
    ).value;
    const category = (
      document.querySelector("#taskCategory") as HTMLSelectElement
    ).value as CategoryT;
    await AssignmentService.create(title, description, category);
    location.reload();
  });
}

function applyFiltersAndSort() {
  const { sortOption, roleFilter, memberFilter } = getCurrentFilterOptions();

  const filteredAssignments = filterAndSortAssignments(
    allAssignments,
    sortOption,
    roleFilter,
    memberFilter
  );

  renderAssignments(filteredAssignments, allMembers);
}

init();
memberForm.reset();
taskForm.reset();
