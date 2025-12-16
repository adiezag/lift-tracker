import React, { useState } from "react";

export default function LiftProgressCalculator() {
  const [previousMaxWeight, setPreviousMaxWeight] = useState("");
  const [currentMaxWeight, setCurrentMaxWeight] = useState("");
  const [improvementPercentage, setImprovementPercentage] = useState(null);
  const [weightGained, setWeightGained] = useState(null);
  const [error, setError] = useState("");

  const calculateProgress = () => {
    setError("");

    if (!previousMaxWeight || !currentMaxWeight) {
      setError("Please enter both weights");
      return;
    }

    const prevWeight = parseFloat(previousMaxWeight);
    const currWeight = parseFloat(currentMaxWeight);

    if (prevWeight <= 0 || currWeight <= 0) {
      setError("Weights must be positive numbers");
      return;
    }

    const weightDifference = currWeight - prevWeight;
    const improvementPercent = (weightDifference / prevWeight) * 100;

    setWeightGained(weightDifference);
    setImprovementPercentage(improvementPercent.toFixed(1));
  };

  const handleReset = () => {
    setPreviousMaxWeight("");
    setCurrentMaxWeight("");
    setImprovementPercentage(null);
    setWeightGained(null);
    setError("");
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

  const errorStyle = {
    backgroundColor: "rgba(127, 29, 29, 0.5)",
    border: "1px solid #dc2626",
    borderRadius: "4px",
    padding: "12px",
    marginBottom: "16px",
  };

  const buttonContainerStyle = {
    display: "flex",
    gap: "12px",
    marginBottom: "24px",
  };

  const calculateButtonStyle = {
    flex: 1,
    backgroundColor: "#2563eb",
    color: "white",
    fontWeight: "600",
    padding: "8px",
    borderRadius: "4px",
    border: "none",
    cursor: "pointer",
  };

  const resetButtonStyle = {
    flex: 1,
    backgroundColor: "#475569",
    color: "white",
    fontWeight: "600",
    padding: "8px",
    borderRadius: "4px",
    border: "none",
    cursor: "pointer",
  };

  const resultContainerStyle = {
    animation: "fadeIn 0.5s ease-out",
  };

  const resultBoxStyle = (isPositive) => ({
    background: isPositive
      ? "linear-gradient(to right, #16a34a, #059669)"
      : "linear-gradient(to right, #ea580c, #dc2626)",
    borderRadius: "4px",
    padding: "16px",
    marginBottom: "16px",
  });

  const percentageStyle = {
    fontSize: "48px",
    fontWeight: "bold",
    color: "white",
    margin: 0,
  };

  const breakdownStyle = {
    backgroundColor: "#334155",
    borderRadius: "4px",
    padding: "16px",
    fontSize: "14px",
    color: "#cbd5e1",
  };

  return (
    <div style={containerStyle}>
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>

      <h2 style={headingStyle}>Progress %</h2>

      <div>
        <div>
          <label style={labelStyle}>Previous Max Weight (lbs)</label>
          <input
            type="number"
            value={previousMaxWeight}
            onChange={(e) => setPreviousMaxWeight(e.target.value)}
            placeholder="e.g., 185"
            style={inputStyle}
          />
        </div>

        <div>
          <label style={labelStyle}>Current Max Weight (lbs)</label>
          <input
            type="number"
            value={currentMaxWeight}
            onChange={(e) => setCurrentMaxWeight(e.target.value)}
            placeholder="e.g., 205"
            style={inputStyle}
          />
        </div>
      </div>

      {error && (
        <div style={errorStyle}>
          <p style={{ color: "#fca5a5", fontSize: "14px", margin: 0 }}>
            {error}
          </p>
        </div>
      )}

      <div style={buttonContainerStyle}>
        <button
          onClick={calculateProgress}
          style={calculateButtonStyle}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#1d4ed8")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#2563eb")}
        >
          Calculate
        </button>
        <button
          onClick={handleReset}
          style={resetButtonStyle}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#64748b")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#475569")}
        >
          Reset
        </button>
      </div>

      {improvementPercentage !== null && (
        <div style={resultContainerStyle}>
          <div style={resultBoxStyle(parseFloat(improvementPercentage) >= 0)}>
            <p style={percentageStyle}>
              {improvementPercentage >= 0 ? "+" : ""}
              {improvementPercentage}%
            </p>
          </div>

          <div style={breakdownStyle}>
            <p style={{ margin: 0 }}>
              {previousMaxWeight} lbs → {currentMaxWeight} lbs
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
