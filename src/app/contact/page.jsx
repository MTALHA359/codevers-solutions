"use client";
import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

const LuxuryContactPage = () => {
  const mountRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeContact, setActiveContact] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    budget: '',
    message: '',
    timeline: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');

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

  const contactMethods = [
    {
      id: 1,
      title: "Email Us",
      icon: "📧",
      primary: "hello@softwarelux.com",
      secondary: "support@softwarelux.com",
      description: "Get a response within 24 hours",
      gradient: "from-blue-500 to-purple-600"
    },
    {
      id: 2,
      title: "Call Us",
      icon: "📞",
      primary: "+1 (555) 123-4567",
      secondary: "+1 (555) 123-4568",
      description: "Available Mon-Fri 9AM-6PM EST",
      gradient: "from-green-500 to-blue-600"
    },
    {
      id: 3,
      title: "Visit Us",
      icon: "📍",
      primary: "123 Innovation Street",
      secondary: "Tech City, TC 12345",
      description: "Schedule a meeting at our office",
      gradient: "from-purple-500 to-pink-600"
    },
    {
      id: 4,
      title: "Chat Live",
      icon: "💬",
      primary: "Live Chat Support",
      secondary: "Instant Response",
      description: "Available 24/7 for urgent queries",
      gradient: "from-cyan-500 to-blue-600"
    }
  ];

  const services = [
    "Web Development",
    "Mobile App Development",
    "UI/UX Design",
    "Digital Marketing",
    "AI/ML Solutions",
    "Cloud Services",
    "DevOps & Infrastructure",
    "Consulting Services",
    "Other"
  ];

  const budgetRanges = [
    "Under $10K",
    "$10K - $25K",
    "$25K - $50K",
    "$50K - $100K",
    "$100K - $250K",
    "$250K+",
    "Let's Discuss"
  ];

  const timelines = [
    "ASAP",
    "Within 1 month",
    "1-3 months",
    "3-6 months",
    "6+ months",
    "Flexible"
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('');

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        service: '',
        budget: '',
        message: '',
        timeline: ''
      });
    }, 2000);
  };

  const officeLocations = [
    {
      city: "New York",
      address: "123 Innovation Street, Tech City, TC 12345",
      phone: "+1 (555) 123-4567",
      hours: "Mon-Fri 9AM-6PM EST"
    },
    {
      city: "San Francisco",
      address: "456 Tech Boulevard, San Francisco, CA 94105",
      phone: "+1 (555) 987-6543",
      hours: "Mon-Fri 9AM-6PM PST"
    },
    {
      city: "London",
      address: "789 Digital Lane, London, UK EC1A 1BB",
      phone: "+44 20 7123 4567",
      hours: "Mon-Fri 9AM-6PM GMT"
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
                item === 'Contact'
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
            Contact Us
          </h1>
          <p className="text-xl md:text-2xl text-white/70 mb-8 max-w-3xl mx-auto leading-relaxed">
            Ready to start your next project? Let's discuss how we can bring your vision to life with cutting-edge technology and innovative solutions.
          </p>
        </div>
      </div>

      {/* Contact Methods */}
      <div className="relative z-10 py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactMethods.map((method, index) => (
              <div
                key={method.id}
                className={`group backdrop-blur-md bg-white/5 rounded-2xl p-6 border transition-all duration-500 hover:scale-105 cursor-pointer text-center ${
                  activeContact === index
                    ? 'border-cyan-500/80 shadow-2xl shadow-cyan-500/20 bg-white/10'
                    : 'border-white/10 hover:border-cyan-500/50'
                }`}
                onClick={() => setActiveContact(index)}
              >
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {method.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors duration-300">
                  {method.title}
                </h3>
                <p className="text-cyan-400 font-medium mb-1">{method.primary}</p>
                <p className="text-white/70 text-sm mb-2">{method.secondary}</p>
                <p className="text-white/60 text-xs">{method.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Contact Form */}
      <div className="relative z-10 py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12">
                      {/* Contact Form */}
                      <div className="backdrop-blur-md bg-white/5 rounded-3xl p-8 border border-white/10 shadow-2xl">
  <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-white to-cyan-400 bg-clip-text text-transparent">
    Let's Start a <span className="text-cyan-400">Conversation</span>
  </h2>

  <form onSubmit={handleSubmit} className="space-y-6">
    {/* Name */}
    <div>
      <label className="text-white/80 font-medium">Full Name *</label>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleInputChange}
        required
        placeholder="John Doe"
        className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-cyan-500/30 transition-all duration-300"
      />
    </div>

    {/* Email */}
    <div>
      <label className="text-white/80 font-medium">Email Address *</label>
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleInputChange}
        required
        placeholder="john@example.com"
        className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-cyan-500/30 transition-all duration-300"
      />
    </div>

    {/* Message */}
    <div>
      <label className="text-white/80 font-medium">Your Message *</label>
      <textarea
        name="message"
        value={formData.message}
        onChange={handleInputChange}
        required
        rows={6}
        placeholder="Tell us about your project..."
        className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-cyan-500/30 transition-all duration-300 resize-none"
      />
    </div>

    {/* Submit Button */}
    <button
      type="submit"
      disabled={isSubmitting}
      className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-cyan-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {isSubmitting ? (
        <div className="flex items-center justify-center gap-3">
          <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
          Sending Message...
        </div>
      ) : (
        'Send Message'
      )}
    </button>

    {/* Success Message */}
    {submitStatus === 'success' && (
      <div className="p-4 bg-green-500/20 border border-green-500/50 rounded-xl">
        <p className="text-green-400 font-medium">
          ✅ Message sent successfully! We'll get back to you within 24 hours.
        </p>
      </div>
    )}
  </form>
</div>
            {/* Contact Info & Map */}
            <div className="space-y-8">
              {/* Office Locations */}
              <div className="backdrop-blur-md bg-white/5 rounded-3xl p-8 border border-white/10">
                <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-white to-cyan-400 bg-clip-text text-transparent">
                  Our Offices
                </h3>
                
                <div className="space-y-6">
                  {officeLocations.map((office, index) => (
                    <div key={index} className="border-b border-white/10 pb-6 last:border-b-0">
                      <h4 className="text-xl font-semibold text-white mb-3">{office.city}</h4>
                      <div className="space-y-2 text-white/70">
                        <p className="flex items-center gap-2">
                          <span className="text-cyan-400">📍</span>
                          {office.address}
                        </p>
                        <p className="flex items-center gap-2">
                          <span className="text-cyan-400">📞</span>
                          {office.phone}
                        </p>
                        <p className="flex items-center gap-2">
                          <span className="text-cyan-400">🕒</span>
                          {office.hours}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Contact */}
              <div className="backdrop-blur-md bg-white/5 rounded-3xl p-8 border border-white/10">
                <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-white to-cyan-400 bg-clip-text text-transparent">
                  Quick Contact
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors duration-300">
                    <span className="text-2xl">📧</span>
                    <div>
                      <p className="text-white font-medium">Email</p>
                      <p className="text-cyan-400">hello@softwarelux.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors duration-300">
                    <span className="text-2xl">📱</span>
                    <div>
                      <p className="text-white font-medium">Phone</p>
                      <p className="text-cyan-400">+1 (555) 123-4567</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors duration-300">
                    <span className="text-2xl">💬</span>
                    <div>
                      <p className="text-white font-medium">Live Chat</p>
                      <p className="text-cyan-400">Available 24/7</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="backdrop-blur-md bg-white/5 rounded-3xl p-8 border border-white/10">
                <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-white to-cyan-400 bg-clip-text text-transparent">
                  Follow Us
                </h3>
                
                <div className="flex gap-4">
                  {['LinkedIn', 'Twitter', 'GitHub', 'Instagram'].map((platform) => (
                    <button
                      key={platform}
                      className="flex-1 py-3 px-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl font-medium hover:scale-105 transition-all duration-300"
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

      {/* FAQ Section */}
      <div className="relative z-10 py-20 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-white to-cyan-400 bg-clip-text text-transparent">
            Frequently Asked Questions
          </h2>
          
          <div className="space-y-6">
            {[
              {
                question: "How long does a typical project take?",
                answer: "Project timelines vary depending on scope and complexity. Simple websites take 2-4 weeks, while complex applications can take 3-6 months. We'll provide a detailed timeline during our initial consultation."
              },
              {
                question: "What's your development process?",
                answer: "We follow an agile methodology with regular check-ins, transparent communication, and iterative development. You'll be involved throughout the process with regular updates and feedback sessions."
              },
              {
                question: "Do you provide ongoing support?",
                answer: "Yes! We offer comprehensive support packages including maintenance, updates, hosting, and technical support. Our team is available to help you long after your project launches."
              },
              {
                question: "What technologies do you work with?",
                answer: "We work with modern technologies including React, Next.js, Node.js, Python, AI/ML frameworks, cloud services (AWS, Azure), and mobile development platforms."
              }
            ].map((faq, index) => (
              <div key={index} className="backdrop-blur-md bg-white/5 rounded-2xl p-6 border border-white/10 hover:border-cyan-500/50 transition-all duration-300">
                <h3 className="text-xl font-semibold text-white mb-3">{faq.question}</h3>
                <p className="text-white/70 leading-relaxed">{faq.answer}</p>
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
              Ready to Get Started?
            </h2>
            
            <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto">
              Don't wait to bring your ideas to life. Contact us today and let's discuss how we can help you achieve your goals with innovative technology solutions.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-cyan-500/30">
                Schedule a Call
              </button>
              <button className="border-2 border-white/30 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/10 transition-all duration-300 backdrop-blur-sm">
                View Our Work
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
            <p className="text-white text-lg">Loading Contact...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default LuxuryContactPage;

