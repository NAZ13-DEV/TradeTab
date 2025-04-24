
import BrokersSection from '../components/BrokerSection';
import Chart from '../components/Chart';
import ContactUs from '../components/ContactUs';
import Faq from '../components/Faq';
import FeatureSection from '../components/FeatureSection';
import FeatureShowcase from '../components/FeatureShowcase';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import Performance from '../components/Performance';
import ProfitLoss from '../components/ProfitLoss';
import Trader from '../components/Trader';
import WhatsAppButton from '../components/WhatsappButton';
import WhyChooseUs from '../components/WhyChooseUs';
import Heroes from './Heroes';

const Home = () => {
  return (
    <div className='min-h-screen overflow-x-hidden text-white bg-slate-900 '>
      <Navbar  />
      <Heroes />

      <div className="bg-[#0a0f1a]">
      <Chart />
      <Performance/>
      <ProfitLoss />
      <Trader/>
      <FeatureShowcase />
      <BrokersSection />
      <WhyChooseUs />
      <FeatureSection />
      <Faq/>
      <ContactUs/>
      <Footer/>
      <WhatsAppButton/>
      </div>
    </div>
  );
};

export default Home;
