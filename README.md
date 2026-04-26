<div align="center">

<img src="./client/src/assets/gametrack_website.png" alt="GameTrack Logo" width="300" />

**A simple full-stack game tracker built with React, Vite, Express and MongoDB.**

GameTrack helps users organize your game backlog, track progress, manage ownership and log play sessions.
</div>

---

## Features

- Built a React frontend using Vite
- Built an Express backend server
- Connected the frontend and backend using `fetch()`
- Connected the backend to MongoDB Atlas using Mongoose
- Add games
- View all games
- Edit existing games
- Delete games
- Filter games by title, status, and platform
- Add users
- Assign games to specific users
- Show the owner of each game
- Show play sessions for each game
- Add a play session to a specific game
- Display loading and error states
- Auto-refresh game data
- Uses a clean `client/server` project structure
- Runs frontend and backend together with one command
- Uses Git with a separate working branch

---

## Technologies Used

- React
- Vite
- JavaScript
- Node.js
- Express
- MongoDB Atlas
- Mongoose
- CORS
- Dotenv
- Nodemon
- Concurrently
- MongoDB Compass
- Postman
- Git
- GitHub

---

## Project Structure

- `client/` - React frontend
- `client/public/gametrack_logo.svg` - logo used in the project
- `client/src/App.jsx` - main frontend app component
- `client/src/api/gameApi.js` - frontend API requests
- `client/src/components/` - reusable frontend components
- `client/src/components/GameForm.jsx` - form for adding games
- `client/src/components/GameList.jsx` - list of games
- `client/src/components/GameRow.jsx` - single game card row
- `client/src/components/UserForm.jsx` - form for adding users
- `client/src/components/SessionForm.jsx` - form for adding play sessions
- `client/src/components/SessionList.jsx` - list of play sessions
- `client/src/components/FilterBar.jsx` - filter inputs for games
- `client/src/components/LoadingState.jsx` - loading message UI
- `client/src/components/ErrorState.jsx` - error message UI
- `client/src/index.css` - global styling
- `client/src/main.jsx` - React entry file
- `client/index.html` - Vite HTML entry file

- `server/src/app.js` - Express app setup
- `server/src/server.js` - server start file
- `server/src/config/db.js` - MongoDB connection
- `server/src/controllers/` - controller logic
- `server/src/models/` - Mongoose models
- `server/src/routes/` - API routes
- `server/src/scripts/seed.js` - seed data script
- `server/.env` - environment variables

- `package.json` - root project scripts
- `.gitignore` - ignored files and folders

---

## Database Collections

This project uses **3 collections**:

### `users`
Stores users who own games.

**Fields:**
- `username`
- `email`
- `createdAt`
- `updatedAt`

### `games`
Stores the main game records.

**Fields:**
- `title`
- `platform`
- `genre`
- `status`
- `hoursPlayed`
- `priority`
- `rating`
- `userId`
- `createdAt`
- `updatedAt`

### `playSessions`
Stores play session records connected to both a game and a user.

**Fields:**
- `gameId`
- `userId`
- `sessionDate`
- `hours`
- `notes`
- `createdAt`
- `updatedAt`

---

## Relationships

- One user can own many games
- One game can have many play sessions
- One user can have many play sessions

---

## Installation

**1.** Clone the repository

**2.** Run `npm install` in the root folder

**3.** Go to the `client` folder and run `npm install`

**4.** Go to the `server` folder and run `npm install`

**5.** Create a `server/.env` file with:

- `PORT=5000`
- `MONGO_URI=your_mongodb_connection_string`

**6.** Run the project from the root folder with:

```
npm run dev
```

---
## API Endpoints

#### `Game Endpoints`
- `GET /api/games` - get all games
- `GET /api/games/:id` - get one game
- `POST /api/games` - create a new game
- `PATCH /api/games/:id` - update part of a game
- `DELETE /api/games/:id` - delete a game

#### `User Endpoints`
- `GET /api/users` - get all users
- `POST /api/users` - create a new user
- `GET /api/users/:userId/games` - get all games for one user

#### `Play Session Endpoints`
- `GET /api/games/:gameId/sessions` - get all play sessions for one game
- `POST /api/games/:gameId/sessions` - create a new play session for one game

#### `Custom Endpoint`
- `GET /api/games/filter?...` - filter games by query values such as status and platform
---
### Example Game Data
```
{
  "title": "GTA 5",
  "platform": "PlayStation 5",
  "genre": "Open World Action",
  "status": "playing",
  "hoursPlayed": 24,
  "priority": "high",
  "rating": 9,
  "userId": "USER_ID_HERE"
}
```
---
### Example User Data
```
{
  "username": "mahmoudgamer",
  "email": "mahmoud@example.com"
}
```
---
### Example Play Session Data
```
{
  "sessionDate": "2026-04-10",
  "hours": 3,
  "notes": "Completed story missions and explored Los Santos."
}
```
---
### Testing
**This project was tested using:**

- MongoDB Compass
- Postman
- Browser testing

**Tested functionality:**
- create game
- read all games
- read one game
- update game
- delete game
- create user
- get games by user
- get sessions by game
- create play session
- filter games
- loading state
- error state
- frontend and backend connection
