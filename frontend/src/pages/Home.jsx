// import React, { useState } from "react";
// import ProgressCalculator from "../components/LiftProgressCalculator";
// import GetBarWeight from "../components/GetBarWeight";
// import LiftLogger from "../components/LiftLogger";
// import LiftProgressCalculator from "../components/LiftProgressCalculator";
// import LiftHistory from "../components/LiftHistory";
// import LiftProgressChart from "../components/LiftProgressChart";
// import { useNavigate } from "react-router-dom";

// function Home() {
//   const navigate = useNavigate()
//   const [activeTab, setActiveTab] = useState("liftLog");

//   const handleLogout = () => {
//     localStorage.clear();
//     navigate("/login");
//   };

//   return (
//     <div>
//       {/* Header with Logout */}
//       <div
//         style={{
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "center",
//           marginBottom: "32px",
//         }}
//       >
//         <div>
//           <h1
//             style={{
//               fontSize: "36px",
//               fontWeight: "bold",
//               marginBottom: "8px",
//               color: "white",
//             }}
//           >
//             Lift Tracker
//           </h1>
//           <p style={{ color: "#94a3b8" }}>Track your strength progress</p>
//         </div>
//         <button
//           onClick={handleLogout}
//           style={{
//             backgroundColor: "#dc2626",
//             color: "white",
//             padding: "8px 16px",
//             borderRadius: "4px",
//             border: "none",
//             cursor: "pointer",
//             fontWeight: "600",
//           }}
//         >
//           Logout
//         </button>
//       </div>

//       <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white p-4 md:p-8">
//         <div className="max-w-4xl mx-auto">
//           {/* Header */}
//           <div className="mb-8">
//             {/* <h1 className="text-4xl font-bold mb-2"></h1> */}
//             <p className="text-slate-400">
//               {/* Calculate plates • Track progress • Celebrate wins */}
//             </p>
//           </div>

//           {/* Navigation Tabs */}
//           <div className="flex gap-2 mb-8 flex-wrap">
//             <button
//               onClick={() => setActiveTab("liftLog")}
//               className={`px-6 py-2 rounded font-semibold transition ${
//                 activeTab === "liftLog"
//                   ? "bg-blue-600 text-white"
//                   : "bg-slate-700 text-slate-300 hover:bg-slate-600"
//               }`}
//             >
//               Log lift
//             </button>
//             <button
//               onClick={() => setActiveTab("liftHistory")}
//               className={`px-6 py-2 rounded font-semibold transition ${
//                 activeTab === "liftHistory"
//                   ? "bg-blue-600 text-white"
//                   : "bg-slate-700 text-slate-300 hover:bg-slate-600"
//               }`}
//             >
//               History
//             </button>
//             <button
//               onClick={() => setActiveTab("liftProgressChart")}
//               className={`px-6 py-2 rounded font-semibold transition ${
//                 activeTab === "liftProgressChart"
//                   ? "bg-blue-600 text-white"
//                   : "bg-slate-700 text-slate-300 hover:bg-slate-600"
//               }`}
//             >
//               Progress Chart
//             </button>
//             <button
//               onClick={() => setActiveTab("barWeight")}
//               className={`px-6 py-2 rounded font-semibold transition ${
//                 activeTab === "barWeight"
//                   ? "bg-blue-600 text-white"
//                   : "bg-slate-700 text-slate-300 hover:bg-slate-600"
//               }`}
//             >
//               Bar Calculator
//             </button>
//             <button
//               onClick={() => setActiveTab("progress")}
//               className={`px-6 py-2 rounded font-semibold transition ${
//                 activeTab === "progress"
//                   ? "bg-blue-600 text-white"
//                   : "bg-slate-700 text-slate-300 hover:bg-slate-600"
//               }`}
//             >
//               Progress %
//             </button>
//           </div>

