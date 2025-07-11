// "use client";
// import React, { useState, useEffect, useRef } from 'react';
// import { Menu, X, Code, Zap, Shield, Rocket, ChevronDown, ArrowRight, Star, Globe, Cpu, Database, Cloud, Sparkles } from 'lucide-react';
// import * as THREE from 'three';

// const CodeVerseHomepage = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [activeDropdown, setActiveDropdown] = useState(null);
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const mountRef = useRef(null);
//   const sceneRef = useRef(null);

//   // 3D Scene Setup
//   useEffect(() => {
//     if (!mountRef.current) return;

//     // Scene setup
//     const scene = new THREE.Scene();
//     const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
//     const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    
//     renderer.setSize(window.innerWidth, window.innerHeight);
//     renderer.setClearColor(0x000000, 0);
//     mountRef.current.appendChild(renderer.domElement);

//     // Create floating geometric shapes
//     const geometries = [
//       new THREE.BoxGeometry(1, 1, 1),
//       new THREE.SphereGeometry(0.7, 32, 32),
//       new THREE.OctahedronGeometry(0.8),
//       new THREE.TetrahedronGeometry(0.9),
//       new THREE.IcosahedronGeometry(0.7)
//     ];

//     const materials = [
//       new THREE.MeshPhongMaterial({ color: 0x00ffff, transparent: true, opacity: 0.7, wireframe: true }),
//       new THREE.MeshPhongMaterial({ color: 0x8b5cf6, transparent: true, opacity: 0.6, wireframe: true }),
//       new THREE.MeshPhongMaterial({ color: 0xf59e0b, transparent: true, opacity: 0.8, wireframe: true }),
//       new THREE.MeshPhongMaterial({ color: 0xef4444, transparent: true, opacity: 0.5, wireframe: true }),
//       new THREE.MeshPhongMaterial({ color: 0x10b981, transparent: true, opacity: 0.6, wireframe: true })
//     ];

//     const meshes = [];
//     for (let i = 0; i < 15; i++) {
//       const geometry = geometries[Math.floor(Math.random() * geometries.length)];
//       const material = materials[Math.floor(Math.random() * materials.length)];
//       const mesh = new THREE.Mesh(geometry, material);
      
//       mesh.position.x = (Math.random() - 0.5) * 20;
//       mesh.position.y = (Math.random() - 0.5) * 20;
//       mesh.position.z = (Math.random() - 0.5) * 20;
      
//       mesh.userData = {
//         rotationSpeed: {
//           x: (Math.random() - 0.5) * 0.02,
//           y: (Math.random() - 0.5) * 0.02,
//           z: (Math.random() - 0.5) * 0.02
//         },
//         floatSpeed: Math.random() * 0.01 + 0.005,
//         floatRange: Math.random() * 2 + 1
//       };
      
//       scene.add(mesh);
//       meshes.push(mesh);
//     }

//     // Lighting
//     const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
//     scene.add(ambientLight);

//     const directionalLight = new THREE.DirectionalLight(0x00ffff, 0.8);
//     directionalLight.position.set(5, 5, 5);
//     scene.add(directionalLight);

//     const pointLight = new THREE.PointLight(0x8b5cf6, 0.6, 100);
//     pointLight.position.set(-5, -5, -5);
//     scene.add(pointLight);

//     camera.position.z = 15;

//     // Animation loop
//     const animate = () => {
//       requestAnimationFrame(animate);

//       meshes.forEach((mesh, index) => {
//         mesh.rotation.x += mesh.userData.rotationSpeed.x;
//         mesh.rotation.y += mesh.userData.rotationSpeed.y;
//         mesh.rotation.z += mesh.userData.rotationSpeed.z;
        
//         mesh.position.y += Math.sin(Date.now() * mesh.userData.floatSpeed + index) * 0.01;
//       });

//       renderer.render(scene, camera);
//     };

//     animate();
//     sceneRef.current = { scene, camera, renderer, meshes };

