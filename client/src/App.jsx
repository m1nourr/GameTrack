import { useEffect, useState } from "react";
import GameForm from "./components/GameForm";
import GameList from "./components/GameList";
import { fetchGames } from "./api/gameApi";

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

  return (
    <main>
      <h1>GameTrack</h1>
      <GameForm />

      {loading && <p>Loading games...</p>}
      {error && <p>Error: {error}</p>}
      {!loading && !error && <GameList games={games} />}
    </main>
  );
}

export default App;