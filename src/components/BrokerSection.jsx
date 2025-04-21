import admiral from "../img/admiral.jpg";
import alpari from "../img/alpari.jpg";
import avatrade from "../img/avatrade.jpg";
import axi from "../img/axi.jpg";
import charles from "../img/charles.jpg";
import city from "../img/city.jpg";
import cmc from "../img/cmc.jpg";
import darwinex from "../img/darwinex.jpg";
import decode from "../img/decode.jpg";
import dukascopy from "../img/dukascopy.jpg";
import easy from "../img/easy.jpg";
import etoro from "../img/etoro.jpg";
import fbs from "../img/fbs.jpg";
import forex from "../img/forex.jpg";
import fxcm from "../img/fxcm.jpg";
import fxotp from "../img/fxotp.jpg";
import fxpro from "../img/fxpro.jpg";
import fxtm from "../img/fxtm.jpg";
import fxview from "../img/fxview.jpg";
import gkg from "../img/gkg.jpg";
import hf from "../img/hf.jpg";
import ig from "../img/ig.jpg";
import instaforex from "../img/instaforex.jpg";
import libertex from "../img/libertex.jpg";
import m4 from "../img/m4.jpg";
import oanda from "../img/oanda.jpg";
import octa from "../img/octa.jpg";
import xm from "../img/xm.jpg";

const rowLogos = [
  [admiral, alpari, avatrade, axi, charles, city, cmc],
  [darwinex, decode, dukascopy, easy, etoro, fbs, forex],
  [fxcm, fxotp, fxpro, fxtm, fxview, gkg, hf],
  [ig, instaforex, libertex, m4, oanda, octa, xm],
];

const BrokersSection = () => {
  return (
    <div className="relative w-full overflow-hidden bg-black">
      {/* Glowing Right Circle */}
      <div
        className="absolute top-0 -right-[15rem] z-0 h-full pointer-events-none w-[50rem]"
        style={{
          background:
            "radial-gradient(circle, rgba(11, 68, 132, 0.6) 0%, rgba(99, 102, 241, 0) 80%)",
          filter: "blur(60px)",
          borderRadius: "9999px",
        }}
      />

      {/* Section Content */}
      <div className="relative z-10 px-4 py-16 mx-auto md:px-24 lg:px-8 lg:py-20">
        <div className="flex flex-col items-center mb-10 text-center">
          <p className="mb-6 text-3xl font-bold text-white sm:text-4xl md:text-5xl">
            Connect with over 1,200+ brokers
          </p>
          <p className="text-xl sm:text-2xl text-slate-200">
            Explore their reviews · Access and browse their forums
          </p>

          <div className="flex items-center justify-center gap-3 pt-6 animate-pulse">
            {[1, 2, 3, 4, 5].map((i) => {
              let sizeClass = "w-8 h-8 sm:w-10 sm:h-10";
              if (i === 2 || i === 4) sizeClass = "w-10 h-10 sm:w-12 sm:h-12";
              if (i === 3) sizeClass = "w-12 h-12 sm:w-14 sm:h-14";

              return (
                <svg
                  key={i}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className={`text-cyan-400 ${sizeClass}`}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                  />
                </svg>
              );
            })}
          </div>
        </div>

        {/* Infinite Logo Sliders */}
        <div>
          {rowLogos.map((logos, rowIndex) => (
            <div key={rowIndex} className="relative w-full overflow-hidden">
              <div
                className={`flex w-max border-t-[0.1px] border-[#1A3B65] ${
                  rowIndex % 2 === 0
                    ? "animate-marquee-left"
                    : "animate-marquee-right"
                }`}
              >
                {[...logos, ...logos].map((logo, i) => (
                  <div
                    key={`${rowIndex}-${i}`}
                    className="flex items-center justify-center px-6 sm:px-10 lg:px-14 py-2 sm:py-4 border-l-[0.1px] border-[#1A3B65] bg-white/5 backdrop-blur-lg"
                  >
                    <img
                      src={logo}
                      alt={`Broker ${i}`}
                      className="object-contain w-24 h-auto rounded-md sm:w-28 md:w-32 lg:w-36"
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BrokersSection;
