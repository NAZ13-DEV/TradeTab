import { useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend);

const TradingDashboard = () => {
  const [selectedChart, setSelectedChart] = useState("Balance");

  const chartData = {
    Balance: {
      labels: ["Jan", "Feb", "Mar", "Apr", "May"],
      datasets: [
        {
          label: "Balance Growth",
          data: [1000, 1500, 1800, 2200, 2600],
          borderColor: "lime",
          backgroundColor: "rgba(0,255,0,0.3)",
          fill: true,
        },
      ],
    },
    Drawdown: {
      labels: ["Jan", "Feb", "Mar", "Apr", "May"],
      datasets: [
        {
          label: "Drawdown %",
          data: [2, 4, 3, 6, 2],
          borderColor: "crimson",
          backgroundColor: "rgba(220,20,60,0.3)",
          fill: true,
        },
      ],
    },
    Gains: {
      labels: ["Jan", "Feb", "Mar", "Apr", "May"],
      datasets: [
        {
          label: "Monthly Gains %",
          data: [5, 8, 6, 10, 7],
          borderColor: "teal",
          backgroundColor: "rgba(0,128,128,0.3)",
          fill: true,
        },
      ],
    },
    Profit: {
      labels: ["Jan", "Feb", "Mar", "Apr", "May"],
      datasets: [
        {
          label: "Profit $",
          data: [200, 400, 600, 800, 1000],
          borderColor: "gold",
          backgroundColor: "rgba(255,215,0,0.3)",
          fill: true,
        },
      ],
    },
  };

  return (
    <div className="grid grid-cols-12 gap-4 mb-6">
      {/* Left Side - Trading Stats */}
      <div className="col-span-12 md:col-span-4 lg:col-span-3">
        <div className="flex flex-col h-full px-4 py-4 duration-300 ease-in-out border rounded-2xl bg-gradient-to-t from-cyan-700 via-transparent to-transparent border-cyan-800 hover:border-cyan-500">
          <p className="text-xl font-semibold text-white whitespace-nowrap">Trading Stats</p>
          <div className="flex-1 overflow-y-auto pr-2 md:pr-3 max-h-[65vh] scrollbar-thin scrollbar-thumb-teal-500 scrollbar-track-transparent">
            <div className="flex flex-col gap-2 mt-4">
              {[
                { label: "Gain", value: "411.15%" },
                { label: "Abs.Gain", value: "182.50%" },
                { label: "Daily", value: "0.81%" },
                { label: "Monthly", value: "27.70%" },
                { label: "Deposits", value: "150,900.00 USD" },
                { label: "Withdrawals", value: "-250,000.00 USD" },
                { label: "Average Win", value: "113.19 USD" },
                { label: "Average Loss", value: "-80.79 USD" },
                { label: "Trades", value: "3,207" },
                { label: "Total Winning Trades", value: "4,523" },
                { label: "Total Losing Trades", value: "2,928" },
                { label: "Lots", value: "3,403.35" },
              ].map((item, index) => (
                <div key={index} className="flex w-full">
                  <div className="relative flex items-center justify-between w-full px-2 py-3 text-white border border-transparent rounded-lg hover:bg-darkblack-700 hover:border-success-300">
                    <span className="text-base font-bold text-emerald-600 whitespace-nowrap">
                      {item.label}
                    </span>
                    <span className="text-xs font-medium text-white md:text-sm whitespace-nowrap">
                      {item.value}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Chart Area */}
      <div className="col-span-12 md:col-span-8 lg:col-span-9">
        <div className="flex flex-col p-4 duration-300 ease-in-out border rounded-2xl min-h-[400px] h-full bg-gradient-to-t from-cyan-700 via-transparent to-transparent border-cyan-800 hover:border-cyan-500">
          {/* Chart Header */}
          <div className="grid items-center grid-cols-12 text-white border-b border-b-darkblack-500">
            <div className="col-span-12 md:col-span-8">
              <p className="text-xl font-semibold text-white dark:text-white">
                Dynamic Trader Chart
              </p>
              <div className="flex flex-wrap items-center mt-3">
                {["Balance", "Drawdown", "Gains", "Profit"].map((label) => (
                  <button
                    key={label}
                    onClick={() => setSelectedChart(label)}
                    className={`py-1 px-3 mx-1 my-1 rounded-lg cursor-pointer transition-all text-xs xl:text-sm ${
                      selectedChart === label
                        ? "text-green-400"
                        : "text-success-300 hover:text-success-200"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Legends */}
            <div className="flex flex-col items-end justify-end col-span-12 mt-4 text-xs md:flex-row md:col-span-4 md:mt-0 md:space-x-4">
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-[lime] rounded-full"></span>
                <span>Deposit</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-[crimson] rounded-full"></span>
                <span>Withdrawal</span>
              </div>
            </div>
          </div>

          {/* Chart Container */}
          <div className="flex-1 w-full p-2">
            <div className="relative w-full h-[280px] sm:h-[360px] md:h-[400px]">
              <Line
                data={chartData[selectedChart]}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  animation: { duration: 800 },
                  plugins: {
                    legend: { labels: { color: "white" } },
                  },
                  scales: {
                    x: { ticks: { color: "white" } },
                    y: { ticks: { color: "white" } },
                  },
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TradingDashboard;
