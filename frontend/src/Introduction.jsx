import React from "react";
import { Link } from "react-router-dom";

function Introduction() {
  return (
    <div style={introStyles.heroContainer}>
      <div style={introStyles.contentBox}>
        <div style={introStyles.iconBadge}>🪦 System Version 1.0</div>
        <h1 style={introStyles.headline}>
          Where Dead Code Finds Eternal Peace.
        </h1>
        <p style={introStyles.pitch}>
          Every software engineer has a repository graveyard—half-finished
          architectures, broken startups, and abandoned hacks. Stop hiding your
          failures. Log your post-mortems, let the developer community drop
          respects, and allow others to resurrect your ideas.
        </p>

        <div style={introStyles.ctaGroup}>
          <Link to="/register" style={introStyles.primaryBtn}>
            Initialize Registration ➔
          </Link>
          <Link to="/login" style={introStyles.secondaryBtn}>
            Secure Login
          </Link>
        </div>

        <div style={introStyles.footerNotice}>
          <Link to="/cemetery" style={introStyles.guestLink}>
            Proceed to Cemetery Grounds as Guest ➔
          </Link>
        </div>
      </div>
    </div>
  );
}

const introStyles = {
  heroContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "80vh",
    padding: "20px",
  },
  contentBox: { textAlign: "center", maxWidth: "700px", margin: "0 auto" },
  iconBadge: {
    display: "inline-block",
    backgroundColor: "rgba(163, 112, 247, 0.15)",
    color: "#a370f7",
    border: "1px solid #a370f7",
    padding: "6px 16px",
    borderRadius: "20px",
    fontSize: "0.85rem",
    fontWeight: "700",
    marginBottom: "24px",
  },
  headline: {
    fontSize: "3.5rem",
    fontWeight: "800",
    lineHeight: "1.1",
    color: "#ffffff",
    margin: "0 0 24px 0",
    letterSpacing: "-1px",
  },
  pitch: {
    color: "#84858a",
    fontSize: "1.2rem",
    lineHeight: "1.6",
    margin: "0 0 40px 0",
  },
  ctaGroup: {
    display: "flex",
    gap: "16px",
    justifyContent: "center",
    flexWrap: "wrap",
    marginBottom: "32px",
  },
  primaryBtn: {
    backgroundColor: "#ff6b81",
    color: "#0d0d0e",
    textDecoration: "none",
    padding: "14px 28px",
    borderRadius: "8px",
    fontWeight: "700",
    fontSize: "1rem",
    transition: "opacity 0.2s",
  },
  secondaryBtn: {
    backgroundColor: "transparent",
    color: "#ffffff",
    textDecoration: "none",
    padding: "14px 28px",
    borderRadius: "8px",
    fontWeight: "600",
    fontSize: "1rem",
    border: "1px solid #32323f",
  },
  footerNotice: { marginTop: "16px" },
  guestLink: {
    color: "#4cd3c2",
    textDecoration: "none",
    fontSize: "0.95rem",
    fontWeight: "600",
  },
};

export default Introduction;
