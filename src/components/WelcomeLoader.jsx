// import welcomeLogo from "../img/logo_light.png";
import BigLogo from "../img/BigLogoIcon.png";


const WelcomeLoader = () => {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black">
      {/* Fading background overlay */}
      <div className="absolute inset-0 bg-black opacity-90 animate-fadeOutSlow" />

      {/* Glowing radial background */}
      <div className="absolute w-[180%] h-[180%] bg-gradient-radial from-emerald-400/10 via-emerald-500/20 to-transparent rounded-full blur-3xl animate-pulseSlow" />

      {/* Content container */}
      <div className="relative z-10 flex flex-col items-center px-4 text-center sm:px-6 md:px-8">
        {/* Welcome Text */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[4rem] font-extrabold bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 bg-clip-text text-transparent animate-fadeInOut drop-shadow-lg">
          Welcome to
        </h1>

        {/* Logo */}
        <img
          src={BigLogo}
          alt="Crown Exchange Logo"
          className="mt-6 h-14 sm:h-20 md:h-24 lg:h-28 animate-zoomIn"
        />
      </div>

      {/* Optional dots or footer placeholder */}
      <div className="absolute flex justify-center w-full bottom-8">
        <div className="flex gap-2">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce" />
          <div className="w-2 h-2 delay-150 bg-green-400 rounded-full animate-bounce" />
          <div className="w-2 h-2 delay-300 bg-green-400 rounded-full animate-bounce" />
        </div>
      </div>

      {/* Animations */}
      <style>
        {`
          @keyframes fadeInOut {
            0%, 100% { opacity: 0; }
            50% { opacity: 1; }
          }

          @keyframes fadeOutSlow {
            0% { opacity: 1; }
            100% { opacity: 0.95; }
          }

          @keyframes zoomIn {
            0% { transform: scale(0.9); opacity: 0; }
            100% { transform: scale(1); opacity: 1; }
          }

          .animate-fadeInOut {
            animation: fadeInOut 2.5s ease-in-out infinite;
          }

          .animate-fadeOutSlow {
            animation: fadeOutSlow 5s ease-in-out forwards;
          }

          .animate-zoomIn {
            animation: zoomIn 1s ease-out forwards;
          }

          .animate-pulseSlow {
            animation: pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite;
          }
        `}
      </style>
    </div>
  );
};

export default WelcomeLoader;
