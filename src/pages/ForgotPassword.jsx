import ForgotPasswordSection from "../components/ForgotPasswordSection"
import Navbar from "../components/Navbar"



const ForgotPassword = () => {
  return (
    <div className="min-h-screen overflow-x-hidden text-white bg-cover bg-slate-900 bg-login">
      <Navbar />
      <ForgotPasswordSection />
    </div>
  )
}

export default ForgotPassword