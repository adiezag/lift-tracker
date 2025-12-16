import React, { useState, useEffect } from "react";
import LiftService from "../services/LiftService";

export default function LiftHistory({ refreshTrigger }) {
  const [lifts, setLifts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchLifts();
  }, [refreshTrigger]);

  //   const fetchLifts = async () => {
  //     try {
  //       setLoading(true);
  //       // Replace with: const data = await LiftService.getLifts();

  //       // Mock data for now
  //       const data = [
  //         {
  //           id: 1,
  //           lift_type: "squat",
  //           weight: 225,
  //           reps: 5,
  //           date: "2024-12-10",
  //           estimated_1rm: 253.13,
  //         },
  //         {
  //           id: 2,
  //           lift_type: "bench",
  //           weight: 185,
  //           reps: 8,
  //           date: "2024-12-12",
  //           estimated_1rm: 234.33,
  //         },
  //       ];

  //       setLifts(data);
  //       setLoading(false);
  //     } catch (err) {
  //       setError("Failed to load lift history");
  //       setLoading(false);
  //       console.error(err);
  //     }
  //   };

  //   const handleDelete = async (liftId) => {
  //     if (!window.confirm("Delete this lift?")) return;

  //     try {
  //       // Replace with: await LiftService.deleteLift(liftId);
  //       console.log("Deleting lift:", liftId);

  //       setLifts(lifts.filter((lift) => lift.id !== liftId));
  //     } catch (err) {
  //       setError("Failed to delete lift");
  //       console.error(err);
  //     }
  //   };
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

  const containerStyle = {
    backgroundColor: "#1e293b",
    borderRadius: "8px",
    padding: "24px",
    maxWidth: "800px",
    margin: "0 auto",
  };

  const headingStyle = {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "24px",
    color: "white",
  };

  const liftItemStyle = {
    backgroundColor: "#334155",
    borderRadius: "4px",
    padding: "16px",
    marginBottom: "12px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  };

  const liftInfoStyle = {
    flex: 1,
  };

  const liftTitleStyle = {
    fontSize: "18px",
    fontWeight: "600",
    color: "white",
    marginBottom: "4px",
  };

  const liftDetailsStyle = {
    fontSize: "14px",
    color: "#94a3b8",
    marginBottom: "4px",
  };

  const estimated1rmStyle = {
    fontSize: "14px",
    color: "#60a5fa",
    fontWeight: "600",
  };

  const deleteButtonStyle = {
    backgroundColor: "#dc2626",
    color: "white",
    padding: "8px 16px",
    borderRadius: "4px",
    border: "none",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "600",
  };

  const emptyStateStyle = {
    textAlign: "center",
    padding: "48px",
    color: "#94a3b8",
  };

  const errorStyle = {
    backgroundColor: "rgba(127, 29, 29, 0.5)",
    border: "1px solid #dc2626",
    borderRadius: "4px",
    padding: "12px",
    marginBottom: "16px",
    color: "#fca5a5",
  };

  if (loading) {
    return (
      <div style={containerStyle}>
        <p style={{ color: "white", textAlign: "center" }}>Loading...</p>
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      <h2 style={headingStyle}>Lift History</h2>

      {error && (
        <div style={errorStyle}>
          <p style={{ margin: 0 }}>{error}</p>
        </div>
      )}

      {lifts.length === 0 ? (
        <div style={emptyStateStyle}>
          <p>No lifts logged yet. Start tracking your progress!</p>
        </div>
      ) : (
        <div>
          {lifts.map((lift) => (
            <div key={lift.id} style={liftItemStyle}>
              <div style={liftInfoStyle}>
                <div style={liftTitleStyle}>
                  {getLiftDisplayName(lift.lift_type)}
                </div>
                <div style={liftDetailsStyle}>
                  {lift.weight} lbs × {lift.reps} reps
                </div>
                <div style={liftDetailsStyle}>
                  {new Date(lift.date + "T00:00:00").toLocaleDateString(
                    "en-CA"
                  )}
                </div>
                <div style={estimated1rmStyle}>
                  Estimated 1RM: {lift.estimated_1rm.toFixed(1)} lbs
                </div>
              </div>
              <button
                onClick={() => handleDelete(lift.id)}
                style={deleteButtonStyle}
                onMouseOver={(e) =>
                  (e.target.style.backgroundColor = "#b91c1c")
                }
                onMouseOut={(e) => (e.target.style.backgroundColor = "#dc2626")}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
