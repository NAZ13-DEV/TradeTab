import LoginSection from "../components/LoginSection"
import Navbar from "../components/Navbar"

const Login = () => {
  return (
    <div className="min-h-screen overflow-x-hidden text-white bg-cover bg-slate-900 bg-login ">
      <Navbar />
      <LoginSection/>
    </div>
  )
}

export default Login