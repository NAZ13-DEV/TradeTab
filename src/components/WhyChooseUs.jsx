import mt4Logo from "../img/mt45-logo.png";
import logoLight from "../img/logo_light.png";
import globe from "../img/globe.png";

const pins = [
  { top: "35%", left: "27%", city: "New York City", country: "USA" },
  { top: "45%", left: "17%", city: "Mexico City", country: "Mexico" },
  { top: "37%", left: "90%", city: "Tokyo", country: "Japan" },
  { top: "33%", left: "45%", city: "London", country: "U.K." },
  { top: "70%", left: "87%", city: "Melbourne", country: "Australia" },
  { top: "59%", left: "55%", city: "Cape Town", country: "South Africa" },
  { top: "27%", left: "54%", city: "Frankfurt", country: "Germany" },
  { top: "27%", left: "48%", city: "Madrid", country: "Spain" },
  { top: "37%", left: "55%", city: "Istanbul", country: "Turkey" },
  { top: "35%", left: "72%", city: "Delhi", country: "India" },
  { top: "38%", left: "64%", city: "Dubai", country: "UAE" },
  { top: "57%", left: "32%", city: "São Paulo", country: "Brazil" },
  { top: "45%", left: "45%", city: "Lagos", country: "Nigeria" },
  { top: "40%", left: "70%", city: "Mumbai", country: "India" },
  { top: "60%", left: "85%", city: "Kuala Lumpur", country: "Malaysia" },
];

const WhyChooseUs = () => {
  return (
    <section
      id="whychoose"
      className="hidden px-4 py-20 md:block bg-[linear-gradient(to_bottom,_black_30%,_#052447_50%,_black_80%)]
"
    >
      <div className="mx-auto max-w-7xl">
        {/* Title */}
        <div className="flex flex-col items-center mb-20 text-center">
          <p className="mb-4 text-5xl font-bold text-white">Why Choose Us</p>
          <p className="text-xl text-slate-200">TradeTab WorldWide Reach</p>
        </div>

        {/* Logos and Animated Line */}
        <div className="relative flex items-center px-4 mb-6 justify-evenly">
          {/* Logo 1 */}
          <div className="relative z-10">
            <img src={mt4Logo} alt="MetaTrader 4/5" className="w-24" />
            <span className="absolute w-8 h-8 -translate-x-1/2 -translate-y-1/2 rounded-full left-1/2 top-1/2 bg-emerald-400 blur-xl animate-ping" />
          </div>

          {/* Animated Line */}
          <div className="relative flex-1 h-[2px] mx-8 overflow-hidden">
            <div className="absolute w-12 h-full rounded-full bg-emerald-400 animate-line-slide" />
          </div>

          {/* Logo 2 */}
          <div className="relative z-10">
            <img src={logoLight} alt="TradeTab" className="w-24" />
          </div>
        </div>

        {/* Globe and Pins */}
        <div className="relative w-full">
          <img src={globe} alt="world map" className="w-[90%] mx-auto -mt-12" />
          {pins.map((pin, i) => (
            <div
              key={i}
              className="absolute flex flex-col items-center text-sm text-emerald-200 animate-fade-in"
              style={{ top: pin.top, left: pin.left, animationDelay: `${i * 0.1}s` }}
            >
              <div className="px-3 py-1 text-xs transition-transform duration-300 border rounded-md border-emerald-400 bg-black/80 whitespace-nowrap hover:scale-105">
                <strong className="block font-medium text-white">{pin.city}</strong>
                <span className="text-emerald-200 text-[11px]">{pin.country}</span>
              </div>
              <div className="w-2 h-2 mt-1 rotate-45 bg-emerald-400"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
