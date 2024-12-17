import React, { useEffect, useState } from "react";
import styles from "../styles/Dashboard.module.css";
import axios from "axios";
import { Line } from "react-chartjs-2"; // Chart library
import "chart.js/auto"; // Required for Chart.js

const Dashboard: React.FC = () => {
  // State variables
  const [gasPrice, setGasPrice] = useState<string>("0");
  const [blockNumber, setBlockNumber] = useState<number>(0);
  const [topTokens, setTopTokens] = useState<any[]>([]);
  const [chartData, setChartData] = useState<any>(null);

  // Fetch data for gas prices, block number, and top tokens
  const fetchMetrics = async () => {
    try {
      const etherscanAPI = process.env.NEXT_PUBLIC_ETHERSCAN_API_KEY;

      const [blockData, gasData, tokenData] = await Promise.all([
        axios.get(
          `https://api.etherscan.io/api?module=proxy&action=eth_blockNumber&apikey=${etherscanAPI}`,
        ),
        axios.get(
          `https://api.etherscan.io/api?module=gastracker&action=gasoracle&apikey=${etherscanAPI}`,
        ),
        axios.get(
          "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=5&page=1",
        ),
      ]);

      setBlockNumber(parseInt(blockData.data.result, 16));
      setGasPrice(gasData.data.result.ProposeGasPrice);
      setTopTokens(tokenData.data);

      // Chart Data Example (Token Prices)
      const labels = tokenData.data.map((token: any) => token.name);
      const prices = tokenData.data.map((token: any) => token.current_price);
      setChartData({
        labels,
        datasets: [
          {
            label: "Top Token Prices (USD)",
            data: prices,
            backgroundColor: "rgba(0, 210, 255, 0.5)",
            borderColor: "rgba(0, 210, 255, 1)",
            borderWidth: 2,
          },
        ],
      });
    } catch (error) {
      console.error("Error fetching metrics:", error);
    }
  };

  useEffect(() => {
    fetchMetrics();
  }, []);

  return (
    <div className={styles.dashboardContainer}>
      <h1 className={styles.title}>📊 Smart Contract Developer Dashboard</h1>

      {/* Key Metrics */}
      <div className={styles.metricsContainer}>
        <div className={styles.metricCard}>
          <h2>⛽ Gas Price</h2>
          <p>{gasPrice} Gwei</p>
        </div>
        <div className={styles.metricCard}>
          <h2>⛓️ Latest Block</h2>
          <p>{blockNumber}</p>
        </div>
      </div>

      {/* Chart Section */}
      {chartData && (
        <div className={styles.chartContainer}>
          <h2>📈 Token Price Trends</h2>
          <Line data={chartData} />
        </div>
      )}

      {/* Top Tokens Table */}
      <div className={styles.tokenTable}>
        <h2>💎 Top Tokens</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Symbol</th>
              <th>Price (USD)</th>
              <th>Market Cap</th>
            </tr>
          </thead>
          <tbody>
            {topTokens.map((token) => (
              <tr key={token.id}>
                <td>{token.name}</td>
                <td>{token.symbol.toUpperCase()}</td>
                <td>${token.current_price.toLocaleString()}</td>
                <td>${token.market_cap.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
