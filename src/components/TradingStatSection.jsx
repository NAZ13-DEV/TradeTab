import { useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import Bg4 from "../img/bg4.jpg";

const textLines = [
  "Trading Stats",
  "Dynamic Trader Chart",
  "Months Activity",
  "Profit vs Loss",
  "Calendar Journal ↗",
];

const lineVariants = {
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: "easeOut" },
  },
  hidden: {
    opacity: 0.2,
    y: 20,
    filter: "blur(8px)",
    transition: { duration: 0.4, ease: "easeIn" },
  },
};

import PropTypes from "prop-types";

const ScrollBlurLine = ({ children }) => {
  const ref = useRef(null);
  const controls = useAnimation();

  useEffect(() => {
    const el = ref.current;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          controls.start("visible");
        } else {
          controls.start("hidden");
        }
      },
      { threshold: 0.5 }
    );

    if (el) observer.observe(el);
    return () => {
      if (el) observer.unobserve(el);
    };
  }, [controls]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={lineVariants}
    >
      {children}
    </motion.div>
  );
};

const TradingStatsSection = () => {
  return (
    <div className="relative flex items-center justify-center min-h-screen px-4 py-20 overflow-hidden bg-purple-500">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-center bg-cover parallax"
        style={{ backgroundImage: `url(${Bg4})` }}
      ></div>

      {/* Foreground Content */}
      <div className="relative z-10 w-full max-w-4xl mx-auto">
        <section className="space-y-6 text-3xl font-bold leading-snug text-center text-teal-200 sm:text-4xl md:text-6xl lg:text-7xl">
          {textLines.map((line, i) => (
            <ScrollBlurLine key={i}>{line}</ScrollBlurLine>
          ))}
        </section>
      </div>
    </div>
  );
};

ScrollBlurLine.propTypes = {
  children: PropTypes.node.isRequired,
};

export default TradingStatsSection;
