export async function fetchGames() {
  const response = await fetch("http://localhost:5000/api/games");

  if (!response.ok) {
    throw new Error("Failed to fetch games");
  }

  return response.json();
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