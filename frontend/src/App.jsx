import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Introduction from "./Introduction";
import { Register, Login } from "./AuthPages";
import GraveDetails from "./GraveDetails";

// THE COMPONENT FOR THE MAIN FEED (NOW MOVED TO /cemetery)
function CemeteryGrounds({
  graves,
  isLoading,
  formData,
  handleChange,
  handleSubmit,
  payRespects,
  exhumeProject,
}) {
  return (
    <>
      <form onSubmit={handleSubmit} className="gy-form">
        <h3 className="gy-form-title">Log a Project Decommission</h3>
        <input
          className="gy-input"
          type="text"
          name="title"
          placeholder="Project Title (e.g., Uber for Cats)"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <input
          className="gy-input"
          type="text"
          name="tagline"
          placeholder="Tagline / Pitch"
          value={formData.tagline}
          onChange={handleChange}
        />
        <textarea
          className="gy-textarea"
          name="causeOfDeath"
          placeholder="Root Cause Analysis (Why did execution cease?)"
          value={formData.causeOfDeath}
          onChange={handleChange}
          required
        />
        <textarea
          className="gy-textarea"
          name="learning"
          placeholder="Core Technical Epiphany / Architectural Retrospective"
          value={formData.learning}
          onChange={handleChange}
          required
        />
        <button type="submit" className="gy-submit-btn">
          Execute Burial Protocol ⚰️
        </button>
      </form>

      {isLoading ? (
        <div
          style={{
            textAlign: "center",
            color: "#84858a",
            width: "100%",
            padding: "40px",
          }}
        >
          <p style={{ fontSize: "1.2rem" }}>
            Querying structural database metrics...
          </p>
        </div>
      ) : (
        <div className="gy-grid">
          {graves.length > 0 ? (
            graves.map((grave) => (
              <div key={grave._id} className="gy-tombstone">
                <div>
                  <Link
                    to={`/grave/${grave._id}`}
                    style={{ textDecoration: "none" }}
                  >
                    <h2 className="gy-grave-title">{grave.title} →</h2>
                  </Link>
                  <p className="gy-grave-tagline">
                    "{grave.tagline || "Decommissioned system architecture."}"
                  </p>
                  <hr className="gy-hr" />
                  <p className="gy-body-text">
                    ⚠️ <strong>Root Cause:</strong>{" "}
                    {grave.causeOfDeath.length > 60
                      ? grave.causeOfDeath.substring(0, 60) + "..."
                      : grave.causeOfDeath}
                  </p>
                  <p className="gy-body-text">
                    🧠 <strong>Retrospective:</strong>{" "}
                    {grave.learning.length > 60
                      ? grave.learning.substring(0, 60) + "..."
                      : grave.learning}
                  </p>
                </div>
                <div>
                  {grave.exhumedBy && (
                    <p className="gy-exhumed-tag">
                      ⚡ Adopted By: <strong>{grave.exhumedBy}</strong>
                    </p>
                  )}
                  <div className="gy-btn-group">
                    <button
                      onClick={() => payRespects(grave._id)}
                      className="gy-respect-btn"
                    >
                      🪦 Acknowledge ({grave.tombstones || 0})
                    </button>
                    {!grave.exhumedBy && (
                      <button
                        onClick={() => exhumeProject(grave._id)}
                        className="gy-exhume-btn"
                      >
                        Adopt
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div
              style={{ textAlign: "center", width: "100%", padding: "40px" }}
            >
              <p style={{ color: "#84858a", fontSize: "1.1rem" }}>
                No logged entries found in this runtime environment.
              </p>
            </div>
          )}
        </div>
      )}
    </>
  );
}

// MAIN APP ROUTER INTERFACE WITH TOP BAR NAVIGATION
function App() {
  const [graves, setGraves] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: "",
    tagline: "",
    causeOfDeath: "",
    learning: "",
  });

  const API_URL =
    import.meta.env.VITE_API_URL || "http://localhost:5000/api/graves";

  const fetchGraves = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(API_URL);
      const data = await res.json();
      setGraves(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchGraves();
  }, []);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setFormData({ title: "", tagline: "", causeOfDeath: "", learning: "" });
        fetchGraves();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const payRespects = async (id) => {
    try {
      const res = await fetch(`${API_URL}/${id}/respect`, { method: "PATCH" });
      if (res.ok) fetchGraves();
    } catch (err) {
      console.error(err);
    }
  };

  const exhumeProject = async (id) => {
    const hackerName = prompt("Enter identifier:");
    if (!hackerName || !hackerName.trim()) return;
    try {
      const res = await fetch(`${API_URL}/${id}/exhume`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ hackerName: hackerName.trim() }),
      });
      if (res.ok) fetchGraves();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Router>
      <div className="graveyard-app-container">
        <style>{`
          .graveyard-app-container { background-color: #0d0d0e; color: #f1f1f2; min-height: 100vh; font-family: -apple-system, sans-serif; box-sizing: border-box; }
          .nav-bar { display: flex; justify-content: space-between; align-items: center; padding: 20px 40px; background-color: #16161a; border-bottom: 1px solid #2a2a32; }
          .nav-logo { color: #bb86fc; font-weight: 800; font-size: 1.2rem; text-decoration: none; }
          .nav-links { display: flex; gap: 20px; }
          .nav-item { color: #84858a; text-decoration: none; font-size: 0.95rem; font-weight: 500; }
          .nav-item:hover { color: #ffffff; }
          .gy-content-wrapper { padding: 40px 20px; }
          .gy-form { background-color: #16161a; padding: 32px; border-radius: 16px; max-width: 540px; margin: 0 auto 64px auto; border: 1px solid #2a2a32; display: flex; flex-direction: column; gap: 16px; box-shadow: 0 20px 40px rgba(0,0,0,0.3); }
          .gy-form-title { color: #4cd3c2; font-size: 1.3rem; margin: 0; font-weight: 600; }
          .gy-input, .gy-textarea { background-color: #22222b; border: 1px solid #32323f; padding: 12px 16px; color: #ffffff; border-radius: 8px; font-size: 0.95rem; width: 100%; box-sizing: border-box; }
          .gy-textarea { min-height: 80px; resize: vertical; }
          .gy-submit-btn { background-color: #ff6b81; color: #0d0d0e; border: none; padding: 14px; border-radius: 8px; font-weight: 700; cursor: pointer; font-size: 1rem; width: 100%; }
          .gy-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(290px, 1fr)); gap: 32px; max-width: 1200px; margin: 0 auto; width: 100%; box-sizing: border-box; }
          .gy-tombstone { background: #16161a; border: 1px solid #2a2a32; border-top: none; border-radius: 140px 140px 12px 12px; padding: 56px 28px 28px 28px; text-align: center; box-shadow: 0 15px 30px rgba(0,0,0,0.4); display: flex; flex-direction: column; justify-content: space-between; min-height: 400px; box-sizing: border-box; }
          .gy-grave-title { color: #a370f7; font-size: 1.5rem; margin: 12px 0 6px 0; font-weight: 700; }
          .gy-grave-tagline { color: #84858a; font-size: 0.95rem; margin: 0 0 16px 0; font-style: italic; }
          .gy-hr { border: 0; height: 1px; background: #2a2a32; margin: 16px 0; }
          .gy-body-text { font-size: 0.9rem; text-align: left; margin: 10px 0; line-height: 1.5; color: #cdd0d6; }
          .gy-exhumed-tag { background-color: rgba(76, 211, 194, 0.15); color: #4cd3c2; border: 1px solid #4cd3c2; font-size: 0.8rem; padding: 6px; border-radius: 6px; font-weight: 600; margin: 12px 0; text-transform: uppercase; }
          .gy-btn-group { display: flex; gap: 10px; margin-top: 20px; }
          .gy-respect-btn { flex: 2; background-color: transparent; color: #a370f7; border: 1px solid #a370f7; padding: 10px; border-radius: 6px; cursor: pointer; font-size: 0.85rem; font-weight: 600; }
          .gy-exhume-btn { flex: 1; background-color: #4cd3c2; color: #0d0d0e; border: none; padding: 10px; border-radius: 6px; cursor: pointer; font-weight: 700; font-size: 0.85rem; }
          @media (max-width: 600px) { .gy-grid { grid-template-columns: 1fr; } .nav-bar { padding: 15px 20px; } }
        `}</style>

        {/* TOP SYSTEM NAVIGATION BAR */}
        <nav className="nav-bar">
          <Link to="/" className="nav-logo">
            🪦 Internet Graveyard
          </Link>
          <div className="nav-links">
            <Link to="/cemetery" className="nav-item">
              Cemetery Feed
            </Link>
            <Link to="/login" className="nav-item">
              Login
            </Link>
            <Link
              to="/register"
              className="nav-item"
              style={{ color: "#4cd3c2" }}
            >
              Register
            </Link>
          </div>
        </nav>

        <div className="gy-content-wrapper">
          <Routes>
            <Route path="/" element={<Introduction />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/cemetery"
              element={
                <CemeteryGrounds
                  graves={graves}
                  isLoading={isLoading}
                  formData={formData}
                  handleChange={handleChange}
                  handleSubmit={handleSubmit}
                  payRespects={payRespects}
                  exhumeProject={exhumeProject}
                />
              }
            />
            <Route path="/grave/:id" element={<GraveDetails />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
