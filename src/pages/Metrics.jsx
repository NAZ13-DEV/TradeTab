import Footer from "../components/Footer"
import HeroParallax from "../components/HeroParallax"
import IndicatorsSection from "../components/IndicatorSection"
import Navbar from "../components/Navbar"
import TradeCaptureSection from "../components/TradeCaptureSection"
import TradingStatsSection from "../components/TradingStatSection"

const Metrics = () => {
  return (
    <div className="min-h-screen overflow-x-hidden text-white ">
      <Navbar />
      <HeroParallax/>
      <IndicatorsSection/>
      <TradeCaptureSection/>
      <TradingStatsSection/>
      <Footer/>
    </div>
  )
}

export default Metrics