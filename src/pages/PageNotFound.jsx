import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const PageNotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0D1117] flex flex-col items-center justify-center text-white px-6 text-center">
      <h1 className="text-[8rem] font-bold text-customRed drop-shadow-md">404</h1>
      <h2 className="text-2xl md:text-3xl font-semibold mb-4">Oops! Page Not Found</h2>
      <p className="text-lg text-gray-400 max-w-md mb-8">
        {`The page you're looking for doesn't exist or has been moved. Please check the URL or return to the homepage.`}
      </p>
      <button
        onClick={() => navigate('/')}
        className="flex items-center gap-2 bg-customGreen hover:bg-green-600 transition-all duration-200 text-white font-medium px-5 py-3 rounded-md"
      >
        <ArrowLeft size={20} />
        Back to Home
      </button>
    </div>
  );
};

export default PageNotFound;
