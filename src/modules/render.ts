// this module is responsible for rendering the tasks on the page
// and handling the assignment of tasks to members.

import { AssignmentI, MemberI } from "./types.ts";
import { AssignmentService } from "./AssignmentService.ts";

export function renderAssignments(
  assignments: AssignmentI[],
  members: MemberI[]
) {
  const columns = {
    new: document.querySelector("#newTasks")!,
    "in progress": document.querySelector("#inProgressTasks")!,
    done: document.querySelector("#doneTasks")!,
  };

  // Clear existing tasks but preserve headers
  Object.values(columns).forEach((column) => {
    const header = column.querySelector("h2");
    column.innerHTML = "";
    if (header) {
      column.appendChild(header);
    }
  });

  // Loop through all assignments once and place each one in the appropriate column
  assignments.forEach((task) => {
    const taskEl = document.createElement("div");
    taskEl.className = "task";
    taskEl.innerHTML = `
      <strong>${task.title}</strong><br>
      ${task.description}<br>
      <small>${task.category}</small><br>
      <small>${task.status}</small><br>
      <small>${new Date(task.timestamp).toLocaleString()}</small><br>
      ${
        task.assigned
          ? `Assigned to: ${
              members.find((m) => m.id === task.assigned)?.name || "Unknown"
            }`
          : ""
      }
    `;

    // Adds buttons based on the task's status and assigns event listeners accordingly
    if (task.status === "new") {
      const assignSelect = document.createElement("select");
      members
        .filter((m) => m.roles.includes(task.category))
        .forEach((member) => {
          const option = document.createElement("option");
          option.value = member.id;
          option.textContent = member.name;
          assignSelect.appendChild(option);
        });
      const assignBtn = document.createElement("button");
      assignBtn.textContent = "Assign";
      assignBtn.onclick = async () => {
        await AssignmentService.assign(task.id, assignSelect.value);
        location.reload();
      };
      taskEl.appendChild(assignSelect);
      taskEl.appendChild(assignBtn);
    } else if (task.status === "in progress") {
      const doneBtn = document.createElement("button");
      doneBtn.textContent = "Mark as done";
      doneBtn.onclick = async () => {
        await AssignmentService.markAsDone(task.id);
        location.reload();
      };
      taskEl.appendChild(doneBtn);
    } else if (task.status === "done") {
      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "Delete";
      deleteBtn.onclick = async () => {
        await AssignmentService.remove(task.id);
        location.reload();
      };
      taskEl.appendChild(deleteBtn);
    }

    // Add the task to the appropriate column based on its status
    columns[task.status].appendChild(taskEl);
  });
}
