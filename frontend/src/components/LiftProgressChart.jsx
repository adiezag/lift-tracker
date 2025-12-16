import React, { useState, useEffect } from "react";
import LiftService from "../services/LiftService";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function LiftProgressChart({ refreshTrigger }) {
  const [lifts, setLifts] = useState([]);
  const [selectedLift, setSelectedLift] = useState("squat");
  const [dateRange, setDateRange] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchLifts();
  }, [refreshTrigger, selectedLift, dateRange]);

  const fetchLifts = async () => {
    try {
      setLoading(true);
      const allData = await LiftService.getLifts();

      // Filter by lift type
      let filtered = allData.filter((lift) => lift.lift_type === selectedLift);

      // Filter by date range
      if (dateRange !== "all") {
        const today = new Date();
        const days = dateRange === "30" ? 30 : dateRange === "90" ? 90 : 365;
        const cutoffDate = new Date(today.setDate(today.getDate() - days));

        filtered = filtered.filter((lift) => new Date(lift.date) >= cutoffDate);
      }

      filtered.sort((a, b) => new Date(a.date) - new Date(b.date));
      setLifts(filtered);
      setLoading(false);
    } catch (err) {
      setError("Failed to load lift data");
      setLoading(false);
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

  /* ───────────── Styles ───────────── */

  const containerStyle = {
    backgroundColor: "white",
    border: "1px solid #e5e7eb",
    borderRadius: "4px",
    padding: "32px",
    maxWidth: "1000px",
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

  const filterLabelStyle = {
    fontSize: "12px",
    fontWeight: "normal",
    marginBottom: "6px",
    color: "#6b7280",
    textTransform: "uppercase",
    letterSpacing: "1px",
    display: "block",
  };

  const buttonGroupStyle = {
    display: "flex",
    gap: "8px",
    flexWrap: "wrap",
    marginBottom: "16px",
  };

  const filterButtonStyle = (isActive) => ({
    padding: "8px 12px",
    borderRadius: "2px",
    border: "none",
    cursor: "pointer",
    fontSize: "12px",
    fontWeight: "normal",
    fontFamily: "monospace",
    letterSpacing: "1px",
    textTransform: "uppercase",
    backgroundColor: isActive ? "#000" : "#f9fafb",
    color: isActive ? "white" : "#000",
  });

  const chartContainerStyle = {
    backgroundColor: "#f9fafb",
    borderRadius: "4px",
    padding: "24px",
    marginTop: "24px",
  };

  const emptyStateStyle = {
    textAlign: "center",
    padding: "32px",
    fontSize: "13px",
    color: "#6b7280",
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

  if (loading) {
    return (
      <div style={containerStyle}>
        <p style={messageTextStyle}>Loading...</p>
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      <h2 style={headingStyle}>PROGRESS TRACKER</h2>

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

      {/* Lift Type Filter */}
      <div style={{ marginBottom: "24px" }}>
        <label style={filterLabelStyle}>Select Lift</label>
        <div style={buttonGroupStyle}>
          {["squat", "bench", "deadlift", "overhead_press"].map((lift) => (
            <button
              key={lift}
              onClick={() => setSelectedLift(lift)}
              style={filterButtonStyle(selectedLift === lift)}
            >
              {getLiftDisplayName(lift)}
            </button>
          ))}
        </div>
      </div>

      {/* Date Range Filter */}
      <div style={{ marginBottom: "24px" }}>
        <label style={filterLabelStyle}>Time Range</label>
        <div style={buttonGroupStyle}>
          {[
            { value: "30", label: "Last 30 Days" },
            { value: "90", label: "Last 90 Days" },
            { value: "365", label: "Last Year" },
            { value: "all", label: "All Time" },
          ].map((range) => (
            <button
              key={range.value}
              onClick={() => setDateRange(range.value)}
              style={filterButtonStyle(dateRange === range.value)}
            >
              {range.label}
            </button>
          ))}
        </div>
      </div>

      {/* Chart */}
      {lifts.length === 0 ? (
        <div style={emptyStateStyle}>
          <p>No data for {getLiftDisplayName(selectedLift)} in this range.</p>
          <p>Log some lifts to see your progress!</p>
        </div>
      ) : (
        <div style={chartContainerStyle}>
          <h3 style={{ fontSize: "14px", marginBottom: "16px", color: "#000" }}>
            {getLiftDisplayName(selectedLift)} - Estimated 1RM Progress
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={lifts}>
              <CartesianGrid strokeDasharray="3 3" stroke="#d1d5db" />
              <XAxis
                dataKey="date"
                stroke="#6b7280"
                tick={{ fill: "#6b7280", fontFamily: "monospace" }}
              />
              <YAxis
                stroke="#6b7280"
                tick={{ fill: "#6b7280", fontFamily: "monospace" }}
                label={{
                  value: "1RM (lbs)",
                  angle: -90,
                  position: "insideLeft",
                  fill: "#6b7280",
                  fontFamily: "monospace",
                }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid #e5e7eb",
                  borderRadius: "2px",
                  color: "#000",
                  fontFamily: "monospace",
                }}
              />
              <Line
                type="monotone"
                dataKey="estimated_1rm"
                stroke="#000"
                strokeWidth={3}
                dot={{ fill: "#000", r: 5 }}
                activeDot={{ r: 7 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
