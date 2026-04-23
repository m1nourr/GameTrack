import { useState } from "react";
import { fetchGameSessions } from "../api/gameApi";


function GameRow({ game, onUpdateGame, onDeleteGame }) {
  const [isEditing, setIsEditing] = useState(false);
  const [showSessions, setShowSessions] = useState(false);
  const [sessions, setSessions] = useState([]);
  const [sessionsLoading, setSessionsLoading] = useState(false);
  const [sessionsError, setSessionsError] = useState("");

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

  const handleToggleSessions = async () => {
    if (!showSessions && sessions.length === 0) {
      try {
        setSessionsLoading(true);
        setSessionsError("");
        const data = await fetchGameSessions(game._id);
        setSessions(data);
        setSessionsError("");
      } catch (error) {
        setSessionsError(error.message);
      } finally {
        setSessionsLoading(false);
      }
    }

    setShowSessions((prev) => !prev);
  }

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
      <div> Owner: {game.userId?.username || "Unknown user"} </div>

      <button type="button" onClick={() => setIsEditing(true)}>
        Edit
      </button>

      <button type="button" onClick={handleDelete}>
        Delete
      </button>

      <button type="button" onClick={handleToggleSessions}>
        {showSessions ? "Hide" : "Show"} Sessions
      </button>

      {showSessions && (
        <div>
          {sessionsLoading && <p>Loading sessions...</p>}
          {sessionsError && <p>Error: {sessionsError}</p>}
          {!sessionsLoading && !sessionsError && sessions.length === 0 && (
            <p>No play sessions found.</p>
          )}
          {!sessionsLoading && !sessionsError && sessions.length > 0 && (
            <ul>
              {sessions.map((session) => (
                <li key={session._id}>
                  {new Date(session.sessionDate).toLocaleDateString()} - {session.hours}h - {" "}
                  {session.notes}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </li>
  );
}

export default GameRow;