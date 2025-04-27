import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const DashboardFilters = () => {
  const [showYearDropdown, setShowYearDropdown] = useState(false);
  const [showQuarterDropdown, setShowQuarterDropdown] = useState(false);
  const [showMonthDropdown, setShowMonthDropdown] = useState(false);

  const [selectedYear, setSelectedYear] = useState("Select Year");
  const [selectedQuarter, setSelectedQuarter] = useState("Quarter");
  const [selectedMonth, setSelectedMonth] = useState("Month");

  const [data, setData] = useState(null);

  const currentYear = new Date().getFullYear();
  const currentMonthIndex = new Date().getMonth();
  const years = Array.from({ length: currentYear - 2017 }, (_, i) => currentYear - i);
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];

  const handleMonthSelect = (month) => {
    setSelectedMonth(month);
    setShowMonthDropdown(false);
    const index = months.indexOf(month);
    if (index > currentMonthIndex) {
      toast.error("No data to display");
      setData(null);
    } else {
      fetchData({ year: selectedYear, month });
    }
  };

  const fetchData = async ({ year, month, quarter }) => {
    try {
      // Replace with your actual fetch logic
      const res = await fetch("https://api.example.com/metrics"); 
      const result = await res.json();
      setData(result);
    } catch (err) {
      toast.error('No data to Display');
    }
  };

  return (
    <div className="grid grid-cols-1 gap-1 lg:px-4 lg:pt-0 bg-[#050A1D] mb-6 ">
      <Toaster position="top-center"
       toastOptions={{
        style: {
          background: "#041F3E", // black background
          color: "#fff", // white text
        },
      }} />
      <main className="col-span-12 lg:col-span-8 lg:p-1">
        <main className="relative px-1 space-y-6 lg:px-6 xl:pb-8">
          {/* Top Filter Row */}
          <nav className="flex flex-wrap items-center justify-between gap-2 mt-6 text-white">
            <div className="flex flex-wrap w-full gap-2 lg:w-auto">
              <button className="h-12 px-6 text-sm border-2 border-green-500 rounded-md md:text-base lg:text-lg hover:bg-darkblack-500">
                All Time
              </button>

              <div className="relative">
                <button
                  onClick={() => setShowYearDropdown(!showYearDropdown)}
                  className="h-12 px-6 text-sm border-2 rounded-md md:text-base lg:text-lg border-darkblack-400 hover:border-green-500"
                >
                  {selectedYear}
                </button>
                {showYearDropdown && (
                  <div className="absolute z-10 mt-2 w-40 bg-[#050A1D] border border-green-500 rounded-md shadow-lg max-h-64 overflow-y-auto">
                    {years.map((year) => (
                      <div
                        key={year}
                        onClick={() => {
                          setSelectedYear(year);
                          setShowYearDropdown(false);
                          fetchData({ year });
                        }}
                        className="px-4 py-2 cursor-pointer hover:bg-green-600"
                      >
                        {year}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="relative">
                <button
                  onClick={() => setShowQuarterDropdown(!showQuarterDropdown)}
                  className="h-12 px-6 text-sm border-2 rounded-md md:text-base lg:text-lg border-darkblack-400 hover:bg-darkblack-700"
                >
                  {selectedQuarter}
                </button>
                {showQuarterDropdown && (
                  <div className="absolute z-10 mt-2 w-32 bg-[#050A1D] border border-green-500 rounded-md shadow-lg">
                    {["Q1", "Q2", "Q3", "Q4"].map((q) => (
                      <div
                        key={q}
                        onClick={() => {
                          setSelectedQuarter(q);
                          setShowQuarterDropdown(false);
                          fetchData({ year: selectedYear, quarter: q });
                        }}
                        className="px-4 py-2 cursor-pointer hover:bg-green-600"
                      >
                        {q}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="relative">
                <button
                  onClick={() => setShowMonthDropdown(!showMonthDropdown)}
                  className="h-12 px-6 text-sm border-2 rounded-md md:text-base lg:text-lg border-darkblack-400 hover:bg-darkblack-700"
                >
                  {selectedMonth}
                </button>
                {showMonthDropdown && (
                  <div className="absolute z-10 mt-2 w-40 bg-[#050A1D] border border-green-500 rounded-md shadow-lg max-h-64 overflow-y-auto">
                    {months.map((m) => (
                      <div
                        key={m}
                        onClick={() => handleMonthSelect(m)}
                        className="px-4 py-2 cursor-pointer hover:bg-green-600"
                      >
                        {m}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Trustpilot & Resync */}
            <div className="flex gap-3">
              <button disabled className="px-4 py-2 text-gray-700 bg-gray-400 rounded-md cursor-not-allowed">
                Re-Sync
              </button>
              <div className="bg-white border-2 border-green-700 rounded trustpilot-widget max-w-32">
                <iframe
                  title="Customer reviews powered by Trustpilot"
                  src="https://widget.trustpilot.com/trustboxes/56278e9abfbbba0bdcd568bc/index.html?templateId=56278e9abfbbba0bdcd568bc&businessunitId=6702ec7c508a2a56ff7cc2b4#locale=en-US&styleHeight=52px&styleWidth=100%25"
                  style={{
                    height: "52px",
                    width: "100%",
                    border: "none",
                    display: "block",
                    overflow: "hidden",
                  }}
                ></iframe>
              </div>
            </div>
          </nav>

          {/* Header */}
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <div className="p-1 space-y-1">
              <p className="text-green-400">Metrics</p>
              <p className="text-2xl font-bold text-white">Trade Tab</p>
              <p className="text-base font-semibold text-green-500">
                <span className="pl-1 text-white">(Real)</span>
              </p>
            </div>

            <div className="flex gap-4">
              <button className="flex items-center gap-2 px-4 py-2 text-xl text-gray-600 border-2 rounded-full cursor-not-allowed border-success-300 hover:bg-darkblack-500">
                Public link
              </button>
              <button className="flex items-center gap-2 px-5 py-2 text-sm text-white rounded-full shadow-md bg-gradient-to-r from-blue-600 to-teal-500 hover:shadow-lg sm:text-base">
                <strong className="text-lg">Mentor</strong>
                <svg fill="currentColor" viewBox="0 0 1024 1024" height="30" width="30">
                  <path d="M692.8 412.7l.2-.2-34.6-44.3a7.97 7.97 0 0 0-11.2-1.4l-50.4 39.3-70.5-90.1a7.97 7.97 0 0 0-11.2-1.4l-37.9 29.7a7.97 7.97 0 0 0-1.4 11.2l70.5 90.2-.2.1 34.6 44.3c2.7 3.5 7.7 4.1 11.2 1.4l50.4-39.3 64.1 82c2.7 3.5 7.7 4.1 11.2 1.4l37.9-29.6c3.5-2.7 4.1-7.7 1.4-11.2l-64.1-82.1zM608 112c-167.9 0-304 136.1-304 304 0 70.3 23.9 135 63.9 186.5L114.3 856.1a8.03 8.03 0 0 0 0 11.3l42.3 42.3c3.1 3.1 8.2 3.1 11.3 0l253.6-253.6C473 696.1 537.7 720 608 720c167.9 0 304-136.1 304-304S775.9 112 608 112z" />
                </svg>
              </button>
            </div>
          </div>

          {/* Rendered Table Section */}
          {data && (
            <div className="mt-10 overflow-x-auto text-white">
              <table className="w-full border-collapse table-auto">
                <thead>
                  <tr>
                    {Object.keys(data[0]).map((key) => (
                      <th key={key} className="p-3 text-left border-b border-gray-700">{key}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {data.map((row, idx) => (
                    <tr key={idx} className="hover:bg-gray-800">
                      {Object.values(row).map((val, i) => (
                        <td key={i} className="p-3 border-b border-gray-700">{val}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </main>
      </main>
    </div>
  );
};

export default DashboardFilters;
