import React, { useEffect, useState } from "react";
import axios from "axios";

interface PoolData {
  protocol: string;
  tvl: number;
}

const LiquidityPools: React.FC = () => {
  const [pools, setPools] = useState<PoolData[]>([]);

  useEffect(() => {
    const fetchPools = async () => {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_DEFILLAMA_API}/protocols`,
      );
      const data = response.data.slice(0, 5);
      setPools(
        data.map((pool: any) => ({
          protocol: pool.name,
          tvl: pool.tvl,
        })),
      );
    };
    fetchPools().then(() => {});
  }, []);

  return (
    <div>
      <h2>Top Liquidity Pools</h2>
      <ul>
        {pools.map((pool, index) => (
          <li key={index}>
            {pool.protocol}: ${pool.tvl.toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LiquidityPools;
