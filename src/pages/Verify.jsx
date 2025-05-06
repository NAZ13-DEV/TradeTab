import Navbar from "../components/Navbar";
import FooterTwo from "../components/FooterTwo";

const Verify = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#0f172a] flex items-center justify-center px-4">
        <div className="max-w-xl text-center">
          <h1 className="mb-4 text-3xl font-semibold lg:text-4xl text-emerald-400">
            Check Your Email 📬
          </h1>
          <p className="text-base leading-relaxed text-gray-300 lg:text-lg">
            A password reset link has been sent to your email address. Please check your inbox and follow the instructions to reset your password.
          </p>

          <div className="flex justify-center mt-10">
            <div className="w-[200px] h-2 rounded-lg bg-gradient-to-r from-emerald-500 to-blue-700 animate-pulse" />
          </div>
        </div>
      </div>
      <FooterTwo />
    </>
  );
};

export default Verify;