//     // Cleanup
//     return () => {
//       if (mountRef.current && renderer.domElement) {
//         mountRef.current.removeChild(renderer.domElement);
//       }
//       renderer.dispose();
//     };
//   }, []);

//   // Handle scroll effects
//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 20);
      
//       // Parallax effect for 3D objects
//       if (sceneRef.current) {
//         const scrollY = window.scrollY;
//         sceneRef.current.camera.position.y = scrollY * 0.01;
//         sceneRef.current.meshes.forEach((mesh, index) => {
//           mesh.position.y += Math.sin(scrollY * 0.01 + index) * 0.001;
//         });
//       }
//     };
    
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   // Auto-rotate hero slides
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentSlide(prev => (prev + 1) % 3);
//     }, 5000);
//     return () => clearInterval(interval);
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
//     { name: 'Portfolio', href: '#portfolio' },
//     { name: 'About', href: '#about' },
//     { name: 'Contact', href: '#contact' }
//   ];

//   const heroSlides = [
//     {
//       title: "Revolutionary Software Solutions",
//       subtitle: "Building Tomorrow's Digital Infrastructure",
//       description: "Transform your business with cutting-edge AI, blockchain, and cloud technologies"
//     },
//     {
//       title: "AI-Powered Development",
//       subtitle: "Intelligence Meets Innovation",
//       description: "Leverage machine learning and artificial intelligence to automate and optimize your processes"
//     },
//     {
//       title: "Quantum-Ready Architecture",
//       subtitle: "Future-Proof Your Business",
//       description: "Scalable, secure, and lightning-fast solutions designed for the quantum computing era"
//     }
//   ];

//   const services = [
//     {
//       icon: Globe,
//       title: "Web Development",
//       description: "Full-stack web applications with modern frameworks and cutting-edge technologies",
//       color: "from-cyan-500 to-blue-600"
//     },
//     {
//       icon: Rocket,
//       title: "Mobile Applications",
//       description: "Native and cross-platform mobile apps that deliver exceptional user experiences",
//       color: "from-purple-500 to-pink-600"
//     },
//     {
//       icon: Zap,
//       title: "AI & Machine Learning",
//       description: "Intelligent automation and predictive analytics to revolutionize your business",
//       color: "from-yellow-500 to-orange-600"
//     },
//     {
//       icon: Shield,
//       title: "Cybersecurity",
//       description: "Advanced security solutions to protect your digital assets and customer data",
//       color: "from-green-500 to-emerald-600"
//     },
//     {
//       icon: Cloud,
//       title: "Cloud Solutions",
//       description: "Scalable cloud infrastructure and microservices architecture",
//       color: "from-indigo-500 to-purple-600"
//     },
//     {
//       icon: Database,
//       title: "Data Engineering",
//       description: "Big data processing, analytics, and real-time data streaming solutions",
//       color: "from-red-500 to-pink-600"
//     }
//   ];

//   return (
//     <div className="relative min-h-screen overflow-hidden bg-black">
//       {/* 3D Background */}
//       <div
//         ref={mountRef}
//         className="fixed inset-0 pointer-events-none"
//         style={{ zIndex: 1 }}
//       />

//       {/* Animated Gradient Background */}
//       <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 opacity-90" style={{ zIndex: 2 }} />
      
//       {/* Animated Mesh Pattern */}
//       <div className="fixed inset-0 opacity-20" style={{ zIndex: 3 }}>
//         <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/10 to-transparent transform rotate-45 animate-pulse" />
//         <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-500/10 to-transparent transform -rotate-45 animate-pulse delay-1000" />
//       </div>

//       {/* Main Content */}
//       <div className="relative" style={{ zIndex: 10 }}>
//         {/* Navbar */}
//         <nav className={`fixed w-full z-50 transition-all duration-500 ${
//           isScrolled
//             ? 'bg-black/20 backdrop-blur-xl border-b border-cyan-500/20 shadow-2xl shadow-cyan-500/10'
//             : 'bg-transparent'
//         }`}>
//           <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent h-px top-0 animate-pulse"></div>
          
