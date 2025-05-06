import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Navbar from '../components/Navbar';
import FooterTwo from '../components/FooterTwo';

const PageNotFound = () => {
  const navigate = useNavigate();

  return (
    <>
    <Navbar/>
    <div className="min-h-screen bg-[#0D1117] flex flex-col items-center justify-center text-white px-6 text-center">
      <h1 className="text-[8rem] font-bold text-customRed drop-shadow-md">404</h1>
      <h2 className="mb-4 text-2xl font-semibold md:text-3xl">Oops! Page Not Found</h2>
      <p className="max-w-md mb-8 text-lg text-gray-400">
        {`The page you're looking for doesn't exist or has been moved. Please check the URL or return to the homepage.`}
      </p>
      <button
        onClick={() => navigate('/')}
        className="flex items-center gap-2 px-5 py-3 font-medium text-white transition-all duration-200 rounded-md bg-customGreen hover:bg-green-600"
      >
        <ArrowLeft size={20} />
        Back to Home
      </button>
    </div>

    <FooterTwo/>
    </>
  );
};

export default PageNotFound;
