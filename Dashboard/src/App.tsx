import React from "react";
import Dashboard from "./components/Dashboard";

const App: React.FC = () => {
  return (
    <div>
      <h1 style={{ textAlign: "center", marginTop: "20px" }}>
        Welcome to the Web3 Monitoring Dashboard
      </h1>
      <Dashboard />
    </div>
  );
};

export default App;
