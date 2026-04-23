import { useEffect, useState } from "react";
import GameForm from "./components/GameForm";
import GameList from "./components/GameList";
import FilterBar from "./components/FilterBar";
import { fetchGames, createGame, updateGame, deleteGame } from "./api/gameApi";

const CURRENT_USER_ID = "69e62af9424e1fee3fd15f9d";

function App() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    search: "",
    status: "",
    platform: "",
  });

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

  const handleFilterChange = (event) => {
    const { name, value } = event.target;

    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const filteredGames = games.filter((game) => {
    const matchesSearch = game.title
      .toLowerCase()
      .includes(filters.search.toLowerCase());

    const matchesStatus =
      filters.status === "" || game.status === filters.status;

    const matchesPlatform =
      filters.platform === "" || game.platform === filters.platform;

    return matchesSearch && matchesStatus && matchesPlatform;
  });  

  return (
    <main>
      <h1>GameTrack</h1>
      <GameForm onAddGame={handleAddGame} currentUserId={CURRENT_USER_ID} />
      <FilterBar filters={filters} onFilterChange={handleFilterChange} />

      {loading && <p>Loading games...</p>}
      {error && <p>Error: {error}</p>}
      {!loading && !error && ( 
        <GameList
          games={filteredGames}
          onUpdateGame={handleUpdateGame}
          onDeleteGame={handleDeleteGame}
        />
      )}
    </main>
  );
}

export default App;