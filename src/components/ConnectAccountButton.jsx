import { Link } from "react-router-dom";

const ConnectAccountButton = () => (
  <Link
    to="/register"
    className="fixed z-50 px-4 py-2 font-sans text-sm text-white transform bg-teal-600 rounded-lg shadow-xl sm:text-base md:text-lg lg:text-xl hover:bg-teal-500 hover:text-white bottom-6 left-4 sm:bottom-8 sm:left-6 md:left-10"
  >
    <p className="leading-5 text-center text-transparent whitespace-pre-wrap rounded-lg sm:leading-6 bg-gradient-to-r from-slate-200 to-slate-100 bg-clip-text">
      Connect Your Account For Free
    </p>
  </Link>
);

export default ConnectAccountButton;
