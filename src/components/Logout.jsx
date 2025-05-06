import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear session
    document.cookie = 'uId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    document.cookie = 'session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    localStorage.removeItem('uId');
    localStorage.removeItem('url');

    // Delay redirect
    const timeout = setTimeout(() => {
      navigate('/login');
    }, 2500);

    return () => clearTimeout(timeout);
  }, [navigate]);

  return (
    <div className="flex items-center justify-center  bg-gradient-to-br from-[#050A1D] to-[#0e1628] px-4">
      <div className="text-center animate-fadeInSlow relative">
        {/* Glowing pulse background */}
        <div className="absolute -inset-10 bg-gradient-to-r from-green-400 via-emerald-600 to-blue-500 opacity-10 blur-2xl rounded-full animate-pulse z-0" />

        {/* Spinner */}
        <div className="relative mb-8 z-10">
          <div className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
        </div>

        {/* Texts */}
        <h3 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent mb-3 z-10 relative">
          Logging out...
        </h3>
        <p className="text-slate-400 text-base mb-6 z-10 relative">
          You’ll be redirected to login shortly
        </p>

        {/* Progress Bar */}
        <div className="relative w-64 h-3 bg-gray-800 rounded-full overflow-hidden mx-auto z-10">
          <div className="absolute top-0 left-0 h-full w-full bg-gradient-to-r from-emerald-400 to-emerald-600 animate-slideRight" />
        </div>
      </div>
    </div>
  );
};

export default Logout;