//           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//             <div className="flex items-center justify-between h-20">
              
//               {/* Logo */}
//               <div className="flex items-center group cursor-pointer">
//                 <div className="relative">
//                   <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-purple-600 rounded-xl flex items-center justify-center transform group-hover:scale-110 transition-all duration-300 shadow-lg shadow-cyan-500/25">
//                     <Code className="w-6 h-6 text-white animate-pulse" />
//                   </div>
//                   <div className="absolute inset-0 w-12 h-12 bg-gradient-to-br from-cyan-400 to-purple-600 rounded-xl blur-md opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
//                 </div>
//                 <div className="ml-4">
//                   <h1 className="text-2xl font-black bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
//                     CodeVerse
//                   </h1>
//                   <p className="text-xs text-gray-400 font-medium tracking-wider">SOLUTIONS</p>
//                 </div>
//               </div>

//               {/* Desktop Navigation */}
//               <div className="hidden md:flex items-center space-x-1">
//                 {navItems.map((item, index) => (
//                   <div key={item.name} className="relative">
//                     <button
//                       className={`px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 relative group ${
//                         item.dropdown ? 'flex items-center space-x-1' : ''
//                       }`}
//                       onMouseEnter={() => item.dropdown && setActiveDropdown(index)}
//                       onMouseLeave={() => item.dropdown && setActiveDropdown(null)}
//                     >
//                       <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
//                       <div className="absolute inset-0 bg-white/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm"></div>
                      
//                       <span className="relative z-10 text-gray-300 group-hover:text-white transition-colors duration-300">
//                         {item.name}
//                       </span>
//                       {item.dropdown && (
//                         <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-cyan-400 transition-colors duration-300 relative z-10" />
//                       )}
                      
//                       <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-400 group-hover:w-full transition-all duration-300"></div>
//                     </button>

//                     {item.dropdown && activeDropdown === index && (
//                       <div className="absolute top-full left-0 mt-2 w-64 bg-black/80 backdrop-blur-xl border border-cyan-500/20 rounded-2xl shadow-2xl shadow-cyan-500/10 overflow-hidden">
//                         <div className="p-2">
//                           {item.dropdown.map((subItem) => (
//                             <button
//                               key={subItem.name}
//                               className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl hover:bg-cyan-500/10 transition-all duration-200 group"
//                             >
//                               <div className="w-8 h-8 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
//                                 <subItem.icon className="w-4 h-4 text-cyan-400" />
//                               </div>
//                               <span className="text-gray-300 group-hover:text-white transition-colors duration-200">
//                                 {subItem.name}
//                               </span>
//                             </button>
//                           ))}
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                 ))}
//               </div>

//               {/* CTA Button */}
//               <div className="hidden md:flex items-center space-x-4">
//                 <button className="relative px-8 py-3 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold rounded-xl overflow-hidden group transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/25">
//                   <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
//                   <span className="relative z-10">Start Project</span>
//                   <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
//                 </button>
//               </div>

//               {/* Mobile Menu Button */}
//               <button
//                 className="md:hidden p-3 rounded-xl bg-white/10 backdrop-blur-sm border border-cyan-500/20 hover:bg-cyan-500/20 transition-all duration-300"
//                 onClick={() => setIsMenuOpen(!isMenuOpen)}
//               >
//                 {isMenuOpen ? (
//                   <X className="w-6 h-6 text-cyan-400" />
//                 ) : (
//                   <Menu className="w-6 h-6 text-cyan-400" />
//                 )}
//               </button>
//             </div>
//           </div>

