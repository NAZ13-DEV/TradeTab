import { useState } from "react";
import ConnectAccountModal from "./ConnectAccountModal"; // Adjust the path as needed

const MTAccountSection = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="grid grid-cols-1 gap-1 px-4 pt-20 lg:pt-0">
      {/* Modal */}
      {showModal && <ConnectAccountModal onClose={() => setShowModal(false)} />}
      <main className="w-full min-h-screen relative pb-12 lg:pb-[4.3rem] pt-4 sm:pt-2 bg-[#050A1D]">
        <div className="2xl:flex 2xl:space-x-12">
          <section className="w-full mb-6 2xl:flex-1 2xl:mb-0">
            <section className="px-3 py-4 transition duration-300 border rounded-2xl md:px-5 md:py-5 bg-slate-900 border-cyan-800 hover:border-cyan-500">
              <div className="space-y-5">
                <div className="flex flex-col justify-between gap-4 xl:flex-row xl:items-center">
                  <p className="text-lg font-bold leading-snug text-transparent xl:text-xl bg-gradient-to-r from-green-400 to-teal-500 bg-clip-text">
                    Add your first account to get started
                  </p>
                  <div className="flex flex-col items-end justify-between w-full gap-2 md:flex-row md:w-auto md:items-center">
                    {/* <div className="md:hidden">
                      <div className="px-4 py-2 text-white bg-teal-600 rounded-md cursor-pointer hover:bg-green-600">
                        <p className="text-sm text-center text-transparent bg-gradient-to-r from-green-400 to-teal-500 bg-clip-text">
                          {` Don't have an account?`}
                        </p>
                      </div>
                    </div> */}
                    <div
                      className="relative w-full md:w-32 h-[44px] bg-green-600 border border-green-300 rounded-md hover:bg-green-400 transition cursor-pointer animate-glow"
                      style={{ position: "relative" }}
                    >
                      <button
                        type="button"
                        onClick={() => setShowModal(true)}
                        className="absolute inset-0 z-10 flex items-center justify-center w-full h-full px-4"
                      >
                        <span className="text-sm font-semibold text-white md:text-base">
                          Add Account
                        </span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Loading Skeleton */}
                <div className="space-y-3 animate-pulse">
                  {Array.from({ length: 10 }).map((_, i) => (
                    <div
                      key={i}
                      className={`flex gap-2 w-full py-3 border-b border-cyan-800`}
                    >
                      <div className="w-1/6 h-5 rounded bg-slate-800" />
                      <div className="w-2/6 h-5 rounded bg-slate-800" />
                      <div className="w-1/6 h-5 rounded bg-slate-800" />
                      <div className="w-1/6 h-5 rounded bg-slate-800" />
                      <div className="w-1/6 h-5 rounded bg-slate-800" />
                    </div>
                  ))}
                </div>

                <div className="">
                  <div className="w-fit">
                    <button className="flex items-center justify-center px-4 py-2 transition duration-300 bg-teal-600 rounded-md w-36 hover:bg-green-600">
                      <span className="text-sm font-medium text-center text-transparent text-white to-teal-500 md:text-lg">
                        {`  Don't have an account?`}
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </section>
          </section>
        </div>
      </main>
    </div>
  );
};

export default MTAccountSection;
