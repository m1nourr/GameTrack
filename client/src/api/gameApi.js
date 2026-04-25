export async function fetchGames() {
  const response = await fetch("http://localhost:5000/api/games");

  if (!response.ok) {
    throw new Error("Failed to fetch games");
  }

  return response.json();
}

export async function fetchUsers() {
  const response = await fetch("http://localhost:5000/api/users");

  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }

  return response.json();
}

export async function fetchGameSessions(gameId) {
  const response = await fetch(`http://localhost:5000/api/games/${gameId}/sessions`);

  if (!response.ok) {
    throw new Error("Failed to fetch game sessions");
  }

  return response.json();
}

export async function createUser(userData) {
  const response = await fetch("http://localhost:5000/api/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to create user");
  }

  return data;
}

export async function createGameSession(gameId, sessionData) {
  const response = await fetch(`http://localhost:5000/api/games/${gameId}/sessions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(sessionData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to create play session");
  }

  return data;
}

export async function createGame(gameData) {
  const response = await fetch("http://localhost:5000/api/games", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(gameData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to create game");
  }

  return data;
}

export async function updateGame(id, gameData) {
  const response = await fetch(`http://localhost:5000/api/games/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(gameData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to update game");
  }

  return data;
}

export async function deleteGame(id) {
  const response = await fetch(`http://localhost:5000/api/games/${id}`, {
    method: "DELETE",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to delete game");
  }

  return data;
}