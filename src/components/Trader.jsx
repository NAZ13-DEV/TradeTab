const Trader = () => {
    return (
      <div className="relative z-20 w-full px-4 py-8 bg-black lg:px-10">
        <div className="max-w-6xl px-4 py-6 mx-auto border rounded-2xl border-cyan-500 md:px-10 lg:px-20">
          <div className="grid gap-10 md:grid-cols-3 xl:grid-cols-3">
            {/* Active Traders */}
            <div className="flex justify-center">
              <div className="flex items-center space-x-4">
                <div className="text-emerald-400">
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    className="w-12 h-12 sm:w-14 sm:h-14"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M12 2a5 5 0 1 0 5 5 5 5 0 0 0-5-5zm0 8a3 3 0 1 1 3-3 3 3 0 0 1-3 3zm9 11v-1a7 7 0 0 0-7-7h-4a7 7 0 0 0-7 7v1h2v-1a5 5 0 0 1 5-5h4a5 5 0 0 1 5 5v1z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-2xl font-semibold text-white sm:text-3xl md:text-4xl lg:text-5xl">
                    6,516
                  </h2>
                  <p className="text-xs text-gray-300 sm:text-sm md:text-base">
                    Active Traders
                  </p>
                </div>
              </div>
            </div>
  
            {/* Traded Daily */}
            <div className="flex justify-center">
              <div className="flex items-center space-x-4">
                <div className="text-emerald-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    className="w-12 h-12 sm:w-14 sm:h-14"
                  >
                    <path d="M9 5v4" />
                    <rect width="4" height="6" x="7" y="9" rx="1" />
                    <path d="M9 15v2" />
                    <path d="M17 3v2" />
                    <rect width="4" height="8" x="15" y="5" rx="1" />
                    <path d="M17 13v3" />
                    <path d="M3 3v16a2 2 0 0 0 2 2h16" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-2xl font-semibold text-white sm:text-3xl md:text-4xl lg:text-5xl">
                    $21.2M+
                  </h2>
                  <p className="text-xs text-gray-300 sm:text-sm md:text-base">
                    Traded Daily
                  </p>
                </div>
              </div>
            </div>
  
            {/* Reviewed Brokers */}
            <div className="flex justify-center">
              <div className="flex items-center space-x-4">
                <div className="text-emerald-400">
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                    className="w-12 h-12 sm:w-14 sm:h-14"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-2xl font-semibold text-white sm:text-3xl md:text-4xl lg:text-5xl">
                    1,200+
                  </h2>
                  <p className="text-xs text-gray-300 sm:text-sm md:text-base">
                    Reviewed Brokers
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default Trader;
  