import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-[#0B0F17] text-gray-400 border-t border-gray-800 mt-auto py-4">
      <div className="container mx-auto px-6">
        <div className="flex flex-wrap justify-between items-center">
          {/* Company Info */}
          <div className="mb-4 md:mb-0">
            <h3 className="text-xl font-bold text-purple-350">TeamMeet</h3>
            <p className="text-sm mt-2">Making collaboration seamless.</p>
          </div>

          {/* Social Links */}
          <div className="flex space-x-8">
            <a href="#" className="hover:text-purple-350 transition-colors">Twitter</a>
            <a href="#" className="hover:text-purple-350 transition-colors">LinkedIn</a>
            <a href="#" className="hover:text-purple-350 transition-colors">GitHub</a>
          </div>

          {/* Copyright */}
          <div className="w-full md:w-auto text-center md:text-left mt-4 md:mt-0">
            <p className="text-sm">
              {new Date().getFullYear()} TeamMeet. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
