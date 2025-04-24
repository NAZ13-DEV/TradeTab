import ConnectAccountButton from "../components/ConnectAccountButton"
import Footer from "../components/Footer"
import HeroParallax from "../components/HeroParallax"
import IndicatorsSection from "../components/IndicatorSection"
import Navbar from "../components/Navbar"
import TradeCaptureSection from "../components/TradeCaptureSection"
import TradingStatsSection from "../components/TradingStatSection"

const Metrics = () => {
  return (
    <div className="min-h-screen overflow-x-hidden text-white bg-slate-900 ">
      <Navbar />
      <HeroParallax/>
      <IndicatorsSection/>
      <TradeCaptureSection/>
      <TradingStatsSection/>
      <Footer/>
      <ConnectAccountButton/>
    </div>
  )
}

export default Metrics