import { Link } from "react-router-dom";

const EmotionalEvaluationSection = () => {
  return (
    <div className="px-6 py-20 md:px-0 md:py-32 lg:py-20">
      <div className="max-w-5xl px-4 py-12 mx-auto bg-gray-800 border border-teal-500 rounded-lg shadow-lg sm:p-8 md:py-20">
        <h2 className="mb-6 text-2xl font-extrabold text-center text-transparent sm:text-3xl md:text-4xl bg-gradient-to-r from-green-300 to-teal-400 bg-clip-text">
          Emotional Evaluation & Journaling
        </h2>

        <p className="mb-4 text-sm leading-relaxed text-gray-300 sm:text-base md:text-lg">
          Trading can trigger a range of powerful emotions. By journaling both your
          <strong className="mx-1">green</strong> and
          <strong className="mx-1">red</strong> days, you uncover key insights into
          discipline, mindset, and strategy. Keep it brief and consistent to quickly
          identify what truly impacts your performance.
        </p>

        <h3 className="mb-3 text-lg font-semibold text-teal-300 sm:text-xl">Key Benefits</h3>
        <ul className="mb-6 space-y-2 text-gray-400 list-disc list-inside">
          {[
            "Identify Emotional Triggers: Spot patterns like fear, greed, or impulsivity and address them early.",
            "Enhance Discipline: Keep yourself accountable through honest reflections.",
            "Spot Good Habits: Reinforce positive behaviors observed on winning days.",
            "Promote Growth: Build resilience and refine strategies with ongoing self-awareness.",
          ].map((item, i) => {
            const [title, description] = item.split(":");
            return (
              <li key={i}>
                <p className="text-base font-semibold text-transparent whitespace-pre-wrap rounded-lg sm:text-lg bg-gradient-to-r from-green-400 to-teal-500 bg-clip-text">
                  {title}:
                </p>
                {description}
              </li>
            );
          })}
        </ul>

        <h3 className="mb-3 text-lg font-semibold text-teal-300 sm:text-xl">Common Emotions & Behaviors</h3>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
          {[
            { text: "Impulsive Entry", color: "text-yellow-400", icon: "fa-bolt" },
            { text: "Ignoring Strategy", color: "text-red-400", icon: "fa-times-circle" },
            { text: "Overthinking", color: "text-purple-400", icon: "fa-brain" },
            { text: "Confidence Boost", color: "text-green-400", icon: "fa-smile-beam" },
            { text: "Revenge Trading", color: "text-blue-400", icon: "fa-angry" },
          ].map((item, idx) => (
            <div
              key={idx}
              className="flex items-center gap-3 p-3 transition bg-gray-700 rounded-lg hover:bg-teal-600"
            >
              <i className={`fas ${item.icon} ${item.color} text-xl`} />
              <span className="text-sm text-gray-200 sm:text-base md:text-lg">{item.text}</span>
            </div>
          ))}
        </div>

        <p className="mt-6 text-sm leading-relaxed text-gray-300 sm:text-base md:text-lg">
          Keep it simple: jot down emotions, note key takeaways, then move on. This
          <strong className="mx-1">daily habit</strong> helps clarify your mindset and
          elevates your trading game—one entry at a time.
        </p>

        <Link
          to="/journal"
          className="flex items-center gap-1 w-fit m-auto mt-3 py-3 px-2 text-white font-bold text-center bg-gradient-to-r from-[#229ED9] via-teal-500 to-teal-600 hover:from-[#229ED9] hover:text-white rounded-lg transition-colors duration-300"
        >
          <svg
            fill="currentColor"
            viewBox="0 0 16 16"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M6 1h6v7a.5.5 0 0 1-.757.429L9 7.083 6.757 8.43A.5.5 0 0 1 6 8V1z"
            />
            <path d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2z" />
            <path d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1z" />
          </svg>
          Start Journaling
        </Link>
      </div>
    </div>
  );
};

export default EmotionalEvaluationSection;
