function GameRow({ game }) {
  return (
    <li>
      <strong>{game.title}</strong> - {game.platform} - {game.status}
    </li>
  );
}

export default GameRow;