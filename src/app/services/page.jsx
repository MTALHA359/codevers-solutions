"use client";
import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

const LuxuryServicesPage = () => {
  const mountRef = useRef(null);
  const [activeService, setActiveService] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup for floating geometric shapes
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    mountRef.current.appendChild(renderer.domElement);

    // Create floating geometric shapes
    const shapes = [];
    const geometries = [
      new THREE.BoxGeometry(1, 1, 1),
      new THREE.SphereGeometry(0.7, 32, 32),
      new THREE.ConeGeometry(0.7, 1.5, 8),
      new THREE.OctahedronGeometry(0.8),
      new THREE.TetrahedronGeometry(0.9)
    ];

    const materials = [
      new THREE.MeshPhongMaterial({ color: 0x00ffff, transparent: true, opacity: 0.6, wireframe: true }),
      new THREE.MeshPhongMaterial({ color: 0xff00ff, transparent: true, opacity: 0.5, wireframe: true }),
      new THREE.MeshPhongMaterial({ color: 0x00ff00, transparent: true, opacity: 0.4, wireframe: true }),
      new THREE.MeshPhongMaterial({ color: 0xffff00, transparent: true, opacity: 0.3, wireframe: true }),
      new THREE.MeshPhongMaterial({ color: 0xff0080, transparent: true, opacity: 0.5, wireframe: true })
    ];

    for (let i = 0; i < 15; i++) {
      const geometry = geometries[Math.floor(Math.random() * geometries.length)];
      const material = materials[Math.floor(Math.random() * materials.length)];
      const shape = new THREE.Mesh(geometry, material);
      
      shape.position.set(
        (Math.random() - 0.5) * 30,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20
      );
      
      shape.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );
      
      shapes.push(shape);
      scene.add(shape);
    }

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 0.4);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    camera.position.z = 15;

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      
      shapes.forEach((shape, index) => {
        shape.rotation.x += 0.01 * (index + 1);
        shape.rotation.y += 0.01 * (index + 1);
        shape.position.y += Math.sin(Date.now() * 0.001 + index) * 0.01;
      });
      
      renderer.render(scene, camera);
    };

    animate();
    setIsLoaded(true);

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  const services = [
    {
      id: 1,
      title: "Web Development",
      icon: "🌐",
      description: "Cutting-edge web applications built with modern frameworks and technologies",
      features: [
        "React, Vue.js, Angular Development",
        "Node.js & Express Backend",
        "Progressive Web Applications (PWA)",
        "E-commerce Solutions",
        "Content Management Systems",
        "API Development & Integration"
      ],
      technologies: ["React", "Next.js", "Node.js", "MongoDB", "PostgreSQL", "AWS"],
      price: "Starting from $5,000",
      timeline: "4-12 weeks"
    },
    {
      id: 2,
      title: "Mobile App Development",
      icon: "📱",
      description: "Native and cross-platform mobile solutions for iOS and Android",
      features: [
        "Native iOS & Android Apps",
        "React Native & Flutter",
        "Mobile UI/UX Design",
        "App Store Optimization",
        "Push Notifications",
        "Real-time Features"
      ],
      technologies: ["React Native", "Flutter", "Swift", "Kotlin", "Firebase", "Redux"],
      price: "Starting from $8,000",
      timeline: "6-16 weeks"
    },
    {
      id: 3,
      title: "AI & Machine Learning",
      icon: "🤖",
      description: "Intelligent systems powered by artificial intelligence and machine learning",
      features: [
        "Custom AI Model Development",
        "Natural Language Processing",
        "Computer Vision Solutions",
        "Predictive Analytics",
        "Chatbot Development",
        "Data Analysis & Insights"
      ],
      technologies: ["TensorFlow", "PyTorch", "Python", "OpenAI", "Scikit-learn", "Docker"],
      price: "Starting from $12,000",
      timeline: "8-20 weeks"
    },
    {
      id: 4,
      title: "Cloud Solutions",
      icon: "☁️",
      description: "Scalable cloud infrastructure and deployment solutions",
      features: [
        "AWS, Azure, Google Cloud",
        "Serverless Architecture",
        "Container Orchestration",
        "CI/CD Pipeline Setup",
        "Cloud Migration Services",
        "Performance Optimization"
      ],
      technologies: ["AWS", "Docker", "Kubernetes", "Terraform", "Jenkins", "GitLab"],
      price: "Starting from $6,000",
      timeline: "3-10 weeks"
    },
    {
      id: 5,
      title: "UI/UX Design",
      icon: "🎨",
      description: "Beautiful, intuitive designs that enhance user experience",
      features: [
        "User Research & Analysis",
        "Wireframing & Prototyping",
        "Visual Design Systems",
        "Usability Testing",
        "Brand Identity Design",
        "Interactive Animations"
      ],
      technologies: ["Figma", "Adobe XD", "Sketch", "Principle", "Framer", "InVision"],
      price: "Starting from $3,000",
      timeline: "2-8 weeks"
    },
    {
      id: 6,
      title: "Blockchain Development",
      icon: "🔗",
      description: "Decentralized applications and smart contract development",
      features: [
        "Smart Contract Development",
        "DeFi Applications",
        "NFT Marketplaces",
        "Cryptocurrency Integration",
        "Blockchain Consulting",
        "Security Auditing"
      ],
      technologies: ["Solidity", "Web3.js", "Ethereum", "Polygon", "Hardhat", "Truffle"],
      price: "Starting from $15,000",
      timeline: "10-24 weeks"
    }
  ];

  const processSteps = [
    {
      step: "01",
      title: "Discovery & Strategy",
      description: "We analyze your requirements and develop a comprehensive strategy",
      icon: "🔍"
    },
    {
      step: "02",
      title: "Design & Planning",
      description: "Create detailed designs and project roadmaps",
      icon: "📐"
    },
    {
      step: "03",
      title: "Development",
      description: "Build your solution using cutting-edge technologies",
      icon: "⚡"
    },
    {
      step: "04",
      title: "Testing & Quality",
      description: "Rigorous testing to ensure flawless performance",
      icon: "🔬"
    },
    {
      step: "05",
      title: "Launch & Support",
      description: "Deploy your solution and provide ongoing support",
      icon: "🚀"
    }
  ];

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/20 via-purple-900/30 to-pink-900/20 animate-pulse"></div>
      
      {/* 3D Background */}
      <div ref={mountRef} className="fixed inset-0 pointer-events-none opacity-30" />
      
      {/* Floating orbs */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur-xl opacity-70 animate-bounce"></div>
      <div className="absolute bottom-20 right-10 w-24 h-24 bg-gradient-to-r from-pink-500 to-rose-600 rounded-full blur-xl opacity-60 animate-pulse"></div>
      <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full blur-lg opacity-50 animate-ping"></div>
      
      {/* Navigation */}
      {/* <nav className="relative z-10 flex justify-between items-center p-8 backdrop-blur-md bg-black/20 border-b border-white/10">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xl">S</span>
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            SoftwareLux
          </span>
        </div>
        
        <div className="hidden md:flex space-x-8">
          {['Home', 'Services', 'Portfolio', 'About', 'Contact'].map((item) => (
            <a
              key={item}
              href="#"
              className={`transition-all duration-300 hover:scale-110 font-medium ${
                item === 'Services' 
                  ? 'text-cyan-400 border-b-2 border-cyan-400' 
                  : 'text-white/80 hover:text-white'
              }`}
            >
              {item}
            </a>
          ))}
        </div>
        
        <button className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-cyan-500/25">
          Get Quote
        </button>
      </nav> */}

      {/* Hero Section */}
      <div className="relative z-10 py-20 text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-white via-cyan-200 to-blue-400 bg-clip-text text-transparent leading-tight">
            Our Services
          </h1>
          <p className="text-xl md:text-2xl text-white/70 mb-8 max-w-3xl mx-auto leading-relaxed">
            Transforming ideas into digital reality with cutting-edge technologies and unparalleled expertise
          </p>
        </div>
      </div>

      {/* Services Grid */}
      <div className="relative z-10 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <div
                key={service.id}
                className={`group backdrop-blur-md bg-white/5 rounded-3xl p-8 border transition-all duration-500 hover:scale-105 cursor-pointer ${
                  activeService === index 
                    ? 'border-cyan-500/80 shadow-2xl shadow-cyan-500/20 bg-white/10' 
                    : 'border-white/10 hover:border-cyan-500/50'
                }`}
                onClick={() => setActiveService(index)}
              >
                <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-300">
                  {service.icon}
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-cyan-400 transition-colors duration-300">
                  {service.title}
                </h3>
                
                <p className="text-white/70 mb-6 group-hover:text-white/90 transition-colors duration-300">
                  {service.description}
                </p>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-cyan-400 font-bold text-lg">{service.price}</span>
                    <span className="text-white/60 text-sm">{service.timeline}</span>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {service.technologies.slice(0, 3).map((tech, techIndex) => (
                      <span 
                        key={techIndex}
                        className="px-3 py-1 bg-white/10 rounded-full text-xs text-white/80 border border-white/20"
                      >
                        {tech}
                      </span>
                    ))}
                    {service.technologies.length > 3 && (
                      <span className="px-3 py-1 bg-cyan-500/20 rounded-full text-xs text-cyan-400 border border-cyan-500/30">
                        +{service.technologies.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Service Details */}
      <div className="relative z-10 py-20 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6">
          <div className="backdrop-blur-md bg-white/5 rounded-3xl p-12 border border-white/10">
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <div className="flex items-center mb-6">
                  <span className="text-5xl mr-4">{services[activeService].icon}</span>
                  <h2 className="text-4xl font-bold bg-gradient-to-r from-white to-cyan-400 bg-clip-text text-transparent">
                    {services[activeService].title}
                  </h2>
                </div>
                
                <p className="text-white/80 text-lg mb-8 leading-relaxed">
                  {services[activeService].description}
                </p>
                
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-white mb-4">Key Features:</h3>
                  <ul className="space-y-3">
                    {services[activeService].features.map((feature, index) => (
                      <li key={index} className="flex items-center text-white/70">
                        <span className="w-2 h-2 bg-cyan-400 rounded-full mr-3"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-bold text-white mb-6">Technologies We Use:</h3>
                <div className="grid grid-cols-2 gap-4 mb-8">
                  {services[activeService].technologies.map((tech, index) => (
                    <div 
                      key={index}
                      className="backdrop-blur-sm bg-white/5 rounded-xl p-4 border border-white/10 text-center hover:border-cyan-500/50 transition-all duration-300"
                    >
                      <span className="text-white/80 font-medium">{tech}</span>
                    </div>
                  ))}
                </div>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 backdrop-blur-sm bg-white/5 rounded-xl border border-white/10">
                    <span className="text-white/80">Starting Price:</span>
                    <span className="text-cyan-400 font-bold text-lg">{services[activeService].price}</span>
                  </div>
                  
                  <div className="flex justify-between items-center p-4 backdrop-blur-sm bg-white/5 rounded-xl border border-white/10">
                    <span className="text-white/80">Timeline:</span>
                    <span className="text-cyan-400 font-bold">{services[activeService].timeline}</span>
                  </div>
                </div>
                
                <button className="w-full mt-6 bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-4 rounded-full font-semibold text-lg hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-cyan-500/25">
                  Get Started with {services[activeService].title}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Process Section */}
      <div className="relative z-10 py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl md:text-6xl font-bold text-center mb-16 bg-gradient-to-r from-white to-cyan-400 bg-clip-text text-transparent">
            Our Process
          </h2>
          
          <div className="grid md:grid-cols-5 gap-8">
            {processSteps.map((step, index) => (
              <div key={index} className="text-center group">
                <div className="relative mb-6">
                  <div className="w-20 h-20 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-3xl">{step.icon}</span>
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">{step.step}</span>
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors duration-300">
                  {step.title}
                </h3>
                
                <p className="text-white/70 group-hover:text-white/90 transition-colors duration-300">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative z-10 py-20 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="backdrop-blur-md bg-white/5 rounded-3xl p-12 border border-white/10">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-cyan-400 bg-clip-text text-transparent">
              Ready to Transform Your Ideas?
            </h2>
            
            <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto">
              Let's discuss your project and create something extraordinary together. Our team is ready to bring your vision to life.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-cyan-500/30">
                Start Your Project
              </button>
              <button className="border-2 border-white/30 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/10 transition-all duration-300 backdrop-blur-sm">
                Schedule Consultation
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Loading overlay */}
      {!isLoaded && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-white text-lg">Loading Services...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default LuxuryServicesPage;