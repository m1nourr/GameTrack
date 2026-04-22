export async function fetchGames() {
  const response = await fetch("http://localhost:5000/api/games");

  if (!response.ok) {
    throw new Error("Failed to fetch games");
  }

  return response.json();
}