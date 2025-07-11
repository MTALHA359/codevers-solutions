// "use client";
// import React, { useState, useEffect } from 'react';
// import { Menu, X, Code, Zap, Shield, Rocket, ChevronDown } from 'lucide-react';

// const CodeVerseNavbar = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [activeDropdown, setActiveDropdown] = useState(null);

//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 20);
//     };
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   const navItems = [
//     { name: 'Home', href: '#home' },
//     {
//       name: 'Services',
//       href: '#services',
//       dropdown: [
//         { name: 'Web Development', icon: Code },
//         { name: 'Mobile Apps', icon: Rocket },
//         { name: 'AI Solutions', icon: Zap },
//         { name: 'Cybersecurity', icon: Shield }
//       ]
//     },
//     { name: 'Portfolio', href: '/portfolio' },
//     { name: 'About', href: '/about' },
//     { name: 'Contact', href: '#contact' }
//   ];

//   return (
//     <div className="relative">
//       {/* Animated Background */}
//       <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 opacity-95 -z-10"></div>
      
//       {/* Floating Particles */}
//       <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
//         {[...Array(50)].map((_, i) => (
//           <div
//             key={i}
//             className="absolute w-1 h-1 bg-cyan-400 rounded-full animate-pulse"
//             style={{
//               left: `${Math.random() * 100}%`,
//               top: `${Math.random() * 100}%`,
//               animationDelay: `${Math.random() * 3}s`,
//               animationDuration: `${2 + Math.random() * 3}s`
//             }}
//           />
//         ))}
//       </div>

//       {/* Main Navbar */}
//       <nav className={`fixed w-full z-50 transition-all duration-500 ${
//         isScrolled
//           ? 'bg-black/20 backdrop-blur-xl border-b border-cyan-500/20 shadow-2xl shadow-cyan-500/10'
//           : 'bg-transparent'
//       }`}>
        
//         {/* Animated Border */}
//         <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent h-px top-0 animate-pulse"></div>
        
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex items-center justify-between h-20">
            
//             {/* Logo */}
//             <div className="flex items-center group cursor-pointer">
//               <div className="relative">
//                 <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-purple-600 rounded-xl flex items-center justify-center transform group-hover:scale-110 transition-all duration-300 shadow-lg shadow-cyan-500/25">
//                   <Code className="w-6 h-6 text-white animate-pulse" />
//                 </div>
//                 <div className="absolute inset-0 w-12 h-12 bg-gradient-to-br from-cyan-400 to-purple-600 rounded-xl blur-md opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
//               </div>
//               <div className="ml-4">
//                 <h1 className="text-2xl font-black bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
//                   CodeVerse
//                 </h1>
//                 <p className="text-xs text-gray-400 font-medium tracking-wider">SOLUTIONS</p>
//               </div>
//             </div>

//             {/* Desktop Navigation */}
//             <div className="hidden md:flex items-center space-x-1">
//               {navItems.map((item, index) => (
//                 <div key={item.name} className="relative">
//                   <button
//                     className={`px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 relative group ${
//                       item.dropdown ? 'flex items-center space-x-1' : ''
//                     }`}
//                     onMouseEnter={() => item.dropdown && setActiveDropdown(index)}
//                     onMouseLeave={() => item.dropdown && setActiveDropdown(null)}
//                   >
//                     {/* Hover Background */}
//                     <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
//                     <div className="absolute inset-0 bg-white/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm"></div>
                    
//                     <span className="relative z-10 text-gray-300 group-hover:text-white transition-colors duration-300">
//                       {item.name}
//                     </span>
//                     {item.dropdown && (
//                       <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-cyan-400 transition-colors duration-300 relative z-10" />
//                     )}
                    
//                     {/* Animated Underline */}
//                     <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-400 group-hover:w-full transition-all duration-300"></div>
//                   </button>

//                   {/* Dropdown Menu */}
//                   {item.dropdown && activeDropdown === index && (
//                     <div className="absolute top-full left-0 mt-2 w-64 bg-black/80 backdrop-blur-xl border border-cyan-500/20 rounded-2xl shadow-2xl shadow-cyan-500/10 overflow-hidden animate-in fade-in-0 zoom-in-95 duration-200">
//                       <div className="p-2">
//                         {item.dropdown.map((subItem, subIndex) => (
//                           <button
//                             key={subItem.name}
//                             className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl hover:bg-cyan-500/10 transition-all duration-200 group"
//                           >
//                             <div className="w-8 h-8 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
//                               <subItem.icon className="w-4 h-4 text-cyan-400" />
//                             </div>
//                             <span className="text-gray-300 group-hover:text-white transition-colors duration-200">
//                               {subItem.name}
//                             </span>
//                           </button>
//                         ))}
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               ))}
//             </div>

