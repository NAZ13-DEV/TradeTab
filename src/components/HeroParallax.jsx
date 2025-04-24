import Chart4 from "../img/chart4.png";
import HeroBg from "../img/bg1dark.png";

const HeroParallax = () => {
  return (
    <div className="relative flex items-center justify-center min-h-screen px-4 py-16 overflow-hidden bg-slate-950 md:px-10 lg:py-16">
      {/* Background Image with dark overlay */}
      <div className="absolute inset-0 z-0">
        {/* Overlay */}
        <div
          className="absolute inset-0"
          style={{ backgroundColor: "#020617", opacity: 0.9 }}
        ></div>

        {/* Background Image */}
        <div
          className="absolute inset-0 bg-center bg-cover"
          style={{ backgroundImage: `url(${HeroBg})`, opacity: 0.9 }}
        ></div>
      </div>

      {/* Content */}
      <div className="relative z-10 grid items-center w-full grid-cols-1 py-1 max-w-7xl md:grid-cols-2 gap-y-10 md:gap-y-0 md:py-40">
        {/* Text */}
        <div className="flex items-center justify-start" data-aos="fade-right">
          <div className="space-y-6 text-center md:text-left">
            <p className="text-3xl font-bold leading-snug text-white sm:text-4xl lg:text-5xl slide-in-left">
              The <span className="text-teal-400">ultimate trading platform</span> to <br className="hidden sm:block" />
              Maximize your <span className="text-white">Potential</span>
            </p>
            <p className="text-base leading-relaxed text-white sm:text-lg slide-in-left">
              Elevate your trading journey and enhance your trading skills with TradeTab. Your all-in-one trading journal is designed to provide deep insights into every aspect of your trading strategy. Track every trade you make, analyze performance data, and discover new opportunities for improvement.
            </p>
          </div>
        </div>

        {/* Image */}
        <div className="flex items-center justify-center" data-aos="fade-left">
          <img
            src={Chart4}
            alt="floating"
            className="w-full max-w-[400px] sm:max-w-[500px] floating-image slide-in-right"
          />
        </div>
      </div>
    </div>
  );
};

export default HeroParallax;
