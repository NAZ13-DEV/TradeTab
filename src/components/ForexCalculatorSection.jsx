import { useState } from "react";

const ForexCalculatorSection = () => {
  const [activeTab, setActiveTab] = useState("position");
  const [showDescription, setShowDescription] = useState(true);
  const [showUsage, setShowUsage] = useState(true);
  const [currencySearch, setCurrencySearch] = useState("");
  const [lotSize, setLotSize] = useState("");
  const [loss, setLoss] = useState("");
  const [risk, setRisk] = useState("");
  const [accountSize, setAccountSize] = useState("");
  const [activeType, setActiveType] = useState("Buy");
  const [entryPrice, setEntryPrice] = useState("");
  const [exitPrice, setExitPrice] = useState("");
  const [lotSizes, setLotSizes] = useState("");

  const calculateResults = () => {
    const account = parseFloat(accountSize);
    const riskValue = parseFloat(risk);
    const lossValue = parseFloat(loss);

    if (!account || !riskValue || !lossValue || lossValue === 0)
      return { lots: 0, riskAmount: 0 };

    const riskAmount = (risk / 100) * account;
    const lots = riskAmount / (loss * 10); // assuming 1 lot = $10/pip
    return {
      lots: lots.toFixed(2),
      riskAmount: riskAmount.toFixed(2),
    };
  };

  const calculateProfit = () => {
    const entry = parseFloat(entryPrice);
    const exit = parseFloat(exitPrice);
    const lots = parseFloat(lotSize);

    if (isNaN(entry) || isNaN(exit) || isNaN(lots)) return "—";

    const pipValue = 10; // $10 per pip per 1 lot
    const pipDiff = (exit - entry) * 10000; // basic pip calculation

    const resultPips = activeType === "Buy" ? pipDiff : -pipDiff;
    const profit = resultPips * pipValue * lots;

    return profit.toFixed(2);
  };

  const calculatePips = () => {
    const entry = parseFloat(entryPrice);
    const exit = parseFloat(exitPrice);
    if (isNaN(entry) || isNaN(exit)) return null;
  
    const pips =
      activeType === "Buy"
        ? (exit - entry) * 10000
        : (entry - exit) * 10000;
  
    return pips.toFixed(1);
  };
  
  const calculatePipValue = () => {
    const lots = parseFloat(lotSize);
    if (isNaN(lots)) return null;
  
    return (lots * 10).toFixed(2); // Standard: 1.0 lot = $10/pip
  };
  

  const { lots, riskAmount } = calculateResults();

  const handleRestart = () => {
    window.location.reload();
  };

  const isReadyToShow = loss !== "" && risk !== "" && accountSize;
  const handleToggle = (type) => setActiveType(type);

  const currencyOptions = [
    { label: "USD", group: "Major" },
    { label: "EUR", group: "Major" },
    { label: "GBP", group: "Major" },
    { label: "JPY", group: "Major" },
    { label: "CHF", group: "Major" },
    { label: "CAD", group: "Major" },
    { label: "AUD", group: "Major" },
    { label: "NZD", group: "Major" },
    { label: "TRY", group: "Exotic" },
    { label: "BRL", group: "Exotic" },
    { label: "MXN", group: "Exotic" },
    { label: "ZAR", group: "Exotic" },
    { label: "RUB", group: "Exotic" },
    { label: "ARS", group: "Exotic" },
    { label: "CLP", group: "Exotic" },
    { label: "COP", group: "Exotic" },
    { label: "CNY", group: "Asian" },
    { label: "HKD", group: "Asian" },
    { label: "SGD", group: "Asian" },
    { label: "KRW", group: "Asian" },
    { label: "INR", group: "Asian" },
    { label: "IDR", group: "Asian" },
    { label: "MYR", group: "Asian" },
    { label: "THB", group: "Asian" },
  ];

  const filteredCurrencies = currencyOptions.filter((currency) =>
    currency.label.toLowerCase().startsWith(currencySearch.toLowerCase())
  );

  const handlePresetClick = (value) => {
    setLotSize(value);
  };

  const resultValue = parseFloat(lotSize || 0) * 10;
  
  const tabTitles = {
    position: "Position Size Calculator 🧮",
    pip: "Pip Calculator 🧮",
    profit: "Profit Calculator 🧮",
  };
  

  return (
    <div className="pt-16">
      <section className="min-h-screen py-4 md:py-36 md:pb-10 bg-[#050A1D] px-4 md:px-8 lg:py-20 text-white">
        <h1 className="mb-5 text-3xl font-bold text-center text-teal-400 md:text-4xl md:mb-0">
          Your All-In-One Forex Calculator 🚀
        </h1>

        <div className="flex justify-center w-full md:mb-10">
          <h2 className="hidden text-xl font-semibold text-teal-500 border-b border-teal-400 md:block md:text-3xl w-fit">
            {tabTitles[activeTab]}
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-4 px-4 md:grid-cols-6 md:gap-16 md:px-6" >
          {/* Sidebar */}
          <div className="flex flex-col items-center justify-start w-full col-span-1 md:col-span-3 lg:col-span-2 lg:col-start-2 md:items-start">
            <div className="flex flex-col justify-center w-full max-w-sm gap-2 mb-6 md:mb-10" data-aos="fade-up">
              {["position", "pip", "profit"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`w-full px-5 py-2 rounded-xl font-semibold transition-all duration-200 border-2 ${
                    activeTab === tab
                      ? "bg-gradient-to-r from-green-500 to-teal-400 border-teal-400 text-white"
                      : "bg-[#0A122A] border-gray-600 hover:border-teal-400 text-gray-300"
                  }`}
                >
                  {tab === "position"
                    ? "Position Size"
                    : tab === "pip"
                    ? "Pip Calculator"
                    : "Profit Calculator"}
                </button>
              ))}
            </div>

            {/* Description & Usage */}
            {activeTab === "position" && (
              <>
                <div className="w-full max-w-sm mb-2" data-aos="fade-right">
                  <button
                    onClick={() => setShowDescription(!showDescription)}
                    className="flex items-center justify-between w-full mb-2 text-lg font-medium text-teal-400 bg-transparent border-none cursor-pointer"
                  >
                    <h2 className="text-base border-b border-teal-400 md:text-lg">
                      Description:
                    </h2>
                    <span
                      className={`transition-transform duration-300 ${
                        showDescription ? "rotate-180" : ""
                      }`}
                    >
                      ▼
                    </span>
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      showDescription
                        ? "opacity-100 max-h-40"
                        : "opacity-0 max-h-0"
                    }`}
                  >
                    <p className="pb-3 text-sm text-gray-300 border-b md:text-base border-white/10">
                      A Position Size Calculator helps traders determine the
                      optimal trade size based on their account balance, risk
                      tolerance, and stop loss. It’s a vital tool for managing
                      risk and ensuring you don’t overexpose your capital on a
                      single trade. Use it to trade smarter, not riskier. 💡📈
                    </p>
                  </div>
                </div>

                <div className="w-full max-w-sm mb-2 md:mb-0">
                  <button
                    onClick={() => setShowUsage(!showUsage)}
                    className="flex items-center justify-between w-full mb-2 text-lg font-medium text-teal-400 bg-transparent border-none cursor-pointer"
                  >
                    <h2 className="text-base border-b border-teal-400 md:text-lg">
                      How to Use:
                    </h2>
                    <span
                      className={`transition-transform duration-300 ${
                        showUsage ? "rotate-180" : ""
                      }`}
                    >
                      ▼
                    </span>
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      showUsage ? "opacity-100 max-h-96" : "opacity-0 max-h-0"
                    }`}
                  >
                    <ul className="pl-5 mb-3 space-y-1 text-sm text-gray-300 list-disc md:text-base">
                      {[
                        "Select Account Currency – Choose your account's base currency.",
                        "Select Currency Pair – Pick the currency pair you want to trade.",
                        "Enter Account Size – Input your total trading capital.",
                        "Enter Stop Loss (Pips) – Specify the number of pips you’re willing to risk.",
                        "Enter Risk % – Set the percentage of your account balance to risk.",
                        "View Results – The calculator will display your lot size and risk amount.",
                        "Restart (Optional) – Click “Restart” to reset inputs.",
                      ].map((item, index) => (
                        <li key={index} className="flex gap-4">
                          <p className="text-teal-400">{index + 1}</p>
                          <span className="border-b border-white/10">
                            {item}
                          </span>
                        </li>
                      ))}
                      <p className="text-teal-400">{`That's it! 😉👌`}</p>
                    </ul>
                  </div>
                </div>
              </>
            )}
            {activeTab === "pip" && (
              <>
                <div className="w-full max-w-sm mb-2" data-aos="fade-right">
                  <button
                    onClick={() => setShowDescription(!showDescription)}
                    className="flex items-center justify-between w-full mb-2 text-lg font-medium text-teal-400 bg-transparent border-none cursor-pointer"
                  >
                    <h2 className="text-base text-teal-400 border-b border-teal-400 md:text-lg">
                      Description:
                    </h2>
                    <span
                      className={`transition-transform duration-300 ${
                        showDescription ? "rotate-180" : ""
                      }`}
                    >
                      ▼
                    </span>
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      showDescription
                        ? "opacity-100 max-h-40"
                        : "opacity-0 max-h-0"
                    }`}
                  >
                    <p className="pb-3 text-sm text-gray-300 border-b md:text-base border-white/10">
                      This Pip Calculator helps determine the monetary value of
                      each pip for a specific trade size and currency pair.
                      Knowing pip value helps you assess the potential gain or
                      loss of a trade more accurately. 📊💵
                    </p>
                  </div>
                </div>

                <div className="w-full max-w-sm mb-2 md:mb-0">
                  <button
                    onClick={() => setShowUsage(!showUsage)}
                    className="flex items-center justify-between w-full mb-2 text-lg font-medium text-teal-400 bg-transparent border-none cursor-pointer"
                  >
                    <h2 className="text-base text-teal-400 border-b border-teal-400 md:text-lg">
                      How to Use:
                    </h2>
                    <span
                      className={`transition-transform duration-300 ${
                        showUsage ? "rotate-180" : ""
                      }`}
                    >
                      ▼
                    </span>
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      showUsage ? "opacity-100 max-h-96" : "opacity-0 max-h-0"
                    }`}
                  >
                    <ul className="pl-5 mb-3 space-y-1 text-sm text-gray-300 list-disc md:text-base">
                      <li className="flex gap-4">
                        <p className="text-teal-400">1</p>
                        <span className="border-b border-white/10">
                          Select Currency Pair – Choose the pair you wish to
                          calculate pip value for.
                        </span>
                      </li>
                      <li className="flex gap-4">
                        <p className="text-teal-400">2</p>
                        <span className="border-b border-white/10">
                          Enter Trade Size – Specify the number of units (e.g.,
                          10,000).
                        </span>
                      </li>
                      <li className="flex gap-4">
                        <p className="text-teal-400">3</p>
                        <span className="border-b border-white/10">
                          View Estimated Pip Value – The calculator displays the
                          pip value based on your inputs.
                        </span>
                      </li>
                      <li className="flex gap-4">
                        <p className="text-teal-400">4</p>
                        <span className="border-b border-white/10">
                          Adjust values as needed – Recalculate by changing pair
                          or size.
                        </span>
                      </li>
                      <p className="text-teal-400">{`That's it! 😉👌`}</p>
                    </ul>
                  </div>
                </div>
              </>
            )}
            {activeTab === "profit" && (
              <>
                <div className="w-full max-w-sm mb-2" data-aos="fade-right">
                  <button
                    onClick={() => setShowDescription(!showDescription)}
                    className="flex items-center justify-between w-full mb-2 text-lg font-medium text-teal-400 bg-transparent border-none cursor-pointer"
                  >
                    <h2 className="text-base text-teal-400 border-b border-teal-400 md:text-lg">
                      Description:
                    </h2>
                    <span
                      className={`transition-transform duration-300 ${
                        showDescription ? "rotate-180" : ""
                      }`}
                    >
                      ▼
                    </span>
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      showDescription
                        ? "opacity-100 max-h-40"
                        : "opacity-0 max-h-0"
                    }`}
                  >
                    <p className="pb-3 text-sm text-gray-300 border-b md:text-base border-white/10">
                      The Profit Calculator estimates your potential earnings or
                      losses from a trade based on entry and exit prices and
                      trade size. It’s ideal for planning your strategy and
                      setting realistic expectations before executing trades.
                      🧮📈
                    </p>
                  </div>
                </div>

                <div className="w-full max-w-sm mb-2 md:mb-0">
                  <button
                    onClick={() => setShowUsage(!showUsage)}
                    className="flex items-center justify-between w-full mb-2 text-lg font-medium text-teal-400 bg-transparent border-none cursor-pointer"
                  >
                    <h2 className="text-base text-teal-400 border-b border-teal-400 md:text-lg">
                      How to Use:
                    </h2>
                    <span
                      className={`transition-transform duration-300 ${
                        showUsage ? "rotate-180" : ""
                      }`}
                    >
                      ▼
                    </span>
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      showUsage ? "opacity-100 max-h-96" : "opacity-0 max-h-0"
                    }`}
                  >
                    <ul className="pl-5 mb-3 space-y-1 list-disc">
                      {[
                        "Select Trade Direction – Choose either Buy or Sell.",
                        "Enter Entry Price – The price at which you plan to enter the trade.",
                        "Enter Exit Price – The price at which you plan to close the trade.",
                        "Enter Trade Size – Specify how many units you are trading.",
                        "View Results – The calculator shows your estimated profit or loss.",
                      ].map((text, i) => (
                        <li
                          key={i}
                          className="flex gap-4 text-sm text-gray-300 md:text-base"
                        >
                          <p className="text-teal-400">{i + 1}</p>
                          <span className="border-b border-white/10">
                            {text}
                          </span>
                        </li>
                      ))}
                      <p className="text-teal-400">{"That's it! 😉👌"}</p>
                    </ul>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Right Section */}
          <div className="col-span-1 transition-opacity duration-300 ease-in-out md:col-span-3 lg:col-span-2 lg:col-start-4">
            {activeTab === "position" && (
              <div className="p-5 mb-8 duration-300 ease-in-out border rounded-lg bg-[linear-gradient(to_top,_#0f172a_70%,_#0e7490_100%)] border-cyan-800 hover:border-cyan-500" data-aos="fade-up">
                <h2 className="mb-6 text-lg font-semibold text-center md:text-xl">
                  Find the right lot size based on your risk & capital 📐
                </h2>
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="block mb-1 text-gray-100">
                      Account Currency
                    </label>

                    <div className="flex items-center justify-center">
                      <input
                        type="text"
                        placeholder="Search currency..."
                        className="w-full px-3 py-2 text-white transition duration-200 ease-in-out bg-gray-800 border border-gray-600 rounded-md focus:ring-2 focus:ring-teal-400 focus:outline-none"
                        value={currencySearch}
                        onChange={(e) => setCurrencySearch(e.target.value)}
                      />
                      <select className="w-1/2 px-3 py-2 text-white transition duration-200 ease-in-out bg-gray-800 border border-gray-600 rounded-md focus:ring-2 focus:ring-teal-400 focus:outline-none">
                        {filteredCurrencies.map((c) => (
                          <option key={c.label} value={c.label}>
                            {c.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block mb-1 text-gray-100">
                      Currency Pair
                    </label>
                    <select
                      id="currencyPair"
                      className="items-center justify-center w-full p-2 text-white bg-gray-800 border border-gray-600 rounded-md focus:ring-2 focus:ring-teal-400 focus:outline-none"
                    >
                      <optgroup label="💎 Popular Pairs">
                        <option value="EUR/USD">🇪🇺 🇺🇸 EUR/USD</option>
                        <option value="USD/JPY">🇺🇸 🇯🇵 USD/JPY</option>
                        <option value="GBP/USD">🇬🇧 🇺🇸 GBP/USD</option>
                        <option value="USD/CHF">🇺🇸 🇨🇭 USD/CHF</option>
                        <option value="AUD/USD">🇦🇺 🇺🇸 AUD/USD</option>
                        <option value="USD/CAD">🇺🇸 🇨🇦 USD/CAD</option>
                        <option value="NZD/USD">🇳🇿 🇺🇸 NZD/USD</option>
                        <option value="EUR/GBP">🇪🇺 🇬🇧 EUR/GBP</option>
                        <option value="EUR/JPY">🇪🇺 🇯🇵 EUR/JPY</option>
                        <option value="GBP/JPY">🇬🇧 🇯🇵 GBP/JPY</option>
                      </optgroup>
                      <optgroup label="🌍 Exotic Pairs">
                        <option value="USD/TRY">🇺🇸 🇹🇷 USD/TRY</option>
                        <option value="USD/BRL">🇺🇸 🇧🇷 USD/BRL</option>
                        <option value="USD/MXN">🇺🇸 🇲🇽 USD/MXN</option>
                        <option value="USD/ZAR">🇺🇸 🇿🇦 USD/ZAR</option>
                        <option value="USD/RUB">🇺🇸 🇷🇺 USD/RUB</option>
                      </optgroup>
                      <optgroup label="🌏 Asian Pairs">
                        <option value="USD/CNY">🇺🇸 🇨🇳 USD/CNY</option>
                        <option value="USD/HKD">🇺🇸 🇭🇰 USD/HKD</option>
                        <option value="USD/SGD">🇺🇸 🇸🇬 USD/SGD</option>
                      </optgroup>
                      <optgroup label="🏆 Commodities">
                        <option value="XAU/USD">🥇 🇺🇸 XAU/USD</option>
                        <option value="XAG/USD">🥈 🇺🇸 XAG/USD</option>
                        <option value="WTI/USD">🛢️ 🇺🇸 WTI/USD</option>
                        <option value="BRENT/USD">🛢️ 🇺🇸 BRENT/USD</option>
                      </optgroup>
                    </select>
                  </div>

                  <div>
                    <label className="block mb-1 text-gray-100">
                      Account Size
                    </label>
                    <input
                      type="number"
                      placeholder="Current: 0"
                      className="w-full px-3 py-2 rounded-md border border-gray-600 bg-[#050A1D] text-white"
                      value={accountSize}
                      onChange={(e) => setAccountSize(e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="block mb-1 text-gray-100">
                      Stop Loss (in pips)
                    </label>
                    <input
                      type="number"
                      className="w-full px-3 py-2 rounded-md border border-gray-600 bg-[#050A1D] text-white"
                      value={loss}
                      onChange={(e) => setLoss(e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="block mb-1 text-gray-100">Risk %</label>
                    <input
                      type="number"
                      className="w-full px-3 py-2 rounded-md border border-gray-600 bg-[#050A1D] text-white"
                      value={risk}
                      onChange={(e) => setRisk(e.target.value)}
                    />
                  </div>

                  <div className="flex justify-end">
                    <button
                      className="flex items-center justify-center w-full gap-2 px-4 py-2 text-sm font-semibold uppercase rounded-md cursor-not-allowed text-cyan-900 bg-gradient-to-r from-green-500 to-teal-400"
                      onClick={handleRestart}
                      disabled={!isReadyToShow}
                    >
                      Restart
                    </button>
                  </div>
                </div>
                {isReadyToShow && (
                  <div className="mt-6">
                    <div className="mt-4 div_entry_5">
                      <h1 className="mb-2 text-lg font-semibold text-center border-b border-white/50">
                        Results
                      </h1>
                      <div className="flex flex-col">
                        <label className="flex justify-between w-full px-4 py-2 mt-2 text-xl font-semibold text-gray-100 bg-[#AC6400] rounded-lg items-center text-center">
                          <span className="text-base font-semibold whitespace-nowrap md:text-xl">
                            Standard Lots
                          </span>
                          <p className="text-xl font-bold text-teal-300 whitespace-nowrap md:text-2xl">
                            {lots}
                          </p>
                        </label>

                        <label className="flex justify-between w-full px-4 py-2 mt-2 text-xl font-bold text-gray-100 bg-[#AC6400] rounded-lg items-center text-center">
                          <span className="text-lg font-semibold whitespace-nowrap md:text-xl">
                            Amount at Risk
                          </span>
                          <p className="text-xl font-bold text-teal-300 whitespace-nowrap md:text-2xl">
                            {riskAmount}
                          </p>
                        </label>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === "pip" && (
              <div className="col-span-1 transition-opacity duration-300 ease-in-out md:col-span-3 lg:col-span-2 lg:col-start-4" data-aos="fade-up">
                <div className="p-5 mb-8 border rounded-lg shadow bg-[linear-gradient(to_top,_#0f172a_70%,_#0e7490_100%)] border-cyan-800 hover:border-cyan-500">
                  <h2 className="mb-6 text-lg font-semibold text-center text-white md:text-xl">
                    Know The Exact Pip Value Before You Trade ✅
                  </h2>

                  <div className="grid grid-cols-1 gap-4">
                    {/* Currency */}
                    <div>
                      <label className="block mb-1 text-gray-100">
                        Account Currency
                      </label>
                      <div className="flex items-center justify-center">
                        <input
                          type="text"
                          placeholder="Search currency..."
                          value={currencySearch}
                          onChange={(e) => setCurrencySearch(e.target.value)}
                          className="w-full px-3 py-2 text-white bg-gray-800 border border-gray-600 rounded-md focus:ring-2 focus:ring-teal-400 focus:outline-none"
                        />
                        <select className="w-1/2 px-3 py-2 ml-2 text-white bg-gray-800 border border-gray-600 rounded-md focus:ring-2 focus:ring-teal-400 focus:outline-none">
                          {filteredCurrencies.map((c) => (
                            <option key={c.label} value={c.label}>
                              {c.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Lot Size */}
                    <div>
                      <div className="flex items-center">
                        <label className="block mb-1 font-medium text-white">
                          Trade Size (Lots)
                        </label>
                        <span className="ml-2 text-teal-400">ℹ️</span>
                      </div>
                      <input
                        type="number"
                        value={lotSize}
                        onChange={(e) => setLotSize(e.target.value)}
                        placeholder="Enter lot size (e.g. 0.01, 0.10, 1.00)"
                        className="w-full px-3 py-2 text-white bg-gray-800 border border-gray-600 rounded-md focus:ring-2 focus:ring-blue-600 focus:outline-none"
                      />
                    </div>

                    {/* Lot Presets */}
                    <div className="flex justify-start mt-2 space-x-2">
                      <button
                        onClick={() => handlePresetClick("0.01")}
                        className="px-2 py-1 text-xs text-white bg-[#050A1D] hover:bg-[#0A1A2F] border border-gray-600 rounded"
                      >
                        Micro (0.01)
                      </button>
                      <button
                        onClick={() => handlePresetClick("0.1")}
                        className="px-2 py-1 text-xs text-white bg-[#050A1D] hover:bg-[#0A1A2F] border border-gray-600 rounded"
                      >
                        Mini (0.1)
                      </button>
                      <button
                        onClick={() => handlePresetClick("1.0")}
                        className="px-2 py-1 text-xs text-white bg-[#050A1D] hover:bg-[#0A1A2F] border border-gray-600 rounded"
                      >
                        Standard (1.0)
                      </button>
                    </div>

                    <p className="mt-1 text-xs text-gray-400">
                      1.00 lot = $10 per pip, 0.10 = $1, 0.01 = $0.10 (for most
                      pairs)
                    </p>

                    {/* Result */}
                    <div className="p-4 mt-6 text-center transition-all duration-300 rounded-lg shadow-md bg-gradient-to-r from-teal-800 to-teal-900">
                      <p className="mb-1 text-sm text-gray-300">
                        Estimated Pip Value
                      </p>
                      <p className="text-2xl font-bold text-teal-300">
                        ${resultValue.toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "profit" && (
              <div className="col-span-1 transition-opacity duration-300 ease-in-out md:col-span-3 lg:col-span-2 lg:col-start-4" data-aos="fade-up">
                <div className="p-5 mb-8 border rounded-lg shadow bg-[linear-gradient(to_top,_#0f172a_70%,_#0e7490_100%)] border-cyan-800 hover:border-cyan-500">
                  <h2 className="px-1 mb-6 text-lg font-semibold text-center text-white md:text-xl">
                    Profit Calculator Made Simple 📈
                  </h2>

                  <div className="space-y-5">
                    {/* Currency Pair */}
                    <div className="w-full">
                      <label
                        htmlFor="currencyPair"
                        className="block mb-2 text-sm font-medium text-gray-200"
                      >
                        Select Currency Pair or Commodity
                      </label>
                      <select
                        id="currencyPair"
                        className="items-center justify-center w-full p-2 text-white bg-gray-800 border border-gray-600 rounded-md focus:ring-2 focus:ring-teal-400 focus:outline-none"
                      >
                        <optgroup label="💎 Popular Pairs">
                          <option value="EUR/USD">🇪🇺 🇺🇸 EUR/USD</option>
                          <option value="USD/JPY">🇺🇸 🇯🇵 USD/JPY</option>
                          <option value="GBP/USD">🇬🇧 🇺🇸 GBP/USD</option>
                          <option value="USD/CHF">🇺🇸 🇨🇭 USD/CHF</option>
                          <option value="AUD/USD">🇦🇺 🇺🇸 AUD/USD</option>
                          <option value="USD/CAD">🇺🇸 🇨🇦 USD/CAD</option>
                          <option value="NZD/USD">🇳🇿 🇺🇸 NZD/USD</option>
                          <option value="EUR/GBP">🇪🇺 🇬🇧 EUR/GBP</option>
                          <option value="EUR/JPY">🇪🇺 🇯🇵 EUR/JPY</option>
                          <option value="GBP/JPY">🇬🇧 🇯🇵 GBP/JPY</option>
                        </optgroup>
                        <optgroup label="🌍 Exotic Pairs">
                          <option value="USD/TRY">🇺🇸 🇹🇷 USD/TRY</option>
                          <option value="USD/BRL">🇺🇸 🇧🇷 USD/BRL</option>
                          <option value="USD/MXN">🇺🇸 🇲🇽 USD/MXN</option>
                          <option value="USD/ZAR">🇺🇸 🇿🇦 USD/ZAR</option>
                          <option value="USD/RUB">🇺🇸 🇷🇺 USD/RUB</option>
                        </optgroup>
                        <optgroup label="🌏 Asian Pairs">
                          <option value="USD/CNY">🇺🇸 🇨🇳 USD/CNY</option>
                          <option value="USD/HKD">🇺🇸 🇭🇰 USD/HKD</option>
                          <option value="USD/SGD">🇺🇸 🇸🇬 USD/SGD</option>
                        </optgroup>
                        <optgroup label="🏆 Commodities">
                          <option value="XAU/USD">🥇 🇺🇸 XAU/USD</option>
                          <option value="XAG/USD">🥈 🇺🇸 XAG/USD</option>
                          <option value="WTI/USD">🛢️ 🇺🇸 WTI/USD</option>
                          <option value="BRENT/USD">🛢️ 🇺🇸 BRENT/USD</option>
                        </optgroup>
                      </select>
                    </div>

                    {/* Trade Direction */}
                    <div>
                      <label className="block mb-1 font-medium text-white">
                        Trade Direction
                      </label>
                      <div className="flex gap-4">
                        {["Buy", "Sell"].map((option) => (
                          <button
                            key={option}
                            type="button"
                            onClick={() => handleToggle(option)}
                            className={`w-full px-4 py-2 font-semibold text-white border rounded-full transition 
                            ${
                              activeType === option
                                ? option === "Buy"
                                  ? "bg-green-500 border-green-500"
                                  : "bg-red-500 border-red-500"
                                : "bg-gray-700 border-gray-600"
                            }`}
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Entry Price */}
                    <div>
                      <label className="block mb-1 font-medium text-white">
                        Entry Price
                      </label>
                      <input
                        type="number"
                        className="w-full px-3 py-2 text-white bg-gray-800 border border-gray-600 rounded-md focus:ring-2 focus:ring-blue-600 focus:outline-none"
                        placeholder="1.0950"
                        step="any"
                        value={entryPrice}
                        onChange={(e) => setEntryPrice(e.target.value)}
                      />
                    </div>

                    {/* Exit Price */}
                    <div>
                      <label className="block mb-1 font-medium text-white">
                        Exit Price
                      </label>
                      <input
                        type="number"
                        className="w-full px-3 py-2 text-white bg-gray-800 border border-gray-600 rounded-md focus:ring-2 focus:ring-blue-600 focus:outline-none"
                        placeholder="1.0850"
                        step="any"
                        value={exitPrice}
                        onChange={(e) => setExitPrice(e.target.value)}
                      />
                    </div>

                    {/* Lot Size */}
                    <div>
                      <div className="flex items-center">
                        <label className="block mb-1 font-medium text-white">
                          Trade Size (Lots)
                        </label>
                        <span className="ml-2 text-teal-400">ℹ️</span>
                      </div>
                      <input
                        type="number"
                        value={lotSizes}
                        onChange={(e) => setLotSizes(e.target.value)}
                        placeholder="1.0"
                        className="w-full px-3 py-2 text-white bg-gray-800 border border-gray-600 rounded-md focus:ring-2 focus:ring-blue-600 focus:outline-none"
                      />
                    </div>

                    {/* Lot Presets */}
                    <div className="flex justify-start mt-2 space-x-2">
                      <button
                        onClick={() => handlePresetClick("0.01")}
                        className="px-2 py-1 text-xs text-white bg-[#050A1D] hover:bg-[#0A1A2F] border border-gray-600 rounded"
                      >
                        Micro (0.01)
                      </button>
                      <button
                        onClick={() => handlePresetClick("0.1")}
                        className="px-2 py-1 text-xs text-white bg-[#050A1D] hover:bg-[#0A1A2F] border border-gray-600 rounded"
                      >
                        Mini (0.1)
                      </button>
                      <button
                        onClick={() => handlePresetClick("1.0")}
                        className="px-2 py-1 text-xs text-white bg-[#050A1D] hover:bg-[#0A1A2F] border border-gray-600 rounded"
                      >
                        Standard (1.0)
                      </button>
                    </div>

                    <p className="mt-1 text-xs text-gray-400">
                      * 1.00 = $10/pip, 0.10 = $1, 0.01 = $0.10
                    </p>

                    {/* Profit Display */}
                    <div
                      className={`p-4 mt-6 text-center transition-all duration-300 rounded-lg shadow-md ${
                        parseFloat(calculateProfit()) < 0
                          ? "bg-red-800"
                          : "bg-gradient-to-r from-teal-800 to-teal-900"
                      }`}
                    >
                      <p className="mb-1 text-sm text-gray-300 md:text-base">
                        Estimated Profit
                      </p>
                      <p className="text-2xl font-bold text-teal-300">
                      { entryPrice && exitPrice && lotSize && (
                         "$" + calculateProfit()
                       )}
                      </p>
                      <p className="text-sm text-gray-300 md:text-base">Pips: {calculatePips()} | Pip Value: ${calculatePipValue()}</p>
                    </div>

                    <div className="pt-4 text-sm text-center text-gray-400">
                    * Results are approximate. Broker fees, spread, and slippage not included.
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ForexCalculatorSection;
