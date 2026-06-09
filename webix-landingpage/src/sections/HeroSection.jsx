import React, { useEffect, useRef, useState } from "react";
import { FiArrowRight, FiPlay, FiCode, FiLayers, FiZap } from "react-icons/fi";
import {
  SiReact,
  SiNextdotjs,
  SiNodedotjs,
  SiTypescript,
  SiTailwindcss,
  SiGraphql,
  SiMongodb,
  SiRedux,
  SiExpress,
  SiDocker,
  SiFirebase,
  SiPostgresql,
  SiJavascript,
} from "react-icons/si";
import AnimatedBg from "../component/common/Animatedbg1";
import gsap from "gsap";

/* ─── Required Custom CSS (Minimal) ─── */
const injectStyles = () => {

  if (document.getElementById("hero-styles")) return;

  const style = document.createElement("style");
  style.id = "hero-styles";
  style.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=Instrument+Sans:wght@400;500;600&display=swap');

    .hero-root { font-family: 'Instrument Sans', sans-serif; }
    .hero-display { font-family: 'Syne', sans-serif; }

    .glass-card {
      background: rgba(255,255,255,0.65);
      border: 1px solid rgba(255,255,255,0.9);
      backdrop-filter: blur(20px);
      border-radius: 20px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.08);
      transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    }
    .glass-card:hover {
      transform: translateY(-8px);
      box-shadow: 0 20px 40px rgba(0,0,0,0.12);
    }

    .headline-accent {
      background: linear-gradient(90deg, #2f60e8, #0090f0);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .headline-underline::after {
      content: '';
      position: absolute;
      bottom: 4px;
      left: 0;
      right: 0;
      height: 9px;
      background: linear-gradient(90deg, #007cf0, #4120e4);
      opacity: 0.65;
      border-radius: 4px;
      z-index: -1;
    }
      /* Tech Marquee */
.tech-marquee-wrapper {
  overflow: hidden;
  position: relative;

  -webkit-mask: linear-gradient(
    90deg,
    transparent,
    black 10%,
    black 90%,
    transparent
  );

  mask: linear-gradient(
    90deg,
    transparent,
    black 10%,
    black 90%,
    transparent
  );
}

.tech-marquee-track {
  display: flex;
  width: max-content;
  gap: 14px;
  animation: techMarquee 25s linear infinite;
}

.tech-marquee-wrapper:hover .tech-marquee-track {
  animation-play-state: paused;
}

@keyframes techMarquee {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-50%);
  }
}
  `;
  document.head.appendChild(style);
};


/* ─── GSAP Loader ─── */
const loadGSAP = () =>
  new Promise((resolve) => {
    if (window.gsap) return resolve(window.gsap);

    const script1 = document.createElement("script");
    script1.src =
      "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js";
    script1.onload = () => {
      const script2 = document.createElement("script");
      script2.src =
        "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js";
      script2.onload = () => {
        window.gsap.registerPlugin(window.ScrollTrigger);
        resolve(window.gsap);
      };
      document.head.appendChild(script2);
    };
    document.head.appendChild(script1);
  });

/* ─── Data ─── */
const FEATURES = [
  {
    icon: <FiCode size={22} />,
    color: "#e85d2f",
    bg: "#fff1e7",
    title: "Custom Web Dev",
    desc: "Scalable apps with modern stacks & clean architecture.",
  },
  {
    icon: <FiLayers size={22} />,
    color: "#f0a500",
    bg: "#fff9e6",
    title: "UI/UX Design",
    desc: "Pixel-perfect interfaces that convert and delight users.",
  },
  {
    icon: <FiZap size={22} />,
    color: "#3b82f6",
    bg: "#f0f9ff",
    title: "Performance",
    desc: "Lighthouse 95+ scores & sub-second load times.",
  },
];

const TECH = [
  { icon: <SiReact />, label: "React" },
  { icon: <SiNextdotjs />, label: "Next.js" },
  { icon: <SiNodedotjs />, label: "Node.js" },
  { icon: <SiTypescript />, label: "TypeScript" },
  { icon: <SiTailwindcss />, label: "Tailwind" },
  { icon: <SiGraphql />, label: "GraphQL" },
  { icon: <SiMongodb />, label: "MongoDB" },
  { icon: <SiRedux />, label: "Redux" },
  { icon: <SiExpress />, label: "Express" },
  { icon: <SiDocker />, label: "Docker" },
  { icon: <SiFirebase />, label: "Firebase" },
  { icon: <SiPostgresql />, label: "PostgreSQL" },
  { icon: <SiJavascript />, label: "JavaScript" },
];

const STATS = [
  { num: "150+", label: "Projects Delivered" },
  { num: "98%", label: "Client Satisfaction" },
  { num: "40+", label: "Expert Engineers" },
];

/* ─── Main Component ─── */
const HeroSection = () => {
  const badgeRef = useRef(null);
  const headlineRef = useRef(null);
  const subRef = useRef(null);
  const btnsRef = useRef(null);
  const statsRef = useRef(null);
  const techRef = useRef(null);
  const cardsRef = useRef(null);
  const titleRef = useRef(null);

  useEffect(() => {
    injectStyles();
    loadGSAP().then((gsap) => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      if (badgeRef.current) {
        tl.fromTo(
          badgeRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.6 },
        );
      }

      if (headlineRef.current) {
        tl.fromTo(
          headlineRef.current,
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 0.9 },
          "-=0.3",
        );
      }

      if (subRef.current) {
        tl.fromTo(
          subRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.7 },
          "-=0.5",
        );
      }

      if (btnsRef.current) {
        tl.fromTo(
          btnsRef.current,
          { opacity: 0, y: 25 },
          { opacity: 1, y: 0, duration: 0.6 },
          "-=0.4",
        );
      }

      if (statsRef.current) {
        tl.fromTo(
          statsRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6 },
          "-=0.3",
        );
      }

      if (techRef.current) {
        tl.fromTo(
          techRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.5 },
          "-=0.2",
        );
      }

      // Staggered cards animation
      if (cardsRef.current && cardsRef.current.children) {
        gsap.fromTo(
          cardsRef.current.children,
          { opacity: 0, x: 40, scale: 0.95 },
          {
            opacity: 1,
            x: 0,
            scale: 1,
            stagger: 0.1,
            duration: 0.7,
            ease: "back.out(1.2)",
            delay: 0.4,
          },
        );
      }
    });
  }, []);

  const scrollToSection = (id) => {
  document.getElementById(id)?.scrollIntoView({
    behavior: "smooth",
  });
};

  return (
    <section
      className="hero-root relative min-h-[100svh] overflow-hidden bg-[#faf6f0]"
      id="home"
    >
      <AnimatedBg  />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 md:pt-24 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            {/* Badge */}
            <div
              ref={badgeRef}
              className="inline-flex items-center gap-2 bg-[#F8FAFC] border border-[#3B82F6] text-[#2563EB] px-5 py-2.5 rounded-full text-sm font-semibold tracking-widest"
            >
              <div className="w-2 h-2 bg-[#3B82F6] rounded-full animate-pulse" />
              INDIA'S TOP IT AGENCY 2026
            </div>

            {/* Headline - Reduced Size */}
            <h1 className="text-[2.6rem] sm:text-[3.2rem] lg:text-[4rem] leading-[0.95] font-bold text-[#0F172A]">
              <div>Transforming</div>

              <div className="text-[#2563EB]">
                Ideas Into
              </div>

              <div>Digital Products</div>
            </h1>

            {/* Subtitle */}
            <p
              ref={subRef}
              className="text-base sm:text-lg text-gray-700 max-w-xl leading-relaxed"
            >
              Full-stack development, stunning UI/UX, and high-performance
              solutions that help your business grow faster.
            </p>

            {/* Buttons */}
            <div ref={btnsRef} className="flex flex-col sm:flex-row gap-4 w-full">
              <a 
              href="https://webixinfotech.com/contact"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex justify-center items-center gap-3 w-full sm:w-auto bg-gray-900 hover:bg-black text-white font-semibold px-8 py-4 rounded-full transition-all duration-300">
                Start Your Project
                <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
              </a>

              <button 
              onClick={
                ()=>scrollToSection('project')
              }
                
              className="flex justify-center items-center gap-3 w-full sm:w-auto border-2 border-gray-800 hover:bg-gray-900 hover:text-white transition-all duration-300 px-8 py-4 rounded-full font-semibold">
                <FiPlay /> See Our Work
              </button>
            </div>

            {/* Stats */}
            <div
              ref={statsRef}
              className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-200 text-center"
            >
              {STATS.map((stat, i) => (
                <div key={i}>
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
                    {stat.num}
                  </div>
                  <div className="text-[11px] sm:text-sm text-gray-500 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Tech Stack */}

            <div ref={techRef} className="pt-6">
              <p className="uppercase text-xs tracking-widest text-gray-500 mb-4">
                Built With Modern Technologies
              </p>

              <div className="tech-marquee-wrapper w-full overflow-hidden">
                <div className="tech-marquee-track">
                  {[...TECH, ...TECH].map((tech, index) => (
                    <div
                      key={index}
                      className="
            flex items-center gap-2
            bg-white/80
            backdrop-blur-md
            border border-gray-200
            px-4 py-2
            rounded-full
            text-xs sm:text-sm
            whitespace-nowrap
            hover:bg-gray-900
            hover:text-white
            transition-all
            duration-300
            text-[#0F172A]
          "
                    >
                      {tech.icon}
                      <span>{tech.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Feature Cards */}
          <div ref={cardsRef} className="mt-10 lg:mt-0 space-y-4 lg:space-y-6">
            {FEATURES.map((feature, index) => (
              <div key={index} className="glass-card p-7">
                <div className="flex gap-5">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
                    style={{
                      backgroundColor: feature.bg,
                      color: feature.color,
                    }}
                  >
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-xl mb-2 text-gray-900">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {feature.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            {/* Free Consultation Card */}
            <div className="glass-card p-8 mt-8 bg-gradient-to-br from-blue-50 to-amber-50 border-blue-100">
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-semibold text-lg">
                    Free 30-Min Strategy Call
                  </div>
                  <div className="text-gray-600 mt-1">
                    Let's discuss your project goals
                  </div>
                </div>
                <a 
                href="tel:+919926820304"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full flex items-center gap-2 font-medium transition-all">
                  Book Now <FiArrowRight />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center text-gray-400 text-xs tracking-widest">
        <div className="w-px h-12 bg-gradient-to-b from-transparent via-gray-400 to-transparent mb-2" />
        SCROLL
      </div>
    </section>
  );
};

export default HeroSection;
