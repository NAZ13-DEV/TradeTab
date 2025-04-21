import { useState } from "react";
import { Menu } from "lucide-react";
import { Link } from "react-router-dom";
import MobileMenu from "./MobileMenu";
import Logo from "../img/logo_1.png";
import useBreakpoint from "../components/UseBreakpoint";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const breakpoint = useBreakpoint();

  const navLinks = [
    ["Home", "/home"],
    ["Metrics", "/metrics"],
    ["Journal", "/journal"],
    ["Forex Calculator", "/forexCalculator"],
    ["Brokers", "/brokers"],
    ["Free University", "/freeUniversity"],
  ];

  return (
    <>
      {/* ✅ Visible only at md screens */}
      {breakpoint === "md" && (
       <nav className="fixed top-0 left-0 z-50 w-full bg-[#0a0f1a] px-4 py-4 backdrop-blur-md m-0 border-none">
       <div className="flex items-start justify-between w-full md:flex-row md:items-start">
         {/* Left: Logo */}
         <div className="flex items-center space-x-2 text-xl font-bold">
           <img src={Logo} alt="TradeTab" className="w-8 h-8" />
           <span className="text-green-400">Trade</span>
           <span>Tab</span>
         </div>
     
         {/* Right: Telegram at top right */}
         <div className="hidden ml-auto md:block">
           <a
             href="https://t.me/tradetabtelegram"
             target="_blank"
             rel="noreferrer"
             className="flex items-center px-4 py-2 space-x-2 text-sm font-medium text-white transition-all duration-300 rounded-full bg-[#229ED9] hover:bg-[#1c8cc2] shadow-lg hover:scale-105"
           >
             <svg
               stroke="currentColor"
               fill="currentColor"
               viewBox="0 0 496 512"
               className="w-5 h-5"
             >
               <path d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm121.8 169.9l-40.7 191.8c-3 13.6-11.1 16.9-22.4 10.5l-62-45.7-29.9 28.8c-3.3 3.3-6.1 6.1-12.5 6.1l4.4-63.1 114.9-103.8c5-4.4-1.1-6.9-7.7-2.5l-142 89.4-61.2-19.1c-13.3-4.2-13.6-13.3 2.8-19.7l239.1-92.2c11.1-4 20.8 2.7 17.2 19.5z" />
             </svg>
             <span className="hidden text-xs md:inline">Join our Telegram</span>
           </a>
         </div>
       </div>
     
       {/* Center Nav Links */}
       <div className="justify-center hidden mt-4 md:flex">
         <ul className="flex items-center px-4 py-2 border rounded-full border-slate-300/20 bg-[#0a0f1a] space-x-4">
           {navLinks.map(([label, path]) => (
             <li key={path}>
               <Link
                 to={path}
                 className="text-sm text-gray-300 px-2 py-1 rounded-md font-medium hover:text-[#00c4f4]"
               >
                 {label}
               </Link>
             </li>
           ))}
         </ul>
       </div>
     
       {/* Center Login & Register */}
       <div className="justify-center hidden gap-4 mt-4 md:flex">
         <Link to="/login">
           <div className="flex items-center px-4 py-2 text-gray-300 transition bg-gray-800 border rounded-full border-gray-400/50 hover:scale-105">
             <svg
               stroke="currentColor"
               fill="currentColor"
               viewBox="0 0 24 24"
               className="w-4 h-4"
             >
               <path d="M12 2a5 5 0 1 0 5 5 5 5 0 0 0-5-5zm0 8a3 3 0 1 1 3-3 3 3 0 0 1-3 3zm9 11v-1a7 7 0 0 0-7-7h-4a7 7 0 0 0-7 7v1h2v-1a5 5 0 0 1 5-5h4a5 5 0 0 1 5 5v1z" />
             </svg>
             <span className="ml-2 text-sm text-slate-200">Login</span>
           </div>
         </Link>
     
         <Link to="/register">
           <div className="flex items-center px-4 py-2 text-gray-300 transition bg-gray-800 border-2 border-teal-600 rounded-full hover:scale-105">
             <svg
               stroke="currentColor"
               fill="currentColor"
               viewBox="0 0 24 24"
               className="w-4 h-4"
             >
               <path d="M12.14 2a10 10 0 1 0 10 10 10 10 0 0 0-10-10zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z" />
               <path d="M16.14 10a3 3 0 0 0-3-3h-5v10h2v-4h1.46l2.67 4h2.4l-2.75-4.12A3 3 0 0 0 16.14 10zm-3 1h-3V9h3a1 1 0 0 1 0 2z" />
             </svg>
             <span className="ml-2 text-sm text-slate-200 whitespace-nowrap">Register For Free</span>
           </div>
         </Link>
       </div>
     
       {/* Mobile Section */}
       <div className="flex items-center justify-end mt-2 md:hidden">
         <a
           href="https://t.me/tradetabtelegram"
           target="_blank"
           rel="noreferrer"
           className="p-2 bg-blue-500 rounded-full"
           aria-label="Telegram"
         >
           <svg
             stroke="currentColor"
             fill="currentColor"
             viewBox="0 0 496 512"
             className="w-6 h-6 text-white"
           >
             <path d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm121.8 169.9l-40.7 191.8c-3 13.6-11.1 16.9-22.4 10.5l-62-45.7-29.9 28.8c-3.3 3.3-6.1 6.1-12.5 6.1l4.4-63.1 114.9-103.8c5-4.4-1.1-6.9-7.7-2.5l-142 89.4-61.2-19.1c-13.3-4.2-13.6-13.3 2.8-19.7l239.1-92.2c11.1-4 20.8 2.7 17.2 19.5z" />
           </svg>
         </a>
         <button onClick={() => setIsOpen(true)} aria-label="Open menu" className="ml-2">
           <Menu className="w-8 h-8 text-white hover:bg-gray-700 hover:rounded-md" />
         </button>
       </div>
     </nav>
     
      )}

      {/* ✅ Visible at sm and lg screens (but hidden at md) */}
      {(breakpoint === "sm" || breakpoint === "lg") && (
        <nav className="fixed top-0 left-0 z-50 flex w-full items-center justify-between px-4 py-4 bg-[#0a0f1a]/90 backdrop-blur-lg text-white">
        {/* Logo */}
        <div className="flex items-center space-x-2 text-xl font-bold">
          <img src={Logo} alt="TradeTab" className="w-8 h-8" />
          <span className="text-green-400">Trade</span>Tab
        </div>

        {/* Desktop Nav */}
        <div className="items-center hidden space-x-4 md:flex">
          <div className="flex items-center px-4 py-2 border rounded-full border-slate-300/20 ">
            <ul className="flex space-x-4">
              {navLinks.map(([label, path]) => (
                <li key={path}>
                  <Link
                    to={path}
                    className="text-[12px]  text-gray-300 px-2 py-1 rounded-md font-medium hover:text-[#00c4f4]"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Login Button */}
          <Link to="/login">
            <div className="flex items-center px-4 py-2 text-gray-300 transition bg-gray-800 border rounded-full border-gray-400/50 hover:scale-105">
              <svg
                stroke="currentColor"
                fill="currentColor"
                viewBox="0 0 24 24"
                className="w-4 h-4"
              >
                <path d="M12 2a5 5 0 1 0 5 5 5 5 0 0 0-5-5zm0 8a3 3 0 1 1 3-3 3 3 0 0 1-3 3zm9 11v-1a7 7 0 0 0-7-7h-4a7 7 0 0 0-7 7v1h2v-1a5 5 0 0 1 5-5h4a5 5 0 0 1 5 5v1z" />
              </svg>
              <span className="ml-2 text-sm text-slate-200">Login</span>
            </div>
          </Link>

          {/* Register Button */}
          <Link to="/register">
            <div className="flex items-center px-4 py-2 text-gray-300 transition bg-gray-800 border-2 border-teal-600 rounded-full hover:scale-105">
              <svg
                stroke="currentColor"
                fill="currentColor"
                viewBox="0 0 24 24"
                className="w-4 h-4"
              >
                <path d="M12.14 2a10 10 0 1 0 10 10 10 10 0 0 0-10-10zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z" />
                <path d="M16.14 10a3 3 0 0 0-3-3h-5v10h2v-4h1.46l2.67 4h2.4l-2.75-4.12A3 3 0 0 0 16.14 10zm-3 1h-3V9h3a1 1 0 0 1 0 2z" />
              </svg>
              <span className="ml-2 text-sm text-slate-200 whitespace-nowrap">
                Register For Free
              </span>
            </div>
          </Link>

          {/* Telegram Button */}
          <a
            href="https://t.me/tradetabtelegram"
            target="_blank"
            rel="noreferrer"
            className="flex items-center px-4 py-2 space-x-2 text-sm font-medium text-white transition-all duration-300 rounded-full bg-[#229ED9] hover:bg-[#1c8cc2] shadow-lg hover:scale-105"
          >
            <svg
              stroke="currentColor"
              fill="currentColor"
              viewBox="0 0 496 512"
              className="w-5 h-5"
            >
              <path d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm121.8 169.9l-40.7 191.8c-3 13.6-11.1 16.9-22.4 10.5l-62-45.7-29.9 28.8c-3.3 3.3-6.1 6.1-12.5 6.1l4.4-63.1 114.9-103.8c5-4.4-1.1-6.9-7.7-2.5l-142 89.4-61.2-19.1c-13.3-4.2-13.6-13.3 2.8-19.7l239.1-92.2c11.1-4 20.8 2.7 17.2 19.5z" />
            </svg>
            <span className="hidden text-xs md:inline">Join our Telegram</span>
          </a>
        </div>

        {/* Mobile Actions */}
        <div className="flex items-center ml-auto space-x-3 md:hidden">
          <a
            href="https://t.me/tradetabtelegram"
            target="_blank"
            rel="noreferrer"
            className="p-2 bg-blue-500 rounded-full"
            aria-label="Telegram"
          >
            <svg
              stroke="currentColor"
              fill="currentColor"
              viewBox="0 0 496 512"
              className="w-6 h-6 text-white"
            >
              <path d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm121.8 169.9l-40.7 191.8c-3 13.6-11.1 16.9-22.4 10.5l-62-45.7-29.9 28.8c-3.3 3.3-6.1 6.1-12.5 6.1l4.4-63.1 114.9-103.8c5-4.4-1.1-6.9-7.7-2.5l-142 89.4-61.2-19.1c-13.3-4.2-13.6-13.3 2.8-19.7l239.1-92.2c11.1-4 20.8 2.7 17.2 19.5z" />
            </svg>
          </a>

          {/* Menu Icon */}
          <button onClick={() => setIsOpen(true)} aria-label="Open menu">
            <Menu className="w-8 h-8 text-white hover:bg-gray-700 hover:rounded-md" />
          </button>
        </div>
      </nav>
      )}

      {/* Mobile Menu Drawer */}
      {isOpen && <MobileMenu onClose={() => setIsOpen(false)} />}
    </>
  );
};

export default Navbar;
