// ← Heading + Content + Detail Card

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import {
  FiCode,
  FiPenTool,
  FiLayers,
//   FiRocket,
  FiTrendingUp,
  FiCheckCircle,
  FiClipboard,
} from "react-icons/fi";

const items = [
  { label: "Idea", icon: FiClipboard },
  { label: "Planning", icon: FiLayers },
  { label: "Design", icon: FiPenTool },
  { label: "Development", icon: FiCode },
  { label: "Testing", icon: FiCheckCircle },
//   { label: "Deploy", icon: FiRocket },
  { label: "Growth", icon: FiTrendingUp },
];

const AnimatedEcosystem = ({ activeIndex, setActiveIndex }) => {
  const orbitRef = useRef();

  useEffect(() => {
    gsap.to(orbitRef.current, {
      rotate: 360,
      duration: 40,
      repeat: -1,
      ease: "none",
    });
  }, []);

  return (
    <div className="relative flex items-center justify-center w-[400px] h-[400px] sm:w-[500px] sm:h-[500px] md:w-[600px] md:h-[600px]">
      {/* Rings */}
      <div className="absolute w-[340px] h-[340px] sm:w-[430px] sm:h-[430px] md:w-[520px] md:h-[520px] rounded-full border border-cyan-600/20" />
      <div className="absolute w-[270px] h-[270px] sm:w-[350px] sm:h-[350px] md:w-[420px] md:h-[420px] rounded-full border border-cyan-600/20" />
      <div className="absolute w-[200px] h-[200px] sm:w-[260px] sm:h-[260px] md:w-[320px] md:h-[320px] rounded-full border border-cyan-600/20" />

      {/* Core */}
      <div className="absolute z-30 flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full border border-cyan-600 bg-cyan-100/50 backdrop-blur-xl shadow-lg">
        <span className="text-cyan-700 font-bold tracking-widest text-[10px] sm:text-xs md:text-sm">
          CORE
        </span>
      </div>

      {/* Orbit */}
      <div
        ref={orbitRef}
        className="absolute inset-0 flex items-center justify-center"
      >
        {items.map((item, index) => {
          const angle = (360 / items.length) * index;
          const radius = window.innerWidth < 640 ? 150 : window.innerWidth < 768 ? 190 : 230;

          const x =
            Math.cos((angle * Math.PI) / 180) * radius;

          const y =
            Math.sin((angle * Math.PI) / 180) * radius;

          const Icon = item.icon;

          return (
            <div
              key={index}
              onMouseEnter={() => setActiveIndex(index)}
              style={{
                transform: `translate(${x}px, ${y}px)`,
              }}
              className={`
                absolute
                group
                w-16 h-16
                sm:w-20 sm:h-20
                md:w-28 md:h-28
                rounded-2xl
                border
                cursor-pointer
                backdrop-blur-xl
                flex
                flex-col
                items-center
                justify-center
                transition-all
                duration-500
                ${
                  activeIndex === index
                    ? "border-cyan-600 bg-cyan-50 shadow-[0_0_30px_rgba(8,145,178,0.4)] scale-110"
                    : "border-slate-300 bg-white/60"
                }
              `}
            >
              <Icon
                size={window.innerWidth < 640 ? 16 : window.innerWidth < 768 ? 20 : 24}
                className="text-cyan-700 mb-1 sm:mb-2"
              />

              <span className="text-[9px] sm:text-[10px] md:text-xs text-slate-800">
                {item.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AnimatedEcosystem;