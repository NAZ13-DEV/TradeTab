import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Logo from "../img/logo_1.png";

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

// const calendarData = [
//   { day: 1, percentage: "-0.04%", trades: 2, isLogoDay: false },
//   { day: 2, percentage: "0.00%", trades: 5, isLogoDay: false },
//   { day: 3, percentage: "0.01%", trades: 2, isLogoDay: false },
//   { day: 4, percentage: "-0.02%", trades: 2, isLogoDay: false },
//   { day: 5, percentage: "0.05%", trades: 5, isLogoDay: false },
//   { day: 6, percentage: true, trades: true, isLogoDay: true },
//   { day: 7, percentage: true, trades: true, isLogoDay: true },
//   { day: 8, percentage: "0.01%", trades: 3, isLogoDay: false },
//   { day: 9, percentage: "0.06%", trades: 1, isLogoDay: false },
//   { day: 10, percentage: "-0.04%", trades: 1, isLogoDay: false },
//   { day: 11, percentage: "0.03%", trades: 2, isLogoDay: false },
//   { day: 12, percentage: "-0.02%", trades: 2, isLogoDay: false },
//   { day: 13, percentage: true, trades: true, isLogoDay: true },
//   { day: 14, percentage: true, trades: true, isLogoDay: true },
//   { day: 15, percentage: "-0.05%", trades: 4, isLogoDay: false },
//   { day: 16, percentage: "0.00%", trades: 1, isLogoDay: false },
//   { day: 17, percentage: "-0.02%", trades: 1, isLogoDay: false },
//   { day: 18, percentage: "-0.05%", trades: 4, isLogoDay: false },
//   { day: 19, percentage: "0.05%", trades: 4, isLogoDay: false },
//   { day: 20, percentage: null, trades: null, isLogoDay: true },
//   { day: 21, percentage: null, trades: null, isLogoDay: true },
//   { day: 22, percentage: "0.06%", trades: 3, isLogoDay: false },
//   { day: 23, percentage: "0.02%", trades: 3, isLogoDay: false },
//   { day: 24, percentage: "0.01%", trades: 3, isLogoDay: false },
//   { day: 25, percentage: "0.04%", trades: 3, isLogoDay: false },
//   { day: 26, percentage: "-0.04%", trades: 3, isLogoDay: false },
//   { day: 27, percentage: null, trades: null, isLogoDay: true },
//   { day: 28, percentage: null, trades: null, isLogoDay: true },
//   { day: 29, percentage: "0.04%", trades: 2, isLogoDay: false },
//   { day: 30, percentage: "-0.01%", trades: 4, isLogoDay: false },
//   { day: 31, percentage: "0.04%", trades: 3, isLogoDay: false },
// ];

// const tabs = ["balance","drawdown","gains","profit"];

