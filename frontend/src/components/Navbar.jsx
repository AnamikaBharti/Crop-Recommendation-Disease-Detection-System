 import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Leaf, Globe } from "lucide-react";
// 1. Import NavLink instead of Link
import { NavLink } from "react-router-dom";

// Custom Button Component (Unchanged)
const Button = ({ children, className, onClick }) => (
  <button
    className={`px-4 py-2 rounded-lg font-medium transition-colors ${className}`}
    onClick={onClick}
  >
    {children}
  </button>
);

const Navbar = ({ onLoginClick }) => {
  const { t, i18n } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Custom color definitions (Unchanged)
  const textCream = "text-white";
  const iconGreen = "text-[#4CAF50]";
  const bgTeal = "bg-[#004D40]";
  const bgGreen = "bg-[#4CAF50]";
  const hoverGreen = "hover:bg-[#45a049]";

  const navLinks = [
    { to: "/recommendation", labelKey: "navbar.cropRecommendation" },
    { to: "/detection", labelKey: "navbar.diseaseDetection" },
     { to: "/dashboard", labelKey: "Dashboard" },
  ];

  const handleLanguageChange = (lang) => {
    i18n.changeLanguage(lang);
  };

  // 2. Define base and active styles for NavLinks
  const baseLinkClass = "text-sm font-medium p-2 rounded-md transition-colors duration-200";
  const activeLinkClass = "bg-white/10 text-[#66bb6a] font-semibold";
  const inactiveLinkClass = `${textCream} hover:text-[#4CAF50]`;

  return (
    <nav className={`${bgTeal} shadow-lg sticky top-0 z-50`}>
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex justify-between items-center h-16">
          {/* Logo / Brand Name (Left Aligned) */}
          <NavLink to="/" className="flex items-center gap-2 flex-shrink-0">
            <Leaf className={`h-6 w-6 ${iconGreen}`} />
            <span className={`text-xl font-bold ${textCream}`}>
              {t("navbar.brand")}
            </span>
          </NavLink>

          {/* Desktop Navigation & Utility (Right Aligned) */}
          <div className="hidden md:flex items-center space-x-6">
            {/* Main Navigation Links */}
            <div className="flex space-x-6">
              {navLinks.map((link) => (
                // 3. Use NavLink and its className function
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    `${baseLinkClass} ${isActive ? activeLinkClass : inactiveLinkClass}`
                  }
                >
                  {t(link.labelKey)}
                </NavLink>
              ))}
            </div>

            {/* Separator */}
            <span className="h-6 w-px bg-white/20"></span>

            {/* Login Button */}
            <Button
              onClick={onLoginClick}
              className={`bg-transparent border border-white/50 ${hoverGreen} ${textCream} text-sm`}
            >
              {t("navbar.login")}
            </Button>

            {/* Language Selector (Unchanged) */}
            <div className="relative group flex items-center cursor-pointer">
              <Globe className={`h-5 w-5 mr-1 ${iconGreen}`} />
              <span className={`text-sm font-medium ${textCream}`}>
                {i18n.language.toUpperCase()}
              </span>
              <div
                className={`absolute top-full right-0 mt-2 w-24 bg-white shadow-lg rounded-lg overflow-hidden ring-1 ring-black ring-opacity-5 opacity-0 group-hover:opacity-100 transition-opacity duration-200`}
              >
                <button
                  onClick={() => handleLanguageChange("en")}
                  className={`block w-full text-left px-4 py-2 text-sm text-[#424242] hover:bg-gray-100 ${
                    i18n.language === "en" ? `${bgGreen} ${textCream} !bg-[#4CAF50]` : ""
                  }`}
                >
                  {t("navbar.langEN")}
                </button>
                <button
                  onClick={() => handleLanguageChange("hi")}
                  className={`block w-full text-left px-4 py-2 text-sm text-[#424242] hover:bg-gray-100 ${
                    i18n.language === "hi" ? `${bgGreen} ${textCream} !bg-[#4CAF50]` : ""
                  }`}
                >
                  {t("navbar.langHI")}
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Menu Button (Unchanged logic) */}
          <button
            className="md:hidden p-2 rounded-md focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
          >
            <svg
              className={`h-6 w-6 ${textCream}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"
            >
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu Content */}
      <div
        id="mobile-menu"
        className={`md:hidden ${isMenuOpen ? "block" : "hidden"} border-t border-white/10`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {navLinks.map((link) => (
            // 4. Also use NavLink for the mobile menu
            <NavLink
              key={link.to}
              to={link.to}
              onClick={() => setIsMenuOpen(false)}
              className={({ isActive }) =>
                `block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                  isActive ? activeLinkClass : `${textCream} hover:bg-white/10 hover:text-[#4CAF50]`
                }`
              }
            >
              {t(link.labelKey)}
            </NavLink>
          ))}
          <Button
            onClick={() => {
              onLoginClick();
              setIsMenuOpen(false);
            }}
            className={`block w-full px-3 py-2 rounded-md text-base font-medium ${bgGreen} ${hoverGreen} ${textCream} text-center mt-2`}
          >
            {t("navbar.login")}
          </Button>
        </div>

        {/* Mobile Language Selector (Unchanged) */}
        <div className="px-4 py-3 flex justify-around border-t border-white/10">
          {["en", "hi"].map((lang) => (
            <button
              key={lang}
              onClick={() => {
                handleLanguageChange(lang);
                setIsMenuOpen(false);
              }}
              className={`text-sm font-medium p-2 rounded-md transition-colors ${textCream} ${
                i18n.language === lang ? iconGreen : "hover:" + iconGreen
              }`}
            >
              {t(`navbar.lang${lang.toUpperCase()}`)}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

