import { useState } from "react";
import { createGameSession } from "../api/gameApi";

function SessionForm({ gameId, onSessionAdded }) {
  const [formData, setFormData] = useState({
    sessionDate: "",
    hours: "",
    notes: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [sessionError, setSessionError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formData.sessionDate || !formData.hours) {
      setSessionError("Session date and hours are required.");
      return;
    }

    try {
      setSubmitting(true);
      setSessionError("");

      const createdSession = await createGameSession(gameId, {
        sessionDate: formData.sessionDate,
        hours: Number(formData.hours),
        notes: formData.notes,
      });

      onSessionAdded(createdSession);

      setFormData({
        sessionDate: "",
        hours: "",
        notes: "",
      });
    } catch (error) {
      setSessionError(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="sessions-box">
      <h4>Add Session</h4>

      <form className="edit-form" onSubmit={handleSubmit}>
        <input
          type="date"
          name="sessionDate"
          value={formData.sessionDate}
          onChange={handleChange}
        />

        <input
          type="number"
          name="hours"
          min="0.5"
          step="0.5"
          placeholder="Session hours"
          value={formData.hours}
          onChange={handleChange}
        />

        <textarea
          name="notes"
          placeholder="Session notes"
          value={formData.notes}
          onChange={handleChange}
          rows="3"
        />

        {sessionError && <p className="status-message error-message">{sessionError}</p>}

        <button type="submit" className="primary-btn" disabled={submitting}>
          {submitting ? "Adding..." : "Add Session"}
        </button>
      </form>
    </div>
  );
}

export default SessionForm;