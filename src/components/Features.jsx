import { Link } from "react-router-dom";
const features = [
  { label: 'Free Journal', icon: '📝', path: '/journal' },
  { label: 'Free Education', icon: '🎓', path: '/freeUniversity' },
  { label: 'Emotional Evaluation', icon: '🧠', path: '/emotionalEvaluation' },
  { label: 'Verified Broker Reviews', icon: '✅', path: '/brokers' }, 
  { label: 'Free Forex Calculator', icon: '📊', path: '/forexCalculator' },
];

const Features = () => {
  return (
    <div className="flex flex-wrap justify-center gap-4 px-4 py-1 pt-1 ">
      {features.map(({ label, icon,path }) => (
        <Link key={label} to={path} className="flex items-center gap-2 px-5 py-2 text-sm text-white  border border-teal-400 rounded-full  hover:text-[#00c4f4] bg-cyan-900/30">
          <span>{icon}</span>{label}
        </Link>
      ))}
    </div>
  );
};

export default Features;
