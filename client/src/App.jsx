import GameForm from "./components/GameForm";
import GameList from "./components/GameList";

function App() {
  const games = [
    {
      _id: "1",
      title: "Elden Ring",
      platform: "PC",
      status: "playing",
    },
    {
      _id: "2",
      title: "GTA 5",
      platform: "PlayStation 5",
      status: "backlog",
    },
  ];

  return (
    <main>
      <h1>GameTrack</h1>
      <GameForm />
      <GameList games={games} />
    </main>
  );
}

export default App;