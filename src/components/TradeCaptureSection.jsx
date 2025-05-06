import Chart3 from "../img/chart3.png";
import Bg3 from "../img/bg3dark.png"; // Ensure this file exists in /src/img/

const TradeCaptureSection = () => {
  return (
    <div className="relative flex items-center justify-center min-h-screen px-4 py-16 overflow-hidden bg-slate-950 md:px-10 lg:py-28">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-center bg-cover parallax"
        style={{ backgroundImage: `url(${Bg3})` }}
      ></div>

      {/* Foreground Content */}
      <div className="relative z-10 grid items-center w-full grid-cols-1 max-w-7xl md:grid-cols-2 gap-y-10 md:gap-y-0">
        {/* Text Section */}
        <div className="flex items-center justify-start" data-aos="fade-down" data-aos-once="false">
          <div className="space-y-6 text-center md:text-left">
            <p className="text-3xl font-bold leading-snug text-white sm:text-4xl lg:text-5xl autoShow">
              Capture <span className="text-teal-500">Every Trade in Detail</span>
            </p>
            <p className="text-base leading-relaxed text-white sm:text-lg autoShow">
              {`Never miss a beat with Crown Exchange's detailed trade logging. From entry and exit points to notes on market conditions; track every element of your trades with precision. Our comprehensive journaling feature helps you record, reflect, and improve with every single trade.`}
            </p>
          </div>
        </div>

        {/* Chart Image */}
        <div className="flex items-center justify-center" data-aos="fade-down" data-aos-once="false">
          <img
            src={Chart3}
            alt="floating"
            className="w-full max-w-[400px] sm:max-w-[500px] floating-image autoShow"
          />
        </div>
      </div>
    </div>
  );
};

export default TradeCaptureSection;
