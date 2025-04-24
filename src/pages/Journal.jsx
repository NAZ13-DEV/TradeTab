import FooterTwo from "../components/FooterTwo"
import Navbar from "../components/Navbar"
import TradingJournal from "../components/TradingJournal"

const Journal = () => {
  return (
    <div className="min-h-screen overflow-x-hidden text-white bg-slate-900 ">
      <Navbar />
      <TradingJournal/>
      <FooterTwo/>

    </div>
  )
}

export default Journal