import Trader from '../img/trader-1.png';

const TradeTabUniversity = () => {
  return (
    <main className="relative w-full px-4 py-10 pt-20 lg:pt-24 md:px-10 md:pt-56" id="withaccount">
      <section className="relative mx-auto overflow-hidden text-white border border-teal-500 max-w-7xl rounded-3xl bg-gradient-to-t from-teal-700 via-slate-800 to-slate-900 ">
        <div className="container relative z-10 px-4 py-10 mx-auto sm:px-6 md:px-10 ">
          <div className="grid items-center gap-10 md:gap-14 lg:grid-cols-2">
            {/* Left Content */}
            <div className="space-y-4 text-center lg:text-left">
              <p className="text-sm font-medium text-teal-400 sm:text-base md:text-lg">
                GO TO YOUR ACCOUNT ON
              </p>
              <h1 className="text-3xl font-bold leading-tight tracking-wide text-white sm:text-4xl md:text-5xl">
                TRADETAB{' '}
                <span className="block text-4xl text-teal-500 sm:text-5xl md:text-6xl">
                  UNIVERSITY
                </span>
              </h1>
              <p className="max-w-xl mx-auto text-base text-gray-300 sm:text-lg lg:mx-0">
                Continue your preparation path in the world of trading.
              </p>

              <div className="flex justify-center gap-4 lg:justify-start">
                <a
                  href="https://university.tradetab.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 text-sm font-semibold text-white transition-colors bg-teal-600 rounded-md hover:bg-teal-700"
                >
                  GO TO TT UNIVERSITY
                </a>
              </div>

              <div className="flex flex-col items-center justify-center gap-6 pt-8 sm:flex-row sm:justify-start">
                <div className="text-center sm:text-left">
                  <p className="text-3xl font-bold text-teal-400 sm:text-4xl">25+</p>
                  <p className="text-sm tracking-wider text-gray-100 uppercase">Courses</p>
                </div>
                <div className="text-center sm:text-left">
                  <p className="text-3xl font-bold text-teal-400 sm:text-4xl">2,353+</p>
                  <p className="text-sm tracking-wider text-gray-100 uppercase">Students Registers</p>
                </div>
              </div>
            </div>

            {/* Right Image */}
            <div className="relative flex justify-center px-1 lg:justify-end">
              <img
                src={Trader}
                alt="University"
                className="w-[80%] max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl opacity-90"
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default TradeTabUniversity;
