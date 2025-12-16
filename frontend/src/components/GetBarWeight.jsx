import React, { useState } from "react";

export default function GetBarWeight() {
  const [barWeight, setBarWeight] = useState(45);
  const [isLoadedEvenly, setIsLoadedEvenly] = useState(false);
  const [selectedPlateWeight, setSelectedPlateWeight] = useState("45");
  const [plateQuantity, setPlateQuantity] = useState("");
  const [platesAdded, setPlatesAdded] = useState([]);
  const [totalWeight, setTotalWeight] = useState(null);
  const [error, setError] = useState("");

  const standardPlates = [45, 35, 25, 10, 5, 2.5];

  const addPlate = () => {
    setError("");

    if (!plateQuantity || plateQuantity <= 0) {
      setError("Please enter a valid quantity");
      return;
    }

    const newPlate = {
      id: Date.now(),
      weight: parseFloat(selectedPlateWeight),
      quantity: parseInt(plateQuantity),
    };

    setPlatesAdded([...platesAdded, newPlate]);
    setPlateQuantity("");
    setSelectedPlateWeight("45");
  };

  const removePlate = (id) => {
    setPlatesAdded(platesAdded.filter((plate) => plate.id !== id));
  };

  const calculateTotalWeight = () => {
    setError("");

    if (platesAdded.length === 0) {
      setError("Please add at least one plate");
      return;
    }

    let total = barWeight;

    if (isLoadedEvenly) {
      const oneSide = platesAdded.reduce(
        (sum, plate) => sum + plate.weight * plate.quantity,
        0
      );
      total += oneSide * 2;
    } else {
      platesAdded.forEach((plate) => {
        total += plate.weight * plate.quantity;
      });
    }

    setTotalWeight(total);
  };

  const handleReset = () => {
    setBarWeight(45);
    setIsLoadedEvenly(false);
    setSelectedPlateWeight("45");
    setPlateQuantity("");
    setPlatesAdded([]);
    setTotalWeight(null);
    setError("");
  };

  /* ---------- styles ---------- */

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
    fontSize: "14px",
    marginBottom: "16px",
    fontFamily: "monospace",
  };

  const rowStyle = {
    display: "flex",
    gap: "12px",
    marginBottom: "20px",
  };

  const buttonStyle = (active = false) => ({
    flex: 1,
    backgroundColor: active ? "#000" : "white",
    color: active ? "white" : "#000",
    border: "1px solid #d1d5db",
    borderRadius: "2px",
    padding: "10px",
    cursor: "pointer",
    fontFamily: "monospace",
    fontSize: "13px",
    letterSpacing: "1px",
    textTransform: "uppercase",
  });

  const errorStyle = {
    backgroundColor: "#fef2f2",
    border: "1px solid #fca5a5",
    borderRadius: "2px",
    padding: "10px",
    marginBottom: "20px",
  };

  const plateItemStyle = {
    display: "flex",
    justifyContent: "space-between",
    padding: "8px 0",
    borderBottom: "1px solid #e5e7eb",
    fontSize: "13px",
  };

  const resultStyle = {
    animation: "fadeIn 0.5s ease-out",
    backgroundColor: "#f9fafb",
    border: "1px solid #e5e7eb",
    borderRadius: "2px",
    padding: "24px",
    textAlign: "center",
  };

  return (
    <div style={containerStyle}>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>

      <h2 style={headingStyle}>BAR WEIGHT</h2>

      <label style={labelStyle}>BAR WEIGHT (LBS)</label>
      <div style={rowStyle}>
        {[25, 35, 45].map((w) => (
          <button
            key={w}
            onClick={() => setBarWeight(w)}
            style={buttonStyle(barWeight === w)}
          >
            {w}
          </button>
        ))}
      </div>

      <div style={{ marginBottom: "16px" }}>
        <label style={labelStyle}>LOADED EVENLY?</label>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            cursor: "pointer",
            userSelect: "none",
          }}
          onClick={() => setIsLoadedEvenly(!isLoadedEvenly)}
        >
          <div
            style={{
              width: "50px",
              height: "24px",
              borderRadius: "12px",
              backgroundColor: isLoadedEvenly ? "#2b2c2dff" : "#d1d5db",
              position: "relative",
              transition: "background-color 0.3s",
            }}
          >
            <div
              style={{
                width: "20px",
                height: "20px",
                borderRadius: "50%",
                backgroundColor: "white",
                position: "absolute",
                top: "2px",
                left: isLoadedEvenly ? "28px" : "2px",
                transition: "left 0.3s",
              }}
            ></div>
          </div>
          <span style={{ marginLeft: "8px", fontFamily: "monospace" }}>
            {isLoadedEvenly ? "Yes" : "No"}
          </span>
        </div>
      </div>

      <label style={labelStyle}>
        {isLoadedEvenly ? "ADD PLATES (ONE SIDE)" : "ADD PLATES"}
      </label>

      <div style={{ display: "flex", gap: "8px", marginBottom: "12px" }}>
        <select
          value={selectedPlateWeight}
          onChange={(e) => setSelectedPlateWeight(e.target.value)}
          style={{ ...inputStyle, flexGrow: 1 }}
        >
          {standardPlates.map((p) => (
            <option key={p} value={p}>
              {p} lbs
            </option>
          ))}
        </select>

        <input
          type="number"
          placeholder="Qty"
          value={plateQuantity}
          onChange={(e) => setPlateQuantity(e.target.value)}
          style={{ ...inputStyle, width: "70px", flexGrow: 0 }}
        />

        <button
          onClick={addPlate}
          style={{
            ...buttonStyle(),
            flexGrow: 0,
            width: "100px",
            height: "40px", // match input/select height
            padding: "0 12px", // horizontal padding only
            fontSize: "14px",
          }}
        >
          +
        </button>
      </div>

      {error && (
        <div style={errorStyle}>
          <p style={{ margin: 0, fontSize: "13px", color: "#dc2626" }}>
            {error}
          </p>
        </div>
      )}

      {platesAdded.length > 0 && (
        <div style={{ marginBottom: "24px" }}>
          {platesAdded.map((plate) => (
            <div key={plate.id} style={plateItemStyle}>
              <span>
                {plate.weight} lbs × {plate.quantity}
              </span>
              <button
                onClick={() => removePlate(plate.id)}
                style={{
                  border: "none",
                  background: "none",
                  cursor: "pointer",
                }}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}

      <div style={rowStyle}>
        <button style={buttonStyle()} onClick={calculateTotalWeight}>
          CALCULATE
        </button>
        <button style={buttonStyle()} onClick={handleReset}>
          RESET
        </button>
      </div>

      {totalWeight !== null && (
        <div style={resultStyle}>
          <p style={{ fontSize: "12px", marginBottom: "8px" }}>
            TOTAL BAR WEIGHT
          </p>
          <p style={{ fontSize: "48px", margin: 0 }}>{totalWeight} lbs</p>
          <p style={{ fontSize: "12px", marginTop: "8px" }}>
            {isLoadedEvenly ? "(plates × 2 sides)" : "(as loaded)"}
          </p>
        </div>
      )}
    </div>
  );
}
