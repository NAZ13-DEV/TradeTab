import {
  useState,
  useRef,
  useEffect,
  useMemo,
  useCallback,
} from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import logo from '../img/logo_light.png';
import ProfileFallback from '../../public/images/userProfile.svg';
import MobileMenuDashboard from './MobileMenuDashboard';
import DashboardWidget from './DashboardWidget';
import Deposit from './Deposit';
import Exchange from './Exchange';
import History from './History';
import Withdrawal from './Withdrawal';
import Subscribe from './Subscribe';
import Notifications from './Notifications';
import Settings from './Settings';
import UploadPhoto from './UploadPhoto';
import Logout from './Logout';
import Kyc from './Kyc';
import { fetchUserDetails } from '../redux/slices/fetchUserSlice';
import { fetchNotifications } from '../redux/slices/fetchNotiSlice';

const GreenLoader = () => (
  <div className="flex items-center justify-center h-[300px] text-green-400 text-lg">
    Loading...
  </div>
);

const DashboardHeader = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotificationDropdown, setShowNotificationDropdown] = useState(false);

  const profileRef = useRef(null);
  const notificationRef = useRef(null);
  const logoutTimerRef = useRef(null); // New: track inactivity timer

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { user } = useSelector((state) => state.fetchUserDetails);
  const { notifications } = useSelector((state) => state.notifications);

  const isKycTrue = useMemo(() => user?.kyc === 'true', [user]);

  useEffect(() => {
    const storedUserId = localStorage.getItem('uId');
    if (storedUserId) {
      dispatch(fetchUserDetails(storedUserId)).finally(() => setLoading(false));
      dispatch(fetchNotifications());
    } else {
      setLoading(false);
    }
  }, [dispatch]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!profileRef.current?.contains(event.target)) setShowProfileMenu(false);
      if (!notificationRef.current?.contains(event.target)) setShowNotificationDropdown(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (location.state?.fromUpload || location.state?.fromWithdraw) {
      setActiveTab('history');
      navigate(location.pathname, { replace: true });
    }
  }, [location, navigate]);

  useEffect(() => {
    if (user) {
      const storedTab = localStorage.getItem('activeTab');
      if (isKycTrue) {
        setActiveTab(storedTab && storedTab !== 'logout' ? storedTab : 'dashboard');
      } else {
        setActiveTab('kyc');
        localStorage.removeItem('activeTab');
      }
    }
  }, [user, isKycTrue]);

  useEffect(() => {
    if (location.state?.fromUpload) {
      setActiveTab('history');
      localStorage.setItem('activeTab', 'history');
      navigate(location.pathname, { replace: true });
    }
  }, [location, navigate]);

  useEffect(() => {
    if (location.state?.photoUpload) {
      setActiveTab('dashboard');
      localStorage.setItem('activeTab', 'dashboard');
      navigate(location.pathname, { replace: true });
    }
  }, [location, navigate]);

  useEffect(() => {
    if (location.state?.fromWithdraw) {
      setActiveTab('history');
      localStorage.setItem('activeTab', 'history');
      navigate(location.pathname, { replace: true });
    }
  }, [location, navigate]);

  const handleTabChange = useCallback((tab) => {
    if (!isKycTrue && tab !== 'kyc') return;
    setActiveTab(tab);
    if (tab !== 'logout') {
      localStorage.setItem('activeTab', tab);
    } else {
      localStorage.removeItem('activeTab');
    }
    setIsOpen(false);
  }, [isKycTrue]);

  const profileImage = user?.img || ProfileFallback;

  const tabComponents = {
    dashboard: <DashboardWidget />,
    deposit: <Deposit />,
    market: <Exchange />,
    history: <History />,
    withdrawal: <Withdrawal />,
    subscription: <Subscribe />,
    notifications: <Notifications />,
    settings: <Settings />,
    uploadPhoto: <UploadPhoto />,
    logout: <Logout />,
    kyc: isKycTrue ? null : <Kyc />,
  };

  // ================================
  // Inactivity Timeout Logic
  // ================================
  const resetInactivityTimer = useCallback(() => {
    clearTimeout(logoutTimerRef.current);
    logoutTimerRef.current = setTimeout(() => {
      localStorage.removeItem('uId');
      localStorage.removeItem('activeTab');
      navigate('/login');
    }, 1800000); // 30 minutes
  }, [navigate]);

  useEffect(() => {
    resetInactivityTimer(); // Set timer on mount

    const events = ['mousemove', 'keydown', 'mousedown', 'touchstart'];
    const handleActivity = () => resetInactivityTimer();

    events.forEach(event => window.addEventListener(event, handleActivity));
    return () => {
      clearTimeout(logoutTimerRef.current);
      events.forEach(event => window.removeEventListener(event, handleActivity));
    };
  }, [resetInactivityTimer]);

  return (
    <>
    {/* Top Banner */}
    <header className="sticky top-0 z-50 w-full">
      <div className="flex items-center justify-between px-6 py-3 bg-gradient-to-r from-green-500 to-blue-700 shadow-md">
        <p className="text-xl font-bold tracking-wide text-white">Example Mode</p>
      </div>

      {/* Logo & Icons */}
      <div className="flex items-center justify-between px-5 py-3 bg-[#0a0f1f] border-b border-gray-800 shadow">
        <div className="flex items-center gap-4">
          <button onClick={() => setIsOpen(true)} className="text-2xl text-white lg:hidden">
            <i className="fas fa-bars" />
          </button>
          <button onClick={() => handleTabChange('dashboard')}>
            <img src={logo} alt="logo" className="h-9" />
          </button>
        </div>

        <div className="flex items-center gap-4">
          {/* Notification */}
          <div className="relative" ref={notificationRef}>
            <button
              onClick={() => setShowNotificationDropdown(prev => !prev)}
              className="relative w-10 h-10 flex items-center justify-center bg-gray-700 rounded-full hover:ring-2 hover:ring-green-400"
            >
              <i className="fas fa-bell text-white text-lg" />
              {notifications.length > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 rounded-full bg-red-500 border-2 border-gray-900" />
              )}
            </button>

            {showNotificationDropdown && (
              <div className="absolute right-0 mt-3 w-80 bg-[#121827] text-white rounded-lg border border-gray-700 shadow-xl p-4 z-50 max-h-[300px] overflow-y-auto">
                <h3 className="text-lg font-semibold mb-3 border-b border-gray-600 pb-2">Notifications</h3>
                {notifications.length === 0 ? (
                  <p className="text-sm text-gray-400">No new notifications</p>
                ) : (
                  notifications.slice(0, 7).map((item) => (
                    <div key={item.id} className="mb-3 pb-2 border-b border-gray-700">
                      <p className="font-semibold">{item.messageHeader}</p>
                      <p className="text-xs text-gray-400">{item.content}</p>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>

          {/* Profile Dropdown */}
          <div className="relative" ref={profileRef}>
            <img
              src={profileImage}
              alt="Profile"
              className="w-10 h-10 border-2 border-green-500 rounded-full cursor-pointer hover:ring-2 hover:ring-green-400"
              onClick={() => setShowProfileMenu(prev => !prev)}
            />
            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-52 bg-[#121827] text-white rounded-md shadow-lg border border-gray-700 z-50">
                <div className="px-4 py-3 border-b border-gray-600">
                  <p className="text-sm">Welcome</p>
                  <p className="text-sm font-semibold">{user?.firstName} {user?.last_Name}</p>
                </div>
                <Link
                  onClick={() => handleTabChange('settings')}
                  className="block px-4 py-2 text-sm hover:bg-gray-800 transition-colors"
                >
                  <i className="fas fa-cog mr-2" /> Settings
                </Link>
                <button
                  onClick={() => handleTabChange('logout')}
                  className="block w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-red-900 hover:text-white transition-colors"
                >
                  <i className="fas fa-sign-out-alt mr-2" /> Log out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="hidden lg:flex px-6 py-3 bg-[#050A1D]/90 border-t border-[#1e293b] shadow-md backdrop-blur-md">
        <ul className="flex gap-8 text-white text-[16px] font-medium tracking-wide">
          {[
            ['Dashboard', 'dashboard'],
            ['Deposit', 'deposit'],
            ['Market', 'market'],
            ['History', 'history'],
            ['Withdrawal', 'withdrawal'],
            ['Subscription', 'subscription'],
            ['Notifications', 'notifications'],
            ['Profile', 'settings'],
            ['Upload Profile Pic', 'uploadPhoto'],
          ].map(([label, id]) => (
            <li
              key={id}
              onClick={() => handleTabChange(id)}
              className={`cursor-pointer hover:text-green-400 hover:underline transition-colors ${
                !isKycTrue ? 'opacity-50 pointer-events-none' : ''
              }`}
            >
              {label}
            </li>
          ))}
        </ul>
      </nav>
    </header>

    {isOpen && (
      <MobileMenuDashboard
        onClose={() => setIsOpen(false)}
        scrollToSection={handleTabChange}
      />
    )}

    <main className="px-4 pt-10 min-h-[70vh] bg-[#0a0f1f]">
      {loading ? <GreenLoader /> : tabComponents[activeTab]}
    </main>
  </>
  );
};

export default DashboardHeader;
