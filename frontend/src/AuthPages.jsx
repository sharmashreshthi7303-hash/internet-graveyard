import React from "react";
import { Link } from "react-router-dom";

export function Register() {
  return (
    <div style={authStyles.box}>
      <h2 style={{ color: "#4cd3c2", margin: "0 0 8px 0" }}>
        Create Hacker Profile
      </h2>
      <p style={{ color: "#84858a", margin: "0 0 24px 0" }}>
        Establish your credentials within the decentralized registry.
      </p>
      <input
        style={authStyles.input}
        type="text"
        placeholder="Choose Hacker Username"
      />
      <input
        style={authStyles.input}
        type="email"
        placeholder="Terminal Email Address"
      />
      <input
        style={authStyles.input}
        type="password"
        placeholder="Secure Access Key"
      />
      <Link to="/cemetery" style={authStyles.btn}>
        Generate Profile Token
      </Link>
      <p style={{ fontSize: "0.9rem", color: "#666", marginTop: "16px" }}>
        Already indexed?{" "}
        <Link to="/login" style={{ color: "#a370f7" }}>
          Login here
        </Link>
      </p>
    </div>
  );
}

export function Login() {
  return (
    <div style={authStyles.box}>
      <h2 style={{ color: "#a370f7", margin: "0 0 8px 0" }}>
        Initialize Authentication
      </h2>
      <p style={{ color: "#84858a", margin: "0 0 24px 0" }}>
        Input your profile identifiers to open the secure session.
      </p>
      <input
        style={authStyles.input}
        type="text"
        placeholder="Hacker Username"
      />
      <input
        style={authStyles.input}
        type="password"
        placeholder="Access Key"
      />
      <Link to="/cemetery" style={authStyles.btn}>
        Verify Identity
      </Link>
      <p style={{ fontSize: "0.9rem", color: "#666", marginTop: "16px" }}>
        New to the grid?{" "}
        <Link to="/register" style={{ color: "#4cd3c2" }}>
          Register profile
        </Link>
      </p>
    </div>
  );
}

const authStyles = {
  box: {
    backgroundColor: "#16161a",
    border: "1px solid #2a2a32",
    padding: "40px",
    borderRadius: "16px",
    maxWidth: "400px",
    margin: "80px auto",
    textAlign: "center",
    boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
  },
  input: {
    backgroundColor: "#22222b",
    border: "1px solid #32323f",
    padding: "12px",
    color: "#fff",
    borderRadius: "8px",
    width: "100%",
    boxSizing: "border-box",
    marginBottom: "16px",
    fontSize: "0.95rem",
  },
  btn: {
    display: "block",
    backgroundColor: "#ff6b81",
    color: "#0d0d0e",
    textDecoration: "none",
    padding: "12px",
    borderRadius: "8px",
    fontWeight: "700",
    cursor: "pointer",
    marginTop: "10px",
  },
};
