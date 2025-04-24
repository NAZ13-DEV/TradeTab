import { Bar } from "react-chartjs-2";
import { useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const Performance = () => {
  const [isTraded, setIsTraded] = useState(true);
  const handleToggle = () => {
    setIsTraded((prev) => !prev);
  };

  const data = {
    labels: [
      "Jun 2024",
      "Jul 2024",
      "Aug 2024",
      "Sep 2024",
      "Oct 2024",
      "Nov 2024",
      "Dec 2024",
      "Jan 2025",
    ],
    datasets: [
      {
        label: "Performance",
        data: [14.32, 4.9, 6.27, 27.54, 24.97, 69.89, 18.25, 1.21],
        backgroundColor: "#12C918",
        borderRadius: 6,
        maxBarThickness: 25, // ✅ More responsive than fixed barThickness
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // ✅ Makes height effective
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (context) => `${context.parsed.y}%`,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 70,
        ticks: {
          color: "#fff",
          font: { size: 10 }, // ✅ Smaller font for mobile
        },
        grid: {
          color: "#151516",
        },
      },
      x: {
        ticks: {
          color: "#fff",
          font: { size: 10 }, // ✅ Smaller font for mobile
        },
      },
    },
  };

  const datas = {
    labels: [
      "NZDJPY+",
      "NZDCAD+",
      "CADJPY+",
      "XAUUSD+",
      "GBPAUD+",
      "AUDNZD+",
      "USDCHF+",
      "NZDUSD+",
      "EURAUD+",
      "EURNZD+",
      "GBPNZD+",
      "GBPCAD+",
      "GBPCHF+",
      "USDCAD+",
      "AUDUSD+",
      "AUDCAD+",
      "AUDCHF+",
      "NZDCHF+",
      "GBPUSD+",
      "EURCHF+",
      "USDJPY+",
      "EURJPY+",
      "EURUSD+",
      "EURCAD+",
      "AUDJPY+",
      "EURGBP+",
      "GBPJPY+",
      "CADCHF+",
      "CHFJPY+",
    ],
    datasets: [
      {
        label: "Trades",
        data: [
          70, 60, 45, 480, 90, 15, 110, 30, 5, 400, 150, 100, 450, 115, 130, 85,
          190, 20, 300, 470, 220, 1853, 180, 380, 160, 25, 1900, 310, 140,
        ],
        backgroundColor: "#107350",
        borderRadius: 4,
        barThickness: 14,
        borderSkipped: false,
      },
    ],
  };

  const optionss = {
    indexAxis: "y",
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (context) => `${context.parsed.x} trades`,
        },
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        max: 2000,
        ticks: {
          color: "#00f0ff",
        },
        grid: {
          color: "",
        },
      },
      y: {
        ticks: {
          color: "#ffffff",
          autoSkip: false,
        },
        grid: {
          display: false,
        },
        categoryPercentage: 0.8,
        barPercentage: 0.6,
      },
    },
  };

  const data2 = {
    labels: [
      "GBPUSD+",
      "NZDCHF+",
      "EURCHF+",
      "USDJPY+",
      "EURJPY+",
      "EURUSD+",
      "NZDJPY+",
      "NZDCAD+",
      "CADJPY+",
      "XAUUSD+",
      "GBPAUD+",
      "AUDNZD+",
      "USDCHF+",
      "NZDUSD+",
      "EURAUD+",
      "EURNZD+",
      "GBPNZD+",
      "GBPCAD+",
      "GBPCHF+",
      "USDCAD+",
      "AUDUSD+",
      "AUDCAD+",
      "AUDCHF+",
      "EURCAD+",
      "AUDJPY+",
      "EURGBP+",
      "GBPJPY+",
      "CADCHF+",
      "CHFJPY+",
    ],
    datasets: [
      {
        label: "Volume",
        data: [
          64,
          70,
          55,
          67,
          69,
          60,
          51,
          72,
          66,
          68,
          62,
          59,
          61,
          71,
          65,
          50,
          53,
          58,
          54,
          56,
          63,
          70,
          69,
          57,
          67,
          49, // ← Only two under 50: 50 & 49
          60,
          66,
        ],
        backgroundColor: "#D6A41B",
        borderRadius: 4,
        barThickness: 14,
        borderSkipped: false,
      },
    ],
  };
  const options2 = {
    indexAxis: "y",
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (context) => `${context.parsed.x}%`,
        },
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        max: 80,
        ticks: {
          color: "#D6A41B",
        },
        grid: {
          color: "",
        },
      },
      y: {
        ticks: {
          color: "#ffffff",
          autoSkip: false,
        },
        grid: {
          display: false,
        },
        categoryPercentage: 0.8,
        barPercentage: 0.6,
      },
    },
  };

  return (
    <div className="grid grid-cols-1 gap-4 px-4 my-10 md:0 lg:grid-cols-2 ">
      {/* Left: Monthly Performance */}
      <div className="w-full col-span-1 px-3 py-4 border rounded-2xl bg-gradient-to-t from-cyan-700 via-transparent to-transparent border-cyan-800 hover:border-cyan-500">
        {/* Header */}
        <div className="pb-2 mb-2 text-sm font-medium border-b border-darkblack-400 text-bgray-50">
          <h2 className="text-lg font-semibold text-white font-poppins sm:text-xl">
            Monthly Performance
          </h2>
        </div>

        {/* Chart */}
        <div className="relative h-[220px] sm:h-[300px] md:h-[400px] w-full">
          <Bar data={data} options={options} />
        </div>
      </div>

      {/* Right: Most Traded Assets */}
      <div className="w-full col-span-1 px-4 py-4 duration-300 ease-in-out border bg-gradient-to-t from-cyan-700 via-transparent to-transparent border-cyan-800 hover:border-cyan-500 rounded-2xl">
        <div className="flex items-center justify-between w-full text-white border-b border-b-darkblack-500">
          <h2 className="pt-2 pb-2 my-1 text-xl font-semibold text-white font-poppins">
            {isTraded ? "Most Traded Assets" : "Success Rate By Trading Pair"}
          </h2>
          <div className="flex items-center justify-between h-10 px-4 space-x-2 shadow-xl cursor-pointer rounded-xl hover:bg-slate-800">
            <button
              onClick={handleToggle}
              className="flex items-center justify-between"
            >
              <span className="capitalize">
                {isTraded ? "Most Trade" : "Most Succesful"}
              </span>
              <svg
                className={`w-4 h-4 transition-transform duration-300 ${
                  isTraded ? "rotate-0" : "rotate-180"
                }`}
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M7.41 8.59 12 13.17l4.59-4.58L18 10l-6 6-6-6z" />
              </svg>
            </button>
          </div>
        </div>

        {/* 🔽 Scrollable Chart Container with custom scrollbar */}
        <div
          className="h-64 pr-2 overflow-y-scroll scrollbar-thin scrollbar-thumb-cyan-500 custom-scrollbar"
          style={{ height: "300px" }}
        >
          <div>
            {isTraded ? (
              <Bar
                data={datas}
                options={optionss}
                height={650}
                width={650}
                className="text-sm leading-6 font-outfit"
              />
            ) : (
              <Bar
                data={data2}
                options={options2}
                height={650}
                width={650}
                className="p-10 text-sm leading-6 font-outfit"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Performance;
