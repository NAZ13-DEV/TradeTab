import Chart1 from "../img/chart1.png";
import Bg2 from "../img/bg2dark.png";

const IndicatorsSection = () => {
  return (
    <div className="relative flex items-center justify-center min-h-screen px-4 py-16 overflow-hidden bg-slate-950 md:px-10 lg:py-28">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-center bg-cover parallax"
        style={{ backgroundImage: `url(${Bg2})` }}
      ></div>

      {/* Foreground Content */}
      <div className="relative z-10 grid items-center w-full grid-cols-1 max-w-7xl md:grid-cols-2 gap-y-10 md:gap-y-0">
        {/* Text Section */}
        <div className="flex items-center justify-start" data-aos="fade-down" data-aos-once="false">
          <div className="space-y-6 text-center md:text-left">
            <p className="text-3xl font-bold leading-snug text-white sm:text-4xl lg:text-5xl autoShow">
              The <span className="text-teal-500">right indicators</span> to evaluate
            </p>
            <p className="text-base leading-relaxed text-white sm:text-lg autoShow">
              Evaluate your trading performance like never before. Dive into advanced metrics, spot patterns in your trading behaviour, and uncover actionable insights. With TradeTab, you can identify what's working, pinpoint areas for improvement, and make data-driven decisions to refine your strategy.
            </p>
          </div>
        </div>

        {/* Chart Image */}
        <div className="flex items-center justify-center" data-aos="fade-down" data-aos-once="false">
          <img
            src={Chart1}
            alt="floating"
            className="w-full max-w-[400px] sm:max-w-[500px] floating-image autoShow"
          />
        </div>
      </div>
    </div>
  );
};

export default IndicatorsSection;
