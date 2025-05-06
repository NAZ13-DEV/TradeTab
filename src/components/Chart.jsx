import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Bar } from "react-chartjs-2";
// import Logo from "../img/logo_1.png";

// Local images
import balance from "../img/balance.png";
import drawdown from "../img/drawdown.png";
import gains from "../img/gains.png";
import profit from "../img/profit.png";

const tabImages = {
  Balance: balance,
  Drawdown: drawdown,
  Gains: gains,
  Profit: profit,
};

const Chart = () => {
  const [activeTab, setActiveTab] = useState("Balance");
  const [imageKey, setImageKey] = useState(0); // Force re-render on tab change
  const [isTraded, setIsTraded] = useState(true);
  const handleToggle = () => {
    setIsTraded((prev) => !prev);
  };

  useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);

  useEffect(() => {
    setImageKey((prev) => prev + 1); // change key to re-trigger animation
    AOS.refreshHard(); // Refresh AOS to allow re-animation
  }, [activeTab]);

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
          49, 
          50,// ← Only two under 50: 50 & 49
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
        font: {
          size: 14, // ✅ Y-axis label font size (e.g. "GBPUSD+")
          weight: "bold", // Optional
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
        font: {
          size: 14, // ✅ Y-axis label font size (e.g. "GBPUSD+")
          weight: "bold", // Optional
        },
        grid: {
          display: false,
        },
        categoryPercentage: 0.4,
        barPercentage: 0.9,
      },
    },
  };

  return (
    <div className="grid grid-cols-12 gap-4 px-4 md:px-0">
      <div className="col-span-12 md:col-span-8">
        <div className="w-full h-full min-h-[400px] rounded-2xl bg-gradient-to-t from-cyan-700 via-transparent to-transparent border border-cyan-800 hover:border-cyan-500 ease-in-out duration-300 flex flex-col p-4">
          <div className="grid items-center justify-between w-full grid-cols-12 text-white border-b border-b-darkblack-500">
            <div className="col-span-8">
              <p className="text-xl font-semibold text-white lg:text-xl xl:text-sm 2xl:text-xl dark:text-white">
                Dynamic Trader Chart
              </p>
              <div className="relative flex items-center w-full space-x-2">
                <div className="relative flex items-start justify-start h-full w-fit">
                  {Object.keys(tabImages).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`flex items-center justify-between w-full h-full py-1 mx-2 transition-all duration-300 rounded-lg cursor-pointer whitespace-nowrap ${
                        activeTab === tab
                          ? "text-green-400"
                          : "text-success-300 hover:text-success-200"
                      }`}
                    >
                      <span className="mx-2 text-xs xl:text-sm">{tab}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-col items-end justify-end col-span-4 mt-4 text-xs md:flex-row md:items-center md:space-x-4 md:mr-1">
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

          {/* Tab-based image display with re-triggered AOS */}
          <div className="h-full">
            <div
              key={imageKey}
              data-aos="fade-up"
              style={{
                display: "block",
                boxSizing: "border-box",
                height: "468px",
                width: "100%",
              }}
            >
              <img
                src={tabImages[activeTab]}
                alt={`${activeTab} chart`}
                className="object-cover w-full h-full rounded-xl"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="w-full col-span-12 md:col-span-4 px-4 py-4 duration-300 ease-in-out border bg-gradient-to-t from-cyan-700 via-transparent to-transparent border-cyan-800 hover:border-cyan-500 rounded-2xl">
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
          style={{ height: "450px" }}
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

export default Chart;