const Chart = () => {
  const [activeTab, setActiveTab] = useState("Balance");
  const [imageKey, setImageKey] = useState(0); // Force re-render on tab change

  useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);

  useEffect(() => {
    setImageKey((prev) => prev + 1); // change key to re-trigger animation
    AOS.refreshHard(); // Refresh AOS to allow re-animation
  }, [activeTab]);

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

      {activeTab === "Balance" && (
        <div className="col-span-12 md:col-span-4">
          <div className="flex flex-col justify-between h-full transition duration-300 border md:py-4 md:px-2 rounded-2xl bg-gradient-to-t from-cyan-700 via-transparent to-transparent border-cyan-800 hover:border-cyan-500">
            <div className="flex flex-col">
              <div className="grid grid-cols-7 mb-2 text-center">
                <span className="text-[0.8rem] text-white">Mon</span>
                <span className="text-[0.8rem] text-white">Tue</span>
                <span className="text-[0.8rem] text-white">Wed</span>
                <span className="text-[0.8rem] text-white">Thu</span>
                <span className="text-[0.8rem] text-white">Fri</span>
                <span className="text-[0.8rem] text-red-500">Sat</span>
                <span className="text-[0.8rem] text-red-500">Sun</span>
              </div>
              <div className="grid grid-cols-7 gap-1 rounded-lg">
                <div className="relative flex items-center justify-center w-full h-24 border-2 border-green-400 rounded-lg bg-gradient-to-r from-green-400 to-green-500 ">
                  <p className='absolute top-0 left-0 px-1" text-black font-bold  text-[0.7rem]'>
                    1
                  </p>
                  <div className="items-end text-sm text-black md:whitespace-nowrap ">
                    <p className="text-sm font-bold text-center text-black">
                      0.03 %
                    </p>
                    <p className="text-[0.6rem] md:text-[0.75rem] text-center whitespace-nowrap text-black">
                      <strong className="pr-1">2</strong>trades
                    </p>
                  </div>
                </div>
                <div className="relative flex items-center justify-center w-full h-24 border-2 border-green-400 rounded-lg bg-gradient-to-r from-green-400 to-green-500 ">
                  <p className='absolute top-0 left-0 px-1" text-black font-bold  text-[0.7rem]'>
                    2
                  </p>
                  <div className="items-end text-sm text-black md:whitespace-nowrap ">
                    <p className="text-sm font-bold text-center text-black">
                      0.01 %
                    </p>
                    <p className="text-[0.6rem] md:text-[0.75rem] text-center whitespace-nowrap text-black">
                      <strong className="pr-1">4</strong>trades
                    </p>
                  </div>
                </div>
                <div className="relative flex items-center justify-center w-full h-24 border-2 border-green-400 rounded-lg bg-gradient-to-r from-green-400 to-green-500 ">
                  <p className='absolute top-0 left-0 px-1" text-black font-bold  text-[0.7rem]'>
                    3
                  </p>
                  <div className="items-end text-sm text-black md:whitespace-nowrap ">
                    <p className="text-sm font-bold text-center text-black">
                      0.06 %
                    </p>
                    <p className="text-[0.6rem] md:text-[0.75rem] text-center whitespace-nowrap text-black">
                      <strong className="pr-1">5</strong>trades
                    </p>
                  </div>
                </div>
                <div className="relative flex items-center justify-center w-full h-24 border-2 border-green-400 rounded-lg bg-gradient-to-r from-green-400 to-green-500 ">
                  <p className='absolute top-0 left-0 px-1" text-black font-bold  text-[0.7rem]'>
                    4
                  </p>
                  <div className="items-end text-sm text-black md:whitespace-nowrap ">
                    <p className="text-sm font-bold text-center text-black">
                      0.04 %
                    </p>
                    <p className="text-[0.6rem] md:text-[0.75rem] text-center whitespace-nowrap text-black">
                      <strong className="pr-1">4</strong>trades
                    </p>
                  </div>
                </div>
                <div className="relative flex items-center justify-center w-full h-24 border-2 border-green-400 rounded-lg bg-gradient-to-r from-green-400 to-green-500 ">
                  <p className='absolute top-0 left-0 px-1" text-black font-bold  text-[0.7rem]'>
                    5
                  </p>
                  <div className="items-end text-sm text-black md:whitespace-nowrap ">
                    <p className="text-sm font-bold text-center text-black">
                      0.05 %
                    </p>
                    <p className="text-[0.6rem] md:text-[0.75rem] text-center whitespace-nowrap text-black">
                      <strong className="pr-1">5</strong>trades
                    </p>
                  </div>
                </div>
                <div className="relative flex items-center justify-center w-full h-24 border rounded-lg bg-slate-900 border-darkblack-700 ">
                  <p className='absolute top-0 left-0 px-1" text-white font-bold  text-[0.7rem]'>
                    6
                  </p>
                  <div className="items-end text-sm text-black md:whitespace-nowrap ">
                    <div className="w-full">
                      <img className="w-6 opacity-90" src={Logo} alt="logo" />
                    </div>
                  </div>
                </div>

                <div className="relative flex items-center justify-center w-full h-24 border rounded-lg bg-slate-900 border-darkblack-700 ">
                  <p className='absolute top-0 left-0 px-1" text-white font-bold  text-[0.7rem]'>
                    7
                  </p>
                  <div className="items-end text-sm text-black md:whitespace-nowrap ">
                    <div className="w-full">
                      <img className="w-6 opacity-90" src={Logo} alt="logo" />
                    </div>
                  </div>
                </div>
                <div className="relative flex items-center justify-center w-full h-24 border-2 border-green-400 rounded-lg bg-gradient-to-r from-green-400 to-green-500 ">
                  <p className='absolute top-0 left-0 px-1" text-black font-bold  text-[0.7rem]'>
                    8
                  </p>
                  <div className="items-end text-sm text-black md:whitespace-nowrap ">
                    <p className="text-sm font-bold text-center text-black">
                      0.02 %
                    </p>
                    <p className="text-[0.6rem] md:text-[0.75rem] text-center whitespace-nowrap text-black">
                      <strong className="pr-1">2</strong>trades
                    </p>
                  </div>
                </div>
                <div className="relative flex items-center justify-center w-full h-24 border-2 border-green-400 rounded-lg bg-gradient-to-r from-green-400 to-green-500 ">
                  <p className='absolute top-0 left-0 px-1" text-black font-bold  text-[0.7rem]'>
                    9
                  </p>
                  <div className="items-end text-sm text-black md:whitespace-nowrap ">
                    <p className="text-sm font-bold text-center text-black">
                      0.05 %
                    </p>
                    <p className="text-[0.6rem] md:text-[0.75rem] text-center whitespace-nowrap text-black">
                      <strong className="pr-1">3</strong>trades
                    </p>
                  </div>
                </div>
                <div className="relative flex items-center justify-center w-full h-24 border-2 border-red-400 rounded-lg bg-gradient-to-r from-red-300 to-red-400 ">
                  <p className='absolute top-0 left-0 px-1" text-black font-bold  text-[0.7rem]'>
                    10
                  </p>
                  <div className="items-end text-sm text-black md:whitespace-nowrap ">
                    <p className="text-sm font-bold text-center text-black">
                      -0.05 %
                    </p>
                    <p className="text-[0.6rem] md:text-[0.75rem] text-center whitespace-nowrap text-black">
                      <strong className="pr-1">1</strong>trade
                    </p>
                  </div>
                </div>
                <div className="relative flex items-center justify-center w-full h-24 border-2 border-green-400 rounded-lg bg-gradient-to-r from-green-400 to-green-500 ">
                  <p className='absolute top-0 left-0 px-1" text-black font-bold  text-[0.7rem]'>
                    11
                  </p>
                  <div className="items-end text-sm text-black md:whitespace-nowrap ">
                    <p className="text-sm font-bold text-center text-black">
                      0.01 %
                    </p>
                    <p className="text-[0.6rem] md:text-[0.75rem] text-center whitespace-nowrap text-black">
                      <strong className="pr-1">5</strong>trades
                    </p>
                  </div>
                </div>
                <div className="relative flex items-center justify-center w-full h-24 border-2 border-green-400 rounded-lg bg-gradient-to-r from-green-400 to-green-500 ">
                  <p className='absolute top-0 left-0 px-1" text-black font-bold  text-[0.7rem]'>
                    12
                  </p>
                  <div className="items-end text-sm text-black md:whitespace-nowrap ">
                    <p className="text-sm font-bold text-center text-black">
                      0.04 %
                    </p>
                    <p className="text-[0.6rem] md:text-[0.75rem] text-center whitespace-nowrap text-black">
                      <strong className="pr-1">3</strong>trades
                    </p>
                  </div>
                </div>
                <div className="relative flex items-center justify-center w-full h-24 border rounded-lg bg-slate-900 border-darkblack-700 ">
                  <p className='absolute top-0 left-0 px-1" text-white font-bold  text-[0.7rem]'>
                    13
                  </p>
                  <div className="items-end text-sm text-black md:whitespace-nowrap ">
                    <div className="w-full">
                      <img className="w-6 opacity-90" src={Logo} alt="logo" />
                    </div>
                  </div>
                </div>
                <div className="relative flex items-center justify-center w-full h-24 border rounded-lg bg-slate-900 border-darkblack-700 ">
                  <p className='absolute top-0 left-0 px-1" text-white font-bold  text-[0.7rem]'>
                    14
                  </p>
                  <div className="items-end text-sm text-black md:whitespace-nowrap ">
                    <div className="w-full">
                      <img className="w-6 opacity-90" src={Logo} alt="logo" />
                    </div>
                  </div>
                </div>
                <div className="relative flex items-center justify-center w-full h-24 border-2 border-red-400 rounded-lg bg-gradient-to-r from-red-300 to-red-400 ">
                  <p className='absolute top-0 left-0 px-1" text-black font-bold  text-[0.7rem]'>
                    15
                  </p>
                  <div className="items-end text-sm text-black md:whitespace-nowrap ">
                    <p className="text-sm font-bold text-center text-black">
                      -0.02 %
                    </p>
                    <p className="text-[0.6rem] md:text-[0.75rem] text-center whitespace-nowrap text-black">
                      <strong className="pr-1">3</strong>trades
                    </p>
                  </div>
                </div>
                <div className="relative flex items-center justify-center w-full h-24 border-2 border-red-400 rounded-lg bg-gradient-to-r from-red-300 to-red-400 ">
                  <p className='absolute top-0 left-0 px-1" text-black font-bold  text-[0.7rem]'>
                    16
                  </p>
                  <div className="items-end text-sm text-black md:whitespace-nowrap ">
                    <p className="text-sm font-bold text-center text-black">
                      -0.03 %
                    </p>
                    <p className="text-[0.6rem] md:text-[0.75rem] text-center whitespace-nowrap text-black">
                      <strong className="pr-1">5</strong>trades
                    </p>
                  </div>
                </div>
                <div className="relative flex items-center justify-center w-full h-24 border-2 border-green-400 rounded-lg bg-gradient-to-r from-green-400 to-green-500 ">
                  <p className='absolute top-0 left-0 px-1" text-black font-bold  text-[0.7rem]'>
                    17
                  </p>
                  <div className="items-end text-sm text-black md:whitespace-nowrap ">
                    <p className="text-sm font-bold text-center text-black">
                      0.01 %
                    </p>
                    <p className="text-[0.6rem] md:text-[0.75rem] text-center whitespace-nowrap text-black">
                      <strong className="pr-1">4</strong>trades
                    </p>
                  </div>
                </div>
                <div className="relative flex items-center justify-center w-full h-24 border-2 border-red-400 rounded-lg bg-gradient-to-r from-red-300 to-red-400 ">
                  <p className='absolute top-0 left-0 px-1" text-black font-bold  text-[0.7rem]'>
                    18
                  </p>
                  <div className="items-end text-sm text-black md:whitespace-nowrap ">
                    <p className="text-sm font-bold text-center text-black">
                      -0.03 %
                    </p>
                    <p className="text-[0.6rem] md:text-[0.75rem] text-center whitespace-nowrap text-black">
                      <strong className="pr-1">3</strong>trades
                    </p>
                  </div>
                </div>
                <div className="relative flex items-center justify-center w-full h-24 border-2 border-green-400 rounded-lg bg-gradient-to-r from-green-400 to-green-500 ">
                  <p className='absolute top-0 left-0 px-1" text-black font-bold  text-[0.7rem]'>
                    19
                  </p>
                  <div className="items-end text-sm text-black md:whitespace-nowrap ">
                    <p className="text-sm font-bold text-center text-black">
                      0.03 %
                    </p>
                    <p className="text-[0.6rem] md:text-[0.75rem] text-center whitespace-nowrap text-black">
                      <strong className="pr-1">3</strong>trades
                    </p>
                  </div>
                </div>
                <div className="relative flex items-center justify-center w-full h-24 border rounded-lg bg-slate-900 border-darkblack-700 ">
                  <p className='absolute top-0 left-0 px-1" text-white font-bold  text-[0.7rem]'>
                    20
                  </p>
                  <div className="items-end text-sm text-black md:whitespace-nowrap ">
                    <div className="w-full">
                      <img className="w-6 opacity-90" src={Logo} alt="logo" />
                    </div>
                  </div>
                </div>
                <div className="relative flex items-center justify-center w-full h-24 border rounded-lg bg-slate-900 border-darkblack-700 ">
                  <p className='absolute top-0 left-0 px-1" text-white font-bold  text-[0.7rem]'>
                    21
                  </p>
                  <div className="items-end text-sm text-black md:whitespace-nowrap ">
                    <div className="w-full">
                      <img className="w-6 opacity-90" src={Logo} alt="logo" />
                    </div>
                  </div>
                </div>
                <div className="relative flex items-center justify-center w-full h-24 border-2 border-red-400 rounded-lg bg-gradient-to-r from-red-300 to-red-400 ">
                  <p className='absolute top-0 left-0 px-1" text-black font-bold  text-[0.7rem]'>
                    22
                  </p>
                  <div className="items-end text-sm text-black md:whitespace-nowrap ">
                    <p className="text-sm font-bold text-center text-black">
                      -0.00 %
                    </p>
                    <p className="text-[0.6rem] md:text-[0.75rem] text-center whitespace-nowrap text-black">
                      <strong className="pr-1">1</strong>trade
                    </p>
                  </div>
                </div>
                <div className="relative flex items-center justify-center w-full h-24 border-2 border-green-400 rounded-lg bg-gradient-to-r from-green-400 to-green-500 ">
                  <p className='absolute top-0 left-0 px-1" text-black font-bold  text-[0.7rem]'>
                    23
                  </p>
                  <div className="items-end text-sm text-black md:whitespace-nowrap ">
                    <p className="text-sm font-bold text-center text-black">
                      0.05 %
                    </p>
                    <p className="text-[0.6rem] md:text-[0.75rem] text-center whitespace-nowrap text-black">
                      <strong className="pr-1">4</strong>trades
                    </p>
                  </div>
                </div>
                <div className="relative flex items-center justify-center w-full h-24 border-2 border-green-400 rounded-lg bg-gradient-to-r from-green-400 to-green-500 ">
                  <p className='absolute top-0 left-0 px-1" text-black font-bold  text-[0.7rem]'>
                    24
                  </p>
                  <div className="items-end text-sm text-black md:whitespace-nowrap ">
                    <p className="text-sm font-bold text-center text-black">
                      0.04 %
                    </p>
                    <p className="text-[0.6rem] md:text-[0.75rem] text-center whitespace-nowrap text-black">
                      <strong className="pr-1">5</strong>trades
                    </p>
                  </div>
                </div>
                <div className="relative flex items-center justify-center w-full h-24 border-2 border-green-400 rounded-lg bg-gradient-to-r from-green-400 to-green-500 ">
                  <p className='absolute top-0 left-0 px-1" text-black font-bold  text-[0.7rem]'>
                    25
                  </p>
                  <div className="items-end text-sm text-black md:whitespace-nowrap ">
                    <p className="text-sm font-bold text-center text-black">
                      0.05 %
                    </p>
                    <p className="text-[0.6rem] md:text-[0.75rem] text-center whitespace-nowrap text-black">
                      <strong className="pr-1">4</strong>trades
                    </p>
                  </div>
                </div>
                <div className="relative flex items-center justify-center w-full h-24 border-2 border-red-400 rounded-lg bg-gradient-to-r from-red-300 to-red-400 ">
                  <p className='absolute top-0 left-0 px-1" text-black font-bold  text-[0.7rem]'>
                    26
                  </p>
                  <div className="items-end text-sm text-black md:whitespace-nowrap ">
                    <p className="text-sm font-bold text-center text-black">
                      -0.05 %
                    </p>
                    <p className="text-[0.6rem] md:text-[0.75rem] text-center whitespace-nowrap text-black">
                      <strong className="pr-1">1</strong>trade
                    </p>
                  </div>
                </div>
                <div className="relative flex items-center justify-center w-full h-24 border rounded-lg bg-slate-900 border-darkblack-700 ">
                  <p className='absolute top-0 left-0 px-1" text-white font-bold  text-[0.7rem]'>
                    27
                  </p>
                  <div className="items-end text-sm text-black md:whitespace-nowrap ">
                    <div className="w-full">
                      <img className="w-6 opacity-90" src={Logo} alt="logo" />
                    </div>
                  </div>
                </div>
                <div className="relative flex items-center justify-center w-full h-24 border rounded-lg bg-slate-900 border-darkblack-700 ">
                  <p className='absolute top-0 left-0 px-1" text-white font-bold  text-[0.7rem]'>
                    28
                  </p>
                  <div className="items-end text-sm text-black md:whitespace-nowrap ">
                    <div className="w-full">
                      <img className="w-6 opacity-90" src={Logo} alt="logo" />
                    </div>
                  </div>
                </div>
                <div className="relative flex items-center justify-center w-full h-24 border-2 border-red-400 rounded-lg bg-gradient-to-r from-red-300 to-red-400 ">
                  <p className='absolute top-0 left-0 px-1" text-black font-bold  text-[0.7rem]'>
                    29
                  </p>
                  <div className="items-end text-sm text-black md:whitespace-nowrap ">
                    <p className="text-sm font-bold text-center text-black">
                      -0.04 %
                    </p>
                    <p className="text-[0.6rem] md:text-[0.75rem] text-center whitespace-nowrap text-black">
                      <strong className="pr-1">2</strong>trades
                    </p>
                  </div>
                </div>
                <div className="relative flex items-center justify-center w-full h-24 border-2 border-red-400 rounded-lg bg-gradient-to-r from-red-300 to-red-400 ">
                  <p className='absolute top-0 left-0 px-1" text-black font-bold  text-[0.7rem]'>
                    30
                  </p>
                  <div className="items-end text-sm text-black md:whitespace-nowrap ">
                    <p className="text-sm font-bold text-center text-black">
                      -0.00 %
                    </p>
                    <p className="text-[0.6rem] md:text-[0.75rem] text-center whitespace-nowrap text-black">
                      <strong className="pr-1">3</strong>trades
                    </p>
                  </div>
                </div>
                <div className="relative flex items-center justify-center w-full h-24 border-2 border-red-400 rounded-lg bg-gradient-to-r from-red-300 to-red-400 ">
                  <p className='absolute top-0 left-0 px-1" text-black font-bold  text-[0.7rem]'>
                    31
                  </p>
                  <div className="items-end text-sm text-black md:whitespace-nowrap ">
                    <p className="text-sm font-bold text-center text-black">
                      -0.05 %
                    </p>
                    <p className="text-[0.6rem] md:text-[0.75rem] text-center whitespace-nowrap text-black">
                      <strong className="pr-1">1</strong>trade
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "Drawdown" && (
        <div className="col-span-12 md:col-span-4">
          <div className="flex flex-col justify-between h-full transition duration-300 border md:py-4 md:px-2 rounded-2xl bg-gradient-to-t from-cyan-700 via-transparent to-transparent border-cyan-800 hover:border-cyan-500">
            <div className="flex flex-col">
              <div className="grid grid-cols-7 mb-2 text-center">
                {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
                  (day, idx) => (
                    <span
                      key={day}
                      className={`text-[0.8rem] ${
                        idx > 4 ? "text-red-500" : "text-white"
                      }`}
                    >
                      {day}
                    </span>
                  )
                )}
              </div>

              <div className="grid grid-cols-7 gap-1 rounded-lg">
                {[
                  { day: 1, percent: "0.03", trades: 2, status: "green" },
                  { day: 2, percent: "0.05", trades: 5, status: "green" },
                  { day: 3, percent: "-0.05", trades: 2, status: "red" },
                  { day: 4, percent: "0.05", trades: 2, status: "green" },
                  { day: 5, percent: "0.00", trades: 5, status: "green" },
                  { day: 6, logo: true },
                  { day: 7, logo: true },
                  { day: 8, percent: "0.05", trades: 3, status: "green" },
                  { day: 9, percent: "0.04", trades: 1, status: "green" },
                  { day: 10, percent: "0.02", trades: 1, status: "green" },
                  { day: 11, percent: "0.02", trades: 2, status: "green" },
                  { day: 12, percent: "0.05", trades: 2, status: "green" },
                  { day: 13, logo: true },
                  { day: 14, logo: true },
                  { day: 15, percent: "0.03", trades: 4, status: "green" },
                  { day: 16, percent: "-0.01", trades: 1, status: "red" },
                  { day: 17, percent: "0.01", trades: 1, status: "green" },
                  { day: 18, percent: "0.02", trades: 4, status: "green" },
                  { day: 19, percent: "0.04", trades: 4, status: "green" },
                  { day: 20, logo: true },
                  { day: 21, logo: true },
                  { day: 22, percent: "0.03", trades: 3, status: "green" },
                  { day: 23, percent: "0.05", trades: 3, status: "green" },
                  { day: 24, percent: "0.02", trades: 3, status: "green" },
                  { day: 25, percent: "0.02", trades: 3, status: "green" },
                  { day: 26, percent: "0.05", trades: 3, status: "green" },
                  { day: 27, logo: true },
                  { day: 28, logo: true },
                  { day: 29, percent: "0.00", trades: 2, status: "green" },
                  { day: 30, percent: "0.03", trades: 4, status: "green" },
                  { day: 31, percent: "-0.05", trades: 3, status: "red" },
                ].map(({ day, percent, trades, logo, status }) => {
                  const bgColor = logo
                    ? "bg-slate-900 border border-darkblack-700"
                    : `bg-gradient-to-r from-${
                        status === "red" ? "red-300" : "green-400"
                      } to-${
                        status === "red" ? "red-400" : "green-500"
                      } border-2 border-${
                        status === "red" ? "red-400" : "green-400"
                      }`;

                  return (
                    <div
                      key={day}
                      className={`relative w-full h-24 flex items-center justify-center rounded-lg ${bgColor}`}
                    >
                      <p  className={`absolute top-0 left-0 px-1 text-[0.7rem] font-bold ${
                          logo ? "text-white" : "text-black"
                        }`}>
                        {day}
                      </p>
                      <div className="items-end text-sm">
                        {logo ? (
                          <div className="flex justify-center w-full">
                            <img
                              className="w-6 opacity-90"
                              src={Logo}
                              alt="logo"
                            />
                          </div>
                        ) : (
                          <>
                            <p className="text-sm font-bold text-center text-black">
                              {percent} %
                            </p>
                            <p className="text-[0.6rem] md:text-[0.75rem] text-center text-black whitespace-nowrap">
                              <strong className="pr-1">{trades}</strong>
                              {trades > 1 ? "trades" : "trade"}
                            </p>
                          </>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "Gains" && (
        <div className="col-span-12 md:col-span-4">
          <div className="flex flex-col justify-between h-full transition duration-300 border md:py-4 md:px-2 rounded-2xl bg-gradient-to-t from-cyan-700 via-transparent to-transparent border-cyan-800 hover:border-cyan-500">
            <div className="flex flex-col">
              {/* Weekdays Header */}
              <div className="grid grid-cols-7 mb-2 text-center">
                {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
                  (day, index) => (
                    <span
                      key={day}
                      className={`text-[0.8rem] ${
                        index >= 5 ? "text-red-500" : "text-white"
                      }`}
                    >
                      {day}
                    </span>
                  )
                )}
              </div>

              {/* Calendar Days */}
              <div className="grid grid-cols-7 gap-1 rounded-lg">
                {Array.from({ length: 31 }).map((_, i) => {
                  const day = i + 1;
                  const isNoData = [6, 7, 13, 14, 20, 21, 27, 28].includes(day);
                  const isLoss = [2, 4, 12, 24, 29].includes(day);
                  const hasLogo = isNoData;

                  const bgColor = hasLogo
                    ? "bg-slate-900 border border-darkblack-700"
                    : isLoss
                    ? "bg-gradient-to-r from-red-300 to-red-400 border-2 border-red-400"
                    : "bg-gradient-to-r from-green-400 to-green-500 border-2 border-green-400";

                  return (
                    <div
                      key={day}
                      className={`relative w-full h-24 flex items-center justify-center rounded-lg ${bgColor}`}
                    >
                      <p
                        className={`absolute top-0 left-0 px-1 text-[0.7rem] font-bold ${
                          hasLogo ? "text-white" : "text-black"
                        }`}
                      >
                        {day}
                      </p>

                      <div className="items-end w-full text-sm text-center text-black md:whitespace-nowrap">
                        {hasLogo ? (
                          <img
                            src={Logo}
                            className="w-6 mx-auto opacity-90"
                            alt="logo"
                          />
                        ) : (
                          <>
                            <p className="text-sm font-bold text-black">
                              {isLoss ? "-0.03 %" : "0.05 %"}
                            </p>
                            <p className="text-[0.6rem] md:text-[0.75rem] whitespace-nowrap text-black">
                              <strong className="pr-1">
                                {Math.floor(Math.random() * 5 + 1)}
                              </strong>
                              trades
                            </p>
                          </>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

{activeTab === "Profit" && (
  <div className="col-span-12 md:col-span-4">
    <div className="flex flex-col justify-between h-full transition duration-300 border md:py-4 md:px-2 rounded-2xl bg-gradient-to-t from-cyan-700 via-transparent to-transparent border-cyan-800 hover:border-cyan-500">
      <div className="flex flex-col">
        <div className="grid grid-cols-7 mb-2 text-center">
          {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, i) => (
            <span key={day} className={`text-[0.8rem] ${i >= 5 ? "text-red-500" : "text-white"}`}>
              {day}
            </span>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1 rounded-lg">
          {Array.from({ length: 31 }).map((_, i) => {
            const day = i + 1;
            const isLogoDay = [6, 7, 13, 14, 20, 21, 27, 28].includes(day);
            const isRedDay = [10, 16, 22, 29].includes(day);
            const percentage = isLogoDay ? null : isRedDay ? "-0.04 %" : "0.05 %";
            const trades = isLogoDay ? null : day % 4 === 0 ? 4 : 2;
            const bgColor = isLogoDay
              ? "bg-slate-900 border border-darkblack-700"
              : isRedDay
              ? "bg-gradient-to-r from-red-300 to-red-400 border-2 border-red-400"
              : "bg-gradient-to-r from-green-400 to-green-500 border-2 border-green-400";

            return (
              <div
                key={day}
                className={`relative w-full h-24 flex items-center justify-center rounded-lg ${bgColor}`}
              >
                <p
                  className={`absolute top-0 left-0 px-1 font-bold text-[0.7rem] ${
                    isLogoDay ? "text-white" : "text-black"
                  }`}
                >
                  {day}
                </p>
                <div className="flex items-end justify-center w-full text-sm text-black md:whitespace-nowrap">
                  {isLogoDay ? (
                    <img className="w-6 opacity-90" src={Logo} alt="logo" />
                  ) : (
                    <div className="text-center">
                      <p className="text-sm font-bold text-black">{percentage}</p>
                      <p className="text-[0.6rem] md:text-[0.75rem] whitespace-nowrap text-black">
                        <strong className="pr-1">{trades}</strong>
                        {trades > 1 ? "trades" : "trade"}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  </div>
)}

    </div>
  );
};

export default Chart;
