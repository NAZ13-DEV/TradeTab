import AccountStats from "./AccountStats"
import DashboardFilters from "./DashboardFilters"
import FooterTwo from "./FooterTwo"
import Performance from "./Performance"
import ProfitLosses from "./ProfitLosses"
import TradingDashboard from "./TradingDashboard"

function DashboardMetrics() {
  return (
    <div  className="bg-[#050A1D]">
      <DashboardFilters/>
      <AccountStats/>
      <TradingDashboard/>
      <Performance/>
      <div className="mb-6"></div>
      <ProfitLosses/>
        <div className="mb-6"></div>
        <div className="mb-6">
        <p className="pt-2 pl-4 my-1 text-xl font-semibold text-white font-poppins">Recently closed trades</p>
        <p className="text-center text-green-500">No trades yet</p>
        </div>
        <div className="mb-6"></div>
        <FooterTwo/>
    </div>
  )
}

export default DashboardMetrics
