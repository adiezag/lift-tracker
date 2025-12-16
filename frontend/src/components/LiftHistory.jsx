import React, { useState, useEffect } from "react";
import LiftService from "../services/LiftService";

export default function LiftHistory({ refreshTrigger }) {
  const [lifts, setLifts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchLifts();
  }, [refreshTrigger]);

  const fetchLifts = async () => {
    try {
      setLoading(true);
      const data = await LiftService.getLifts();
      setLifts(data);
      setLoading(false);
    } catch (err) {
      setError("Failed to load lift history");
      setLoading(false);
      console.error(err);
    }
  };

  const handleDelete = async (liftId) => {
    if (!window.confirm("Delete this lift?")) return;

    try {
      await LiftService.deleteLift(liftId);
      setLifts(lifts.filter((lift) => lift.id !== liftId));
    } catch (err) {
      setError("Failed to delete lift");
      console.error(err);
    }
  };

  const getLiftDisplayName = (liftType) => {
    const names = {
      squat: "Squat",
      bench: "Bench Press",
      deadlift: "Deadlift",
      overhead_press: "Overhead Press",
    };
    return names[liftType] || liftType;
  };

  /* ───────────── styles (same system as LiftLogger) ───────────── */

  const containerStyle = {
    backgroundColor: "white",
    border: "1px solid #e5e7eb",
    borderRadius: "4px",
    padding: "32px",
    maxWidth: "800px",
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

  const liftItemStyle = {
    border: "1px solid #e5e7eb",
    borderRadius: "2px",
    padding: "16px",
    marginBottom: "12px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
  };

  const liftTitleStyle = {
    fontSize: "14px",
    letterSpacing: "1px",
    textTransform: "uppercase",
    marginBottom: "8px",
  };

  const liftDetailStyle = {
    fontSize: "13px",
    marginBottom: "4px",
    color: "#374151",
  };

  const rmStyle = {
    fontSize: "13px",
    marginTop: "6px",
    color: "#000",
  };

  const deleteButtonStyle = {
    backgroundColor: "#000",
    color: "white",
    border: "none",
    borderRadius: "2px",
    padding: "8px 12px",
    fontSize: "12px",
    cursor: "pointer",
    fontFamily: "monospace",
    letterSpacing: "1px",
    textTransform: "uppercase",
  };

  const messageBoxStyle = {
    borderRadius: "2px",
    padding: "10px",
    marginBottom: "20px",
  };

  const messageTextStyle = {
    fontSize: "13px",
    margin: 0,
  };

  /* ───────────── render ───────────── */

  if (loading) {
    return (
      <div style={containerStyle}>
        <p style={messageTextStyle}>Loading...</p>
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      <h2 style={headingStyle}>LIFT HISTORY</h2>

      {error && (
        <div
          style={{
            ...messageBoxStyle,
            backgroundColor: "#fef2f2",
            border: "1px solid #fca5a5",
          }}
        >
          <p style={{ ...messageTextStyle, color: "#dc2626" }}>{error}</p>
        </div>
      )}

      {lifts.length === 0 ? (
        <p style={messageTextStyle}>No lifts logged yet.</p>
      ) : (
        lifts.map((lift) => (
          <div key={lift.id} style={liftItemStyle}>
            <div>
              <div style={liftTitleStyle}>
                {getLiftDisplayName(lift.lift_type)}
              </div>
              <div style={liftDetailStyle}>
                {lift.weight} lbs × {lift.reps} reps
              </div>
              <div style={liftDetailStyle}>
                {new Date(lift.date + "T00:00:00").toLocaleDateString("en-CA")}
              </div>
              <div style={rmStyle}>
                Estimated 1RM: {lift.estimated_1rm.toFixed(1)} lbs
              </div>
            </div>

            <button
              onClick={() => handleDelete(lift.id)}
              style={deleteButtonStyle}
              onMouseOver={(e) => (e.target.style.backgroundColor = "#374151")}
              onMouseOut={(e) => (e.target.style.backgroundColor = "#000")}
            >
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
}
