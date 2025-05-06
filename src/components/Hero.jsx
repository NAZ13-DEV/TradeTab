import Logo from "../img/mt45-logo.png";
// import background from '../img/up.png'; // make sure the image is in the correct folder

const Hero = () => {
  return (
    <section className="px-4 py-10 text-center text-white mt-[-3.5rem] "
    >
      
    
      
      <div className="inline-flex items-center justify-center w-full gap-1 mx-auto mt-5 mb-6 md:mt-20">
        <img className="rounded-full shadow-sm size-16" src={Logo} alt="MT4/MT5 Logo"/>
        <div className="flex items-center justify-center gap-1 text-sm font-medium tracking-wide text-teal-100"><svg stroke="currentColor" fill="currentColor"  viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M440.65 12.57l4 82.77A247.16 247.16 0 0 0 255.83 8C134.73 8 33.91 94.92 12.29 209.82A12 12 0 0 0 24.09 224h49.05a12 12 0 0 0 11.67-9.26 175.91 175.91 0 0 1 317-56.94l-101.46-4.86a12 12 0 0 0-12.57 12v47.41a12 12 0 0 0 12 12H500a12 12 0 0 0 12-12V12a12 12 0 0 0-12-12h-47.37a12 12 0 0 0-11.98 12.57zM255.83 432a175.61 175.61 0 0 1-146-77.8l101.8 4.87a12 12 0 0 0 12.57-12v-47.4a12 12 0 0 0-12-12H12a12 12 0 0 0-12 12V500a12 12 0 0 0 12 12h47.35a12 12 0 0 0 12-12.6l-4.15-82.57A247.17 247.17 0 0 0 255.83 504c121.11 0 221.93-86.92 243.55-201.82a12 12 0 0 0-11.8-14.18h-49.05a12 12 0 0 0-11.67 9.26A175.86 175.86 0 0 1 255.83 432z"></path></svg><span>Auto-Sync</span></div></div>
        
        {/* <div className="inline-block px-4 py-1 mb-6 text-sm text-white bg-teal-800 rounded-full">
        ⭐ Over 20,000 Happy TradeTab Users!
      </div> */}

      <h1 className="mb-4 text-4xl font-bold leading-tight md:text-6xl">
        Track Trades, <span className="text-green-400">Grow Profits</span><br /> & Master Strategy
      </h1>
      <p className="mb-8 text-lg text-gray-300">
        {`Crown Exchange's powerful trading journal gives you focus, clarity and real-time edge.`}
      </p>
    </section>
  );
};

export default Hero;
