"use client";
import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

const LuxuryPortfolioPage = () => {
  const mountRef = useRef(null);
  const [activeProject, setActiveProject] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');

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

  const portfolioProjects = [
    {
      id: 1,
      title: "E-Commerce Platform",
      category: "web",
      icon: "🛍️",
      description: "Modern e-commerce platform with AI-powered recommendations and seamless checkout",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop",
      technologies: ["React", "Node.js", "PostgreSQL", "Stripe", "AWS", "Redis"],
      features: [
        "AI-powered product recommendations",
        "Real-time inventory management",
        "Multi-payment gateway integration",
        "Advanced analytics dashboard",
        "Mobile-responsive design",
        "SEO optimized"
      ],
      liveUrl: "https://example.com",
      githubUrl: "https://github.com/example",
      client: "RetailCorp",
      year: "2024",
      duration: "12 weeks"
    },
    {
      id: 2,
      title: "FinTech Mobile App",
      category: "mobile",
      icon: "💳",
      description: "Secure mobile banking app with biometric authentication and real-time transactions",
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&h=400&fit=crop",
      technologies: ["React Native", "Firebase", "TypeScript", "Plaid API", "Biometric SDK"],
      features: [
        "Biometric authentication",
        "Real-time transaction notifications",
        "Budget tracking and analytics",
        "P2P money transfers",
        "Investment portfolio management",
        "Multi-currency support"
      ],
      liveUrl: "https://apps.apple.com/example",
      githubUrl: "https://github.com/example",
      client: "FinanceFlow",
      year: "2024",
      duration: "16 weeks"
    },
    {
      id: 3,
      title: "AI Content Generator",
      category: "ai",
      icon: "🤖",
      description: "Advanced AI platform for generating high-quality content using machine learning",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop",
      technologies: ["Python", "TensorFlow", "OpenAI", "FastAPI", "Redis", "Docker"],
      features: [
        "Natural language processing",
        "Multi-format content generation",
        "Custom model training",
        "Real-time collaboration",
        "API integration",
        "Performance analytics"
      ],
      liveUrl: "https://ai-content.example.com",
      githubUrl: "https://github.com/example",
      client: "ContentAI",
      year: "2024",
      duration: "20 weeks"
    },
    {
      id: 4,
      title: "Cloud Infrastructure",
      category: "cloud",
      icon: "☁️",
      description: "Scalable cloud architecture with auto-scaling and monitoring capabilities",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&h=400&fit=crop",
      technologies: ["AWS", "Kubernetes", "Docker", "Terraform", "Prometheus", "Grafana"],
      features: [
        "Auto-scaling infrastructure",
        "Real-time monitoring",
        "CI/CD pipeline automation",
        "Security compliance",
        "Cost optimization",
        "Multi-region deployment"
      ],
      liveUrl: "https://cloud.example.com",
      githubUrl: "https://github.com/example",
      client: "TechScale",
      year: "2024",
      duration: "8 weeks"
    },
    {
      id: 5,
      title: "Design System",
      category: "design",
      icon: "🎨",
      description: "Comprehensive design system with reusable components and style guides",
      image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=400&fit=crop",
      technologies: ["Figma", "Storybook", "React", "Styled Components", "TypeScript"],
      features: [
        "Atomic design methodology",
        "Interactive component library",
        "Design tokens system",
        "Accessibility compliance",
        "Dark/light mode support",
        "Multi-platform compatibility"
      ],
      liveUrl: "https://design.example.com",
      githubUrl: "https://github.com/example",
      client: "DesignCorp",
      year: "2024",
      duration: "6 weeks"
    },
    {
      id: 6,
      title: "DeFi Trading Platform",
      category: "blockchain",
      icon: "🔗",
      description: "Decentralized finance platform with smart contracts and yield farming",
      image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=600&h=400&fit=crop",
      technologies: ["Solidity", "Web3.js", "Ethereum", "React", "MetaMask", "Hardhat"],
      features: [
        "Smart contract integration",
        "Yield farming protocols",
        "Multi-wallet support",
        "Real-time price feeds",
        "Liquidity pool management",
        "Security auditing"
      ],
      liveUrl: "https://defi.example.com",
      githubUrl: "https://github.com/example",
      client: "CryptoTrade",
      year: "2024",
      duration: "24 weeks"
    }
  ];

  const categories = [
    { id: 'all', name: 'All Projects', icon: '🌟' },
    { id: 'web', name: 'Web Development', icon: '🌐' },
    { id: 'mobile', name: 'Mobile Apps', icon: '📱' },
    { id: 'ai', name: 'AI/ML', icon: '🤖' },
    { id: 'cloud', name: 'Cloud Solutions', icon: '☁️' },
    { id: 'design', name: 'UI/UX Design', icon: '🎨' },
    { id: 'blockchain', name: 'Blockchain', icon: '🔗' }
  ];

  const achievements = [
    { number: "50+", label: "Projects Completed", icon: "🚀" },
    { number: "25+", label: "Happy Clients", icon: "😊" },
    { number: "5+", label: "Years Experience", icon: "⭐" },
    { number: "15+", label: "Team Members", icon: "👥" }
  ];

  const filteredProjects = activeCategory === 'all' 
    ? portfolioProjects 
    : portfolioProjects.filter(project => project.category === activeCategory);

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
      <nav className="relative z-10 flex justify-between items-center p-8 backdrop-blur-md bg-black/20 border-b border-white/10">
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
                item === 'Portfolio' 
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
      </nav>

      {/* Hero Section */}
      <div className="relative z-10 py-20 text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-white via-cyan-200 to-blue-400 bg-clip-text text-transparent leading-tight">
            Our Portfolio
          </h1>
          <p className="text-xl md:text-2xl text-white/70 mb-8 max-w-3xl mx-auto leading-relaxed">
            Showcasing our finest work and innovative solutions across various industries and technologies
          </p>
        </div>
      </div>

      {/* Achievements */}
      <div className="relative z-10 py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-6">
            {achievements.map((achievement, index) => (
              <div key={index} className="text-center backdrop-blur-md bg-white/5 rounded-2xl p-6 border border-white/10">
                <div className="text-3xl mb-2">{achievement.icon}</div>
                <div className="text-3xl font-bold text-cyan-400 mb-2">{achievement.number}</div>
                <div className="text-white/70">{achievement.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="relative z-10 py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  activeCategory === category.id
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/25'
                    : 'backdrop-blur-md bg-white/5 border border-white/10 text-white/80 hover:bg-white/10'
                }`}
              >
                <span className="text-xl">{category.icon}</span>
                <span>{category.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Portfolio Grid */}
      <div className="relative z-10 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
            {filteredProjects.map((project, index) => (
              <div
                key={project.id}
                className={`group backdrop-blur-md bg-white/5 rounded-3xl overflow-hidden border transition-all duration-500 hover:scale-105 cursor-pointer ${
                  activeProject === index 
                    ? 'border-cyan-500/80 shadow-2xl shadow-cyan-500/20 bg-white/10' 
                    : 'border-white/10 hover:border-cyan-500/50'
                }`}
                onClick={() => setActiveProject(index)}
              >
                <div className="relative overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm rounded-full p-2">
                    <span className="text-2xl">{project.icon}</span>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors duration-300">
                      {project.title}
                    </h3>
                    <span className="text-sm text-white/60">{project.year}</span>
                  </div>
                  
                  <p className="text-white/70 mb-4 group-hover:text-white/90 transition-colors duration-300">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.slice(0, 3).map((tech, techIndex) => (
                      <span 
                        key={techIndex}
                        className="px-2 py-1 bg-white/10 rounded-full text-xs text-white/80 border border-white/20"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="px-2 py-1 bg-cyan-500/20 rounded-full text-xs text-cyan-400 border border-cyan-500/30">
                        +{project.technologies.length - 3}
                      </span>
                    )}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-white/60">Client: {project.client}</span>
                    <span className="text-sm text-cyan-400">{project.duration}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Project Details */}
      <div className="relative z-10 py-20 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6">
          <div className="backdrop-blur-md bg-white/5 rounded-3xl p-12 border border-white/10">
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <div className="flex items-center mb-6">
                  <span className="text-5xl mr-4">{filteredProjects[activeProject].icon}</span>
                  <div>
                    <h2 className="text-4xl font-bold bg-gradient-to-r from-white to-cyan-400 bg-clip-text text-transparent">
                      {filteredProjects[activeProject].title}
                    </h2>
                    <p className="text-cyan-400 mt-2">Client: {filteredProjects[activeProject].client}</p>
                  </div>
                </div>
                
                <p className="text-white/80 text-lg mb-8 leading-relaxed">
                  {filteredProjects[activeProject].description}
                </p>
                
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-white mb-4">Key Features:</h3>
                  <ul className="space-y-3">
                    {filteredProjects[activeProject].features.map((feature, index) => (
                      <li key={index} className="flex items-center text-white/70">
                        <span className="w-2 h-2 bg-cyan-400 rounded-full mr-3"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="flex gap-4">
                  <button className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-3 rounded-full font-semibold hover:scale-105 transition-all duration-300">
                    View Live
                  </button>
                  <button className="flex-1 border-2 border-white/30 text-white py-3 rounded-full font-semibold hover:bg-white/10 transition-all duration-300">
                    View Code
                  </button>
                </div>
              </div>
              
              <div>
                <div className="mb-8">
                  <img 
                    src={filteredProjects[activeProject].image} 
                    alt={filteredProjects[activeProject].title}
                    className="w-full h-64 object-cover rounded-2xl"
                  />
                </div>
                
                <h3 className="text-xl font-bold text-white mb-6">Technologies Used:</h3>
                <div className="grid grid-cols-2 gap-4 mb-8">
                  {filteredProjects[activeProject].technologies.map((tech, index) => (
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
                    <span className="text-white/80">Project Duration:</span>
                    <span className="text-cyan-400 font-bold">{filteredProjects[activeProject].duration}</span>
                  </div>
                  
                  <div className="flex justify-between items-center p-4 backdrop-blur-sm bg-white/5 rounded-xl border border-white/10">
                    <span className="text-white/80">Completion Year:</span>
                    <span className="text-cyan-400 font-bold">{filteredProjects[activeProject].year}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative z-10 py-20 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="backdrop-blur-md bg-white/5 rounded-3xl p-12 border border-white/10">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-cyan-400 bg-clip-text text-transparent">
              Ready to Start Your Project?
            </h2>
            
            <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto">
              Let's create something amazing together. Our portfolio speaks for itself - now let's make your vision the next success story.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-cyan-500/30">
                Discuss Your Project
              </button>
              <button className="border-2 border-white/30 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/10 transition-all duration-300 backdrop-blur-sm">
                View More Projects
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
            <p className="text-white text-lg">Loading Portfolio...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default LuxuryPortfolioPage;