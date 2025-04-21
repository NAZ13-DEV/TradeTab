import PropTypes from "prop-types";
import { X } from "lucide-react";
import { Link } from "react-router-dom";
import Logo from "../img/logo_1.png";

const MobileMenu = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col w-full max-w-xs p-6 text-white backdrop-blur-lg">
      {/* Top bar */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <img src={Logo} alt="TradeTab logo" className="w-8 h-8" />
          <span className="text-lg font-bold text-green-400">TradeTab</span>
        </div>
        <button onClick={onClose} aria-label="Close menu">
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Navigation links */}
      <ul className="space-y-4 font-medium">
        {[
          ["Home", "/home"],
          ["Metrics", "/metrics"],
          ["Journal", "/journal"],
          ["Forex Calculator", "/forexCalculator"],
          ["Brokers", "/brokers"],
          ["Free University", "/freeUniversity"],
        ].map(([label, path]) => (
          <li key={path}>
            <Link to={path} onClick={onClose} className="block hover:text-[#00c4f4]">
              {label}
            </Link>
          </li>
        ))}
      </ul>

      {/* Buttons */}
      <div className="flex flex-col gap-4 mt-8">
        <Link to="/login" onClick={onClose}>
          <span className="px-5 py-2 transition border border-white rounded-full text-slate-200 hover:bg-white hover:text-black w-fit">
            Login
          </span>
        </Link>
        <div></div>
        <Link to="/register" onClick={onClose}>
          <span className="px-5 py-2 transition border border-white rounded-full text-slate-200 hover:bg-white hover:text-black w-fit">
            Register
          </span>
        </Link>
      </div>
    </div>
  );
};

MobileMenu.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default MobileMenu;