//             {/* CTA Button */}
//             <div className="hidden md:flex items-center space-x-4">
//               <button className="relative px-8 py-3 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold rounded-xl overflow-hidden group transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/25">
//                 <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
//                 <span className="relative z-10">Start Project</span>
//                 <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
//               </button>
//             </div>

//             {/* Mobile Menu Button */}
//             <button
//               className="md:hidden p-3 rounded-xl bg-white/10 backdrop-blur-sm border border-cyan-500/20 hover:bg-cyan-500/20 transition-all duration-300"
//               onClick={() => setIsMenuOpen(!isMenuOpen)}
//             >
//               {isMenuOpen ? (
//                 <X className="w-6 h-6 text-cyan-400" />
//               ) : (
//                 <Menu className="w-6 h-6 text-cyan-400" />
//               )}
//             </button>
//           </div>
//         </div>

//         {/* Mobile Menu */}
//         {isMenuOpen && (
//           <div className="md:hidden bg-black/95 backdrop-blur-xl border-t border-cyan-500/20">
//             <div className="px-4 py-6 space-y-4">
//               {navItems.map((item) => (
//                 <button
//                   key={item.name}
//                   className="w-full text-left px-6 py-4 rounded-xl text-gray-300 hover:text-white hover:bg-cyan-500/10 transition-all duration-300 border border-transparent hover:border-cyan-500/20"
//                 >
//                   {item.name}
//                 </button>
//               ))}
//               <button className="w-full mt-6 px-6 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold rounded-xl hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300">
//                 Start Project
//               </button>
//             </div>
//           </div>
//         )}
//       </nav>

//       {/* Demo Content */}
//       <div className="pt-32 pb-20 px-4">
//         <div className="max-w-4xl mx-auto text-center">
//           <h1 className="text-6xl font-black bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-6">
//             Welcome to CodeVerse
//           </h1>
//           <p className="text-xl text-gray-300 mb-8">
//             Experience the future of software development with our premium navbar design
//           </p>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
//             {[
//               { title: 'Glassmorphism', desc: 'Modern glass-like effects' },
//               { title: 'Animations', desc: 'Smooth micro-interactions' },
//               { title: 'Responsive', desc: 'Perfect on all devices' }
//             ].map((feature, i) => (
//               <div key={i} className="p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-cyan-500/20 hover:border-cyan-500/40 transition-all duration-300">
//                 <h3 className="text-cyan-400 font-bold text-lg mb-2">{feature.title}</h3>
//                 <p className="text-gray-400">{feature.desc}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CodeVerseNavbar;

'use client';

import Link from 'next/link';

export default function Navbar() {
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

        {/* Nav Links */}
              <nav className="hidden md:flex space-x-10">
                            <Link href="/home" className="text-white/80 hover:text-white transition font-medium">Home</Link>

          <Link href="/services" className="text-white/80 hover:text-white transition font-medium">Services</Link>
          <Link href="/portfolio" className="text-white/80 hover:text-white transition font-medium">Portfolio</Link>
          <Link href="/about" className="text-white/80 hover:text-white transition font-medium">About</Link>
          <Link href="/contact" className="text-white/80 hover:text-white transition font-medium">Contact</Link>
        </nav>

        {/* CTA Button */}
        <Link href="/contact">
          <button className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold px-6 py-2 rounded-full hover:scale-105 transition-all duration-300 shadow-lg">
            Get Started
          </button>
        </Link>
      </div>
    </header>
  );
}
