// components/Header.tsx

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes } from 'react-icons/fa'; // Icons para el menú hamburguesa

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  // Cerrar menú móvil al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 shadow-lg bg-gradient-to-r from-[#25b7f7] to-[#25b7f7] text-white">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Logo Animado */}
        <Link href="/" className="flex items-center space-x-2">
          <motion.img
            src="/images/Dinoco_Logo.webp"
            alt="Dynoco Racing Logo"
            className="w-12 h-12"
            whileHover={{ rotate: 360 }}
            transition={{ duration: 1, ease: 'easeInOut' }}
          />
          <span className="text-2xl font-bold">Dynoco Racing</span>
        </Link>

        {/* Enlaces de Navegación */}
        <nav className="hidden md:flex space-x-8 items-center">
          <NavLink href="/" label="Home" />
          <NavLink href="/about" label="About Us" />
          <NavLink href="/team" label="Team" />
          {/* Ejemplo de Submenú */}
          <DropdownLink label="Services">
            <Link href="/sponsorships" className="block text-black px-4 py-2 hover:bg-gray-200">Sponsorships</Link>
            {/* Agrega más enlaces aquí si es necesario */}
          </DropdownLink>
          <Link
            href="/join"
            className="bg-[#ff8049] hover:bg-orange-600 text-white px-4 py-2 rounded-full transition duration-300 flex items-center space-x-2"
          >
            <span>Join</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11V7a1 1 0 10-2 0v0.586l-2.293-2.293a1 1 0 00-1.414 1.414L8.586 9H7a1 1 0 100 2h2v2a1 1 0 102 0V11h2a1 1 0 100-2h-1.586l2.293-2.293a1 1 0 00-1.414-1.414L11 7.586z"
                clipRule="evenodd"
              />
            </svg>
          </Link>
        </nav>

        {/* Menú Hamburguesa para Móviles */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="focus:outline-none text-white"
            aria-label="Menu"
            aria-expanded={isOpen}
          >
            {isOpen ? (
              <FaTimes className="w-6 h-6" />
            ) : (
              <FaBars className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Menú Móvil con Animación */}
      <AnimatePresence>
        {isOpen && (
          <motion.nav
            ref={mobileMenuRef}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className="md:hidden bg-gradient-to-r from-[#25b7f7] to-[#ff8049] overflow-hidden"
          >
            <div className="flex flex-col items-center space-y-4 py-4">
              <MobileNavLink href="/" label="Home" onClick={() => setIsOpen(false)} />
              <MobileNavLink href="/about" label="About Us" onClick={() => setIsOpen(false)} />
              <MobileNavLink href="/team" label="Team" onClick={() => setIsOpen(false)} />
              <MobileDropdown label="Services" onClick={() => setIsOpen(false)}>
                <Link href="/services/design" className="block px-4 py-2 hover:bg-gray-200">Design</Link>
                <Link href="/services/development" className="block px-4 py-2 hover:bg-gray-200">Development</Link>
                <Link href="/services/marketing" className="block px-4 py-2 hover:bg-gray-200">Marketing</Link>
              </MobileDropdown>
              <MobileNavLink href="/contact" label="Contact" onClick={() => setIsOpen(false)} />
              <Link
                href="/join"
                className="bg-[#ff8049] hover:bg-orange-600 text-white px-4 py-2 rounded-full transition duration-300 flex items-center justify-center w-3/4"
                onClick={() => setIsOpen(false)}
              >
                Join
              </Link>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};

// Componente para Enlaces de Navegación con Efectos
interface NavLinkProps {
  href: string;
  label: string;
}

const NavLink: React.FC<NavLinkProps> = ({ href, label }) => (
  <Link href={href} className="relative group">
    <span className="hover:text-[#ffffff] transition duration-300">{label}</span>
    <motion.div
      className="absolute left-0 -bottom-1 w-full h-0.5 bg-white"
      initial={{ scaleX: 0 }}
      whileHover={{ scaleX: 1 }}
      transition={{ duration: 0.3 }}
      style={{ transformOrigin: 'left' }}
    />
  </Link>
);

// Componente para Submenús de Navegación
interface DropdownLinkProps {
  label: string;
  children: React.ReactNode;
}

const DropdownLink: React.FC<DropdownLinkProps> = ({ label, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Cerrar submenú al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-1 focus:outline-none"
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <span className="hover:text-[#ffffff] transition duration-300">{label}</span>
        <svg
          className={`w-4 h-4 transform transition-transform duration-200 ${isOpen ? 'rotate-180' : 'rotate-0'}`}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute left-0 mt-2 w-40 bg-white rounded-md shadow-lg z-10"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Componentes para Enlaces Móviles
interface MobileNavLinkProps {
  href: string;
  label: string;
  onClick: () => void;
}

const MobileNavLink: React.FC<MobileNavLinkProps> = ({ href, label, onClick }) => (
  <Link href={href} className="w-full text-center text-lg hover:text-[#ffffff] transition duration-300" onClick={onClick}>
    {label}
  </Link>
);

// Componente para Submenús en Móvil
interface MobileDropdownProps {
  label: string;
  children: React.ReactNode;
  onClick: () => void;
}

const MobileDropdown: React.FC<MobileDropdownProps> = ({ label, children, onClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Cerrar submenú al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="w-3/4 mx-auto" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-center text-lg flex justify-between items-center hover:text-[#ffffff] transition duration-300 focus:outline-none"
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        {label}
        <svg
          className={`w-4 h-4 transform transition-transform duration-200 ${isOpen ? 'rotate-180' : 'rotate-0'}`}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="flex flex-col space-y-2 mt-2">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Header;
