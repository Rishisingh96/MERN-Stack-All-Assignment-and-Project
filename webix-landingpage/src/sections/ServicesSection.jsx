import { useRef } from "react";
import {
  Code2,
  Smartphone,
  Cloud,
  Brain,
  Palette,
  Shield,
} from "lucide-react";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import ServiceCard from "../component/ui/ServiceCard";
import AnimatedBg from "../component/common/Animatedbg1";

gsap.registerPlugin(
  ScrollTrigger,
  useGSAP
);

const services = [
  {
    id: 1,
    icon: <Code2 size={32} />,
    title: "Web Development",
    description:
      "Modern, scalable web applications built with cutting-edge frameworks and performance-first architecture.",
    color: 'blue',
  },
  {
    id: 2,
    icon: <Smartphone size={32} />,
    title: "Mobile Apps",
    description:
      "Cross-platform mobile experiences with native performance that users love and businesses rely on.",
    color: 'blue',
  },
  {
    id: 3,
    icon: <Cloud size={32} />,
    title: "Digital Marketing",
    description:
      "Boost your online presence with SEO, social media marketing, paid advertising, content strategies, and data-driven campaigns.",
    color: 'blue',
  },
  {
    id: 4,
    icon: <Brain size={32} />,
    title: "ERP & HRMS",
    description:
      "Complete ERP and HRMS solutions to manage operations, attendance",
    color: 'blue',
  },
  {
    id: 5,
    icon: <Palette size={32} />,
    title: "UI/UX Design",
    description:
      "Award-worthy interfaces that delight users and convert visitors into loyal customers.",
    color: 'blue',
  },
  {
    id: 6,
    icon: <Shield size={32} />,
    title: "Custom Software",
    description:
      "Custom software solutions designed to improve efficiency, scalability",
    color: 'blue',
  },
];

export default function ServicesSection() {
  const sectionRef = useRef(null);

  useGSAP(() => {
    if (!sectionRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 75%",
      },
    });

    const badge = document.querySelector(".services-badge");
    const title = document.querySelector(".services-title");
    const text = document.querySelector(".services-text");
    const cards = document.querySelectorAll(".service-card");
    const glow = document.querySelector(".services-glow");

    if (badge) {
      tl.from(badge, {
        y: 40,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
      });
    }

    if (title) {
      tl.from(title, {
        y: 60,
        opacity: 0,
        duration: 0.9,
        ease: "power4.out",
      }, "-=0.4");
    }

    if (text) {
      tl.from(text, {
        y: 40,
        opacity: 0,
        duration: 0.7,
      }, "-=0.5");
    }

    if (cards.length > 0) {
      tl.from(cards, {
        y: 40,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
      }, "-=0.3");
    }

    if (glow) {
      gsap.to(glow, {
        scale: 1.3,
        duration: 5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }
  });

  return (
    <section
      ref={sectionRef}
      id="services"
      className="
      relative
      overflow-hidden
      py-16 sm:py-20 md:py-32
      "
    >
      <AnimatedBg intensity="medium" speed="normal" baseColor="#eff6ff" />
      {/* Animated Glow */}
      <div
        className="
        services-glow
        absolute
        left-1/2
        top-20
        h-[300px] sm:h-[400px] md:h-[550px]
        w-[300px] sm:w-[400px] md:w-[550px]
        -translate-x-1/2
        rounded-full
        bg-gradient-to-r
        from-blue-400/20
        via-indigo-300/20
        to-blue-500/20
        blur-[100px] sm:blur-[125px] md:blur-[150px]
        "
      />

      <div
        className="
        mx-auto
        max-w-7xl
        px-4 sm:px-6
        relative
        z-10
        "
      >
        <div className="text-center">
          <span
            className="
            services-badge
            text-xs sm:text-sm
            font-bold
            uppercase
            tracking-[0.2em] sm:tracking-[0.4em]
            text-blue-600
            "
          >
            WHAT WE DO
          </span>

          <h2
            className="
            services-title
            mt-4 sm:mt-5
            text-3xl sm:text-4xl md:text-5xl lg:text-6xl
            font-black
            leading-tight
            "
          >
            Transforming Ideas Into{" "}
            <span
              className="
              bg-gradient-to-r
              from-blue-500
              via-indigo-400
              to-blue-600
              bg-clip-text
              text-transparent
              "
            >
              Digital Products
            </span>
          </h2>

          <p
            className="
            services-text
            mx-auto
            mt-5 sm:mt-7
            max-w-3xl
            text-base sm:text-lg md:text-xl
            text-slate-600
            "
          >
            We design, develop and scale digital
            experiences that help businesses grow
            faster in the modern world.
          </p>
        </div>

        <div
          className="
          mt-12 sm:mt-16 md:mt-20
          grid
          gap-6 sm:gap-8
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-3
          "
        >
          {services.map((service) => (
            <div
              key={service.id}
              className="service-card"
            >
              <ServiceCard {...service} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}