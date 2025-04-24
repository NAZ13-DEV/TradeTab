import { useState, useRef, useEffect } from "react";
import logo from "../img/logo_light.png";
import { FaCheck, FaTimes } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TradingJournal = () => {
  const [showPlanner, setShowPlanner] = useState(false);
  const [activeType, setActiveType] = useState("USD");
  const [goal, setGoal] = useState("");
  const [tradesPerDay, setTradesPerDay] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const modalRef = useRef(null);

  const [metrics, setMetrics] = useState([
    { label: "enter Too Early", value: 10 },
    { label: "overtrading", value: 5 },
    { label: "revenge Trading", value: 7 },
    { label: "lack Of Discipline", value: 12 },
    { label: "ignoring Strategy", value: 8 },
    { label: "other", value: 4 },
  ]);

  const calendarStart = new Date("2025-03-30");
  const calendarEnd = new Date("2025-05-10");
  const days = [];
  for (let d = new Date(calendarStart); d <= calendarEnd; d.setDate(d.getDate() + 1)) {
    days.push(new Date(d));
  }

  const handleClick = () => setShowPlanner(prev => !prev);
  const handleToggle = (type) => setActiveType(type);
  const handleSubmit = (e) => {
    e.preventDefault();
    setShowResult(true);
    toast.success("Plan created successfully");
  };

  const handleRestart = () => {
    setShowResult(false);
    toast.info("Plan has been deleted");
  };

  const handleOutsideClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      setShowModal(false);
    }
  };

  useEffect(() => {
    if (showModal) {
      document.addEventListener("mousedown", handleOutsideClick);
    }
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [showModal]);

  const handleResetMetrics = () => {
    setMetrics(prev => prev.map(metric => ({ ...metric, value: 0 })));
    toast.success("Emotional evaluation reset");
    setShowModal(false);
  };

  const renderCell = (date, index) => {
    const dayNum = date.getDate();
    const month = date.getMonth();
    const key = `${month + 1}-${dayNum}`;
    const type = [
      "4-1", "4-2", "4-3", "4-7", "4-8", "4-9", "4-14", "4-15", "4-18", "4-21", "4-22", "4-17",
    ].includes(key) ? "gain"
      : ["4-4", "4-10", "4-11", "4-16"].includes(key) ? "loss"
      : ["4-23", "4-24", "4-25", "4-28", "4-29", "4-30", "4-26", "4-27"].includes(key) ? "logo"
      : ["4-5", "4-6", "4-12", "4-13", "4-19", "4-20"].includes(key) ? "inactive"
      : ["3-30", "3-31", "5-2", "5-3", "5-4", "5-5", "5-6", "5-7", "5-8", "5-9", "5-10"].includes(key) ? "blank"
      : "";

    return (
      <div
        key={index}
        className={`relative w-full h-18 rounded-lg p-2 text-sm flex flex-col items-center justify-center overflow-hidden
          ${
            type === "gain"
              ? "bg-green-300 border border-green-400 text-black"
              : type === "loss"
              ? "bg-red-300 border border-red-400 text-black"
              : type === "logo"
              ? "bg-gray-300 border border-gray-400 text-black"
              : type === "inactive"
              ? "bg-[#1a1e24] text-gray-400 border border-[#2d3239]"
              : type === "blank"
              ? "bg-transparent text-gray-400 border border-[#22262b]"
              : "bg-transparent border border-[#22262b] text-white"
          }`}
      >
        <p className="absolute top-0 left-0 px-2 text-xs">{dayNum}</p>

        {(type === "gain" || type === "loss" || type === "inactive" || type === "logo") && (
          <div className="absolute top-0 right-0 w-0 h-0">
            <div className="absolute top-0 right-0 w-0 h-0 border-t-[34px] border-l-[34px] border-t-black/80 border-l-transparent"></div>
            <div className="absolute top-[4px] right-[4px] z-10">
              {type === "gain" && <FaCheck size={10} className="text-green-400" />}
              {type === "loss" && <FaTimes size={10} className="text-red-500" />}
            </div>
          </div>
        )}

        {type === "gain" && (
          <>
            <p className="text-[0.8rem] font-bold mt-4">9.50%</p>
            <p className="text-[0.7rem] font-bold">USD</p>
            <p className="text-[0.6rem]">Trades: 3</p>
          </>
        )}
        {type === "loss" && (
          <>
            <p className="text-[0.8rem] font-bold mt-4">-8.50%</p>
            <p className="text-[0.7rem] font-bold">USD</p>
            <p className="text-[0.6rem]">Trades: 3</p>
          </>
        )}
        {type === "inactive" && (
          <>
            <p className="mt-4 text-sm opacity-70">0.00%</p>
            <p className="text-sm opacity-70">USD</p>
          </>
        )}
        {type === "logo" && <img src={logo} alt="logo" className="w-12 opacity-70" />}
      </div>
    );
  };

  
  const totalTrades = parseFloat(tradesPerDay) * 22;
  const resultValue = parseFloat(goal) / totalTrades;
  
  // Convert to percentage
  

  return (
    <main className="w-full min-h-[80vh] px-2 md:px-12 md:py-58  bg-[#040e18]">
      <ToastContainer />
      <div className="h-20 md:h-0 lg:h-20" />
      <div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-3 md:pt-44 lg:pt-0">
        {/* LEFT SECTION - CALENDAR */}
        <div className="col-span-2">
          <div className="relative w-full p-4">
            <div className="grid grid-cols-7 my-4 text-center">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day, i) => (
                <span key={i} className={`text-sm font-semibold ${["Sun", "Sat"].includes(day) ? "text-red-500" : "text-white"}`}>
                  {day}
                </span>
              ))}
            </div>
            <div className="relative grid grid-cols-7 gap-2 grid-rows-[repeat(6,minmax(5rem,1fr))] rounded-lg outline outline-1 outline-[#22262b] p-1 animate-glow">
              {days.map((date, index) => renderCell(date, index))}
            </div>
          </div>
        </div>

        {/* RIGHT SECTION */}
        <div className="col-span-1 mb-2 space-y-6">
          <h3 className="pb-2 text-lg font-bold text-white border-b border-slate-900">
            SLT-Straight Line Trading
          </h3>

          {showResult && (
            <div className="w-full p-4 text-white bg-gray-800 rounded-md shadow-md">
              <ul className="space-y-4">
                <li className="flex justify-between">
                  <span>Max trades per day:</span>
                  <span>{tradesPerDay}</span>
                </li>
                <li className="flex justify-between">
                  <span>Target per day:</span>
                  <span>{(resultValue || 0).toFixed(2)} {activeType}</span>
                </li>
                <li className="flex justify-center sm:justify-end">
                  <button
                    className="flex items-center px-4 py-1 border-2 rounded-full bg-cyan-600 hover:bg-cyan-500 border-cyan-500"
                    onClick={handleRestart}
                  >
                    Restart
                  </button>
                </li>
              </ul>
            </div>
          )}

          <form onSubmit={handleSubmit} className="grid gap-4 text-white">
            <div>
              <p className="mb-1 text-sm">Target profit in</p>
              <div className="flex gap-3">
                {["USD", "%"].map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => handleToggle(type)}
                    className={`w-full p-2 text-sm rounded-lg ${activeType === type ? "bg-green-500 text-white" : "bg-gray-700 text-gray-400"}`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="flex flex-col">
                <label className="mb-1 text-sm">{activeType === "USD" ? "Monthly Profit Goal" : "Monthly Percentage Goal"}</label>
                <input
                  type="number"
                  value={goal}
                  onChange={(e) => setGoal(e.target.value)}
                  className="w-full px-2 py-1 text-white placeholder-gray-500 bg-gray-800 rounded-md"
                  placeholder="Only numeric values"
                />
              </div>
              <div className="flex flex-col">
                <label className="mb-1 text-sm">Trades per Day</label>
                <input
                  type="number"
                  value={tradesPerDay}
                  onChange={(e) => setTradesPerDay(e.target.value)}
                  className="w-full px-2 py-1 text-white placeholder-gray-500 bg-gray-800 rounded-md"
                  placeholder="Only numeric values"
                />
              </div>
            </div>

            <button
              disabled={!goal || !tradesPerDay}
              type="submit"
              className={`w-full py-2 font-bold uppercase rounded-md ${goal && tradesPerDay ? "bg-green-500 text-white" : "bg-gray-600 text-cyan-900 cursor-not-allowed"}`}
            >
              Submit
            </button>
          </form>

          {/* Emotional Evaluation */}
          <div className="px-4 py-4 space-y-3 rounded-lg bg-cyan-600">
            <div className="flex items-center justify-between pb-2 border-b border-cyan-900">
              <h4 className="text-lg font-semibold text-white">Emotional Evaluation</h4>
              <button
                title="Reset"
                onClick={() => setShowModal(true)}
                className="px-2 py-1 text-white border-2 rounded-full border-cyan-400 hover:bg-cyan-500"
              >
                🔄
              </button>
            </div>

            {metrics.map(({ label, value }, idx) => (
              <div key={idx} className="flex items-center justify-between pb-1 text-sm text-white border-b border-cyan-700">
                <span className="w-1/2 truncate">{label}</span>
                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min="0"
                    max="20"
                    value={value}
                    readOnly
                    className="slider lg:w-28"
                  />
                  <span>{value}</span>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={handleClick}
            className="px-4 py-2 text-sm font-bold uppercase transition duration-200 border-2 rounded-lg bg-amber-400 hover:bg-amber-500 text-amber-900 hover:text-amber-100 border-amber-300 w-fit"
          >
            {showPlanner ? " SELECT THE DAY FOR WITHDRAWAL " : "WITHDRAWAL PLANNER"}
          </button>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div ref={modalRef} className="w-full max-w-md p-6 text-white bg-gray-800 rounded-md shadow-xl">
            <h2 className="mb-2 text-xl font-semibold">Confirm Reset</h2>
            <p className="mb-6">Are you sure you want to reset your emotional evaluation?</p>
            <div className="flex justify-end gap-4">
              <button onClick={handleResetMetrics} className="px-4 py-2 text-white bg-green-500 rounded-md hover:bg-green-600">
                Yes, Reset
              </button>
              <button onClick={() => setShowModal(false)} className="px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600">
                No, Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default TradingJournal;
