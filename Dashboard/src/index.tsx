import React from "react";
import TokenPerformance from "./components/TokenPerformance.tsx";
import LiquidityPools from "./components/LiquidityPools.tsx";

const Dashboard: React.FC = () => {
  return (
    <div>
      <h1>Real-Time Blockchain Dashboard</h1>
      <TokenPerformance />
      <LiquidityPools />
    </div>
  );
};

export default Dashboard;
