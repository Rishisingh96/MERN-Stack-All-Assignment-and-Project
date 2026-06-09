import React from 'react';
import { FiTwitter, FiLinkedin, FiGithub, FiInstagram, FiArrowUp, FiMail, FiPhone, FiMapPin } from 'react-icons/fi';
import { FaFacebookF, FaLinkedinIn, FaInstagram, FaXTwitter } from 'react-icons/fa6';
import { Link } from 'react-router-dom';

const Footer = () => {

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (id) => {
    if (id === "#home") {
      window.location.hash = "";
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    window.location.hash = id;
    document.getElementById(id)?.scrollIntoView({
      behavior: 'smooth',
    });
  };

  const socialLinks = [
    {
      icon: FaFacebookF,
      url: "https://www.facebook.com/webixinfotech",
      hover: "hover:bg-blue-600",
    },
    {
      icon: FaLinkedinIn,
      url: "https://www.linkedin.com/company/webixinfotech/posts/?feedView=all",
      hover: "hover:bg-blue-700",
    },
    {
      icon: FaInstagram,
      url: "https://www.instagram.com/webix_infotech/",
      hover: "hover:bg-pink-600",
    },
    {
      icon: FaXTwitter,
      url: "https://x.com/webix_infotech",
      hover: "hover:bg-black",
    },
  ];

  return (
    <footer id="contact" className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold">WEBIXINFOTECH INDIA PVT. LTD.</h3>
            <p className="text-gray-400 leading-relaxed">
              Transforming ideas into digital products. We build scalable web applications with modern technologies.
            </p>
            <div className="flex gap-4 pt-4">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-10 h-10 rounded-full border border-white/20 flex items-center justify-center transition-all duration-300 hover:-translate-y-1 ${social.hover}`}
                  >
                    <Icon size={18} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-gray-400 hover:text-blue-500 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <button onClick={() => scrollToSection('#services')} className="text-gray-400 hover:text-blue-500 transition-colors">
                  Service
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('#project')} className="text-gray-400 hover:text-blue-500 transition-colors">
                  Project
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('#ecosystem')} className="text-gray-400 hover:text-blue-500 transition-colors">
                  Ecosystem
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('#faq')} className="text-gray-400 hover:text-blue-500 transition-colors">
                  FAQSection
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('#contact')} className="text-gray-400 hover:text-blue-500 transition-colors">
                  Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Get in Touch */}
          <div className="-ml-4">
            <h4 className="text-lg font-semibold mb-4">Get in Touch</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <FiMail size={20} className="text-orange-500 mt-1 flex-shrink-0" />
                <a href="mailto:officialwebixinfotech@gmail.com" className="text-gray-400 hover:text-orange-500 transition-colors">
                  officialwebixinfotech@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <FiPhone size={20} className="text-orange-500 mt-1 flex-shrink-0" />
                <a href="tel:+919926820304" className="text-gray-400 hover:text-orange-500 transition-colors">
                  +91 9926820304
                </a>
              </li>
              <li className="flex items-start gap-3">
                <FiMapPin size={20} className="text-orange-500 mt-1 flex-shrink-0" />
                <span className="text-gray-400">
                  Aditya Gateway MR 10, Vijay Nagar, Indore - 452010, Madhya Pradesh, India
                </span>
              </li>
            </ul>
          </div>

          {/* Map */}
          <div>
            <h4 className="text-lg font-semibold mb-4 ml-6">Location</h4>
            <div className="overflow-hidden rounded-2xl border border-gray-700 ml-6">
              <iframe
                title="map"
                src="https://maps.google.com/maps?q=Aditya+Gateway+MR+10+Vijay+Nagar+Indore&t=&z=13&ie=UTF8&iwloc=&output=embed"
                className="w-full h-[200px]"
              />
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm">
            © 2026 WEBIXINFOTECH INDIA PVT. LTD. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <Link to="/privacy-policy" className="text-gray-400 hover:text-orange-500 transition-colors">
              Privacy Policy
            </Link>
            <Link to="/cookie-policy" className="text-gray-400 hover:text-orange-500 transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 w-12 h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110"
        aria-label="Scroll to top"
      >
        <FiArrowUp size={20} />
      </button>
    </footer>
  );
};

export default Footer;
