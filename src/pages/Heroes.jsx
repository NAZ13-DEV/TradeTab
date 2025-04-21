import Hero from '../components/Hero';
import Features from '../components/Features';
import CTAbutton from '../components/CTAbutton';
import img from '../img/up.png'; // make sure the image is in the correct folder

const Heroes = () => {
  return (
    <div className='relative block bg-[#0a0f1a]  '>
      <img src={img} className="absolute -top-32 left-1/2 transform -translate-x-1/2 mx-auto w-full max-w-[1800px] opacity-10 "></img>
      <div className="relative z-30 max-w-4xl px-4 mx-auto mt-32 text-center md:px-0">
      <Hero />
      <Features />
      <CTAbutton />
      
      </div>
    </div>
  );
};

export default Heroes;
