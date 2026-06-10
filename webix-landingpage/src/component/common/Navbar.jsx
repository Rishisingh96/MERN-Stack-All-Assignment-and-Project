import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.webp";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "Service", href: "#services" },
    { name: "Project", href: "#project" },
    { name: "Ecosystem", href: "#ecosystem" },
    { name: "FAQSection", href: "#faq" },
    { name: "Contact", href: "#contact" },
    
  ];

  const scrollToSection = (id) => {
    if (id === "#home") {
      window.location.hash = "";
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    window.location.hash = id;
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
    });
  };

  const scrollToContact = (id) => {
    const elementId = id.replace("#", "");
    document.getElementById(elementId)?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <nav
      className="
    fixed top-0 left-0 right-0 z-50
    bg-gradient-to-r
    from-slate-950/90
    via-slate-900/85
    to-slate-950/90
    backdrop-blur-2xl
    border-b border-white/10
    shadow-[0_10px_40px_rgba(0,0,0,0.45)]
  "
    >
      {" "}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 md:mr-12 ">
        {" "}
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}{" "}
          <Link to="/" className="flex items-center group md:-ml-38 ">
            <img
              src={logo}
              alt="Webix Infotech Logo - Software Development Company"
              loading="eager"
              className="h-10 sm:h-12 w-auto object-contain transition-all duration-300 group-hover:scale-105"
            />
          </Link>
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4 lg:gap-8">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => scrollToSection(link.href)}
                className="text-white/90 hover:text-orange-400 font-medium transition-all duration-300 relative group"
              >
                {link.name}

                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-orange-500 to-yellow-500 group-hover:w-full transition-all duration-300"></span>
              </button>
            ))}

            <button
              onClick={() => scrollToContact("#contact")}
              className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 sm:px-6 py-2 sm:py-2.5 rounded-full font-semibold text-sm sm:text-base hover:shadow-[0_0_25px_rgba(249,115,22,0.6)] hover:-translate-y-1 transition-all duration-300"
            >
              Get Started
            </button>
          </div>
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="
    md:hidden
    rounded-xl
    border border-white/10
    bg-white/5
    p-2.5
    backdrop-blur-md
    transition-all
    duration-300
    hover:bg-white/10
    hover:scale-105
  "
          >
            {isOpen ? (
              <X className="w-6 h-6 text-white" />
            ) : (
              <Menu className="w-6 h-6 text-white" />
            )}
          </button>
        </div>


        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-500 ease-out ${
            isOpen
              ? "max-h-[500px] opacity-100 mt-3 translate-y-0"
              : "max-h-0 opacity-0 -translate-y-2"
          }`}
        >
          <div
            className="
      py-4
      space-y-1
      mx-2
      overflow-hidden
      rounded-3xl
      border border-white/10
      bg-gradient-to-br
      from-slate-900/95
      via-slate-950/95
      to-black/95
      backdrop-blur-2xl
      shadow-[0_20px_80px_rgba(0,0,0,0.65)]
    "
          >
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => {
                  scrollToSection(link.href);
                  setIsOpen(false);
                }}
                className="
          block
          w-full
          text-left
          px-5
          py-4
          text-white/90
          hover:text-blue-400
          hover:bg-white/5
          rounded-2xl
          font-medium
          text-sm
          transition-all
          duration-300
          hover:translate-x-1
        "
              >
                {link.name}
              </button>
            ))}

            <div className="px-4 pt-3">
              <button
                onClick={() => {
                  scrollToSection("#contact");
                }}
                
                className="
          flex
          items-center
          justify-center
          w-full
          bg-gradient-to-r
          from-blue-500
          via-blue-600
          to-indigo-600
          text-white
          py-3.5
          rounded-2xl
          font-semibold
          text-sm
          shadow-[0_10px_30px_rgba(59,130,246,0.4)]
          hover:scale-[1.02]
          transition-all
          duration-300
        "
              >
                Get Started →
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
