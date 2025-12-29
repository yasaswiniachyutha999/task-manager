# Task Manager - Full Stack Web Application

A modern, interview-ready Task Management Web Application built with React and Express.js.

![Task Manager](https://img.shields.io/badge/Status-Production%20Ready-success)
![React](https://img.shields.io/badge/React-18.2-blue)
![Express](https://img.shields.io/badge/Express-4.18-green)

## 🚀 Live Demo

- **Frontend:** [Your Vercel URL]
- **Backend API:** [Your Render URL]

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18 + Vite |
| Routing | React Router v6 |
| Backend | Express.js |
| Database | JSON file storage |
| Styling | Vanilla CSS (Modern Dark Theme) |
| Deployment | Vercel (Frontend) + Render (Backend) |

## 📁 Project Structure

```
task-manager/
├── backend/
│   ├── server.js      # Express API server
│   ├── data.json      # JSON database
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/   # Navbar, Layout
│   │   ├── pages/        # CRUD screens
│   │   ├── api/          # API utilities
│   │   ├── App.jsx
│   │   └── App.css
│   └── package.json
└── README.md
```

## 🏃 Running Locally

### Prerequisites
- Node.js v16+
- npm

### Backend Setup
```bash
cd backend
npm install
npm start
# Server runs at http://localhost:5000
```

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
# App runs at http://localhost:5173
```

## 📋 Features

- ✅ **View Tasks** - Card grid with status badges
- ✅ **Add Task** - Form with validation
- ✅ **Edit Task** - Update with change detection
- ✅ **Delete Task** - Confirmation before deletion
- ✅ **Responsive Design** - Mobile-friendly
- ✅ **Modern UI** - Dark theme with animations

## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/tasks` | Get all tasks |
| GET | `/api/tasks/:id` | Get single task |
| POST | `/api/tasks` | Create task |
| PUT | `/api/tasks/:id` | Update task |
| DELETE | `/api/tasks/:id` | Delete task |

## 🚀 Deployment

### Backend (Render)
1. Push to GitHub
2. Create new Web Service on [Render](https://render.com)
3. Connect GitHub repo, set root directory to `backend`
4. Build: `npm install`, Start: `npm start`
5. Copy the deployed URL

### Frontend (Vercel)
1. Update `frontend/src/api/taskApi.js` with Render URL
2. Create new project on [Vercel](https://vercel.com)
3. Connect GitHub, set root directory to `frontend`
4. Deploy

## 💡 Interview Talking Points

1. **Architecture**: Clean separation of frontend/backend
2. **React Patterns**: Hooks, Router, component composition
3. **API Design**: RESTful with proper HTTP methods
4. **Error Handling**: Client validation + server errors
5. **UX**: Loading states, empty states, confirmations
6. **Deployment**: CI/CD with Vercel + Render

## 📄 License

MIT License - Feel free to use for learning and interviews!
