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