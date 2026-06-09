import { Link } from "lucide-react";
import { FiArrowUpRight } from "react-icons/fi";

const PlatformCard = ({ icon: Icon, title, description, url }) => {

  return (
   <a
  href={url}
  target="_blank"
  rel="noopener noreferrer"
  className="
    group
    relative
    overflow-hidden
    rounded-2xl
    border
    border-indigo-100
    bg-white/90
    p-6
    min-h-[240px]
    h-full
    flex
    flex-col
    transition-all
    duration-300
    cursor-pointer
    hover:-translate-y-2
    hover:border-indigo-400
    shadow-md
    hover:shadow-xl
    hover:shadow-[0_0_25px_rgba(99,102,241,0.4)]
  "
>
      {/* Top Section */}
      <div className="relative z-10 flex items-start justify-between mb-6"
      >

        {/* Icon Container */}
        <div
          className="
            h-14
            w-14
            rounded-xl
            flex
            items-center
            justify-center
            bg-indigo-50
            border
            border-indigo-100
            transition-all
            duration-300
            group-hover:bg-indigo-500
            group-hover:border-indigo-500
          "
        >
          <Icon
            className="
              text-2xl
              text-indigo-500
              transition-all
              duration-300
              group-hover:text-white
            "
          />
        </div>



        {/* Action Arrow */}
        <div
          className="
            p-2 
            rounded-full 
            bg-slate-50
            border 
            border-slate-200
            transition-all
            duration-300
            group-hover:bg-indigo-500
            group-hover:border-indigo-500
          "
        >
          <FiArrowUpRight
            className="
              text-lg
              text-slate-400
              transition-all
              duration-300
              group-hover:text-white
            "
          />
        </div>
      </div>

      {/* Content Section */}
      <div className="relative z-10 flex-1">
        <h3
          className="
            text-xl
            font-bold
            text-slate-900
            mb-3
            min-h-[56px]
            transition-colors
            duration-300
            group-hover:text-indigo-600
          "
        >
          {title}
        </h3>

        <p
          className="
            text-sm
            text-slate-600
            leading-relaxed
            transition-colors
            duration-300
            line-clamp-4
            min-h-[96px]
          "
        >
          {description}
        </p>
      </div>
    </a>
  );
};

export default PlatformCard;