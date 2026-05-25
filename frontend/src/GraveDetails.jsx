import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

function GraveDetails() {
  const { id } = useParams(); // This grabs the unique ID from the website URL link
  const [grave, setGrave] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Use your live Render backend link here if deployed, otherwise keep localhost
  const API_URL =
    import.meta.env.VITE_API_URL || "http://localhost:5000/api/graves";

  useEffect(() => {
    const fetchSingleGrave = async () => {
      try {
        const res = await fetch(`${API_URL}`);
        const data = await res.json();
        // Find the specific grave that matches the ID in the URL
        const foundGrave = data.find((g) => g._id === id);
        setGrave(foundGrave);
      } catch (err) {
        console.error("Error fetching project details:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchSingleGrave();
  }, [id]);

  if (isLoading) {
    return (
      <div style={detailStyles.loadingScreen}>
        <h2>Retrieving system architecture data...</h2>
      </div>
    );
  }

  if (!grave) {
    return (
      <div style={detailStyles.loadingScreen}>
        <h2>404: Grave Not Found</h2>
        <p>This idea might have been completely erased from existence.</p>
        <Link to="/" style={detailStyles.backBtn}>
          Return to Graveyard Grounds
        </Link>
      </div>
    );
  }

  return (
    <div style={detailStyles.container}>
      <Link to="/" style={detailStyles.backBtn}>
        ← Return to Graveyard
      </Link>

      <div style={detailStyles.profileCard}>
        <span style={detailStyles.badge}>System Post-Mortem Report</span>
        <h1 style={detailStyles.mainTitle}>{grave.title}</h1>
        <p style={detailStyles.tagline}>
          "{grave.tagline || "A brilliant mistake."}"
        </p>

        <div style={detailStyles.divider}></div>

        <div style={detailStyles.section}>
          <h3 style={detailStyles.sectionHeader}>
            ⚠️ Root Cause of Failure (Fatal Flaw)
          </h3>
          <p style={detailStyles.sectionBody}>{grave.causeOfDeath}</p>
        </div>

        <div style={detailStyles.section}>
          <h3 style={detailStyles.sectionHeader}>
            🧠 Architectural Retrospective (Lesson Learned)
          </h3>
          <p style={detailStyles.sectionBody}>{grave.learning}</p>
        </div>

        {grave.exhumedBy && (
          <div style={detailStyles.exhumedAlert}>
            🚀 <strong>Project Status:</strong> This architecture has been
            adopted and exhumed by <strong>{grave.exhumedBy}</strong> for active
            reconstruction.
          </div>
        )}
      </div>
    </div>
  );
}

// Professional layout styling for the single page view
const detailStyles = {
  container: {
    backgroundColor: "#0d0d0e",
    color: "#f1f1f2",
    minHeight: "100vh",
    padding: "40px 20px",
    fontFamily: "sans-serif",
  },
  loadingScreen: {
    backgroundColor: "#0d0d0e",
    color: "#84858a",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "sans-serif",
  },
  backBtn: {
    color: "#a370f7",
    textDecoration: "none",
    fontWeight: "600",
    fontSize: "1rem",
    display: "inline-block",
    marginBottom: "24px",
  },
  profileCard: {
    backgroundColor: "#16161a",
    border: "1px solid #2a2a32",
    borderRadius: "16px",
    padding: "40px",
    maxWidth: "800px",
    margin: "0 auto",
    boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
  },
  badge: {
    backgroundColor: "rgba(255, 107, 129, 0.15)",
    color: "#ff6b81",
    border: "1px solid #ff6b81",
    padding: "6px 12px",
    borderRadius: "20px",
    fontSize: "0.8rem",
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: "1px",
  },
  mainTitle: {
    fontSize: "2.5rem",
    color: "#ffffff",
    margin: "20px 0 8px 0",
    fontWeight: "800",
  },
  tagline: {
    color: "#84858a",
    fontSize: "1.2rem",
    fontStyle: "italic",
    margin: "0 0 32px 0",
  },
  divider: { height: "1px", backgroundColor: "#2a2a32", margin: "24px 0" },
  section: { marginBottom: "32px" },
  sectionHeader: {
    color: "#4cd3c2",
    fontSize: "1.1rem",
    marginBottom: "12px",
    fontWeight: "600",
  },
  sectionBody: {
    color: "#cdd0d6",
    fontSize: "1rem",
    lineHeight: "1.6",
    margin: 0,
  },
  exhumedAlert: {
    backgroundColor: "rgba(76, 211, 194, 0.1)",
    border: "1px solid #4cd3c2",
    padding: "16px",
    borderRadius: "8px",
    color: "#4cd3c2",
    marginTop: "40px",
    lineHeight: "1.5",
  },
};

export default GraveDetails;
