// components/Footer.tsx

import React from 'react';
import Link from 'next/link';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        {/* Información de la empresa */}
        <div className="mb-4 md:mb-0">
          <h3 className="text-xl font-bold">Dynoco Racing</h3>
          <p className="text-gray-400">© {new Date().getFullYear()} Dynoco Racing. All Rights Reserved.</p>
        </div>

        {/* Enlaces rápidos */}
        <div className="mb-4 md:mb-0">
          <Link href="/about" className="mx-2 text-gray-400 hover:text-white transition duration-300">About Us</Link>
          <Link href="/team" className="mx-2 text-gray-400 hover:text-white transition duration-300">Team</Link>
        </div>

        {/* Redes sociales */}
        <div className="flex space-x-4">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition duration-300">
            <FaFacebook size={24} />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition duration-300">
            <FaTwitter size={24} />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition duration-300">
            <FaInstagram size={24} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
