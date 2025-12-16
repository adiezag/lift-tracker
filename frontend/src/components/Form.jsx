import { useState } from "react";
import api from "../api";
import { useNavigate, Link } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import "../styles/Form.css";

function Form({ route, method }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const name = method === "login" ? "Login" : "Register";

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      console.log("test0");
      const res = await api.post(route, { username, password });
      if (method === "login") {
        localStorage.setItem(ACCESS_TOKEN, res.data.access);
        localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
        navigate("/");
      } else {
        navigate("/login");
      }
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="form-container"
      style={{ fontFamily: "monospace" }}
    >
      <h1 style={{ textAlign: "center", marginBottom: "16px" }}>
        Lift Tracker
      </h1>

      <h2 style={{ textAlign: "center", marginBottom: "24px" }}>{name}</h2>
      <input
        className="form-input"
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
        style={{ fontFamily: "monospace" }}
      />
      <input
        className="form-input"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        style={{ fontFamily: "monospace" }}
      />
      <button
        type="submit"
        className="form-button"
        style={{ fontFamily: "monospace" }}
      >
        {name}
      </button>
      <p
        style={{
          marginTop: "20px",
          textAlign: "center",
          fontFamily: "monospace",
        }}
      >
        {method === "login" ? (
          <>
            Don't have an account?{" "}
            <Link
              to="/register"
              style={{
                color: "#000000",
                textDecoration: "none",
                fontWeight: "bold",
                fontFamily: "monospace",
              }}
            >
              Register here
            </Link>
          </>
        ) : (
          <>
            Already have an account?{" "}
            <Link
              to="/login"
              style={{
                color: "#000000",
                textDecoration: "none",
                fontWeight: "bold",
                fontFamily: "monospace",
              }}
            >
              Login here
            </Link>
          </>
        )}
      </p>
    </form>
  );
}

export default Form;
