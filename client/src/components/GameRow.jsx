import { useState } from "react";



function GameRow({ game, onUpdateGame, onDeleteGame }) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    title: game.title,
    platform: game.platform,
    genre: game.genre,
    status: game.status,
    hoursPlayed: game.hoursPlayed,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async (event) => {
    event.preventDefault();

    await onUpdateGame(game._id, {
      ...formData,
      hoursPlayed: Number(formData.hoursPlayed),
    });

    setIsEditing(false);
  };

  const handleDelete = async () => {
    const confirmed = window.confirm(`Delete "${game.title}"?`);

    if (!confirmed) return;

    await onDeleteGame(game._id);
  };

  if (isEditing) {
    return (
      <li>
        <form onSubmit={handleSave}>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />

          <input
            type="text"
            name="platform"
            value={formData.platform}
            onChange={handleChange}
          />

          <input
            type="text"
            name="genre"
            value={formData.genre}
            onChange={handleChange}
          />

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="wishlist">Wishlist</option>
            <option value="backlog">Backlog</option>
            <option value="playing">Playing</option>
            <option value="completed">Completed</option>
            <option value="dropped">Dropped</option>
          </select>

          <input
            type="number"
            name="hoursPlayed"
            value={formData.hoursPlayed}
            onChange={handleChange}
          />

          <button type="submit">Save</button>
          <button type="button" onClick={() => setIsEditing(false)}>
            Cancel
          </button>
        </form>
      </li>
    );
  }

  return (
    <li>
      <strong>{game.title}</strong> - {game.platform} - {game.status} - {game.hoursPlayed} hours
      <button type="button" onClick={() => setIsEditing(true)}>
        Edit
      </button>
      <button type="button" onClick={handleDelete}>
        Delete
      </button>
    </li>
  );
}

export default GameRow;