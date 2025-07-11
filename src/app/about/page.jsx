"use client";
import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

const LuxuryAboutPage = () => {
  const mountRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeTeamMember, setActiveTeamMember] = useState(0);
  const [activeValue, setActiveValue] = useState(0);

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

  const teamMembers = [
    {
      id: 1,
      name: "Alex Johnson",
      role: "CEO & Founder",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
      bio: "Visionary leader with 10+ years in tech innovation. Passionate about transforming ideas into reality.",
      expertise: ["Strategic Planning", "Product Vision", "Team Leadership", "Innovation"],
      social: {
        linkedin: "https://linkedin.com/in/alex",
        twitter: "https://twitter.com/alex",
        github: "https://github.com/alex"
      },
      quote: "Innovation is not just about technology; it's about creating solutions that make a difference."
    },
    {
      id: 2,
      name: "Sarah Chen",
      role: "CTO & Co-Founder",
      image: "https://images.unsplash.com/photo-1494790108755-2616b2e94d49?w=400&h=400&fit=crop&crop=face",
      bio: "Full-stack architect with expertise in scalable systems and emerging technologies.",
      expertise: ["System Architecture", "Cloud Computing", "AI/ML", "DevOps"],
      social: {
        linkedin: "https://linkedin.com/in/sarah",
        twitter: "https://twitter.com/sarah",
        github: "https://github.com/sarah"
      },
      quote: "Great technology is invisible - it just works seamlessly to empower users."
    },
    {
      id: 3,
      name: "Michael Rodriguez",
      role: "Head of Design",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face",
      bio: "Creative designer focused on user-centered design and brand experiences.",
      expertise: ["UI/UX Design", "Brand Identity", "Design Systems", "User Research"],
      social: {
        linkedin: "https://linkedin.com/in/michael",
        twitter: "https://twitter.com/michael",
        dribbble: "https://dribbble.com/michael"
      },
      quote: "Design is not just what it looks like - design is how it works and feels."
    },
    {
      id: 4,
      name: "Emily Watson",
      role: "Lead Developer",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
      bio: "Passionate developer with expertise in modern web technologies and mobile development.",
      expertise: ["React/Next.js", "Node.js", "Mobile Development", "API Design"],
      social: {
        linkedin: "https://linkedin.com/in/emily",
        twitter: "https://twitter.com/emily",
        github: "https://github.com/emily"
      },
      quote: "Code is poetry in motion - elegant, efficient, and purposeful."
    }
  ];

  const companyValues = [
    {
      id: 1,
      icon: "🚀",
      title: "Innovation First",
      description: "We embrace cutting-edge technologies and creative solutions to solve complex problems.",
      details: "Our team stays ahead of industry trends, constantly learning and adapting to deliver innovative solutions that give our clients a competitive edge."
    },
    {
      id: 2,
      icon: "🎯",
      title: "Quality Excellence",
      description: "We deliver premium solutions with meticulous attention to detail and rigorous testing.",
      details: "Every line of code, every design element, and every user interaction is crafted with precision to ensure exceptional quality and performance."
    },
    {
      id: 3,
      icon: "🤝",
      title: "Client Partnership",
      description: "We build lasting relationships based on trust, transparency, and mutual success.",
      details: "Our clients are partners in innovation. We work closely with them to understand their vision and deliver solutions that exceed expectations."
    },
    {
      id: 4,
      icon: "🌍",
      title: "Global Impact",
      description: "We create solutions that make a positive difference in the world.",
      details: "From local startups to global enterprises, we build technology that creates meaningful impact and drives positive change."
    }
  ];

  const milestones = [
    {
      year: "2019",
      title: "Company Founded",
      description: "Started with a vision to revolutionize digital experiences",
      icon: "🏗️"
    },
    {
      year: "2020",
      title: "First Major Client",
      description: "Delivered our first enterprise-level solution",
      icon: "🎉"
    },
    {
      year: "2021",
      title: "Team Expansion",
      description: "Grew to 10+ skilled professionals",
      icon: "👥"
    },
    {
      year: "2022",
      title: "AI Integration",
      description: "Specialized in AI/ML solutions and automation",
      icon: "🤖"
    },
    {
      year: "2023",
      title: "Global Reach",
      description: "Served clients across 15+ countries",
      icon: "🌎"
    },
    {
      year: "2024",
      title: "Industry Recognition",
      description: "Awarded 'Best Digital Innovation Company'",
      icon: "🏆"
    }
  ];

  const stats = [
    { number: "50+", label: "Projects Delivered", icon: "🚀" },
    { number: "25+", label: "Happy Clients", icon: "😊" },
    { number: "5+", label: "Years Experience", icon: "⭐" },
    { number: "15+", label: "Team Members", icon: "👥" }
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
                item === 'About' 
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
            About Us
          </h1>
          <p className="text-xl md:text-2xl text-white/70 mb-8 max-w-3xl mx-auto leading-relaxed">
            We are a team of passionate innovators dedicated to transforming ideas into extraordinary digital experiences
          </p>
        </div>
      </div>

      {/* Company Stats */}
      <div className="relative z-10 py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="text-center backdrop-blur-md bg-white/5 rounded-2xl p-6 border border-white/10 hover:border-cyan-500/50 transition-all duration-300">
                <div className="text-4xl mb-4">{stat.icon}</div>
                <div className="text-4xl font-bold text-cyan-400 mb-2">{stat.number}</div>
                <div className="text-white/70">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Our Story */}
      <div className="relative z-10 py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="backdrop-blur-md bg-white/5 rounded-3xl p-12 border border-white/10">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-white to-cyan-400 bg-clip-text text-transparent">
                  Our Story
                </h2>
                <p className="text-white/80 text-lg mb-6 leading-relaxed">
                  Founded in 2019, SoftwareLux emerged from a simple belief: technology should be beautiful, functional, and accessible to everyone. What started as a small team of passionate developers has grown into a full-service digital agency.
                </p>
                <p className="text-white/80 text-lg mb-6 leading-relaxed">
                  We've worked with startups, Fortune 500 companies, and everything in between, helping them navigate the digital landscape with cutting-edge solutions and innovative thinking.
                </p>
                <p className="text-white/80 text-lg leading-relaxed">
                  Today, we're proud to be at the forefront of digital innovation, constantly pushing boundaries and setting new standards for what's possible in the digital world.
                </p>
              </div>
              
              <div className="relative">
                <div className="w-full h-80 bg-gradient-to-br from-cyan-500/20 to-blue-600/20 rounded-2xl backdrop-blur-sm border border-white/10 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-6xl mb-4">🚀</div>
                    <div className="text-2xl font-bold text-white mb-2">Innovation Driven</div>
                    <div className="text-white/60">Since 2019</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Company Values */}
      <div className="relative z-10 py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-white to-cyan-400 bg-clip-text text-transparent">
            Our Values
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {companyValues.map((value, index) => (
              <div
                key={value.id}
                className={`group backdrop-blur-md bg-white/5 rounded-3xl p-8 border transition-all duration-500 hover:scale-105 cursor-pointer ${
                  activeValue === index 
                    ? 'border-cyan-500/80 shadow-2xl shadow-cyan-500/20 bg-white/10' 
                    : 'border-white/10 hover:border-cyan-500/50'
                }`}
                onClick={() => setActiveValue(index)}
              >
                <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300">
                  {value.icon}
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-cyan-400 transition-colors duration-300">
                  {value.title}
                </h3>
                
                <p className="text-white/70 mb-4 group-hover:text-white/90 transition-colors duration-300">
                  {value.description}
                </p>
                
                <p className="text-white/60 text-sm group-hover:text-white/80 transition-colors duration-300">
                  {value.details}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="relative z-10 py-20 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-white to-cyan-400 bg-clip-text text-transparent">
            Our Journey
          </h2>
          
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-cyan-500 to-blue-600 rounded-full opacity-30"></div>
            
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div key={index} className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-12 text-right' : 'pl-12 text-left'}`}>
                    <div className="backdrop-blur-md bg-white/5 rounded-2xl p-6 border border-white/10 hover:border-cyan-500/50 transition-all duration-300">
                      <div className="text-3xl mb-4">{milestone.icon}</div>
                      <div className="text-2xl font-bold text-cyan-400 mb-2">{milestone.year}</div>
                      <div className="text-xl font-semibold text-white mb-2">{milestone.title}</div>
                      <div className="text-white/70">{milestone.description}</div>
                    </div>
                  </div>
                  
                  <div className="relative z-10">
                    <div className="w-4 h-4 bg-cyan-500 rounded-full border-4 border-white/20"></div>
                  </div>
                  
                  <div className="w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="relative z-10 py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-white to-cyan-400 bg-clip-text text-transparent">
            Meet Our Team
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {teamMembers.map((member, index) => (
              <div
                key={member.id}
                className={`group backdrop-blur-md bg-white/5 rounded-3xl p-6 border transition-all duration-500 hover:scale-105 cursor-pointer text-center ${
                  activeTeamMember === index 
                    ? 'border-cyan-500/80 shadow-2xl shadow-cyan-500/20 bg-white/10' 
                    : 'border-white/10 hover:border-cyan-500/50'
                }`}
                onClick={() => setActiveTeamMember(index)}
              >
                <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors duration-300">
                  {member.name}
                </h3>
                
                <p className="text-cyan-400 mb-4 font-medium">
                  {member.role}
                </p>
                
                <p className="text-white/70 text-sm group-hover:text-white/90 transition-colors duration-300">
                  {member.bio}
                </p>
              </div>
            ))}
          </div>
          
          {/* Team Member Details */}
          <div className="backdrop-blur-md bg-white/5 rounded-3xl p-12 border border-white/10">
            <div className="grid md:grid-cols-2 gap-12">
              <div className="text-center">
                <div className="w-48 h-48 rounded-full overflow-hidden mx-auto mb-6">
                  <img 
                    src={teamMembers[activeTeamMember].image} 
                    alt={teamMembers[activeTeamMember].name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-3xl font-bold text-white mb-2">
                  {teamMembers[activeTeamMember].name}
                </h3>
                <p className="text-cyan-400 text-xl font-medium mb-4">
                  {teamMembers[activeTeamMember].role}
                </p>
                <blockquote className="text-white/70 italic text-lg">
                  "{teamMembers[activeTeamMember].quote}"
                </blockquote>
              </div>
              
              <div>
                <h4 className="text-xl font-bold text-white mb-6">About</h4>
                <p className="text-white/80 mb-8 leading-relaxed">
                  {teamMembers[activeTeamMember].bio}
                </p>
                
                <h4 className="text-xl font-bold text-white mb-4">Expertise</h4>
                <div className="grid grid-cols-2 gap-3 mb-8">
                  {teamMembers[activeTeamMember].expertise.map((skill, index) => (
                    <div 
                      key={index}
                      className="backdrop-blur-sm bg-white/5 rounded-xl p-3 border border-white/10 text-center text-white/80"
                    >
                      {skill}
                    </div>
                  ))}
                </div>
                
                <h4 className="text-xl font-bold text-white mb-4">Connect</h4>
                <div className="flex gap-4">
                  {Object.entries(teamMembers[activeTeamMember].social).map(([platform, url]) => (
                    <button
                      key={platform}
                      className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-full font-medium hover:scale-105 transition-all duration-300 capitalize"
                    >
                      {platform}
                    </button>
                  ))}
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
              Ready to Work Together?
            </h2>
            
            <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto">
              Join our journey of innovation and let's create something extraordinary together. Our team is ready to turn your vision into reality.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-cyan-500/30">
                Join Our Team
              </button>
              <button className="border-2 border-white/30 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/10 transition-all duration-300 backdrop-blur-sm">
                Start a Project
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
            <p className="text-white text-lg">Loading About...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default LuxuryAboutPage;