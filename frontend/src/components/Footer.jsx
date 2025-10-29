import React from 'react';
import { Mail, MapPin, Leaf, Facebook, Twitter, Linkedin } from "lucide-react";
import { Link, BrowserRouter as Router } from 'react-router-dom';

const Button = ({ children, className, onClick }) => (
  <button 
    className={`px-4 py-2 rounded-lg font-medium transition-colors ${className}`}
    onClick={onClick}
  >
    {children}
  </button>
);


const Input = ({ type, placeholder, className }) => (
  <input
    type={type}
    placeholder={placeholder}
    className={`flex h-10 w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
  />
);


const Footer = () => { 
  const currentYear = new Date().getFullYear();
  

  const textLight = "text-white/90";
  const textCream = "text-white";
  const iconGreen = "text-[#4CAF50]";
  const bgTeal = "bg-[#004D40]";
  const bgGreen = "bg-[#4CAF50]";
  const hoverGreen = "hover:bg-[#45a049]";

  return (
    <footer className={`${bgTeal} ${textLight} font-sans`}>
      {/* Newsletter Section */}
      <div className="border-b border-white/10">
        <div className="container mx-auto px-4 py-8 max-w-6xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <h3 className={`text-xl md:text-2xl font-semibold ${textCream}`}>
              Stay ahead of the season.
            </h3>
            <div className="flex flex-col sm:flex-row w-full md:w-auto gap-2">
              <Input
                type="email"
                placeholder="Enter your email"
                className={`
                  bg-white/10 border-white/20 
                  ${textCream} placeholder:${textLight} 
                  focus:ring-[#4CAF50] focus:ring-offset-[#004D40] 
                  min-w-0 sm:min-w-[250px]
                `}
              />
              <Button className={`${bgGreen} ${hoverGreen} ${textCream} font-medium w-full sm:w-auto`}>
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          
          {/* Column 1: Company Info */}
          <div className="space-y-4 lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Leaf className={`h-8 w-8 ${iconGreen}`} /> 
              <span className={`text-2xl font-bold ${textCream}`}>
                Farm Support
              </span>
            </div>
            <p className={`${textCream} font-medium`}>
              Smart recommendations. Healthy yields.
            </p>
            <div className="space-y-2 pt-4">
              <div className="flex items-center gap-2">
                <Mail className={`h-4 w-4 ${iconGreen}`} /> 
                <a
                  href="mailto:singhtarandeep0655@gmail.com"
                  className={`hover:${textCream} transition-colors`}
                >
                  support@farmsupport.com
                </a>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className={`h-4 w-4 ${iconGreen}`} /> 
                <span>Noida, India</span>
              </div>
            </div>
          </div>
          <div>
            <h4 className={`text-lg font-semibold ${textCream} mb-4`}>
              Quick Links
            </h4>
            <ul className="space-y-2">
              {[
                "Crop Recommendation",
                "Disease Detection",
                "Blog",
                "FAQs",
              ].map((link) => (
                <li key={link}>
                  <Link
                    to="/#"  
                    className={`hover:${textCream} hover:pl-1 transition-all duration-200 inline-block`}
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Legal & Social */}
          <div>
            <h4 className={`text-lg font-semibold ${textCream} mb-4`}>
              Legal & Social
            </h4>
            <ul className="space-y-2 mb-6">
              {["Privacy Policy", "Terms of Service", "Disclaimer"].map(
                (link) => (
                  <li key={link}>
                    <Link
                      to="/#"  
                      className={`hover:${textCream} hover:pl-1 transition-all duration-200 inline-block`}
                    >
                      {link}
                    </Link>
                  </li>
                )
              )}
            </ul>
            <div className="flex gap-4">
              <a
                href="https://twitter.com/FarmSupportApp"
                target="_blank"
                rel="noopener noreferrer"
                className={`p-2 bg-white/10 rounded-full hover:bg-[#4CAF50] transition-colors ${textCream}`}
                aria-label="Twitter"
              >
                <Twitter className="h-4 w-4" /> 
              </a>
              <a
                href="https://facebook.com/FarmSupportApp"
                target="_blank"
                rel="noopener noreferrer"
                className={`p-2 bg-white/10 rounded-full hover:bg-[#4CAF50] transition-colors ${textCream}`}
                aria-label="Facebook"
              >
                <Facebook className="h-4 w-4" /> 
              </a>
              <a
                href="https://linkedin.com/company/FarmSupportApp"
                target="_blank"
                rel="noopener noreferrer"
                className={`p-2 bg-white/10 rounded-full hover:bg-[#4CAF50] transition-colors ${textCream}`}
                aria-label="LinkedIn"
              >
                <Linkedin className="h-4 w-4" /> 
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Strip */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 py-4 max-w-6xl">
          <p className="text-center text-sm">
            © {currentYear} Farm Support. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};


export default Footer;
