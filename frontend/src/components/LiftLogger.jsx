import React, { useState } from "react";
import LiftService from "../services/LiftService"; // Add this import at top

export default function LiftLogger({ onLiftAdded }) {
  const [liftType, setLiftType] = useState("squat");
  const [weight, setWeight] = useState("");
  const [reps, setReps] = useState("");
  const [date, setDate] = useState(new Date().toLocaleDateString("en-CA"));
  const [notes, setNotes] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   setError("");
  //   setSuccess(false);

  //   if (!weight || !reps) {
  //     setError("Weight and reps are required");
  //     return;
  //   }

  //   if (parseFloat(weight) <= 0 || parseInt(reps) <= 0) {
  //     setError("Weight and reps must be positive numbers");
  //     return;
  //   }

  //   const liftData = {
  //     lift_type: liftType,
  //     weight: parseFloat(weight),
  //     reps: parseInt(reps),
  //     date: date,
  //     notes: notes.trim() || null,
  //   };

  //   console.log("Submitting lift:", liftData);

  //   setSuccess(true);
  //   setWeight("");
  //   setReps("");
  //   setNotes("");

  //   if (onLiftAdded) {
  //     onLiftAdded(liftData);
  //   }

  //   setTimeout(() => setSuccess(false), 3000);
  // };

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
    backgroundColor: "#1e293b",
    borderRadius: "8px",
    padding: "24px",
    maxWidth: "448px",
    margin: "0 auto",
  };

  const headingStyle = {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "24px",
    color: "white",
  };

  const labelStyle = {
    display: "block",
    fontSize: "14px",
    fontWeight: "600",
    marginBottom: "8px",
    color: "white",
  };

  const inputStyle = {
    width: "100%",
    backgroundColor: "#334155",
    border: "1px solid #475569",
    borderRadius: "4px",
    padding: "8px 16px",
    color: "white",
    fontSize: "16px",
    marginBottom: "16px",
    boxSizing: "border-box",
  };

  const selectStyle = {
    ...inputStyle,
    cursor: "pointer",
  };

  const textareaStyle = {
    ...inputStyle,
    resize: "none",
    fontFamily: "inherit",
  };

  const buttonStyle = {
    width: "100%",
    backgroundColor: "#2563eb",
    color: "white",
    fontWeight: "600",
    padding: "12px",
    borderRadius: "4px",
    border: "none",
    cursor: "pointer",
    fontSize: "16px",
    transition: "background-color 0.2s",
  };

  const errorStyle = {
    backgroundColor: "rgba(127, 29, 29, 0.5)",
    border: "1px solid #dc2626",
    borderRadius: "4px",
    padding: "12px",
    marginBottom: "16px",
  };

  const successStyle = {
    backgroundColor: "rgba(20, 83, 45, 0.5)",
    border: "1px solid #16a34a",
    borderRadius: "4px",
    padding: "12px",
    marginBottom: "16px",
  };

  const messageTextStyle = {
    fontSize: "14px",
    margin: 0,
  };

  return (
    <div style={containerStyle}>
      <h2 style={headingStyle}>Log Lift</h2>

      <div>
        <div>
          <label style={labelStyle}>Exercise</label>
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
          <label style={labelStyle}>Weight (lbs)</label>
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
          <label style={labelStyle}>Reps</label>
          <input
            type="number"
            value={reps}
            onChange={(e) => setReps(e.target.value)}
            placeholder="5"
            style={inputStyle}
          />
        </div>

        <div>
          <label style={labelStyle}>Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            style={inputStyle}
          />
        </div>

        <div>
          <label style={labelStyle}>Notes (optional)</label>
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
            <p style={{ ...messageTextStyle, color: "#fca5a5" }}>{error}</p>
          </div>
        )}

        {success && (
          <div style={successStyle}>
            <p style={{ ...messageTextStyle, color: "#86efac" }}>
              Lift logged successfully!
            </p>
          </div>
        )}

        <button
          onClick={handleSubmit}
          style={buttonStyle}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#1d4ed8")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#2563eb")}
        >
          Log Lift
        </button>
      </div>
    </div>
  );
}
