import welcomeLogo from "../img/logo_light.png"; // Adjust path if needed

const WelcomeLoader = () => {
  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center bg-black">
      {/* Black fade-out background */}
      <div className="absolute inset-0 bg-black animate-fadeOut z-[99999]" />

      {/* Fullscreen overflow container */}
      <div className="absolute inset-0 overflow-hidden z-[1000]" />

      {/* Main Content */}
      <div className="relative z-[2001] flex flex-col items-center justify-center px-4 sm:px-6 md:px-8 text-center w-full max-w-screen">
        {/* Radial background glow */}
        <div className="absolute z-[2001] w-[130%] h-[130%] sm:w-[140%] sm:h-[140%] md:w-[160%] md:h-[160%] bg-gradient-radial from-black/80 to-transparent rounded-full blur-xl sm:blur-2xl md:blur-3xl" />

        {/* Welcome Text + Logo */}
        <div className="relative z-[2002] flex flex-col items-center space-y-6">
          <p className="text-3xl sm:text-4xl md:text-6xl lg:text-[4rem] font-bold bg-gradient-to-r from-green-400 to-teal-500 bg-clip-text text-transparent animate-fadeInOut drop-shadow-[2px_10px_16px_rgba(0,0,0,1)]">
            Welcome to
          </p>
          <img
            src={welcomeLogo}
            alt="TradeTab Logo"
            className="h-12 px-3 sm:h-16 md:h-24 lg:h-28 xl:h-32 sm:px-4 md:px-5 div_entry_2"
          />
        </div>
      </div>

      {/* Reserved footer space for loading dots or CTA */}
      <div className="absolute bottom-6 sm:bottom-8 md:bottom-10 left-0 right-0 flex justify-center z-[2003] px-4 sm:px-0" />
    </div>
  );
};

export default WelcomeLoader;
