import GameRow from "./GameRow";

function GameList({ games, onUpdateGame, onDeleteGame }) {
  return (
    <section className="card game-list-section">
      <h2>My Games</h2>

      {games.length === 0 ? (
        <p className="empty-message">No games found.</p>
      ) : (
        <ul className="game-list">
          {games.map((game) => (
            <GameRow 
              key={game._id} 
              game={game} 
              onUpdateGame={onUpdateGame} 
              onDeleteGame={onDeleteGame} 
            />
          ))}
        </ul>
      )}
    </section>
  );
}

export default GameList;