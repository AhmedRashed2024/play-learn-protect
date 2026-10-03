# Play, Learn & Protect (PLP)

A team project: a learning-and-safety platform for Egyptian children aged 3–12, with a focus on Egyptian culture and digital safety.

Children play age-appropriate games and work through learning modules, earn points and badges, and can see where they rank among their peers. Parents create and manage child accounts, set what each child is allowed to do, and watch screen time, behaviour and progress from a dashboard. Teachers can recommend games and modules and follow the students they supervise. An admin approves teacher accounts and can step in when needed.

## What's inside

- **`srs/`** — the Software Requirements Specification: a full write-up of what the system must do, from the Requirements Engineering course.
- **`frontend/`** — a React single-page app (built with Vite) with the four dashboards (child, parent, teacher, admin), the game and learning libraries, and the leaderboard.

## Running the frontend

```
cd frontend
npm install
npm run dev
```

The app runs on sample data out of the box. To connect a real backend, add your Supabase keys to a `.env` file (see `.env.example`).

## Team

Built as a group project — the requirements document and the frontend were a team effort.