//           {/* Component Render */}
//           <div className="flex justify-center">
//             {activeTab === "progress" && <LiftProgressCalculator />}
//             {activeTab === "barWeight" && <GetBarWeight />}
//             {activeTab === "liftLog" && <LiftLogger />}
//             {activeTab === "liftHistory" && <LiftHistory />}
//             {activeTab === "liftProgressChart" && <LiftProgressChart />}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Home;

import React, { useState } from "react";
import ProgressCalculator from "../components/LiftProgressCalculator";
import GetBarWeight from "../components/GetBarWeight";
import LiftLogger from "../components/LiftLogger";
import LiftHistory from "../components/LiftHistory";
import LiftProgressChart from "../components/LiftProgressChart";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("liftLog");

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  /* ───────────── Styles ───────────── */
  const headerStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "32px",
  };

  const titleStyle = {
    fontSize: "36px",
    fontWeight: "bold",
    marginBottom: "8px",
    color: "#000",
    fontFamily: "monospace",
  };

  const subtitleStyle = {
    color: "#6b7280",
    fontFamily: "monospace",
  };

  const logoutButtonStyle = {
    backgroundColor: "white",
    color: "black",
    padding: "8px 16px",
    borderRadius: "4px",
    border: "none",
    cursor: "pointer",
    fontWeight: "600",
    fontFamily: "monospace",
  };

  const tabsContainerStyle = {
    display: "flex",
    gap: "8px",
    flexWrap: "wrap",
    marginBottom: "32px",
  };

  const tabButtonStyle = (isActive) => ({
    padding: "8px 16px",
    borderRadius: "4px",
    border: "none",
    cursor: "pointer",
    fontWeight: "600",
    fontFamily: "monospace",
    backgroundColor: isActive ? "#000" : "#f9fafb",
    color: isActive ? "white" : "#000",
    textTransform: "uppercase",
    transition: "background-color 0.2s",
  });

  const tabContentStyle = {
    display: "flex",
    justifyContent: "center",
    width: "100%",
  };

  const pageContainerStyle = {
    minHeight: "100vh",
    padding: "16px 32px",
    background: "linear-gradient(to bottom right, #f1f5f9, #e2e8f0)",
    fontFamily: "monospace",
  };

  return (
    <div style={pageContainerStyle}>
      {/* Header with Logout */}
      <div style={headerStyle}>
        <div>
          <h1 style={titleStyle}>Lift Tracker</h1>
          <p style={subtitleStyle}>Track your strength progress</p>
        </div>
        <button onClick={handleLogout} style={logoutButtonStyle}>
          LOGOUT
        </button>
      </div>

      {/* Navigation Tabs */}
      <div style={tabsContainerStyle}>
        <button
          onClick={() => setActiveTab("liftLog")}
          style={tabButtonStyle(activeTab === "liftLog")}
        >
          Log Lift
        </button>
        <button
          onClick={() => setActiveTab("liftHistory")}
          style={tabButtonStyle(activeTab === "liftHistory")}
        >
          History
        </button>
        <button
          onClick={() => setActiveTab("liftProgressChart")}
          style={tabButtonStyle(activeTab === "liftProgressChart")}
        >
          Progress Chart
        </button>
        <button
          onClick={() => setActiveTab("barWeight")}
          style={tabButtonStyle(activeTab === "barWeight")}
        >
          Bar Calculator
        </button>
        <button
          onClick={() => setActiveTab("progress")}
          style={tabButtonStyle(activeTab === "progress")}
        >
          Progress %
        </button>
      </div>

      {/* Active Tab Content */}
      <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
        <div style={{ width: "100%", maxWidth: "900px" }}>
          {activeTab === "liftLog" && <LiftLogger />}
          {activeTab === "liftHistory" && <LiftHistory />}
          {activeTab === "liftProgressChart" && <LiftProgressChart />}
          {activeTab === "barWeight" && <GetBarWeight />}
          {activeTab === "progress" && <ProgressCalculator />}
        </div>
      </div>
    </div>
  );
}

export default Home;