//           {/* Mobile Menu */}
//           {isMenuOpen && (
//             <div className="md:hidden bg-black/95 backdrop-blur-xl border-t border-cyan-500/20">
//               <div className="px-4 py-6 space-y-4">
//                 {navItems.map((item) => (
//                   <button
//                     key={item.name}
//                     className="w-full text-left px-6 py-4 rounded-xl text-gray-300 hover:text-white hover:bg-cyan-500/10 transition-all duration-300 border border-transparent hover:border-cyan-500/20"
//                   >
//                     {item.name}
//                   </button>
//                 ))}
//                 <button className="w-full mt-6 px-6 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold rounded-xl hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300">
//                   Start Project
//                 </button>
//               </div>
//             </div>
//           )}
//         </nav>

//         {/* Hero Section */}
//         <section className="relative min-h-screen flex items-center justify-center px-4">
//           <div className="max-w-7xl mx-auto text-center">
//             <div className="relative">
//               {/* Animated Background Elements */}
//               <div className="absolute -top-20 -left-20 w-40 h-40 bg-gradient-to-br from-cyan-400/20 to-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
//               <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-gradient-to-br from-pink-400/20 to-yellow-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
              
//               {/* Hero Content */}
//               <div className="relative z-10">
//                 <div className="mb-8">
//                   <Sparkles className="w-16 h-16 text-cyan-400 mx-auto mb-4 animate-spin" />
//                   <h1 className="text-7xl md:text-8xl font-black bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-6 leading-tight">
//                     {heroSlides[currentSlide].title}
//                   </h1>
//                   <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
//                     {heroSlides[currentSlide].subtitle}
//                   </h2>
//                   <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-12">
//                     {heroSlides[currentSlide].description}
//                   </p>
//                 </div>

//                 {/* CTA Buttons */}
//                 <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
//                   <button className="group relative px-12 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/25 hover:scale-105">
//                     <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
//                     <span className="relative z-10 flex items-center">
//                       Get Started
//                       <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
//                     </span>
//                   </button>
                  
//                   <button className="group px-12 py-4 border-2 border-cyan-500/50 text-cyan-400 font-bold rounded-2xl hover:bg-cyan-500/10 hover:border-cyan-500 transition-all duration-300 hover:scale-105">
//                     <span className="flex items-center">
//                       View Portfolio
//                       <Star className="ml-2 w-5 h-5 group-hover:rotate-180 transition-transform duration-300" />
//                     </span>
//                   </button>
//                 </div>

//                 {/* Slide Indicators */}
//                 <div className="flex justify-center space-x-2 mt-12">
//                   {heroSlides.map((_, index) => (
//                     <button
//                       key={index}
//                       className={`w-3 h-3 rounded-full transition-all duration-300 ${
//                         index === currentSlide
//                           ? 'bg-cyan-400 w-8'
//                           : 'bg-gray-600 hover:bg-gray-500'
//                       }`}
//                       onClick={() => setCurrentSlide(index)}
//                     />
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* Services Section */}
//         <section className="py-32 px-4">
//           <div className="max-w-7xl mx-auto">
//             <div className="text-center mb-20">
//               <h2 className="text-5xl font-black bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-6">
//                 Our Services
//               </h2>
//               <p className="text-xl text-gray-300 max-w-3xl mx-auto">
//                 Cutting-edge solutions powered by the latest technologies and innovative approaches
//               </p>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//               {services.map((service, index) => (
//                 <div
//                   key={index}
//                   className="group relative p-8 bg-white/5 backdrop-blur-sm rounded-3xl border border-cyan-500/20 hover:border-cyan-500/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/25"
//                 >
//                   <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
//                   <div className="relative z-10">
//                     <div className={`w-16 h-16 bg-gradient-to-br ${service.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
//                       <service.icon className="w-8 h-8 text-white" />
//                     </div>
                    
//                     <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-cyan-400 transition-colors duration-300">
//                       {service.title}
//                     </h3>
                    
//                     <p className="text-gray-300 group-hover:text-white transition-colors duration-300">
//                       {service.description}
//                     </p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </section>

