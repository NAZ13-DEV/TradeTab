import { useState, useRef, useEffect } from "react";

const AccountStats = () => {
  const [openDropdownIndex, setOpenDropdownIndex] = useState(null);
  const dropdownRefs = useRef([]);

  const stats = [
    { label: "Balance", value: "176,288.22", info: "Represents the total amount of funds in your trading account as of the most recent synchronization. It reflects the sum of your available capital, excluding any open positions. Monitoring your account balance ensures you're aware of the funds available for new trades and helps you manage your financial risk effectively." },
    { label: "Equity", value: "176,066.65", info: "Equity is the total amount of funds in your account including profits or losses from open trades." },
    { label: "Risk Reward", value: "1 - 0.50", info: "Risk to reward ratio measures how much potential profit there is for every unit of currency risked." },
    { label: "Currency", value: "USD", info: "Currency indicates the denomination of your trading account (e.g., USD, EUR)." },
  ];

  const handleOutsideClick = (e) => {
    if (!dropdownRefs.current.some(ref => ref?.contains(e.target))) {
      setOpenDropdownIndex(null);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const toggleDropdown = (index) => {
    setOpenDropdownIndex(prev => (prev === index ? null : index));
  };

  return (
    <div className="flex flex-col w-full mb-6 md:flex-row">
      <div className="w-full h-full">
        <div className="grid md:grid-cols-1 grid-cols-2 gap-4 md:gap-[24px] lg:grid-cols-4 h-full">
          {stats.map((item, index) => (
            <div key={index} className="relative">
              <div className="h-full">
                <div className="relative h-full px-3 py-2 transition-colors duration-300 border md:py-6 rounded-2xl bg-gradient-to-t from-cyan-700 via-transparent to-transparent border-cyan-800 hover:border-cyan-500">
                  <div className="absolute inset-0 border border-transparent border-solid rounded-lg animate-glow"></div>
                  <div className="flex items-center justify-between mb-2 md:mb-8 lg:mb-5">
                    <span className="text-base text-white lg:text-xl xl:text-sm 2xl:text-xl">{item.label}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="text-xl md:text-2xl xl:text-4xl leading-[48px] p-3 bg-gradient-to-r from-green-400 to-teal-500 bg-clip-text text-transparent rounded-lg whitespace-pre-wrap">
                        {item.value}
                      </p>
                      <div className="flex items-center space-x-2">
                        <svg width="16" height="14" viewBox="0 0 16 14" fill="7" xmlns="http://www.w3.org/2000/svg">
                          <path d="M13.4318 0.522827L12.4446 0.522827L8.55575 0.522827L7.56859 0.522827C6.28227 0.522827 5.48082 1.91818 6.12896 3.02928L9.06056 8.05489C9.7037 9.1574 11.2967 9.1574 11.9398 8.05489L14.8714 3.02928C15.5196 1.91818 14.7181 0.522828 13.4318 0.522827Z" fill="springgreen" />
                          <path opacity="0.4" d="M2.16878 13.0485L3.15594 13.0485L7.04483 13.0485L8.03199 13.0485C9.31831 13.0485 10.1198 11.6531 9.47163 10.542L6.54002 5.5164C5.89689 4.41389 4.30389 4.41389 3.66076 5.5164L0.729153 10.542C0.0810147 11.6531 0.882466 13.0485 2.16878 13.0485Z" fill="springgreen" />
                        </svg>
                        <span className="text-xs font-medium text-white md:text-sm lg:text-base">From all time</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Info Icon */}
              <div
                className="absolute text-base cursor-pointer top-1 right-2 text-slate-400 w-fit hover:text-teal-400 hover:text-xl"
                onClick={() => toggleDropdown(index)}
              >
                <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 16 16" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"></path>
                </svg>
              </div>

              {/* Info Dropdown */}
              {openDropdownIndex === index && (
                <div
                  ref={(el) => dropdownRefs.current[index] = el}
                  className="absolute z-50 p-4 text-black border border-gray-300 rounded-lg shadow-lg bg-slate-200"
                  style={{
                    top: "3.5rem",
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: "90vw",
                    maxWidth: "300px",
                  }}
                >
                  <button
                    type="button"
                    onClick={() => setOpenDropdownIndex(null)}
                    className="absolute p-1 text-gray-500 top-1 right-1 hover:text-red-500"
                  >
                    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 1024 1024" fillRule="evenodd" height="14" width="14" xmlns="http://www.w3.org/2000/svg">
                      <path d="M799.855 166.312c.023.007.043.018.084.059l57.69 57.69c.041.041.052.06.059.084a.118.118 0 0 1 0 .069c-.007.023-.018.042-.059.083L569.926 512l287.703 287.703c.041.04.052.06.059.083a.118.118 0 0 1 0 .07c-.007.022-.018.042-.059.083l-57.69 57.69c-.041.041-.06.052-.084.059a.118.118 0 0 1-.069 0c-.023-.007-.042-.018-.083-.059L512 569.926 224.297 857.629c-.04.041-.06.052-.083.059a.118.118 0 0 1-.07 0c-.022-.007-.042-.018-.083-.059l-57.69-57.69c-.041-.041-.052-.06-.059-.084a.118.118 0 0 1 0-.069c.007-.023.018-.042.059-.083L454.073 512 166.371 224.297c-.041-.04-.052-.06-.059-.083a.118.118 0 0 1 0-.07c.007-.022.018-.042.059-.083l57.69-57.69c.041-.041.06-.052.084-.059a.118.118 0 0 1 .069 0c.023.007.042.018.083.059L512 454.073l287.703-287.702c.04-.041.06-.052.083-.059a.118.118 0 0 1 .07 0Z"></path>
                    </svg>
                  </button>
                  <p className="text-[0.7rem] font-semibold">{item.info}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AccountStats;
