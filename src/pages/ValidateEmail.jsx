// add this file to the pages folder.


import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import api from "../redux/slices/api";
import Navbar from "../components/Navbar";
import FooterTwo from "../components/FooterTwo";

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");
  const mail = searchParams.get("mail");
  const [message, setMessage] = useState("Verifying Your Email Address...");
  const navigate = useNavigate();

  useEffect(() => {
    if (!email || !mail) {
      setMessage("Invalid verification link.");
      return;
    }

    api
      .post("verUser", {
        encryptedEmail: email,
        email: mail,
      })
      .then((response) => {
        if (response.status === 201) {
          setMessage(response.data.message);
          setTimeout(() => {
            navigate("/sign_in");
          }, 3000);
        }
      })
      .catch((error) => {
        const err =
          error.response?.status === 422
            ? error.response.data.errors[0]
            : "Verification failed. Please try again.";
        setMessage(err);
      });
  }, [email, mail, navigate]);

  return (
    <>
    <Navbar/>
    <div className="min-h-screen bg-[#0f172a] flex items-center justify-center">
      <div className="px-6 text-center">
        <h3 className="text-emerald-400 text-2xl lg:text-[32px] font-semibold leading-[38px]">
          {message}
        </h3>
        <div className="w-[190px] mx-auto bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-lg px-2 py-1 mt-8"></div>
      </div>
    </div>
    <FooterTwo/>
    </>
  );
};

export default VerifyEmail;
