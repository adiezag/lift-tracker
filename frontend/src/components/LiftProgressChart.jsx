// import React, { useState, useEffect } from "react";
// import LiftService from "../services/LiftService";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
// } from "recharts";

// export default function LiftProgressChart({ refreshTrigger }) {
//   const [lifts, setLifts] = useState([]);
//   const [selectedLift, setSelectedLift] = useState("squat");
//   const [dateRange, setDateRange] = useState("all");
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     fetchLifts();
//   }, [refreshTrigger, selectedLift, dateRange]);

//   //   const fetchLifts = async () => {
//   //     try {
//   //       setLoading(true);
//   //       // Replace with: const data = await LiftService.getLifts();

//   //       // Mock data
//   //       const allData = [
//   //         {
//   //           id: 1,
//   //           lift_type: "squat",
//   //           weight: 225,
//   //           reps: 5,
//   //           date: "2024-10-01",
//   //           estimated_1rm: 253.13,
//   //         },
//   //         {
//   //           id: 2,
//   //           lift_type: "squat",
//   //           weight: 235,
//   //           reps: 5,
//   //           date: "2024-11-01",
//   //           estimated_1rm: 264.58,
//   //         },
//   //         {
//   //           id: 3,
//   //           lift_type: "squat",
//   //           weight: 245,
//   //           reps: 5,
//   //           date: "2024-12-01",
//   //           estimated_1rm: 276.04,
//   //         },
//   //         {
//   //           id: 4,
//   //           lift_type: "bench",
//   //           weight: 185,
//   //           reps: 5,
//   //           date: "2024-10-15",
//   //           estimated_1rm: 208.33,
//   //         },
//   //         {
//   //           id: 5,
//   //           lift_type: "bench",
//   //           weight: 195,
//   //           reps: 5,
//   //           date: "2024-11-15",
//   //           estimated_1rm: 219.79,
//   //         },
//   //         {
//   //           id: 6,
//   //           lift_type: "bench",
//   //           weight: 205,
//   //           reps: 5,
//   //           date: "2024-12-15",
//   //           estimated_1rm: 231.25,
//   //         },
//   //       ];

//   //       // Filter by lift type
//   //       let filtered = allData.filter((lift) => lift.lift_type === selectedLift);

//   //       // Filter by date range
//   //       if (dateRange !== "all") {
//   //         const today = new Date();
//   //         const days = dateRange === "30" ? 30 : dateRange === "90" ? 90 : 365;
//   //         const cutoffDate = new Date(today.setDate(today.getDate() - days));

//   //         filtered = filtered.filter((lift) => new Date(lift.date) >= cutoffDate);
//   //       }

//   //       // Sort by date
//   //       filtered.sort((a, b) => new Date(a.date) - new Date(b.date));

//   //       setLifts(filtered);
//   //       setLoading(false);
//   //     } catch (err) {
//   //       setError("Failed to load lift data");
//   //       setLoading(false);
//   //       console.error(err);
//   //     }
//   //   };

//   const fetchLifts = async () => {
//     try {
//       setLoading(true);
//       const allData = await LiftService.getLifts();

//       // Filter by lift type
//       let filtered = allData.filter((lift) => lift.lift_type === selectedLift);

//       // Filter by date range
//       if (dateRange !== "all") {
//         const today = new Date();
//         const days = dateRange === "30" ? 30 : dateRange === "90" ? 90 : 365;
//         const cutoffDate = new Date(today.setDate(today.getDate() - days));

//         filtered = filtered.filter((lift) => new Date(lift.date) >= cutoffDate);
//       }

//       // Sort by date
//       filtered.sort((a, b) => new Date(a.date) - new Date(b.date));

//       setLifts(filtered);
//       setLoading(false);
//     } catch (err) {
//       setError("Failed to load lift data");
//       setLoading(false);
//       console.error(err);
//     }
//   };
//   const getLiftDisplayName = (liftType) => {
//     const names = {
//       squat: "Squat",
//       bench: "Bench Press",
//       deadlift: "Deadlift",
//       overhead_press: "Overhead Press",
//     };
//     return names[liftType] || liftType;
//   };

//   const containerStyle = {
//     backgroundColor: "#1e293b",
//     borderRadius: "8px",
//     padding: "24px",
//     maxWidth: "1000px",
//     margin: "0 auto",
//   };

//   const headingStyle = {
//     fontSize: "24px",
//     fontWeight: "bold",
//     marginBottom: "24px",
//     color: "white",
//   };

//   const filterSectionStyle = {
//     marginBottom: "24px",
//   };

//   const filterLabelStyle = {
//     fontSize: "14px",
//     fontWeight: "600",
//     color: "white",
//     marginBottom: "8px",
//     display: "block",
//   };

//   const buttonGroupStyle = {
//     display: "flex",
//     gap: "8px",
//     flexWrap: "wrap",
//     marginBottom: "16px",
//   };

