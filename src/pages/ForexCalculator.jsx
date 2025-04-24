import FooterTwo from "../components/FooterTwo"
import ForexCalculatorSection from "../components/ForexCalculatorSection"
import Navbar from "../components/Navbar"

const ForexCalculator = () => {
  return (
    <div className="min-h-screen overflow-x-hidden text-white bg-slate-900 ">
       <Navbar />
       <ForexCalculatorSection/>
       <FooterTwo/>
    </div>
  )
}

export default ForexCalculator