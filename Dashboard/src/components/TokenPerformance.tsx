import React, { useEffect, useState } from "react";
import axios from "axios";

interface TokenData {
  name: string;
  price: number;
  marketCap: number;
  volume: number;
}

const TokenPerformance: React.FC = () => {
  const [tokenData, setTokenData] = useState<TokenData | null>(null);

  useEffect(() => {
    const fetchTokenData = async () => {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_COINGECKO_API}/coins/markets`,
        {
          params: {
            vs_currency: "usd",
            ids: "ethereum",
          },
        },
      );
      const data = response.data[0];
      setTokenData({
        name: data.name,
        price: data.current_price,
        marketCap: data.market_cap,
        volume: data.total_volume,
      });
    };
    fetchTokenData().then(() => {
      // Do nothing or handle response if needed
    });
  }, []);

  if (!tokenData) return <p>Loading...</p>;

  return (
    <div>
      <h2>{tokenData.name} Performance</h2>
      <p>Price: ${tokenData.price.toLocaleString()}</p>
      <p>Market Cap: ${tokenData.marketCap.toLocaleString()}</p>
      <p>24h Volume: ${tokenData.volume.toLocaleString()}</p>
    </div>
  );
};

export default TokenPerformance;
