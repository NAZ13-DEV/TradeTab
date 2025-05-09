import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import api from "../redux/slices/api";
import Navbar from "../components/Navbar";
import FooterTwo from "../components/FooterTwo";

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const mail = searchParams.get("mail");
  const [message, setMessage] = useState("Verifying Your Email Address...");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token || !mail) {
      setMessage("Invalid verification link.");
      return;
    }

    api
      .post("verUser", {
        token,
        email: mail,
      })
      .then((response) => {
        if (response.status === 201) {
          setMessage(response.data.message);
          setTimeout(() => {
            navigate("/login");
          }, 3000);
        }
      })
      .catch((error) => {
        const err =
          error.response?.status === 422
            ? error.response.data.errors?.[0] || "Verification failed."
            : "Verification failed. Please try again.";
        setMessage(err);
      });
  }, [token, mail, navigate]);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#0f172a] flex items-center justify-center">
        <div className="px-6 text-center">
          <h3 className="text-emerald-400 text-2xl lg:text-[32px] font-semibold leading-[38px]">
            {message}
          </h3>
          <div className="w-[190px] mx-auto bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-lg px-2 py-1 mt-8"></div>
        </div>
      </div>
      <FooterTwo />
    </>
  );
};

export default VerifyEmail;
