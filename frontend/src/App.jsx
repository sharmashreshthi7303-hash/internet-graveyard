import React, { useState, useEffect } from "react";

function App() {
  const [graves, setGraves] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    tagline: "",
    causeOfDeath: "",
    learning: "",
  });

  const API_URL = "https://internet-graveyard-backend.onrender.com/api/graves";

  // Fetch all graves from backend
  const fetchGraves = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setGraves(data);
    } catch (err) {
      console.error("Error loading graveyard:", err);
    }
  };

  useEffect(() => {
    fetchGraves();
  }, []);

  // Handle Input Form Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit Form (Bury Idea)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.causeOfDeath || !formData.learning) return;

    try {
      await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      setFormData({ title: "", tagline: "", causeOfDeath: "", learning: "" });
      fetchGraves(); // Refresh the list
    } catch (err) {
      console.error("Error burying idea:", err);
    }
  };

  // Pay Respects Button
  const payRespects = async (id) => {
    try {
      await fetch(`${API_URL}/${id}/respect`, { method: "PATCH" });
      fetchGraves();
    } catch (err) {
      console.error(err);
    }
  };

  // Exhume Button
  const exhumeProject = async (id) => {
    const hackerName = prompt(
      "Enter your hacker name to claim and resurrect this project:",
    );
    if (!hackerName) return;

    try {
      await fetch(`${API_URL}/${id}/exhume`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ hackerName }),
      });
      fetchGraves();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>🪦 The Internet Graveyard</h1>
        <p style={styles.subtitle}>
          Where dead coding projects, half-baked startups, and abandoned repos
          rest in peace.
        </p>
      </header>

      {/* BURY FORM */}
      <form onSubmit={handleSubmit} style={styles.form}>
        <h3 style={{ color: "#03dac6", marginTop: 0 }}>Dig a New Grave</h3>
        <input
          style={styles.input}
          type="text"
          name="title"
          placeholder="Project Title (e.g., Uber for Cats)"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <input
          style={styles.input}
          type="text"
          name="tagline"
          placeholder="Tagline / Pitch"
          value={formData.tagline}
          onChange={handleChange}
        />
        <textarea
          style={styles.textarea}
          name="causeOfDeath"
          placeholder="Cause of Death (Why did it fail/stop?)"
          value={formData.causeOfDeath}
          onChange={handleChange}
          required
        />
        <textarea
          style={styles.textarea}
          name="learning"
          placeholder="Epitaph / Key Lesson Learned"
          value={formData.learning}
          onChange={handleChange}
          required
        />
        <button type="submit" style={styles.submitBtn}>
          Bury Project ⚰️
        </button>
      </form>

      {/* GRAVEYARD DISPLAY GRID */}
      <div style={styles.grid}>
        {graves.map((grave) => (
          <div key={grave._id} style={styles.tombstone}>
            <div style={styles.tombstoneTop}></div>
            <h2 style={styles.graveTitle}>{grave.title}</h2>
            <p style={styles.graveTagline}>
              <em>"{grave.tagline}"</em>
            </p>
            <hr style={styles.hr} />
            <p style={styles.bodyText}>
              💀 <strong>Fatal Flaw:</strong> {grave.causeOfDeath}
            </p>
            <p style={styles.bodyText}>
              💡 <strong>Lesson:</strong> {grave.learning}
            </p>

            {grave.exhumedBy && (
              <p style={styles.exhumedTag}>
                ⚡ Resurrected by: <strong>{grave.exhumedBy}</strong>
              </p>
            )}

            <div style={styles.btnGroup}>
              <button
                onClick={() => payRespects(grave._id)}
                style={styles.respectBtn}
              >
                🪦 Drop Respect ({grave.tombstones})
              </button>
              {!grave.exhumedBy && (
                <button
                  onClick={() => exhumeProject(grave._id)}
                  style={styles.exhumeBtn}
                >
                  ⚡ Exhume
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// 💄 INSTANT SPOOKY CSS-IN-JS FOR SPEED RUNNING
const styles = {
  container: {
    backgroundColor: "#121212",
    color: "#e0e0e0",
    minHeight: "100vh",
    padding: "40px 20px",
    fontFamily: "sans-serif",
  },
  header: { textAlign: "center", marginBottom: "40px" },
  title: { fontSize: "2.5rem", color: "#bb86fc", margin: "0 0 10px 0" },
  subtitle: { color: "#888", fontSize: "1.1rem" },
  form: {
    backgroundColor: "#1e1e1e",
    padding: "24px",
    borderRadius: "12px",
    maxWidth: "500px",
    margin: "0 auto 50px auto",
    border: "1px solid #333",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  input: {
    backgroundColor: "#2d2d2d",
    border: "1px solid #444",
    padding: "10px",
    color: "#fff",
    borderRadius: "6px",
  },
  textarea: {
    backgroundColor: "#2d2d2d",
    border: "1px solid #444",
    padding: "10px",
    color: "#fff",
    borderRadius: "6px",
    minHeight: "60px",
    resize: "vertical",
  },
  submitBtn: {
    backgroundColor: "#cf6679",
    color: "#000",
    border: "none",
    padding: "12px",
    borderRadius: "6px",
    fontWeight: "bold",
    cursor: "pointer",
  },
  grid: {
    display: "flex",
    flexWrap: "wrap",
    gap: "30px",
    justifyContent: "center",
    maxWidth: "1200px",
    margin: "0 auto",
  },
  tombstone: {
    backgroundColor: "#1a1a1a",
    border: "2px solid #333",
    borderTop: "none",
    borderRadius: "100px 100px 8px 8px",
    width: "280px",
    padding: "40px 24px 24px 24px",
    textAlign: "center",
    position: "relative",
    boxShadow: "0 10px 20px rgba(0,0,0,0.5)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  graveTitle: { color: "#e0e0e0", fontSize: "1.4rem", margin: "10px 0 5px 0" },
  graveTagline: { color: "#888", fontSize: "0.9rem", margin: "0 0 15px 0" },
  hr: { borderColor: "#333", margin: "10px 0" },
  bodyText: {
    fontSize: "0.9rem",
    textAlign: "left",
    margin: "8px 0",
    lineHeight: "1.4",
  },
  exhumedTag: {
    backgroundColor: "#03dac6",
    color: "#000",
    fontSize: "0.8rem",
    padding: "4px",
    borderRadius: "4px",
    fontWeight: "bold",
    margin: "10px 0",
  },
  btnGroup: { display: "flex", gap: "8px", marginTop: "15px" },
  respectBtn: {
    flex: 2,
    backgroundColor: "#2d2d2d",
    color: "#bb86fc",
    border: "1px solid #bb86fc",
    padding: "8px",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "0.8rem",
  },
  exhumeBtn: {
    flex: 1,
    backgroundColor: "#03dac6",
    color: "#000",
    border: "none",
    padding: "8px",
    borderRadius: "4px",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "0.8rem",
  },
};

export default App;
