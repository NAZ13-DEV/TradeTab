/* eslint-disable no-unused-vars */
import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchNotifications,
  clearNotifications,
} from "../redux/slices/fetchNotiSlice";
import {
  fetchUserDetails,
  clearUserState,
} from "../redux/slices/fetchUserSlice";
import { parse, differenceInSeconds, differenceInMinutes, differenceInHours, differenceInDays } from "date-fns";
import { Bell } from "lucide-react";

const Notifications = () => {
  const dispatch = useDispatch();
  const { notifications } = useSelector((state) => state.notifications);
  const { user } = useSelector((state) => state.fetchUserDetails);
  const [visibleNotifications, setVisibleNotifications] = useState(10);
  const notificationRefs = useRef([]);

  useEffect(() => {
    dispatch(fetchNotifications());
    const storedUserId = localStorage.getItem("uId");
    if (storedUserId) dispatch(fetchUserDetails(storedUserId));

    return () => {
      dispatch(clearNotifications());
      dispatch(clearUserState());
    };
  }, [dispatch]);

  const handleSeeMore = () => {
    setVisibleNotifications((prev) => prev + 10);
  };

  const formatDate = (sentAt) => {
    try {
      const parsedDate = parse(sentAt, "M/d/yyyy, h:mm:ss a", new Date());
      const now = new Date();

      const seconds = differenceInSeconds(now, parsedDate);
      const minutes = differenceInMinutes(now, parsedDate);
      const hours = differenceInHours(now, parsedDate);
      const days = differenceInDays(now, parsedDate);

      if (seconds < 60) return `${seconds} second${seconds !== 1 ? "s" : ""} ago`;
      if (minutes < 60) return `${minutes} minute${minutes !== 1 ? "s" : ""} ago`;
      if (hours < 24) return `${hours} hour${hours !== 1 ? "s" : ""} ago`;
      return `${days} day${days !== 1 ? "s" : ""} ago`;
    } catch {
      return "Invalid date";
    }
  };

  return (
    <div className="min-h-screen p-4 bg-[#050A1D]">
      <div className="max-w-4xl mx-auto bg-[#0A132A] p-6 sm:p-8 rounded-2xl shadow-xl">
        <div className="flex items-center gap-3 mb-6">
          <Bell className="text-emerald-400 w-6 h-6" />
          <h2 className="text-white text-2xl font-semibold">Notifications</h2>
        </div>
        <p className="text-gray-400 text-sm mb-8">
          Get updates on your trading activity, system messages, and alerts.
        </p>

        <div className="space-y-6">
          {notifications.slice(0, visibleNotifications).map((item, index) => (
            <div
              key={item.id}
              ref={(el) => (notificationRefs.current[index] = el)}
              className="p-5 rounded-xl bg-[#0F1C3F] border border-emerald-600 transition duration-300 hover:shadow-lg hover:border-emerald-400"
            >
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                <div>
                  <h4 className="text-white text-base font-semibold mb-1">
                    {item.messageHeader}
                  </h4>
                  <p className="text-sm text-gray-300">{item.content}</p>
                </div>
                <span className="text-xs text-gray-400 sm:ml-4 whitespace-nowrap">
                  {formatDate(item.sent_at)}
                </span>
              </div>
            </div>
          ))}
        </div>

        {visibleNotifications < notifications.length && (
          <div className="text-center mt-10">
            <button
              onClick={handleSeeMore}
              className="inline-block px-6 py-2 rounded-md text-sm font-medium bg-gradient-to-r from-emerald-500 to-emerald-400 text-white hover:from-emerald-400 hover:to-emerald-300 transition"
            >
              Load More
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Notifications;
