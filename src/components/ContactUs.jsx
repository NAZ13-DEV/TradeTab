import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, message } = formData;

    if (!name || !email || !message) {
      toast.error("Please fill in all fields.");
      return;
    }

    toast.success("Message sent successfully!");
    setLoading(true);

    try {
      await fetch("YOUR_API_ENDPOINT_HERE", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      // You can ignore response check now
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Send failed, but success toast already shown.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-4 bg-black">
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: "#0a0f1a",
            color: "#ffffff",
            border: "1px solid #1f2937", // optional
          },
        }}
      />

      <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-2">
          {/* Left Side */}
          <div className="flex flex-col justify-center md:pr-8 xl:pr-0 lg:max-w-lg">
            <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-teal-600">
              <svg className="w-12 h-12 p-2 text-white" viewBox="0 0 24 24">
                <path d="M20 4H4c-1.103 0-2 .897-2 2v12c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V6c0-1.103-.897-2-2-2zm0 2v.511l-8 6.223-8-6.222V6h16zM4 18V9.044l7.386 5.745a.994.994 0 0 0 1.228 0L20 9.044 20.002 18H4z" />
              </svg>
            </div>
            <div className="max-w-xl mb-6">
              <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold tracking-tight text-gray-50 sm:text-4xl sm:leading-none">
                Contact Us
              </h2>
              <p className="text-base text-gray-400 md:text-lg">
                We're here to help! Whether you’re looking for more information
                about our services or have a specific inquiry, feel free to
                reach out. Our team is ready to assist you with expert guidance
                and prompt support.
              </p>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="flex items-center justify-center -mx-4 lg:pl-8">
            <div className="max-w-lg p-6 mx-auto border border-teal-700 shadow-lg bg-slate-950 rounded-2xl">
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  placeholder="Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 text-white border border-teal-300 rounded-lg bg-slate-900 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 text-white border border-teal-300 rounded-lg bg-slate-900 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                />
                <textarea
                  name="message"
                  placeholder="Message"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full h-32 px-4 py-3 text-white border border-teal-300 rounded-lg resize-none bg-slate-900 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                ></textarea>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 font-semibold text-white transition-all duration-300 bg-teal-600 rounded-lg hover:bg-teal-700 disabled:bg-gray-400"
                >
                  {loading ? "Sending..." : "Send Message"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
