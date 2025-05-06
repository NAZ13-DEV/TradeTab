import { useEffect } from 'react';
import Link from 'next/link';
const Footer = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.charset = 'utf-8';
    script.src = 'https://www.smartsuppchat.com/loader.js?';
    document.body.appendChild(script);

    const smartsuppKey = document.createElement('script');
    smartsuppKey.textContent = `
      var _smartsupp = _smartsupp || {};
      _smartsupp.key = '66848570abcc6b7c7556ce584468d63303e34ae1';
      window.smartsupp||(function(d) {
        var s,c,o=smartsupp=function(){ o._.push(arguments)};o._=[];
        s=d.getElementsByTagName('script')[0];c=d.createElement('script');
        c.type='text/javascript';c.charset='utf-8';c.async=true;
        c.src='https://www.smartsuppchat.com/loader.js?';s.parentNode.insertBefore(c,s);
      })(document);
    `;
    document.body.appendChild(smartsuppKey);

    return () => {
      // Cleanup script to avoid duplicates
      document.body.removeChild(script);
      document.body.removeChild(smartsuppKey);
    };
  }, []);

  return (
    <footer className='bg-Primary-bg px-2 lg:px-6 pb-6 text-center'>
      <hr className='mb-3 lg:mb-6 border-Neutral-10' />
      <div className='grid grid-cols-1 lg:grid-cols-2 justify-between items-center gap-2'>
        <p className='lg:text-start text-sm md:text-lg text-white order-last lg:order-first'>
          &copy; 2016 swift market sphere. All rights
          reserved.
          {/* &copy; {new Date().getFullYear()} swift market sphere. All rights
          reserved. */}
          <Link href='#' className='text-Neutral-8 ml-[6px]'>
            swift market sphere
          </Link>
        </p>
      </div>
    </footer>
  );
};
export default Footer;