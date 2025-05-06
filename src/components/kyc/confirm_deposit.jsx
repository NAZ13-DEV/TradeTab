import { useState, useEffect } from "react";
import api from "../../redux/slices/api";
import toast, { Toaster } from "react-hot-toast";
import { fetchNotifications } from "../../redux/slices/fetchNotiSlice";
import { fetchUserDetails } from "../../redux/slices/fetchUserSlice";
import { useDispatch, useSelector } from "react-redux";
import KYCStatus from "../PendingKyc"; 

export default function UploadProof() {
  const [selectedOption, setSelectedOption] = useState("Passport");
  const [frontFile, setFrontFile] = useState(null);
  const [backFile, setBackFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPending, setShowPending] = useState(false);

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.fetchUserDetails);

  useEffect(() => {
    dispatch(fetchNotifications());
    const storedUserId = localStorage.getItem("uId");
    if (storedUserId) {
      dispatch(fetchUserDetails(storedUserId));
    }
  }, [dispatch]);

  useEffect(() => {
    if (user?.kyc === "pending" && user?.verifi === "true") {
      setShowPending(true);
    }
  }, [user]);

  const handleOptionChange = (e) => setSelectedOption(e.target.value);
  const handleFrontChange = (e) => setFrontFile(e.target.files[0]);
  const handleBackChange = (e) => setBackFile(e.target.files[0]);

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!frontFile || (selectedOption === "Driving License" && !backFile)) {
      toast.error("Please upload the required files!");
      return;
    }

    const storedUserId = localStorage.getItem("uId");
    const formData = new FormData();
    formData.append("frontFile", frontFile);
    if (selectedOption === "Driving License") {
      formData.append("backFile", backFile);
    }
    formData.append("kycType", selectedOption);
    formData.append("userid", storedUserId);

    setIsLoading(true);
    try {
      const response = await api.post("uploadriverKyc", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.status === 201) {
        toast.success("KYC uploaded successfully!");
        setTimeout(() => {
          setShowPending(true);
        }, 4000);
      }
    } catch (error) {
      console.error("Error uploading KYC:", error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (showPending) return <KYCStatus />;

  return (
    <div className="col-span-12 p-4 bg-Primary-bg rounded-xl lg:px-7 lg:py-6 xl:col-span-12">
      <Toaster position="top-center" />
      <form onSubmit={handleUpload}>
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6 scrollable-container">
          <div className="h-[400px] lg:h-[400px] w-full">
            <h5 className="text-base text-customGreen font-bold leading-[24px] mb-3 text-center">
              KYC Verification
            </h5>
            <select
              value={selectedOption}
              onChange={handleOptionChange}
              className="w-full px-2 py-[10px] outline-none rounded bg-Primary-3 border border-Neutral-10 mb-4"
            >
              <option value="Passport">Passport</option>
              <option value="Driving License">Driving License</option>
            </select>
            <div className="mt-4">
              <label className="block mb-2 text-sm font-medium">Front Cover</label>
              <input
                type="file"
                onChange={handleFrontChange}
                className="w-full px-2 py-[10px] outline-none rounded bg-Primary-3 border border-Neutral-10"
              />
            </div>
            {selectedOption === "Driving License" && (
              <div className="mt-4">
                <label className="block mb-2 text-sm font-medium">Back Cover</label>
                <input
                  type="file"
                  onChange={handleBackChange}
                  className="w-full px-2 py-[10px] outline-none rounded bg-Primary-3 border border-Neutral-10"
                />
              </div>
            )}
            <button
              type="submit"
              className="mt-4 px-4 py-2 text-white font-semibold leading-[18px] border border-Neutral-8 rounded-lg hover:bg-Neutral-8 w-full"
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Submit KYC"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
