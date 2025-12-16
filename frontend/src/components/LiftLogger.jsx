import React, { useState } from "react";
import LiftService from "../services/LiftService";

export default function LiftLogger({ onLiftAdded }) {
  const [liftType, setLiftType] = useState("squat");
  const [weight, setWeight] = useState("");
  const [reps, setReps] = useState("");
  const [date, setDate] = useState(new Date().toLocaleDateString("en-CA"));
  const [notes, setNotes] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    if (!weight || !reps) {
      setError("Weight and reps are required");
      return;
    }

    if (parseFloat(weight) <= 0 || parseInt(reps) <= 0) {
      setError("Weight and reps must be positive numbers");
      return;
    }

    const liftData = {
      lift_type: liftType,
      weight: parseFloat(weight),
      reps: parseInt(reps),
      date: date,
      notes: notes.trim() || null,
    };

    try {
      await LiftService.createLift(liftData);
      setSuccess(true);
      setWeight("");
      setReps("");
      setNotes("");

      if (onLiftAdded) {
        onLiftAdded();
      }

      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError("Failed to log lift. Please try again.");
      console.error(err);
    }
  };

  const containerStyle = {
    backgroundColor: "white",
    border: "1px solid #e5e7eb",
    borderRadius: "4px",
    padding: "32px",
    maxWidth: "480px",
    margin: "0 auto",
    fontFamily: "monospace",
  };

  const headingStyle = {
    fontSize: "18px",
    fontWeight: "normal",
    marginBottom: "24px",
    color: "#000",
    letterSpacing: "0.5px",
  };

  const labelStyle = {
    display: "block",
    fontSize: "12px",
    fontWeight: "normal",
    marginBottom: "6px",
    color: "#6b7280",
    textTransform: "uppercase",
    letterSpacing: "1px",
  };

  const inputStyle = {
    width: "100%",
    backgroundColor: "#f9fafb",
    border: "1px solid #d1d5db",
    borderRadius: "2px",
    padding: "10px 12px",
    color: "#000",
    fontSize: "14px",
    marginBottom: "20px",
    boxSizing: "border-box",
    fontFamily: "monospace",
  };

  const selectStyle = {
    ...inputStyle,
    cursor: "pointer",
  };

  const textareaStyle = {
    ...inputStyle,
    resize: "none",
    fontFamily: "monospace",
  };

  const buttonStyle = {
    width: "100%",
    backgroundColor: "#000",
    color: "white",
    fontWeight: "normal",
    padding: "12px",
    borderRadius: "2px",
    border: "none",
    cursor: "pointer",
    fontSize: "13px",
    fontFamily: "monospace",
    letterSpacing: "1px",
    textTransform: "uppercase",
  };

  const errorStyle = {
    backgroundColor: "#fef2f2",
    border: "1px solid #fca5a5",
    borderRadius: "2px",
    padding: "10px",
    marginBottom: "20px",
  };

  const successStyle = {
    backgroundColor: "#f0fdf4",
    border: "1px solid #86efac",
    borderRadius: "2px",
    padding: "10px",
    marginBottom: "20px",
  };

  const messageTextStyle = {
    fontSize: "13px",
    margin: 0,
    fontFamily: "monospace",
  };

  return (
    <div style={containerStyle}>
      <h2 style={headingStyle}>LOG LIFT</h2>

      <div>
        <div>
          <label style={labelStyle}>EXERCISE</label>
          <select
            value={liftType}
            onChange={(e) => setLiftType(e.target.value)}
            style={selectStyle}
          >
            <option value="squat">Squat</option>
            <option value="bench">Bench Press</option>
            <option value="deadlift">Deadlift</option>
            <option value="overhead_press">Overhead Press</option>
          </select>
        </div>

        <div>
          <label style={labelStyle}>WEIGHT (LBS)</label>
          <input
            type="number"
            step="0.01"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="225"
            style={inputStyle}
          />
        </div>

        <div>
          <label style={labelStyle}>REPS</label>
          <input
            type="number"
            value={reps}
            onChange={(e) => setReps(e.target.value)}
            placeholder="5"
            style={inputStyle}
          />
        </div>

        <div>
          <label style={labelStyle}>DATE</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            style={inputStyle}
          />
        </div>

        <div>
          <label style={labelStyle}>NOTES (OPTIONAL)</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Felt strong today..."
            rows="3"
            style={textareaStyle}
          />
        </div>

        {error && (
          <div style={errorStyle}>
            <p style={{ ...messageTextStyle, color: "#dc2626" }}>{error}</p>
          </div>
        )}

        {success && (
          <div style={successStyle}>
            <p style={{ ...messageTextStyle, color: "#16a34a" }}>
              Lift logged successfully
            </p>
          </div>
        )}

        <button
          onClick={handleSubmit}
          style={buttonStyle}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#374151")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#000")}
        >
          SUBMIT
        </button>
      </div>
    </div>
  );
}
