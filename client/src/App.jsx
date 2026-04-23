import { useEffect, useState } from "react";
import GameForm from "./components/GameForm";
import GameList from "./components/GameList";
import FilterBar from "./components/FilterBar";
import LoadingState from "./components/LoadingState";
import ErrorState from "./components/ErrorState";
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
    let isMounted = true;

    const loadGames = async () => {
      try {
        const data = await fetchGames();

        if (isMounted) {
          setGames(data);
          setError("");
          setLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message);
          setLoading(false);
        }
      }
    };

    loadGames();

    const intervalId = setInterval(() => {
      loadGames();
    }, 10000);

    return () => {
      isMounted = false;
      clearInterval(intervalId);
    };
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

      {loading && <LoadingState />}
      {error && <ErrorState message={error} />}
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