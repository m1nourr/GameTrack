import { useState } from "react";

function GameForm({ onAddGame, users }) {
  const [formData, setFormData] = useState({
    title: "",
    platform: "",
    genre: "",
    status: "backlog",
    hoursPlayed: 0,
    priority: "medium",
    rating: "",
    userId: "",
  });

  const handleChange = (event) => {
  const { name, value } = event.target;

  setFormData((prev) => ({
    ...prev,
    [name]: value,
  }));
};

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formData.userId) { 
      return;
    }
    
    await onAddGame({
      ...formData,
      hoursPlayed: Number(formData.hoursPlayed),
      rating: formData.rating === "" ? undefined : Number(formData.rating),
      userId: formData.userId,
    });

    setFormData({
      title: "",
      platform: "",
      genre: "",
      status: "backlog",
      hoursPlayed: 0,
      priority: "medium",
      rating: "",
      userId: "",
    });
  };
  
  return (
    <section>
      <h2>Add Game</h2>
      <form onSubmit={handleSubmit}>
        
        <input
          type="text"
          name="title"
          placeholder="Game title"
          value={formData.title}
          onChange={handleChange}
        />

        <input
          type="text"
          name="platform"
          placeholder="Platform"
          value={formData.platform}
          onChange={handleChange}
        />

        <input
          type="text"
          name="genre"
          placeholder="Genre"
          value={formData.genre}
          onChange={handleChange}
        />

        <select name="status" value={formData.status} onChange={handleChange}>
          <option value="wishlist">Wishlist</option>
          <option value="backlog">Backlog</option>
          <option value="playing">Playing</option>
          <option value="completed">Completed</option>
          <option value="dropped">Dropped</option>
        </select>

        <input
          type="number"
          name="hoursPlayed"
          placeholder="Hours played"
          value={formData.hoursPlayed}
          onChange={handleChange}
        />

        <select name="priority" value={formData.priority} onChange={handleChange}>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

        <input
          type="number"
          name="rating"
          placeholder="Rating (1-10)"
          value={formData.rating}
          onChange={handleChange}
        />

        <select name="userId" value={formData.userId} onChange={handleChange}>
          <option value="">Select User</option>
          {users.map((user) => (
            <option key={user._id} value={user._id}>
              {user.username}
            </option>
          ))}
        </select>

        <button type="submit">Add Game</button>
      </form>
    </section>
  );
}

export default GameForm;