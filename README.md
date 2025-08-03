# 📘 WorkFiverr — Task & Project Management App

**WorkFiverr** is a full-featured project and task management platform built using the **MERN stack** (MongoDB, Express, React, Node.js) with **Redux Toolkit** for global state management. It supports task assignment, team/project views, reporting dashboards, and advanced filtering — designed for managers and team members to collaboratively manage workloads and track project progress.

## 🌐 Live Demo  
(https://work-fiverr-frontend.vercel.app)

## 🔗 Repositories
- **Frontend Repo**: (https://github.com/Abhi9824/Work-Fiverr)
- **Backend Repo**: (https://github.com/Abhi9824/Work-Fiverr-backend)

---

## 🚀 Installation

### 📦 Frontend Setup

1. Clone the repository  
   `https://github.com/Abhi9824/Work-Fiverr.git`

2. Install dependencies  
   `npm install`

3. Run the app  
   `npm run dev`

---

### 🔧 Backend Setup

1. Clone the backend repo  
   `https://github.com/Abhi9824/Work-Fiverr-backend.git`

2. Install dependencies  
   `npm install`

3. Start the server  
   `node index.js`

---

### 🔐 Backend .env Configuration

Create a `.env` file in `/workfiverr-backend` and add the following:

```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```


---

## ✨ Features

### 🔐 Authentication

- JWT-based authentication for secure login/signup  
- Protected routes and user authorization  
- Persistent login via localStorage  
- Logout clears token and redirects user  

### 📝 Task Management

- Create tasks with name, tags, team, project, owners, time estimates, status  
- Filter tasks by team, project, owner, tags, and status  
- Sort tasks by due dates or priorities  
- URL-based filtering and search support  
- Update or delete any task  

### 📊 Reporting & Visualization

- Total work completed last week (bar chart)  
- Pending work across teams/projects (bar chart)  
- Task stats by owner/project/team (pie charts)  

### 📁 Project & Team View

- View all tasks grouped under each project or team  
- Filter tasks within a specific project or team  
- Sorting options based on deadlines or owners  

### 👥 User & Team Management

- Signup/Login with secure credentials  
- Authenticated user info retrieved on login  
- Create and manage teams  
- Assign team members as owners to tasks  

---

## 🧩 Backend API Overview

### 🔐 Auth Routes

- `POST /auth/signup` — Register a new user  
- `POST /auth/login` — Login user and return JWT  
- `GET /auth/me` — Fetch logged-in user details  

### 📝 Task Routes

- `POST /tasks` — Create a new task  
- `GET /tasks` — Fetch all tasks (filterable by owner, project, status, etc.)  
- `POST /tasks/:id` — Update task status or details  
- `DELETE /tasks/:id` — Delete a task  

### 📁 Project Routes

- `POST /projects` — Create a new project  
- `GET /projects` — Get list of all projects  

### 👥 Team Routes

- `POST /teams` — Add a new team  
- `GET /teams` — Get all teams  

### 🏷️ Tag Routes

- `POST /tags` — Create a new tag  
- `GET /tags` — Get all tags  

### 📊 Report Routes

- `GET /report/last-week` — Tasks completed last week  
- `GET /report/pending` — Total pending work (timeToComplete)  
- `GET /report/closed-tasks` — Tasks closed by team/owner/project  

---

## 🛠️ Tech Stack

- **Frontend**: React.js, Redux Toolkit, React Router DOM, Axios, Chart.js  
- **Backend**: Node.js, Express.js, MongoDB with Mongoose, JWT Auth, bcrypt  
- **Database**: MongoDB  

---

## 📁 Project Structure

```
workfiverr-frontend/
├── src/
│   ├── components/
│   ├── pages/
│   ├── features/
│   └── App.jsx

workfiverr-backend/
├── controllers/
├── middleware/
├── models/
├── routes/
└── index.js
```

---

## 🙌 Author

Built with ❤️ by **Abhijit Chanda** — Open to collaboration and feedback!

---

## 📄 License

This project is licensed under the **MIT License**.


