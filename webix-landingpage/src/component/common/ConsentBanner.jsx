import React, { useState, useEffect } from "react";
import { Cookie, X, Check, Settings } from "lucide-react";
import { Link } from "react-router-dom";

const ConsentBanner = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState({
    essential: true,
    analytical: false,
    functional: false,
    marketing: false,
  });

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem("cookieConsent");
    if (!consent) {
      // Show banner after a short delay
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = () => {
    const allAccepted = {
      essential: true,
      analytical: true,
      functional: true,
      marketing: true,
    };
    setPreferences(allAccepted);
    localStorage.setItem("cookieConsent", JSON.stringify(allAccepted));
    setIsVisible(false);
  };

  const handleRejectAll = () => {
    const onlyEssential = {
      essential: true,
      analytical: false,
      functional: false,
      marketing: false,
    };
    setPreferences(onlyEssential);
    localStorage.setItem("cookieConsent", JSON.stringify(onlyEssential));
    setIsVisible(false);
  };

  const handleSavePreferences = () => {
    localStorage.setItem("cookieConsent", JSON.stringify(preferences));
    setIsVisible(false);
    setShowSettings(false);
  };

  const handlePreferenceChange = (type) => {
    if (type === "essential") return; // Essential cookies cannot be disabled
    setPreferences((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6">
      {!showSettings ? (
        // Main Banner
        <div className="max-w-6xl mx-auto bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200 p-6 sm:p-8">
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
            {/* Icon */}
            <div className="flex-shrink-0">
              <div className="w-14 h-14 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg">
                <Cookie className="w-7 h-7 text-white" />
              </div>
            </div>

            {/* Content */}
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                We Value Your Privacy
              </h3>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                We use cookies to enhance your browsing experience, serve personalized 
                content, and analyze our traffic. By clicking "Accept All", you consent 
                to our use of cookies.
              </p>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
              <button
                onClick={() => setShowSettings(true)}
                className="flex items-center justify-center gap-2 px-5 py-3 border-2 border-gray-300 rounded-xl font-semibold text-gray-700 hover:bg-gray-50 transition-all duration-300"
              >
                <Settings className="w-4 h-4" />
                Preferences
              </button>
              <button
                onClick={handleRejectAll}
                className="px-5 py-3 border-2 border-gray-300 rounded-xl font-semibold text-gray-700 hover:bg-gray-50 transition-all duration-300"
              >
                Reject
              </button>
              <button
                onClick={handleAcceptAll}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-500/30 hover:-translate-y-0.5 transition-all duration-300"
              >
                <Check className="w-4 h-4" />
                Accept All
              </button>
            </div>

            {/* Close Button */}
            <button
              onClick={() => setIsVisible(false)}
              className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* Policy Links */}
          <div className="mt-4 pt-4 border-t border-gray-200 flex flex-wrap gap-4 text-sm">
            <Link
              to="/privacy-policy"
              onClick={() => setIsVisible(false)}
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Privacy Policy
            </Link>
            <span className="text-gray-400">•</span>
            <Link
              to="/cookie-policy"
              onClick={() => setIsVisible(false)}
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Cookie Policy
            </Link>
          </div>
        </div>
      ) : (
        // Settings Panel
        <div className="max-w-2xl mx-auto bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200 p-6 sm:p-8">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl flex items-center justify-center">
                <Settings className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">
                  Cookie Preferences
                </h3>
                <p className="text-sm text-gray-600">
                  Customize your cookie settings
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowSettings(false)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* Cookie Options */}
          <div className="space-y-4 mb-6">
            {/* Essential */}
            <div className="flex items-center justify-between p-4 bg-green-50 rounded-xl border border-green-200">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-semibold text-gray-900">Essential</h4>
                  <span className="text-xs bg-green-200 text-green-800 px-2 py-0.5 rounded-full">
                    Always On
                  </span>
                </div>
                <p className="text-sm text-gray-600">
                  Required for the website to function properly
                </p>
              </div>
              <div className="w-12 h-6 bg-green-500 rounded-full relative">
                <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
              </div>
            </div>

            {/* Analytical */}
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-200">
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900 mb-1">Analytical</h4>
                <p className="text-sm text-gray-600">
                  Help us improve our website by analyzing usage
                </p>
              </div>
              <button
                onClick={() => handlePreferenceChange("analytical")}
                className={`w-12 h-6 rounded-full relative transition-colors ${
                  preferences.analytical ? "bg-blue-500" : "bg-gray-300"
                }`}
              >
                <div
                  className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                    preferences.analytical ? "right-1" : "left-1"
                  }`}
                ></div>
              </button>
            </div>

            {/* Functional */}
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-200">
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900 mb-1">Functional</h4>
                <p className="text-sm text-gray-600">
                  Enable enhanced features and personalization
                </p>
              </div>
              <button
                onClick={() => handlePreferenceChange("functional")}
                className={`w-12 h-6 rounded-full relative transition-colors ${
                  preferences.functional ? "bg-blue-500" : "bg-gray-300"
                }`}
              >
                <div
                  className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                    preferences.functional ? "right-1" : "left-1"
                  }`}
                ></div>
              </button>
            </div>

            {/* Marketing */}
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-200">
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900 mb-1">Marketing</h4>
                <p className="text-sm text-gray-600">
                  Used to deliver relevant advertisements
                </p>
              </div>
              <button
                onClick={() => handlePreferenceChange("marketing")}
                className={`w-12 h-6 rounded-full relative transition-colors ${
                  preferences.marketing ? "bg-blue-500" : "bg-gray-300"
                }`}
              >
                <div
                  className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                    preferences.marketing ? "right-1" : "left-1"
                  }`}
                ></div>
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleSavePreferences}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-500/30 hover:-translate-y-0.5 transition-all duration-300"
            >
              Save Preferences
            </button>
            <button
              onClick={handleAcceptAll}
              className="flex-1 px-6 py-3 border-2 border-blue-600 text-blue-600 rounded-xl font-semibold hover:bg-blue-50 transition-all duration-300"
            >
              Accept All
            </button>
          </div>

          {/* Policy Links */}
          <div className="mt-4 pt-4 border-t border-gray-200 flex flex-wrap gap-4 text-sm">
            <Link
              to="/privacy-policy"
              onClick={() => setIsVisible(false)}
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Privacy Policy
            </Link>
            <span className="text-gray-400">•</span>
            <Link
              to="/cookie-policy"
              onClick={() => setIsVisible(false)}
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Cookie Policy
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConsentBanner;
