import { useEffect, useState } from "react";
import chart1 from "../img/slide1.jpg";
import chart2 from "../img/slide2.jpg";
import chart3 from "../img/slide3.jpg";

const slides = [
  {
    image: chart1,
    heading: "Capture Every Trade in Detail",
    text: "Never miss a beat with TradeTab's detailed trade logging. From entry and exit points to notes on market conditions; track every element of your trades with precision. Our comprehensive journaling feature helps you record, reflect, and improve with every single trade.",
  },
  {
    image: chart2,
    heading: "Maximize Your Skills & Potential",
    text: "Elevate your trading journey and enhance your trading skills with TradeTab. Your all-in-one trading journal is designed to provide deep insights into every aspect of your trading strategy. Track every trade you make, analyze performance data, and discover new opportunities for improvement.",
  },
  {
    image: chart3,
    heading: "The Right Indicators to Evaluate",
    text: "Evaluate your trading performance like never before. Dive into advanced metrics, spot patterns in your trading behaviour, and uncover actionable insights. With TradeTab, you can identify what's working, pinpoint areas for improvement, and make data-driven decisions to refine your strategy.",
  },
];

const TradeCaptureSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setActiveIndex((prevIndex) => (prevIndex + 1) % slides.length);
          return 0;
        }
        return prev + 1;
      });
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative z-30 flex items-center justify-center p-4 py-20 bg-black">
      {/* Blue glow on the left */}
      <div
        className="absolute top-0 -left-[15rem] z-0 h-full pointer-events-none w-[50rem]"
        style={{
          background:
            "radial-gradient(circle, rgba(11, 68, 132, 0.6) 0%, rgba(99, 102, 241, 0) 80%)",
          filter: "blur(60px)",
          borderRadius: "9999px",
        }}
      />

      <div className="w-full max-w-6xl overflow-hidden bg-black shadow-2xl rounded-xl">
        <div className="flex flex-col md:flex-row">
          {/* Left Side */}
          <div className="flex flex-col justify-center w-full h-full p-8 md:w-1/2">
            <h2 className="mb-4 text-2xl font-bold text-white transition-opacity duration-500 sm:text-3xl md:text-4xl lg:text-5xl">
              {slides[activeIndex].heading}
            </h2>
            <p className="mb-6 text-sm text-gray-300 transition-opacity duration-500 sm:text-base md:text-lg lg:text-lg">
              {slides[activeIndex].text}
            </p>

            {/* Progress Bar */}
            <div className="h-1 overflow-hidden bg-gray-700 rounded-full">
              <div
                className="h-full transition-all duration-100 ease-linear bg-emerald-500"
                style={{ width: `${progress}%` }}
              ></div>
            </div>

            {/* Dots */}
            <div className="flex gap-2 mt-4">
              {slides.map((_, i) => (
                <div
                  key={i}
                  className={`w-2 h-2 rounded-full ${
                    i === activeIndex ? "bg-blue-500" : "bg-gray-600"
                  }`}
                ></div>
              ))}
            </div>
          </div>

          {/* Right Side: Images */}
          <div className="relative w-full h-64 md:w-1/2 md:h-auto">
            {slides.map((slide, i) => (
              <img
                key={i}
                src={slide.image}
                alt={slide.heading}
                className={`absolute inset-0 object-cover w-full h-full transition-opacity duration-500 ${
                  i === activeIndex ? "opacity-100" : "opacity-0"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TradeCaptureSection;
