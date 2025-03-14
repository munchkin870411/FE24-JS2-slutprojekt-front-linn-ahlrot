// This file filters and sort tasks that are in progress based on user input and updates
// the UI accordingly. It also sets up event listeners for the filter and sort options.
// The functions in this file are used to filter and sort tasks that are in progress based on
// user input.

import { AssignmentI, MemberI } from "./types.ts";

// Filter and sort assignments based on given criteria - only for "in progress" tasks
export function filterAndSortAssignments(
  allAssignments: AssignmentI[],
  sortOption: string,
  roleFilter: string,
  memberFilter: string
): AssignmentI[] {
  // Separate tasks by status
  const newTasks = allAssignments.filter((task) => task.status === "new");
  const inProgressTasks = allAssignments.filter(
    (task) => task.status === "in progress"
  );
  const doneTasks = allAssignments.filter((task) => task.status === "done");

  // Only apply filtering to "in progress" tasks
  let filteredInProgress = [...inProgressTasks];

  // Filter by role if not "all"
  if (roleFilter !== "all") {
    filteredInProgress = filteredInProgress.filter(
      (task) => task.category === roleFilter
    );
  }

  // Filter by member if not "all"
  if (memberFilter !== "all") {
    filteredInProgress = filteredInProgress.filter(
      (task) => task.assigned === memberFilter
    );
  }

  const sortedInProgress = sortTasks([...filteredInProgress], sortOption);

  return [...newTasks, ...sortedInProgress, ...doneTasks];
}

// Sort assignments based on the given option
export function sortTasks(
  tasks: AssignmentI[],
  sortOption: string
): AssignmentI[] {
  const [sortKey, sortOrder] = sortOption.split("-");

  return tasks.sort((a, b) => {
    if (sortKey === "timestamp") {
      // Convert ISO timestamp strings to Date objects for proper comparison
      const dateA = new Date(a.timestamp);
      const dateB = new Date(b.timestamp);

      return sortOrder === "asc"
        ? dateA.getTime() - dateB.getTime()
        : dateB.getTime() - dateA.getTime();
    } else if (sortKey === "title") {
      return sortOrder === "desc"
        ? a.title.localeCompare(b.title)
        : b.title.localeCompare(a.title);
    }
    return 0;
  });
}

export function setupSortAndFilters(
  members: MemberI[],
  onFilterChange: () => void
): void {
  populateMemberFilter(members);
  setupFilterListeners(onFilterChange);
}

function populateMemberFilter(members: MemberI[]): void {
  const memberSelect = document.querySelector(
    "#filterMembers"
  ) as HTMLSelectElement;

  // Clear existing options except the first "All" option
  while (memberSelect.options.length > 1) {
    memberSelect.remove(1);
  }

  members.forEach((member) => {
    const option = document.createElement("option");
    option.value = member.id;
    option.textContent = member.name;
    memberSelect.appendChild(option);
  });
}

function setupFilterListeners(onFilterChange: () => void): void {
  const sortSelect = document.querySelector("#sortTasks") as HTMLSelectElement;
  const roleFilter = document.querySelector(
    "#filterTasks"
  ) as HTMLSelectElement;
  const memberFilter = document.querySelector(
    "#filterMembers"
  ) as HTMLSelectElement;

  [sortSelect, roleFilter, memberFilter].forEach((element) => {
    element.addEventListener("change", onFilterChange);
  });
}

export function getCurrentFilterOptions(): {
  sortOption: string;
  roleFilter: string;
  memberFilter: string;
} {
  return {
    sortOption: (document.querySelector("#sortTasks") as HTMLSelectElement)
      .value,
    roleFilter: (document.querySelector("#filterTasks") as HTMLSelectElement)
      .value,
    memberFilter: (
      document.querySelector("#filterMembers") as HTMLSelectElement
    ).value,
  };
}
