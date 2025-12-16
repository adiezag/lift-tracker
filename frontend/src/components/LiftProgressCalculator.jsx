// import React, { useState } from "react";

// export default function LiftProgressCalculator() {
//   const [previousMaxWeight, setPreviousMaxWeight] = useState("");
//   const [currentMaxWeight, setCurrentMaxWeight] = useState("");
//   const [improvementPercentage, setImprovementPercentage] = useState(null);
//   const [weightGained, setWeightGained] = useState(null);
//   const [error, setError] = useState("");

//   const calculateProgress = () => {
//     setError("");

//     if (!previousMaxWeight || !currentMaxWeight) {
//       setError("Please enter both weights");
//       return;
//     }

//     const prevWeight = parseFloat(previousMaxWeight);
//     const currWeight = parseFloat(currentMaxWeight);

//     if (prevWeight <= 0 || currWeight <= 0) {
//       setError("Weights must be positive numbers");
//       return;
//     }

//     const weightDifference = currWeight - prevWeight;
//     const improvementPercent = (weightDifference / prevWeight) * 100;

//     setWeightGained(weightDifference);
//     setImprovementPercentage(improvementPercent.toFixed(1));
//   };

//   const handleReset = () => {
//     setPreviousMaxWeight("");
//     setCurrentMaxWeight("");
//     setImprovementPercentage(null);
//     setWeightGained(null);
//     setError("");
//   };

//   const containerStyle = {
//     backgroundColor: "#1e293b",
//     borderRadius: "8px",
//     padding: "24px",
//     maxWidth: "448px",
//     margin: "0 auto",
//   };

//   const headingStyle = {
//     fontSize: "24px",
//     fontWeight: "bold",
//     marginBottom: "24px",
//     color: "white",
//   };

//   const labelStyle = {
//     display: "block",
//     fontSize: "14px",
//     fontWeight: "600",
//     marginBottom: "8px",
//     color: "white",
//   };

//   const inputStyle = {
//     width: "100%",
//     backgroundColor: "#334155",
//     border: "1px solid #475569",
//     borderRadius: "4px",
//     padding: "8px 16px",
//     color: "white",
//     fontSize: "16px",
//     marginBottom: "16px",
//     boxSizing: "border-box",
//   };

//   const errorStyle = {
//     backgroundColor: "rgba(127, 29, 29, 0.5)",
//     border: "1px solid #dc2626",
//     borderRadius: "4px",
//     padding: "12px",
//     marginBottom: "16px",
//   };

//   const buttonContainerStyle = {
//     display: "flex",
//     gap: "12px",
//     marginBottom: "24px",
//   };

//   const calculateButtonStyle = {
//     flex: 1,
//     backgroundColor: "#2563eb",
//     color: "white",
//     fontWeight: "600",
//     padding: "8px",
//     borderRadius: "4px",
//     border: "none",
//     cursor: "pointer",
//   };

//   const resetButtonStyle = {
//     flex: 1,
//     backgroundColor: "#475569",
//     color: "white",
//     fontWeight: "600",
//     padding: "8px",
//     borderRadius: "4px",
//     border: "none",
//     cursor: "pointer",
//   };

//   const resultContainerStyle = {
//     animation: "fadeIn 0.5s ease-out",
//   };

//   const resultBoxStyle = (isPositive) => ({
//     background: isPositive
//       ? "linear-gradient(to right, #16a34a, #059669)"
//       : "linear-gradient(to right, #ea580c, #dc2626)",
//     borderRadius: "4px",
//     padding: "16px",
//     marginBottom: "16px",
//   });

//   const percentageStyle = {
//     fontSize: "48px",
//     fontWeight: "bold",
//     color: "white",
//     margin: 0,
//   };

//   const breakdownStyle = {
//     backgroundColor: "#334155",
//     borderRadius: "4px",
//     padding: "16px",
//     fontSize: "14px",
//     color: "#cbd5e1",
//   };

//   return (
//     <div style={containerStyle}>
//       <style>{`
//         @keyframes fadeIn {
//           from {
//             opacity: 0;
//             transform: scale(0.95);
//           }
//           to {
//             opacity: 1;
//             transform: scale(1);
//           }
//         }
//       `}</style>

//       <h2 style={headingStyle}>Progress %</h2>

//       <div>
//         <div>
//           <label style={labelStyle}>Previous Max Weight (lbs)</label>
//           <input
//             type="number"
//             value={previousMaxWeight}
//             onChange={(e) => setPreviousMaxWeight(e.target.value)}
//             placeholder="e.g., 185"
//             style={inputStyle}
//           />
//         </div>

