import { FiArrowUpRight } from "react-icons/fi";

const PlatformCard = ({
  title,
  description,
  image,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className="
        group
        relative
        overflow-hidden
        rounded-3xl
        bg-white
        border
        border-slate-200
        shadow-md
        hover:shadow-2xl
        transition-all
        duration-500
        cursor-pointer
        hover:-translate-y-2
        h-full
      "
    >
      {/* Project Image */}
      <div className="relative h-[280px] overflow-hidden">
        <img
          src={image}
          alt={title}
          className="
            w-full
            h-full
            object-cover
            transition-transform
            duration-700
            group-hover:scale-105
          "
        />

        {/* Dark Overlay */}
        <div
          className="
            absolute
            inset-0
            bg-gradient-to-t
            from-black/50
            via-black/10
            to-transparent
          "
        />

        {/* Arrow */}
        <div
          className="
            absolute
            top-5
            right-5
            h-12
            w-12
            rounded-full
            bg-white/90
            backdrop-blur-md
            flex
            items-center
            justify-center
            transition-all
            duration-300
            group-hover:bg-blue-500
          "
        >
          <FiArrowUpRight
            className="
              text-xl
              text-slate-700
              group-hover:text-white
            "
          />
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6">
        <h3
          className="
            text-2xl
            font-bold
            text-slate-900
            mb-3
            transition-colors
            duration-300
            group-hover:text-blue-600
          "
        >
          {title}
        </h3>

        <p
          className="
            text-slate-600
            leading-relaxed
            text-sm
            line-clamp-3
          "
        >
          {description}
        </p>

        <div
          className="
            mt-5
            inline-flex
            items-center
            gap-2
            text-blue-600
            font-semibold
          "
        >
          View Project
          <FiArrowUpRight />
        </div>
      </div>
    </div>
  );
};

export default PlatformCard;