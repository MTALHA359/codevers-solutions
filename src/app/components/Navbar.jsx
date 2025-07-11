

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react'; // optional: lucide-react icons

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="w-full z-50 sticky top-0 bg-gradient-to-r from-[#0a0a0a] via-[#150035] to-[#1e0038] backdrop-blur border-b border-white/10 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* Logo */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xl">S</span>
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            SoftwareLux
          </span>
        </div>

        {/* Desktop Links */}
        <nav className="hidden md:flex space-x-10">
                    <Link href="/Home" className="text-white/80 hover:text-white transition font-medium">Home</Link>
          <Link href="/services" className="text-white/80 hover:text-white transition font-medium">Services</Link>
          <Link href="/portfolio" className="text-white/80 hover:text-white transition font-medium">Portfolio</Link>
          <Link href="/about" className="text-white/80 hover:text-white transition font-medium">About</Link>
          <Link href="/contact" className="text-white/80 hover:text-white transition font-medium">Contact</Link>
        </nav>

        {/* CTA Button - always visible */}
        <div className="hidden md:block">
          <Link href="/contact">
            <button className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold px-6 py-2 rounded-full hover:scale-105 transition-all duration-300 shadow-lg">
              Get Started
            </button>
          </Link>
        </div>

        {/* Mobile Menu Icon */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-white focus:outline-none">
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden px-6 pb-6 space-y-4 bg-gradient-to-r from-[#0a0a0a] via-[#150035] to-[#1e0038] border-t border-white/10">
                    <Link href="/Home" className="block text-white/80 hover:text-white font-medium" onClick={() => setIsOpen(false)}>Home</Link>
          <Link href="/services" className="block text-white/80 hover:text-white font-medium" onClick={() => setIsOpen(false)}>Services</Link>
          <Link href="/portfolio" className="block text-white/80 hover:text-white font-medium" onClick={() => setIsOpen(false)}>Portfolio</Link>
          <Link href="/about" className="block text-white/80 hover:text-white font-medium" onClick={() => setIsOpen(false)}>About</Link>
          <Link href="/contact" className="block text-white/80 hover:text-white font-medium" onClick={() => setIsOpen(false)}>Contact</Link>

          <Link href="/contact">
            <button className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold px-6 py-2 rounded-full mt-4 hover:scale-105 transition-all duration-300 shadow-lg">
              Get Started
            </button>
          </Link>
        </div>
      )}
    </header>
  );
}