//         <div>
//           <label style={labelStyle}>Current Max Weight (lbs)</label>
//           <input
//             type="number"
//             value={currentMaxWeight}
//             onChange={(e) => setCurrentMaxWeight(e.target.value)}
//             placeholder="e.g., 205"
//             style={inputStyle}
//           />
//         </div>
//       </div>

//       {error && (
//         <div style={errorStyle}>
//           <p style={{ color: "#fca5a5", fontSize: "14px", margin: 0 }}>
//             {error}
//           </p>
//         </div>
//       )}

//       <div style={buttonContainerStyle}>
//         <button
//           onClick={calculateProgress}
//           style={calculateButtonStyle}
//           onMouseOver={(e) => (e.target.style.backgroundColor = "#1d4ed8")}
//           onMouseOut={(e) => (e.target.style.backgroundColor = "#2563eb")}
//         >
//           Calculate
//         </button>
//         <button
//           onClick={handleReset}
//           style={resetButtonStyle}
//           onMouseOver={(e) => (e.target.style.backgroundColor = "#64748b")}
//           onMouseOut={(e) => (e.target.style.backgroundColor = "#475569")}
//         >
//           Reset
//         </button>
//       </div>

//       {improvementPercentage !== null && (
//         <div style={resultContainerStyle}>
//           <div style={resultBoxStyle(parseFloat(improvementPercentage) >= 0)}>
//             <p style={percentageStyle}>
//               {improvementPercentage >= 0 ? "+" : ""}
//               {improvementPercentage}%
//             </p>
//           </div>

//           <div style={breakdownStyle}>
//             <p style={{ margin: 0 }}>
//               {previousMaxWeight} lbs → {currentMaxWeight} lbs
//             </p>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

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

  const errorStyle = {
    backgroundColor: "#fef2f2",
    border: "1px solid #fca5a5",
    borderRadius: "2px",
    padding: "10px",
    marginBottom: "20px",
  };

  const buttonContainerStyle = {
    display: "flex",
    gap: "12px",
    marginBottom: "24px",
  };

  const calculateButtonStyle = {
    flex: 1,
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

  const resetButtonStyle = {
    flex: 1,
    backgroundColor: "white",
    color: "#000",
    fontWeight: "normal",
    padding: "12px",
    borderRadius: "2px",
    border: "1px solid #d1d5db",
    cursor: "pointer",
    fontSize: "13px",
    fontFamily: "monospace",
    letterSpacing: "1px",
    textTransform: "uppercase",
  };

  const resultContainerStyle = {
    animation: "fadeIn 0.5s ease-out",
  };

  const resultBoxStyle = (isPositive) => ({
    backgroundColor: isPositive ? "#f0fdf4" : "#fef2f2",
    border: isPositive ? "1px solid #86efac" : "1px solid #fca5a5",
    borderRadius: "2px",
    padding: "24px",
    marginBottom: "16px",
    textAlign: "center",
  });

  const percentageStyle = {
    fontSize: "48px",
    fontWeight: "normal",
    color: "#000",
    margin: 0,
    fontFamily: "monospace",
  };

  const breakdownStyle = {
    backgroundColor: "#f9fafb",
    border: "1px solid #e5e7eb",
    borderRadius: "2px",
    padding: "16px",
    fontSize: "14px",
    color: "#000",
    fontFamily: "monospace",
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

      <h2 style={headingStyle}>PROGRESS %</h2>

      <div>
        <div>
          <label style={labelStyle}>PREVIOUS MAX WEIGHT (LBS)</label>
          <input
            type="number"
            value={previousMaxWeight}
            onChange={(e) => setPreviousMaxWeight(e.target.value)}
            placeholder="185"
            style={inputStyle}
          />
        </div>

        <div>
          <label style={labelStyle}>CURRENT MAX WEIGHT (LBS)</label>
          <input
            type="number"
            value={currentMaxWeight}
            onChange={(e) => setCurrentMaxWeight(e.target.value)}
            placeholder="205"
            style={inputStyle}
          />
        </div>
      </div>

      {error && (
        <div style={errorStyle}>
          <p
            style={{
              color: "#dc2626",
              fontSize: "13px",
              margin: 0,
              fontFamily: "monospace",
            }}
          >
            {error}
          </p>
        </div>
      )}

      <div style={buttonContainerStyle}>
        <button
          onClick={calculateProgress}
          style={calculateButtonStyle}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#374151")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#000")}
        >
          CALCULATE
        </button>
        <button
          onClick={handleReset}
          style={resetButtonStyle}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#f3f4f6")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "white")}
        >
          RESET
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