//         {/* Footer */}
//         <footer className="py-16 px-4 border-t border-cyan-500/20">
//           <div className="max-w-7xl mx-auto text-center">
//             <div className="flex items-center justify-center mb-8">
//               <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-purple-600 rounded-xl flex items-center justify-center mr-4">
//                 <Code className="w-6 h-6 text-white" />
//               </div>
//               <h3 className="text-2xl font-black bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
//                 CodeVerse Solutions
//               </h3>
//             </div>
//             <p className="text-gray-400 mb-8">
//               Building the future, one line of code at a time.
//             </p>
//             <div className="flex justify-center space-x-8">
//               <button className="text-gray-400 hover:text-cyan-400 transition-colors duration-300">Privacy</button>
//               <button className="text-gray-400 hover:text-cyan-400 transition-colors duration-300">Terms</button>
//               <button className="text-gray-400 hover:text-cyan-400 transition-colors duration-300">Contact</button>
//             </div>
//             <div className="mt-8 pt-8 border-t border-gray-800">
//               <p className="text-gray-500">© 2025 CodeVerse Solutions. All rights reserved.</p>
//             </div>
//           </div>
//         </footer>
//       </div>
//     </div>
//   );
// };

// export default CodeVerseHomepage;


"use client";
import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

const LuxurySoftwareHomepage = () => {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const earthRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    
    mountRef.current.appendChild(renderer.domElement);
    sceneRef.current = scene;

    // Create Earth
    const earthGeometry = new THREE.SphereGeometry(2, 64, 64);
    
    // Earth material with advanced shading
    const earthMaterial = new THREE.MeshPhongMaterial({
      map: createEarthTexture(),
      bumpMap: createBumpTexture(),
      bumpScale: 0.1,
      shininess: 100,
      transparent: true,
      opacity: 0.9
    });
    
    const earth = new THREE.Mesh(earthGeometry, earthMaterial);
    earth.castShadow = true;
    earth.receiveShadow = true;
    scene.add(earth);
    earthRef.current = earth;

    // Add atmosphere glow
    const atmosphereGeometry = new THREE.SphereGeometry(2.1, 64, 64);
    const atmosphereMaterial = new THREE.MeshBasicMaterial({
      color: 0x4477ff,
      transparent: true,
      opacity: 0.1,
      side: THREE.BackSide
    });
    const atmosphere = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
    scene.add(atmosphere);

    // Add stars
    const starsGeometry = new THREE.BufferGeometry();
    const starsCount = 2000;
    const positions = new Float32Array(starsCount * 3);
    
    for (let i = 0; i < starsCount * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 200;
    }
    
    starsGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const starsMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.5,
      transparent: true,
      opacity: 0.8
    });
    const stars = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(stars);

    // Lighting setup
    const ambientLight = new THREE.AmbientLight(0x404040, 0.3);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 3, 5);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    scene.add(directionalLight);

    const pointLight = new THREE.PointLight(0x00ffff, 0.5, 100);
    pointLight.position.set(-5, 0, 0);
    scene.add(pointLight);

    // Camera positioning
    camera.position.set(0, 0, 8);
    camera.lookAt(0, 0, 0);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      
      if (earthRef.current) {
        earthRef.current.rotation.y += 0.005;
        earthRef.current.rotation.x = Math.sin(Date.now() * 0.001) * 0.1;
      }
      
      // Rotate stars slowly
      stars.rotation.x += 0.0005;
      stars.rotation.y += 0.0005;
      
      // Animate camera position slightly
      camera.position.x = Math.sin(Date.now() * 0.0005) * 0.5;
      camera.position.z = 8 + Math.sin(Date.now() * 0.0003) * 0.5;
      
      renderer.render(scene, camera);
    };

    animate();
    setIsLoaded(true);

    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  // Create Earth texture
  const createEarthTexture = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');
    
    // Create gradient for Earth-like appearance
    const gradient = ctx.createLinearGradient(0, 0, 1024, 512);
    gradient.addColorStop(0, '#1a4d80');
    gradient.addColorStop(0.3, '#2d5aa0');
    gradient.addColorStop(0.6, '#4a7c7e');
    gradient.addColorStop(0.8, '#6b8e3a');
    gradient.addColorStop(1, '#8fbc8f');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 1024, 512);
    
    // Add some land masses
    ctx.fillStyle = '#3d5a3d';
    for (let i = 0; i < 20; i++) {
      const x = Math.random() * 1024;
      const y = Math.random() * 512;
      const radius = Math.random() * 50 + 20;
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();
    }
    
    return new THREE.CanvasTexture(canvas);
  };

  // Create bump texture
  const createBumpTexture = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');
    
    const imageData = ctx.createImageData(512, 256);
    for (let i = 0; i < imageData.data.length; i += 4) {
      const value = Math.random() * 255;
      imageData.data[i] = value;
      imageData.data[i + 1] = value;
      imageData.data[i + 2] = value;
      imageData.data[i + 3] = 255;
    }
    
    ctx.putImageData(imageData, 0, 0);
    return new THREE.CanvasTexture(canvas);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/20 via-purple-900/30 to-pink-900/20 animate-pulse"></div>
      
      {/* Floating orbs */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur-xl opacity-70 animate-bounce"></div>
      <div className="absolute bottom-20 right-10 w-24 h-24 bg-gradient-to-r from-pink-500 to-rose-600 rounded-full blur-xl opacity-60 animate-pulse"></div>
      <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full blur-lg opacity-50 animate-ping"></div>
      
      {/* 3D Earth Container */}
      <div ref={mountRef} className="absolute inset-0 pointer-events-none" />
      
      {/* Glass morphism overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/5 backdrop-blur-sm"></div>
      {/* Hero Section */}
      <div className="relative z-10 flex items-center justify-center min-h-screen pt-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <div className="mb-8">
            <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-white via-cyan-200 to-blue-400 bg-clip-text text-transparent leading-tight">
              Crafting Digital
              <br />
              <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                Excellence
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white/70 mb-8 max-w-3xl mx-auto leading-relaxed">
              We transform visionary ideas into extraordinary digital experiences that reshape industries and inspire innovation across the globe.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
            <button className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-cyan-500/30">
              Explore Our Work
            </button>
            <button className="border-2 border-white/30 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/10 transition-all duration-300 backdrop-blur-sm">
              Watch Demo
            </button>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {[
              { number: '500+', label: 'Projects Delivered' },
              { number: '98%', label: 'Client Satisfaction' },
              { number: '50+', label: 'Global Partners' },
              { number: '24/7', label: 'Support Available' }
            ].map((stat, index) => (
              <div key={index} className="text-center backdrop-blur-sm bg-white/5 rounded-xl p-6 border border-white/10">
                <div className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <div className="text-white/70 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Services Preview */}
      <div className="relative z-10 py-20 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl md:text-6xl font-bold text-center mb-16 bg-gradient-to-r from-white to-cyan-400 bg-clip-text text-transparent">
            Our Expertise
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Web Development',
                description: 'Cutting-edge web applications with modern frameworks',
                icon: '🌐'
              },
              {
                title: 'Mobile Apps',
                description: 'Native and cross-platform mobile solutions',
                icon: '📱'
              },
              {
                title: 'AI Solutions',
                description: 'Intelligent systems powered by machine learning',
                icon: '🤖'
              }
            ].map((service, index) => (
              <div
                key={index}
                className="group backdrop-blur-md bg-white/5 rounded-2xl p-8 border border-white/10 hover:border-cyan-500/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/20"
              >
                <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-cyan-400 transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-white/70 group-hover:text-white/90 transition-colors duration-300">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Loading overlay */}
      {!isLoaded && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-white text-lg">Loading Experience...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default LuxurySoftwareHomepage;