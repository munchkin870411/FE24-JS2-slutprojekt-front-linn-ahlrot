# Scrum Board Application

A simple task management app for development teams with role-based assignments and filtering.

## Features
- **Board**: Tasks move through New, In Progress, and Done.
- **Task Management**: Create, assign, mark as done, and remove tasks.
- **Team Management**: Add members with UX, Frontend, or Backend roles.
- **Filtering & Sorting**: Filter by role or assignee; sort by date or name.

## Installation

1. Clone the repository:
   ```sh
   git clone <https://github.com/munchkin870411/FE24-JS2-slutprojekt-front-linn-ahlrot>
   cd FE24-JS2-slutprojekt-front-linn-ahlrot
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the frontend:
   ```sh
   npm run dev
   ```

## Usage

### Adding Team Members
1. Enter a name and select roles.
2. Click "Add Member".

### Creating Tasks
1. Enter a title, description, and select a role.
2. Click "Add Task".

### Managing Tasks
- Assign, complete, or delete tasks as needed.

### Filtering & Sorting
- Filter by role or assignee.
- Sort by date or name.

## Technologies Used
- **TypeScript**
- **Parcel** (bundler)
- **Fetch API** (data fetching)
- **CSS Grid** (layout)

## API Endpoints
- `GET /api/board` - Fetch board data
- `POST /api/members` - Add a member
- `POST /api/assignments` - Create a task
- `POST /api/assignments/assign` - Assign a task
- `PATCH /api/assignments/{id}/done` - Mark as done
- `DELETE /api/assignments/{id}` - Remove a task

---
Built to streamline task management for development teams.


