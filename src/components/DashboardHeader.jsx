import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../img/logo_light.png";
import Profile from "../img/profile_pic.png";
import MobileMenuDashboard from "./MobileMenuDashboard";
import ForexCalculatorSections from "./ForexCalculatorSections";
import MTAccountSection from "./MTAccountSection";
import DashboardMetrics from "./DashboardMetrics";

const DashboardHeader = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Metrics");
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const profileRef = useRef(null);
  const metricsRef = useRef(null);
  const journalRef = useRef(null);
  const accountRef = useRef(null);
  const forexCalculatorRef = useRef(null);

  const renderTabContent = () => {
    switch (activeTab) {
      case "Metrics":
        return (
          <div className="text-white" id="metrics" ref={metricsRef}>
            <DashboardMetrics />
          </div>
        );
      case "Journal":
        return (
          <div className="p-6 text-white" id="journal" ref={journalRef}>
            This is Journal content
          </div>
        );
      case "MT Accounts":
        return (
          <div id="MTaccount" ref={accountRef}>
            <MTAccountSection />
          </div>
        );
      case "Forex Calculators":
        return (
          <div id="forexCalculator" ref={forexCalculatorRef}>
            <ForexCalculatorSections />
          </div>
        );
      default:
        return null;
    }
  };

  const handleScrollToSection = (section) => {
    let ref = null;
    switch (section) {
      case "metrics":
        ref = metricsRef;
        setActiveTab("Metrics");
        break;
      case "journal":
        ref = journalRef;
        setActiveTab("Journal");
        break;
      case "MTaccount":
        ref = accountRef;
        setActiveTab("MT Accounts");
        break;
      case "forexCalculator":
        ref = forexCalculatorRef;
        setActiveTab("Forex Calculators");
        break;
      default:
        break;
    }
    if (ref?.current) {
      setTimeout(() => {
        ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
        setIsOpen(false); // Close mobile menu after scroll
      }, 100);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <header className="sticky top-0 z-50 w-full transition-colors duration-300 bg-transparent backdrop-blur-lg">
        <div className="flex items-center justify-between w-full px-6 py-3 font-semibold text-white shadow-md bg-gradient-to-r from-teal-400 to-indigo-700">
          <p className="text-xl text-transparent whitespace-pre-wrap rounded-lg xl:text-2xl bg-gradient-to-r from-teal-800 to-slate-600 bg-clip-text">
            Example Mode
          </p>
          <Link
            onClick={() => handleScrollToSection("MTaccount")}
            className="px-3 py-2 text-sm font-medium text-indigo-600 transition-all duration-300 bg-white rounded-lg md:text-lg hover:bg-indigo-100"
          >
            Connect an Account
          </Link>
        </div>

        <div className="flex items-center justify-between px-5 py-2 bg-[#050A1D]">
          <div className="flex w-full gap-5 md:w-fit">
            <button className="text-2xl text-white lg:hidden" onClick={() => setIsOpen(true)}>
              <i className="fas fa-bars"></i>
            </button>
            <div className="flex justify-center w-full md:justify-normal">
              <button onClick={() => handleScrollToSection("metrics")}>
                <img src={logo} alt="logo" className="h-8" />
              </button>
            </div>
          </div>

          <div className="z-20 flex flex-col items-center justify-center md:flex-row md:space-x-2">
            <div className="hidden md:block">
              <a
                href="https://t.me/tradetabtelegram"
                target="_blank"
                rel="noopener noreferrer"
                className="w-fit hidden md:flex items-center justify-center gap-1 px-3 py-2 bg-gradient-to-r from-[#229ED9] via-[#169cda] to-[#229ED9] hover:from-[#229ED9] hover:to-blue-800 text-white hover:text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out"
              >
                <i className="fab fa-telegram-plane text-[20px]" />
                <span className="mt-auto text-sm font-semibold md:text-lg">Join our free telegram</span>
              </a>
            </div>

            {/* Profile Dropdown */}
            <div className="relative flex items-center justify-center px-1 rounded-lg" ref={profileRef}>
              <div
                onClick={() => setShowProfileMenu((prev) => !prev)}
                className="relative flex items-center justify-center w-8 h-8 mx-4 rounded-full cursor-pointer profile_picture_default bg-slate-500"
              >
                <img src={Profile} alt="Profile_Picture" className="rounded-full" />
                <span className="absolute right-0 w-4 h-4 bg-green-500 rounded-full -bottom-1" />
              </div>

              {showProfileMenu && (
                <div className="absolute right-0 z-50 w-40 p-2 mt-12 bg-[#111] text-white rounded-md shadow-md border border-gray-700 text-sm space-y-2">
                  <Link to="/settings" className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-800">
                    <i className="fas fa-cog"></i> Settings
                  </Link>
                  <Link to="/jobs" className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-800">
                    <i className="fas fa-briefcase"></i> Jobs
                  </Link>
                  <div className="border-t border-gray-600" />
                  <div className="flex items-center gap-2 px-2 py-2">
                    <span className="w-3 h-3 bg-green-500 rounded-full"></span> Online
                  </div>
                  <div className="border-t border-gray-600" />
                  <button className="flex items-center w-full gap-2 p-2 text-left rounded-md hover:bg-gray-800">
                    <i className="fas fa-sign-out-alt"></i> Log out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Top navigation bar */}
        <nav className="left-0 right-0 z-10 flex-col hidden w-full px-3 py-0 mt-0 transition-colors duration-300 lg:flex lg:flex-row lg:items-center md:mt-0 lg:w-auto backdrop-blur-lg top-full lg:py-0 bg-[#050A1D]">
          <ul className="flex-col gap-4 px-5 pb-8 space-y-5 text-base text-white lg:flex lg:flex-row md:space-y-0 md:pb-1 lg:text-xl md:border-b md:border-teal-500 lg:border-none lg:px-0">
            {[
              ["Metrics", "metrics"],
              ["Journal", "journal"],
              ["MT Accounts", "MTaccount"],
              ["Forex Calculators", "forexCalculator"],
            ].map(([label, id]) => (
              <li
                key={id}
                onClick={() => handleScrollToSection(id)}
                className="px-1 cursor-pointer md:px-2 hover:text-teal-500"
              >
                {label}
              </li>
            ))}
            <li>
              <a href="#" className="px-1 cursor-pointer md:px-2 hover:text-teal-500">Free University</a>
            </li>
            <li>
              <a
                href="https://t.me/tradetabtelegram"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex lg:hidden items-center justify-center gap-1 px-3 py-2 bg-gradient-to-r from-[#229ED9] via-[#169cda] to-[#229ED9] hover:from-[#229ED9] hover:to-blue-800 text-white hover:text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out"
              >
                <i className="fab fa-telegram-plane text-[20px]" />
                <span className="mt-auto text-sm font-semibold md:text-lg">Join our free telegram</span>
              </a>
            </li>
          </ul>
        </nav>
      </header>

      {isOpen && <MobileMenuDashboard onClose={() => setIsOpen(false)} scrollToSection={handleScrollToSection} />}
      <div>{renderTabContent()}</div>
    </>
  );
};

export default DashboardHeader;
