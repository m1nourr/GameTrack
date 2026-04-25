import { useState } from "react";

function UserForm({ onAddUser }) {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
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

    if (!formData.username || !formData.email) {
      return;
    }

    await onAddUser(formData);

    setFormData({
      username: "",
      email: "",
    });
  };

  return (
    <section className="card">
      <h2>Add User</h2>

      <form className="game-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />

        <button type="submit" className="primary-btn">
          Add User
        </button>
      </form>
    </section>
  );
}

export default UserForm;