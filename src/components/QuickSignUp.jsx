import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/bootstrap.css";
import toast, { Toaster } from "react-hot-toast";
import countries from "country-list";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import videoPlaceholder from "../img/video_ph3.png";
import { registerUser } from "../redux/slices/userSlice";

const countryList = countries.getData();

const validationSchema = Yup.object().shape({
  username: Yup.string().min(3).max(15).required("Username is required"),
  firstName: Yup.string().required("First name is required"),
  last_Name: Yup.string().required("Last name is required"),
  phone: Yup.string().required("Phone number is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().min(8).required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm your password"),
});

const QuickSignupSection = () => {
  const [showVideo, setShowVideo] = useState(false);
  const [countryInput, setCountryInput] = useState("");
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [showExtraForm, setShowExtraForm] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, message, error } = useSelector((state) => state.registerUser);

  const filteredCountries = countryList.filter((country) =>
    country.name.toLowerCase().includes(countryInput.toLowerCase())
  );

  const formik = useFormik({
    initialValues: {
      username: "",
      firstName: "",
      last_Name: "",
      phone: "",
      email: "",
      password: "",
      confirmPassword: "",
      referral: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      dispatch(registerUser(values));
    },
  });

  const handleCountrySelect = (country) => {
    setSelectedCountry(country);
    setCountryInput(country.name);
    setShowCountryDropdown(false);
    formik.setFieldValue("phone", `+${country.code}`);
  };

  const handlePhoneChange = (value) => {
    formik.setFieldValue("phone", `+${value}`);
    setShowExtraForm(value.length >= 6);
  };

  useEffect(() => {
    if (error) toast.error(error);
    if (message === "true") {
      toast.success("Registration successful!");
      setTimeout(() => navigate("/verify"), 2000);
    }
  }, [error, message, navigate]);

  return (
    <main className="flex justify-center px-4 py-16 md:py-24 lg:py-32">
      <Toaster position="top-center" toastOptions={{ style: { background: "#041F3E", color: "#fff" } }} />
      <div className="grid w-full grid-cols-1 gap-10 pt-8 md:grid-cols-2 max-w-7xl md:pt-32 lg:pt-20">
        <div className="relative flex items-center justify-center w-full overflow-hidden rounded-2xl">
          {!showVideo ? (
            <div className="relative w-full h-60 md:h-[400px] lg:h-[500px]">
              <img src={videoPlaceholder} alt="Video Placeholder" className="object-cover w-full h-full rounded-2xl" />
              <button
                onClick={() => setShowVideo(true)}
                className="absolute inset-0 flex items-center justify-center bg-black/70 hover:bg-black/50 transition rounded-full m-auto w-[70px] h-[70px]"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10 text-white">
                  <path d="M7 6v12l10-6z" />
                </svg>
              </button>
            </div>
          ) : (
            <iframe
              className="w-full h-60 md:h-[400px] lg:h-[500px] rounded-2xl"
              src="https://www.youtube.com/embed/dJaYtf5kBg0?autoplay=1&controls=1"
              title="YouTube video player"
              allowFullScreen
            ></iframe>
          )}
        </div>

        <div className="flex items-center justify-center w-full">
          <form className="w-full space-y-6" onSubmit={formik.handleSubmit}>
            <h2 className="text-xl font-bold text-white sm:text-2xl md:text-3xl">Quick and easy sign-up in just one step.</h2>
            <p className="text-sm text-gray-200 sm:text-base md:text-lg">Provide your details and choose your username</p>

            {["username", "firstName", "last_Name"].map((field) => (
              <div key={field}>
                <input
                  name={field}
                  placeholder={field === "username" ? "Username (3-15 characters)" : field === "firstName" ? "First Name" : "Last Name"}
                  className="w-full px-4 py-3 text-sm text-white bg-transparent border-2 border-teal-500 rounded-md md:text-base"
                  value={formik.values[field]}
                  onChange={formik.handleChange}
                />
                {formik.touched[field] && formik.errors[field] && (
                  <p className="text-sm text-red-500">{formik.errors[field]}</p>
                )}
              </div>
            ))}

            <input
              type="text"
              placeholder="Pick your country"
              className="w-full px-4 py-3 text-sm bg-transparent border-2 border-green-300 rounded-md text-slate-400 md:text-base"
              value={countryInput}
              onFocus={() => setShowCountryDropdown(true)}
              onChange={(e) => setCountryInput(e.target.value)}
            />
            {showCountryDropdown && (
              <div className="z-20 w-full mt-2 overflow-auto text-black bg-white border rounded-md shadow-md max-h-64">
                {filteredCountries.map((country) => (
                  <div key={country.code} onClick={() => handleCountrySelect(country)} className="px-4 py-2 cursor-pointer hover:bg-gray-200">
                    {country.name} ({country.code})
                  </div>
                ))}
              </div>
            )}

            {selectedCountry && (
              <div className="w-full max-w-xl mx-auto mt-0 overflow-hidden">
                <p className="mb-4 text-base text-center text-white break-words lg:text-lg md:text-left">
                  {`Leave your phone number, you'll be granted free access to our elite traders' channel!`}
                </p>
                <div className="flex items-center w-full gap-2">
                  <div className="flex items-center justify-center w-10 overflow-hidden border border-green-500 h-7">
                    <img src={`https://flagcdn.com/w40/${selectedCountry.code.toLowerCase()}.png`} alt={selectedCountry.code} className="object-cover w-full h-full" />
                  </div>
                  <PhoneInput
                    country={selectedCountry.code.toLowerCase()}
                    enableSearch
                    placeholder="Enter your phone number"
                    value={formik.values.phone}
                    onChange={handlePhoneChange}
                    inputClass="!w-full !bg-transparent !text-white !text-lg !px-4 !py-3 !border !border-green-500 !rounded-md !pl-4"
                    containerClass="!w-full"
                    buttonClass="hidden"
                    disableDropdown
                    countryCodeEditable={false}
                  />
                </div>
                {formik.touched.phone && formik.errors.phone && (
                  <p className="text-sm text-red-500">{formik.errors.phone}</p>
                )}
              </div>
            )}

            {showExtraForm && (
              <div className="z-50 w-full p-6 mt-6 border-2 border-black rounded-lg shadow-lg bg-slate-900">
                <h3 className="mb-4 text-xl font-semibold text-center text-white">Complete Your Registration</h3>

                <label htmlFor="email" className="block mt-4 text-sm text-white">Email</label>
                <div className="relative">
                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    placeholder="Enter your email"
                    className="w-full px-10 py-2 bg-transparent border border-teal-500 rounded-md text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-400"
                  />
                  <Mail className="absolute w-5 h-5 text-gray-400 -translate-y-1/2 left-3 top-1/2" />
                </div>
                {formik.touched.email && formik.errors.email && (
                  <p className="mt-1 text-sm text-red-500">{formik.errors.email}</p>
                )}

                <div className="grid grid-cols-1 gap-4 mt-4 lg:grid-cols-2">
                  {[
                    ["password", showPassword, setShowPassword],
                    ["confirmPassword", showConfirmPassword, setShowConfirmPassword],
                  ].map(([name, show, toggle]) => (
                    <div key={name} className="relative">
                      <label htmlFor={name} className="block text-sm text-white">{name === "password" ? "Password" : "Confirm Password"}</label>
                      <Lock className="absolute w-5 h-5 mt-4 text-gray-400 left-3" />
                      <input
                        id={name}
                        type={show ? "text" : "password"}
                        name={name}
                        value={formik.values[name]}
                        onChange={formik.handleChange}
                        className="w-full px-10 py-2 mt-1 bg-transparent border border-teal-500 rounded-md text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-400"
                      />
                      <button
                        type="button"
                        onClick={() => toggle((prev) => !prev)}
                        className="absolute right-3 top-[38px] text-gray-500"
                      >
                        {show ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                      {formik.touched[name] && formik.errors[name] && (
                        <p className="mt-1 text-sm text-red-500">{formik.errors[name]}</p>
                      )}
                    </div>
                  ))}
                </div>

                {/* Hidden referral field */}
                <input type="hidden" name="referral" value={formik.values.referral} />

                <button
                  type="submit"
                  disabled={loading}
                  className={`flex items-center justify-center w-full py-3 mt-6 text-sm font-semibold text-white rounded-md transition duration-200 ${
                    loading ? "bg-gray-400 cursor-not-allowed" : "bg-teal-600 hover:bg-teal-700"
                  }`}
                >
                  {loading ? "Registering..." : "Register"}
                </button>
              </div>
            )}

            <div className="flex items-center justify-center gap-2 pt-2">
              <p className="text-xs text-white sm:text-sm">If you already have an account</p>
              <Link to="/login" className="text-[#20DD8A] hover:underline text-sm sm:text-base">Login</Link>
            </div>
          </form>
        </div>

        <div className="flex justify-center col-span-1 mt-10 md:col-span-2">
          <p className="px-4 py-4 text-lg font-extrabold leading-snug text-center text-transparent underline transition-all rounded-lg shadow-lg cursor-pointer sm:text-xl md:text-2xl lg:text-3xl bg-clip-text bg-gradient-to-r from-blue-400 via-teal-400 to-green-400 hover:text-teal-500 w-fit">
            I&apos;ve never traded before. I want to begin
          </p>
        </div>
      </div>
    </main>
  );
};

export default QuickSignupSection;
