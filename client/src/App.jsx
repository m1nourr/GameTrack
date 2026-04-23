import { useEffect, useState } from "react";
import GameForm from "./components/GameForm";
import GameList from "./components/GameList";
import { fetchGames, createGame, updateGame, deleteGame } from "./api/gameApi";

const CURRENT_USER_ID = "69e62af9424e1fee3fd15f9d";

function App() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadGames = async () => {
      try {
        const data = await fetchGames();
        setGames(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadGames();
  }, []);

  const handleAddGame = async (newGameData) => {
    try {
      const createdGame = await createGame(newGameData);
      setGames((prevGames) => [...prevGames, createdGame]);
      setError("");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleUpdateGame = async (id, updatedData) => {
    try {
      const updatedGame = await updateGame(id, updatedData);

      setGames((prevGames) =>
        prevGames.map((game) => (game._id === id ? updatedGame : game))
      );

      setError("");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDeleteGame = async (id) => {
    try {
      await deleteGame(id);

      setGames((prevGames) => prevGames.filter((game) => game._id !== id));
      setError("");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <main>
      <h1>GameTrack</h1>
      <GameForm onAddGame={handleAddGame} currentUserId={CURRENT_USER_ID} />

      {loading && <p>Loading games...</p>}
      {error && <p>Error: {error}</p>}
      {!loading && !error && ( 
        <GameList
          games={games}
          onUpdateGame={handleUpdateGame}
          onDeleteGame={handleDeleteGame}
        />
      )}
    </main>
  );
}

export default App;