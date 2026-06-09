import React, { useEffect, useState } from "react";
import AnimatedEcosystem from "../component/common/AnimatedEcosystem";

const ecosystemData = [
  {
    title: "Idea",
    desc: "Research and discovery phase.",
  },
  {
    title: "Planning",
    desc: "Architecture and roadmap creation.",
  },
  {
    title: "Design",
    desc: "UI/UX wireframes and prototypes.",
  },
  {
    title: "Development",
    desc: "Frontend & Backend implementation.",
  },
  {
    title: "Testing",
    desc: "QA and bug fixing process.",
  },
  {
    title: "Deploy",
    desc: "Production release and scaling.",
  },
  {
    title: "Growth",
    desc: "Analytics, SEO and optimization.",
  },
];

const ProjectEcosystem = () => {
  const [activeIndex, setActiveIndex] = useState(3);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) =>
        prev === ecosystemData.length - 1
          ? 0
          : prev + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="ecosystem" className="relative min-h-screen bg-gradient-to-b from-slate-50 to-white overflow-hidden py-24">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400/20 blur-[180px]" />

      {/* Heading */}
      <div className="text-center mb-16 relative z-20">
        <h2 className="text-5xl font-black tracking-wider text-slate-900">
          PROJECT{" "}
          <span className="text-cyan-600">
            ECOSYSTEM
          </span>
        </h2>

        <p className="text-slate-600 mt-4 tracking-[0.3em] text-xs uppercase">
          Full Cycle Workflow Intelligence
        </p>
      </div>

      <div className="relative z-20 flex flex-col items-center">
        <AnimatedEcosystem
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
        />

        {/* Detail Card */}
        <div className="mt-12 w-full max-w-3xl px-8">
          <div className="rounded-3xl border border-cyan-500/30 bg-white/80 backdrop-blur-xl shadow-xl p-8">
            <div className="flex items-center gap-6">
              <span className="text-6xl font-black text-cyan-600/30">
                {String(activeIndex + 1).padStart(2, "0")}
              </span>

              <div>
                <h3 className="text-2xl font-bold text-slate-900">
                  {ecosystemData[activeIndex].title}
                </h3>

                <p className="text-slate-600 mt-2">
                  {ecosystemData[activeIndex].desc}
                </p>
              </div>
            </div>
          </div>

          {/* Indicators */}
          <div className="flex justify-center gap-3 mt-8">
            {ecosystemData.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={`
                  w-2.5
                  h-2.5
                  rounded-full
                  transition-all
                  duration-300
                  ${
                    activeIndex === i
                      ? "bg-cyan-600 shadow-[0_0_15px_#0891b2]"
                      : "bg-slate-300"
                  }
                `}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectEcosystem;