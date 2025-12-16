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

    const weight = parseFloat(selectedPlateWeight);
    const quantity = parseInt(plateQuantity);

    const newPlate = {
      id: Date.now(),
      weight,
      quantity,
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
      const plateSumOneSide = platesAdded.reduce(
        (sum, plate) => sum + plate.weight * plate.quantity,
        0
      );
      total += plateSumOneSide * 2;
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

  const barWeightButtonStyle = (isSelected) => ({
    flex: 1,
    padding: "8px",
    borderRadius: "4px",
    fontWeight: "600",
    border: "none",
    cursor: "pointer",
    backgroundColor: isSelected ? "#2563eb" : "#334155",
    color: isSelected ? "white" : "#cbd5e1",
    transition: "background-color 0.2s",
  });

  const toggleContainerStyle = {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginBottom: "24px",
  };

  const toggleButtonStyle = {
    position: "relative",
    display: "inline-flex",
    height: "32px",
    width: "56px",
    alignItems: "center",
    borderRadius: "9999px",
    backgroundColor: isLoadedEvenly ? "#16a34a" : "#475569",
    transition: "background-color 0.3s",
    border: "none",
    cursor: "pointer",
  };

  const toggleCircleStyle = {
    display: "inline-block",
    height: "24px",
    width: "24px",
    borderRadius: "50%",
    backgroundColor: "white",
    transform: isLoadedEvenly ? "translateX(28px)" : "translateX(4px)",
    transition: "transform 0.3s",
  };

  const plateInputContainerStyle = {
    backgroundColor: "#334155",
    borderRadius: "4px",
    padding: "16px",
    marginBottom: "24px",
  };

  const inputRowStyle = {
    display: "flex",
    gap: "8px",
    marginBottom: "12px",
  };

  const selectStyle = {
    flex: 1,
    backgroundColor: "#475569",
    border: "1px solid #64748b",
    borderRadius: "4px",
    padding: "8px 12px",
    color: "white",
    fontSize: "16px",
  };

  const quantityInputStyle = {
    width: "80px",
    backgroundColor: "#475569",
    border: "1px solid #64748b",
    borderRadius: "4px",
    padding: "8px 12px",
    color: "white",
    fontSize: "16px",
  };

  const addButtonStyle = {
    backgroundColor: "#16a34a",
    color: "white",
    fontWeight: "600",
    padding: "8px 16px",
    borderRadius: "4px",
    border: "none",
    cursor: "pointer",
  };

  const errorStyle = {
    backgroundColor: "rgba(127, 29, 29, 0.5)",
    border: "1px solid #dc2626",
    borderRadius: "4px",
    padding: "8px",
    marginBottom: "12px",
  };

  const platesListStyle = {
    backgroundColor: "#334155",
    borderRadius: "4px",
    padding: "16px",
    marginBottom: "24px",
  };

  const plateItemStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#475569",
    padding: "8px",
    borderRadius: "4px",
    fontSize: "14px",
    marginBottom: "8px",
  };

  const removeButtonStyle = {
    color: "#f87171",
    fontWeight: "600",
    background: "none",
    border: "none",
    cursor: "pointer",
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

  const resultStyle = {
    background: "linear-gradient(to right, #9333ea, #2563eb)",
    borderRadius: "8px",
    padding: "24px",
    textAlign: "center",
  };

  return (
    <div style={containerStyle}>
      <h2 style={headingStyle}>Bar Weight Calculator</h2>

      <div style={{ marginBottom: "24px" }}>
        <label style={labelStyle}>Bar Weight (lbs)</label>
        <div style={{ display: "flex", gap: "8px" }}>
          {[25, 35, 45].map((weight) => (
            <button
              key={weight}
              onClick={() => setBarWeight(weight)}
              style={barWeightButtonStyle(barWeight === weight)}
              onMouseOver={(e) => {
                if (barWeight !== weight) {
                  e.target.style.backgroundColor = "#475569";
                }
              }}
              onMouseOut={(e) => {
                if (barWeight !== weight) {
                  e.target.style.backgroundColor = "#334155";
                }
              }}
            >
              {weight}
            </button>
          ))}
        </div>
      </div>

      <div style={toggleContainerStyle}>
        <button
          onClick={() => setIsLoadedEvenly(!isLoadedEvenly)}
          style={toggleButtonStyle}
        >
          <span style={toggleCircleStyle} />
        </button>
        <label style={{ ...labelStyle, marginBottom: 0, cursor: "pointer" }}>
          Loaded evenly?
        </label>
      </div>

      <div style={plateInputContainerStyle}>
        <p
          style={{
            fontSize: "14px",
            fontWeight: "600",
            color: "white",
            marginBottom: "12px",
          }}
        >
          {isLoadedEvenly ? "Add plates for ONE side:" : "Add plates:"}
        </p>

        <div style={inputRowStyle}>
          <select
            value={selectedPlateWeight}
            onChange={(e) => setSelectedPlateWeight(e.target.value)}
            style={selectStyle}
          >
            {standardPlates.map((plate) => (
              <option key={plate} value={plate}>
                {plate} lbs
              </option>
            ))}
          </select>

          <input
            type="number"
            value={plateQuantity}
            onChange={(e) => setPlateQuantity(e.target.value)}
            placeholder="Qty"
            style={quantityInputStyle}
          />

          <button
            onClick={addPlate}
            style={addButtonStyle}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#15803d")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#16a34a")}
          >
            + Add
          </button>
        </div>

        {error && (
          <div style={errorStyle}>
            <p style={{ color: "#fca5a5", fontSize: "14px", margin: 0 }}>
              {error}
            </p>
          </div>
        )}
      </div>

      {platesAdded.length > 0 && (
        <div style={platesListStyle}>
          <p
            style={{
              fontSize: "14px",
              fontWeight: "600",
              color: "white",
              marginBottom: "12px",
            }}
          >
            {isLoadedEvenly ? "Plates on one side:" : "Plates added:"}
          </p>
          <div>
            {platesAdded.map((plate) => (
              <div key={plate.id} style={plateItemStyle}>
                <span style={{ color: "white" }}>
                  {plate.weight} lbs × {plate.quantity}
                </span>
                <button
                  onClick={() => removePlate(plate.id)}
                  style={removeButtonStyle}
                  onMouseOver={(e) => (e.target.style.color = "#fca5a5")}
                  onMouseOut={(e) => (e.target.style.color = "#f87171")}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div style={buttonContainerStyle}>
        <button
          onClick={calculateTotalWeight}
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

      {totalWeight !== null && (
        <div style={resultStyle}>
          <p
            style={{ fontSize: "14px", color: "#e9d5ff", marginBottom: "8px" }}
          >
            Total Bar Weight
          </p>
          <p
            style={{
              fontSize: "48px",
              fontWeight: "bold",
              color: "white",
              margin: 0,
            }}
          >
            {totalWeight} lbs
          </p>
          <p style={{ fontSize: "14px", color: "#ddd6fe", marginTop: "12px" }}>
            {isLoadedEvenly ? "(plates × 2 sides)" : "(as loaded)"}
          </p>
        </div>
      )}
    </div>
  );
}
