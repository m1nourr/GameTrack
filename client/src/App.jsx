import { useEffect, useState } from "react";
import GameForm from "./components/GameForm";
import GameList from "./components/GameList";
import FilterBar from "./components/FilterBar";
import LoadingState from "./components/LoadingState";
import ErrorState from "./components/ErrorState";
import { fetchGames, fetchUsers, createGame, updateGame, deleteGame } from "./api/gameApi";
import logo from "./assets/gametrack_website.png";

function App() {
  const [games, setGames] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    search: "",
    status: "",
    platform: "",
  });


  const normalizeGameOwner = (game, usersList) => {
    if (!game) return game;

    if (game.userId && typeof game.userId === "object" && game.userId.username) {
      return game;
    }

    const matchedUser = usersList.find((user) => user._id === game.userId);
    
    return {
      ...game,
      userId: matchedUser || game.userId,
    };
  };

  useEffect(() => {
    let isMounted = true;

    const loadGames = async () => {
      try {
        const [gamesData, usersData] = await Promise.all([fetchGames(), fetchUsers()]);

        if (isMounted) {
          setGames(gamesData);
          setUsers(usersData);
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
      const normalizedGame = normalizeGameOwner(createdGame, users);

      setGames((prevGames) => [...prevGames, normalizedGame]);
      setError("");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleUpdateGame = async (id, updatedData) => {
    try {
      const updatedGame = await updateGame(id, updatedData);
      const normalizedGame = normalizeGameOwner(updatedGame, users);

      setGames((prevGames) =>
        prevGames.map((game) => (game._id === id ? normalizedGame : game))
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
    <div className = "app-shell">
      <main className = "app-container">
        <header className="hero">
          <img src={logo} alt="GameTrack logo" className="hero-logo" />
          <p className="hero-subtitle">
            Track your backlog, update your progress, and keep your games organized.
          </p>
        </header>
        <section className="top-grid">
          <GameForm onAddGame={handleAddGame} users={users} />
          <FilterBar filters={filters} onFilterChange={handleFilterChange} />
        </section>

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
    </div>
  );
}

export default App;