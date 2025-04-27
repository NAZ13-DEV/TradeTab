import PropTypes from "prop-types";
import { X } from "lucide-react";
import Logo from "../img/logo_1.png";

const MobileMenuDashboard = ({ onClose, scrollToSection }) => {
  const handleClick = (id) => {
    scrollToSection(id);  // scroll to the section
    onClose();            // then close the mobile menu
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col w-full max-w-xs p-6 text-white backdrop-blur-lg" data-aos="fade-right">
      {/* Top Bar */}
      <div className="flex items-center justify-between mb-6">
        <button onClick={() => handleClick("metrics")} className="flex items-center space-x-2 text-lg font-bold">
          <img src={Logo} alt="TradeTab logo" className="w-8 h-8" />
          <span className="text-green-400">Trade</span>Tab
        </button>
        <button onClick={onClose} aria-label="Close menu">
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Navigation Links */}
      <ul className="space-y-4 font-medium">
        {[
          ["Metrics", "metrics"],
          ["Journal", "journal"],
          ["MT Accounts", "MTaccount"],
          ["Forex Calculators", "forexCalculator"],
        ].map(([label, id]) => (
          <li key={id}>
            <button
              onClick={() => handleClick(id)}
              className="block text-left hover:text-[#00c4f4] w-full"
            >
              {label}
            </button>
          </li>
        ))}
        <li>
          <a
            href="https://t.me/tradetabtelegram"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1 px-3 py-2 bg-gradient-to-r from-[#229ED9] via-[#169cda] to-[#229ED9] hover:from-[#229ED9] hover:to-blue-800 text-white hover:text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out w-full text-center"
          >
            <i className="fab fa-telegram-plane text-[20px]" />
            <span className="mt-auto text-sm font-semibold md:text-lg">Join our free telegram</span>
          </a>
        </li>
      </ul>
    </div>
  );
};

MobileMenuDashboard.propTypes = {
  onClose: PropTypes.func.isRequired,
  scrollToSection: PropTypes.func.isRequired,
};

export default MobileMenuDashboard;
