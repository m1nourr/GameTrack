function SessionList({ sessions, loading, error }) {
  return (
    <div className="sessions-box">
      {loading && <p>Loading sessions...</p>}
      {error && <p>Error: {error}</p>}
      {!loading && !error && sessions.length === 0 && (
        <p>No play sessions found.</p>
      )}
      {!loading && !error && sessions.length > 0 && (
        <ul className="sessions-list">
          {sessions.map((session) => (
            <li key={session._id}>
              {new Date(session.sessionDate).toLocaleDateString()} - Session: {session.hours}h -{" "}
              {session.notes}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SessionList;