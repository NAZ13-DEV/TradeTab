import { motion } from "framer-motion";
import Bg4 from "../img/bg4.jpg";

const textLines = [
  "Trading Stats",
  "Dynamic Trader Chart",
  "Months Activity",
  "Profit vs Loss",
  "Calendar Journal ↗",
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.25,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

const TradingStatsSection = () => {
  return (
    <div className="relative flex items-center justify-center min-h-screen px-4 py-10 overflow-hidden bg-purple-500">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-center bg-cover parallax"
        style={{ backgroundImage: `url(${Bg4})` }}
      ></div>

      {/* Foreground Content */}
      <motion.div
        className="relative z-10 w-full max-w-4xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <section className="space-y-6 text-3xl font-bold leading-snug text-center text-teal-200 sm:text-4xl md:text-6xl lg:text-7xl">
          {textLines.map((line, index) => (
            <motion.div key={index} variants={itemVariants}>
              {line}
            </motion.div>
          ))}
        </section>
      </motion.div>
    </div>
  );
};

export default TradingStatsSection;
