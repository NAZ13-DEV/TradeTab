// 'use client';
// import Sidebar from '../../components/Sidebar/Sidebar';
// import TopBar from '../../components/TopBar/TopBar';
// import React, {useEffect,  useState } from 'react';
// import Footer from '../../components/Footer/Footer';
// import { useRouter } from 'next/navigation';
// import api from '../slices/api';
// import Loading from '../Loading';

// export default function RootLayout({ children }) {
//   const [navOpen, setNavOpen] = useState(false);
//   const [opened, setOpened] = useState(null);

//   const handleOpen = (event) => {
//     event.stopPropagation();
//     setNavOpen(!navOpen);
//   };

//   //   const [isSessionValid, setIsSessionValid] = useState(null);
//   // const router = useRouter();

//   // useEffect(() => {
//   //   const checkSession = async () => {
//   //     try {
//   //         const uId = localStorage.getItem('uId'); 
//   //       if (!uId) {
//   //         router.push('./utillity/sign_in'); 
//   //         return;
//   //       }

//   //       const response = await api.post('checkSession',{'sessionGetUserID':uId}); 
//   //       console.log(response.data.message);
//   //       // if (response.data.isValid) {
//   //       //   setIsSessionValid(true);
//   //       // } else {
//   //       //   // router.push('./utillity/sign_in');  
//   //       // }
//   //     } catch (error) {
//   //         if (error.response?.status === 422) {
//   //     const regErrors = error.response.data.errors[0];
//   //      if(regErrors === false){
//   //       router.push('./utillity/sign_in');  
//   //      }
//   //   }
//   //     }
//   //   };

//   //   checkSession();
//   // }, [router]);

//   // if (isSessionValid === null) {
//   //   return <Loading />;
//   // }
//   return (
//     <div>
//       <Sidebar
//         navOpen={navOpen}
//         opened={opened}
//         setOpened={setOpened}
//         setNavOpen={setNavOpen}
//       />
//       <div
//         className={`lg:ml-[260px] relative ${
//           navOpen &&
//           'after:bg-opacity-70 after:absolute after:inset-0 after:z-[1] after:duration-300 overflow-y-hidden'
//         }`}
//         onClick={() => setNavOpen(false)}
//       >
//         <TopBar handleOpen={handleOpen} />
//         <div className='pt-[88px]'>{children}</div>
//         <Footer />
//       </div>
//     </div>
//   );
// }
'use client';
import Sidebar from '../../components/Sidebar/Sidebar';
import TopBar from '../../components/TopBar/TopBar';
import React, { useEffect, useState } from 'react';
import Footer from '../../components/Footer/Footer';
import { useRouter } from 'next/navigation';

export default function RootLayout({ children }) {
  const [navOpen, setNavOpen] = useState(false);
  const [opened, setOpened] = useState(null);
  const router = useRouter();

  const handleOpen = (event) => {
    event.stopPropagation();
    setNavOpen(!navOpen);
  };

  useEffect(() => {
    const checkCookie = () => {
      const cookies = document.cookie.split('; ').reduce((acc, current) => {
        const [name, value] = current.split('=');
        acc[name] = value;
        return acc;
      }, {});

      const uId = cookies.uId;
      if (!uId) {
        // Redirect if the cookie is missing
        router.push('./utillity/sign_in');
        return;
      }

      const expiryTime = cookies.expires; // Parse expiry if explicitly stored
      if (expiryTime) {
        const currentTime = new Date().getTime();
        const expiryDate = new Date(expiryTime).getTime();
        if (currentTime > expiryDate) {
          // Redirect if the cookie is expired
          router.push('./utility/sign_in');
        }
      }
    };

    checkCookie();
  }, [router]);

  return (
    <div>
      <Sidebar
        navOpen={navOpen}
        opened={opened}
        setOpened={setOpened}
        setNavOpen={setNavOpen}
      />
      <div
        className={`lg:ml-[260px] relative ${
          navOpen &&
          'after:bg-opacity-70 after:absolute after:inset-0 after:z-[1] after:duration-300 overflow-y-hidden'
        }`}
        onClick={() => setNavOpen(false)}
      >
        <TopBar handleOpen={handleOpen} />
        <div className="pt-[88px]">{children}</div>
        <Footer />
      </div>
    </div>
  );
}
