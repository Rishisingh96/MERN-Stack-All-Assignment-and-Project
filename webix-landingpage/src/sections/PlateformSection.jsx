import React, { useEffect, useRef, useState } from "react";
import PlatformCard from "../component/ui/PlateformCard";
import webix from "../assets/webix.png";
import car from "../assets/car.png";
import ecommerce from "../assets/ecommerce.png";
import resort from "../assets/resort.png";
import news from "../assets/news.png";
import skillbridge from "../assets/skillbridge.png";

import {
  FiGlobe,
  FiShoppingCart,
  FiHome,
  FiGrid,
  FiFileText,
  FiMapPin,
} from "react-icons/fi";

import gsap from "gsap";
import AnimatedBg from "../component/common/Animatedbg1";

const platforms = [
  {
    icon: FiGrid,
    title: "CAR Management System",
    description:
      "Advanced vehicle and client management platform with real-time tracking and automation.",
    url: "https://car.webixinfotech.in/",
    image: car,
  },
  {
    icon: FiShoppingCart,
    title: "E-Commerce Platform",
    description:
      "Scalable online store solution with seamless checkout, analytics, and AI-powered features.",
    url: "https://ecommerce.webixinfotech.in/",
    image: ecommerce,
  },
  {
    icon: FiHome,
    title: "Resort Booking System",
    description:
      "Smart booking platform with real-time availability, user dashboards, and payment integration.",
    url: "https://resort.webixinfotech.in/",
    image: resort,
  },
  {
    icon: FiMapPin,
    title: "Real Estate Platform",
    description:
      "Smart property platform for buying, selling, and exploring listings with a clean and user-friendly experience.",
    url: "https://realestate.webixinfotech.in/",
    image: ecommerce,
  },
  {
    icon: FiFileText,
    title: "News & Media Platform",
    description:
      "Modern news platform with multilingual support and CMS-driven content management.",
    url: "https://mahabharatpath.com/",
    image: news,
  },
  {
    icon: FiGlobe,
    title: "SkillBridge Learning Platform",
    description:
      "Online learning platform offering courses and resources for skill development.",
    url: "https://skillbridgelearnbyrishi.vercel.app/",
    image: skillbridge,
  }
];

const Platforms = () => {
  const sectionRef = useRef(null);
  const [showAll, setShowAll] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCardClick = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  useEffect(() => {
    if (!sectionRef.current) return;

    const cards = document.querySelectorAll(".platform-card");

    if (cards.length > 0) {
      gsap.from(cards, {
        y: 40,
        duration: 0.6,
        stagger: 0.08,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });
    }
  }, [showAll]); // Added showAll dependency so GSAP runs properly when new cards load

  return (
    <section
      ref={sectionRef}
      id="project"
      className="relative py-20 sm:py-24 md:py-28 overflow-hidden"
    >
      <AnimatedBg intensity="low" speed="slow" baseColor="#f0f4ff" />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        
        {/* Header Text Section */}
        <div className="text-center mb-16 sm:mb-20 md:mb-24">
          <span className="inline-block px-4 py-1.5 rounded-full border border-orange-200/80 bg-orange-50/60 text-orange-600 text-xs font-bold tracking-[0.2em] uppercase mb-6 shadow-sm">
            Platforms
          </span>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-950 tracking-tight">
            Quick{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-blue-500 to-blue-600">
              Access
            </span>
          </h2>

          <p className="max-w-2xl mx-auto mt-6 text-base sm:text-lg text-slate-600 leading-relaxed">
            Explore our digital products, platforms, and enterprise-grade solutions crafted for modern businesses.
          </p>
        </div>

        {/* Cards Responsive Grid Wrapper */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch auto-rows-fr">
          {platforms.slice(0, showAll ? platforms.length : 6).map((item, index) => (
            <PlatformCard key={index} {...item} onClick={() => handleCardClick(item)} />
          ))}
        </div>

        {platforms.length > 6 && (
          <div className="text-center mt-12">
            <button
              onClick={() => setShowAll(!showAll)}
              className="px-8 py-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors cursor-pointer font-medium shadow-md"
            >
              {showAll ? "View Less" : "View More"}
            </button>
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && selectedProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-xl font-bold text-slate-900">{selectedProject.title}</h3>
              <button
                onClick={closeModal}
                className="p-2 rounded-full hover:bg-slate-100 transition-colors"
              >
                <svg
                  className="w-6 h-6 text-slate-600"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                className="w-full h-auto rounded-lg shadow-md mb-6"
              />

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href={selectedProject.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors font-medium text-center shadow-md"
                >
                  Go to Live Website
                </a>
                <button
                  onClick={() => window.open(selectedProject.image, '_blank')}
                  className="px-6 py-3 bg-slate-800 text-white rounded-full hover:bg-slate-900 transition-colors font-medium shadow-md"
                >
                  View Full Image
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Platforms;