//   const filterButtonStyle = (isActive) => ({
//     padding: "8px 16px",
//     borderRadius: "4px",
//     border: "none",
//     cursor: "pointer",
//     fontSize: "14px",
//     fontWeight: "600",
//     backgroundColor: isActive ? "#2563eb" : "#334155",
//     color: isActive ? "white" : "#cbd5e1",
//     transition: "background-color 0.2s",
//   });

//   const chartContainerStyle = {
//     backgroundColor: "#334155",
//     borderRadius: "8px",
//     padding: "24px",
//     marginTop: "24px",
//   };

//   const emptyStateStyle = {
//     textAlign: "center",
//     padding: "48px",
//     color: "#94a3b8",
//   };

//   const errorStyle = {
//     backgroundColor: "rgba(127, 29, 29, 0.5)",
//     border: "1px solid #dc2626",
//     borderRadius: "4px",
//     padding: "12px",
//     marginBottom: "16px",
//     color: "#fca5a5",
//   };

//   if (loading) {
//     return (
//       <div style={containerStyle}>
//         <p style={{ color: "white", textAlign: "center" }}>Loading...</p>
//       </div>
//     );
//   }

//   return (
//     <div style={containerStyle}>
//       <h2 style={headingStyle}>Progress Tracker</h2>

//       {error && (
//         <div style={errorStyle}>
//           <p style={{ margin: 0 }}>{error}</p>
//         </div>
//       )}

//       {/* Lift Type Filter */}
//       <div style={filterSectionStyle}>
//         <label style={filterLabelStyle}>Select Lift</label>
//         <div style={buttonGroupStyle}>
//           {["squat", "bench", "deadlift", "overhead_press"].map((lift) => (
//             <button
//               key={lift}
//               onClick={() => setSelectedLift(lift)}
//               style={filterButtonStyle(selectedLift === lift)}
//               onMouseOver={(e) => {
//                 if (selectedLift !== lift) {
//                   e.target.style.backgroundColor = "#475569";
//                 }
//               }}
//               onMouseOut={(e) => {
//                 if (selectedLift !== lift) {
//                   e.target.style.backgroundColor = "#334155";
//                 }
//               }}
//             >
//               {getLiftDisplayName(lift)}
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* Date Range Filter */}
//       <div style={filterSectionStyle}>
//         <label style={filterLabelStyle}>Time Range</label>
//         <div style={buttonGroupStyle}>
//           {[
//             { value: "30", label: "Last 30 Days" },
//             { value: "90", label: "Last 90 Days" },
//             { value: "365", label: "Last Year" },
//             { value: "all", label: "All Time" },
//           ].map((range) => (
//             <button
//               key={range.value}
//               onClick={() => setDateRange(range.value)}
//               style={filterButtonStyle(dateRange === range.value)}
//               onMouseOver={(e) => {
//                 if (dateRange !== range.value) {
//                   e.target.style.backgroundColor = "#475569";
//                 }
//               }}
//               onMouseOut={(e) => {
//                 if (dateRange !== range.value) {
//                   e.target.style.backgroundColor = "#334155";
//                 }
//               }}
//             >
//               {range.label}
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* Chart */}
//       {lifts.length === 0 ? (
//         <div style={emptyStateStyle}>
//           <p>
//             No data for {getLiftDisplayName(selectedLift)} in this time range.
//           </p>
//           <p style={{ fontSize: "14px", marginTop: "8px" }}>
//             Log some lifts to see your progress!
//           </p>
//         </div>
//       ) : (
//         <div style={chartContainerStyle}>
//           <h3
//             style={{ color: "white", marginBottom: "16px", fontSize: "18px" }}
//           >
//             {getLiftDisplayName(selectedLift)} - Estimated 1RM Progress
//           </h3>
//           <ResponsiveContainer width="100%" height={300}>
//             <LineChart data={lifts}>
//               <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
//               <XAxis
//                 dataKey="date"
//                 stroke="#94a3b8"
//                 tick={{ fill: "#94a3b8" }}
//               />
//               <YAxis
//                 stroke="#94a3b8"
//                 tick={{ fill: "#94a3b8" }}
//                 label={{
//                   value: "1RM (lbs)",
//                   angle: -90,
//                   position: "insideLeft",
//                   fill: "#94a3b8",
//                 }}
//               />
//               <Tooltip
//                 contentStyle={{
//                   backgroundColor: "#1e293b",
//                   border: "1px solid #475569",
//                   borderRadius: "4px",
//                   color: "white",
//                 }}
//               />
//               <Line
//                 type="monotone"
//                 dataKey="estimated_1rm"
//                 stroke="#2563eb"
//                 strokeWidth={3}
//                 dot={{ fill: "#2563eb", r: 5 }}
//                 activeDot={{ r: 7 }}
//               />
//             </LineChart>
//           </ResponsiveContainer>
//         </div>
//       )}
//     </div>
//   );
// }

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
