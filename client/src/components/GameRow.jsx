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
      <li className="game-card">
        <form className="edit-form" onSubmit={handleSave}>
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

          <div className="button-row">
            <button type="submit" className="primary-btn">
              Save
            </button>
            <button 
              type="button" 
              className="secondary-btn" 
              onClick={() => setIsEditing(false)}
              >
              Cancel
            </button>
          </div>
        </form>
      </li>
    );
  }

  return (
    <li className="game-card">
      <div className="game-card-top">
        <div>
          <h3>{game.title}</h3>
          <p><strong>Platform:</strong> {game.platform}</p>
          <p><strong>Genre:</strong> {game.genre}</p>
          <p><strong>Status:</strong> {game.status}</p>
          <p><strong>Hours Played:</strong> {game.hoursPlayed}</p>
          <p><strong>Owner:</strong> {game.userId?.username || "Unknown user"}</p>
        </div>
      </div>

      <div className="button-row">
        <button
          type="button"
          className="primary-btn"
          onClick={() => setIsEditing(true)}
        >
          Edit
        </button>

        <button type="button" className="danger-btn" onClick={handleDelete}>
          Delete
        </button>

        <button
          type="button"
          className="secondary-btn"
          onClick={handleToggleSessions}
        >
          {showSessions ? "Hide" : "Show"} Sessions
        </button>
      </div>

      {showSessions && (
        <div className="sessions-box">
          {sessionsLoading && <p>Loading sessions...</p>}
          {sessionsError && <p>Error: {sessionsError}</p>}
          {!sessionsLoading && !sessionsError && sessions.length === 0 && (
            <p>No play sessions found.</p>
          )}
          {!sessionsLoading && !sessionsError && sessions.length > 0 && (
            <ul className="sessions-list">
              {sessions.map((session) => (
                <li key={session._id}>
                  {new Date(session.sessionDate).toLocaleDateString()} - {session.hours}h -{" "}
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