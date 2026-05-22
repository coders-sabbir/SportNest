"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react";

export default function Footer() {
  const [email, setEmail] = useState(""); 

  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "All Facilities", href: "/facilities" },
    { name: "My Bookings", href: "/bookings" },
    { name: "Add Facility", href: "/add" },
    { name: "Manage Facilities", href: "/manage" },
  ];

  const contactInfo = [
    { icon: <Mail size={16} />, text: "support@sportnest.com", label: "Email Us" },
    { icon: <Phone size={16} />, text: "+88 0111 2345678", label: "Call Us" },
    { icon: <MapPin size={16} />, text: "Banasree, Dhaka", label: "Our Location" },
    { icon: <Clock size={16} />, text: "Mon - Sun: 6:00 AM - 12:00 AM", label: "Working Hours" },
  ];

  const socials = [
    { 
      name: "Facebook",
      icon: (
        <svg className="h-4.5 w-4.5 fill-current" viewBox="0 0 24 24">
          <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/>
        </svg>
      ), 
      href: "#", 
      color: "hover:bg-blue-600/20" 
    },
    { 
      name: "Instagram",
      icon: (
        <svg className="h-4.5 w-4.5 fill-current" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
        </svg>
      ), 
      href: "#", 
      color: "hover:bg-pink-600/20" 
    },
    { 
      name: "Linkedin",
      icon: (
        <svg className="h-4.5 w-4.5 fill-current" viewBox="0 0 24 24">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
        </svg>
      ), 
      href: "#", 
      color: "hover:bg-blue-500/20" 
    },
    { 
      name: "X",
      icon: (
        <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      ), 
      href: "#", 
      color: "hover:bg-white/10" 
    },
    { 
      name: "Youtube",
      icon: (
        <svg className="h-4.5 w-4.5 fill-current" viewBox="0 0 24 24">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93?.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>
      ), 
      href: "#", 
      color: "hover:bg-red-600/20" 
    },
  ];

  return (
    <footer className="relative bg-main-bg border-t border-border-color overflow-hidden pt-16 pb-8">
      
      {/* Background Ambient Neon Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[250px] bg-primary/5 rounded-full blur-[120px] pointer-events-none z-0"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Section: High-End SaaS Newsletter Banner */}
        <div className="bg-card-bg/50 backdrop-blur-xl border border-white/5 rounded-3xl p-8 md:p-10 mb-16 flex flex-col lg:flex-row items-center justify-between gap-6 shadow-[0_15px_35px_-15px_rgba(0,0,0,0.5)]">
          <div className="max-w-md text-center lg:text-left">
            <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight">Stay in the Game</h3>
            <p className="text-secondary-text text-sm mt-2">Subscribe to get exclusive discounts, arena updates, and priority booking alerts.</p>
          </div>
          <form onSubmit={(e) => e.preventDefault()} className="w-full lg:w-auto flex items-center bg-main-bg/60 border border-white/10 rounded-full p-1.5 focus-within:border-primary/50 focus-within:shadow-[0_0_15px_rgba(163,255,18,0.1)] transition-all duration-300 max-w-md mx-auto lg:mx-0">
            <input 
              type="email" 
              placeholder="Enter your email address" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-transparent border-none outline-none text-sm text-white placeholder-gray-500 px-4 py-2 w-full lg:w-64"
              required
            />
           
            <button 
              type="submit" 
              disabled={!isValidEmail}
              className={`font-bold text-sm h-10 w-10 lg:w-auto lg:px-6 rounded-full flex items-center justify-center gap-2 transition-all duration-500 shrink-0 ${
                isValidEmail 
                  ? "bg-primary text-main-bg hover:bg-primary-hover shadow-[0_0_15px_rgba(163,255,18,0.3)] cursor-pointer active:scale-95" 
                  : "bg-white/5 text-gray-500 border border-white/5 cursor-not-allowed"
              }`}
            >
              <span className="hidden lg:inline">Subscribe</span>
              <Send size={14} />
            </button>
          </form>
        </div>

        {/* Middle Section: 4 Column Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 xl:gap-16 pb-12">
          
          {/* Column 1: Brand Profile */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="outline-none focus:outline-none [-webkit-tap-highlight-color:transparent]">
              <Image 
                src="/logo.png" 
                alt="SportNest Logo" 
                width={150} 
                height={45} 
                className="object-contain"
              />
            </Link>
            <p className="text-secondary-text text-sm leading-relaxed mt-2">
              Next-generation sports arena booking platform. Experience seamless slot reservations, premium facility management, and dynamic scheduling tailored for ultimate performance.
            </p>
            <span className="text-xs font-bold tracking-widest text-primary uppercase bg-primary/10 px-3 py-1.5 rounded-full w-max shadow-[0_0_15px_rgba(163,255,18,0.05)] border border-primary/20">
              Play More, Book More
            </span>
          </div>

          {/* Column 2: Quick Links */}
          <div className="flex flex-col gap-4">
            <h4 className="text-white text-sm font-semibold tracking-wider uppercase border-l-2 border-primary pl-3">Quick Links</h4>
            <ul className="flex flex-col gap-2.5 text-sm">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href} 
                    className="text-secondary-text hover:text-primary transition-colors duration-300 outline-none focus:outline-none [-webkit-tap-highlight-color:transparent] flex items-center gap-1 group"
                  >
                    <span className="h-1 w-0 bg-primary rounded-full transition-all duration-300 group-hover:w-1.5"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div className="flex flex-col gap-4">
            <h4 className="text-white text-sm font-semibold tracking-wider uppercase border-l-2 border-primary pl-3">Contact Info</h4>
            <ul className="flex flex-col gap-3.5 text-sm">
              {contactInfo.map((item, idx) => (
                <li key={idx} className="flex gap-3 items-start group">
                  <div className="text-primary mt-0.5 bg-card-bg p-2 rounded-lg border border-white/5 shadow-md group-hover:border-primary/30 transition-colors duration-300">
                    {item.icon}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-500 font-medium">{item.label}</span>
                    <span className="text-secondary-text text-sm group-hover:text-white transition-colors duration-300">{item.text}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Social Media Engagement */}
          <div className="flex flex-col gap-4">
            <h4 className="text-white text-sm font-semibold tracking-wider uppercase border-l-2 border-primary pl-3">Connect With Us</h4>
            <p className="text-secondary-text text-sm leading-relaxed">
              Follow our community networks for live updates, tournament highlights, and exciting new arena launches.
            </p>
            <div className="flex items-center gap-2.5 mt-2">
              {socials.map((social, idx) => (
                <a 
                  key={idx} 
                  href={social.href}
                  className={`h-10 w-10 rounded-xl bg-card-bg border border-white/10 flex items-center justify-center text-gray-400 hover:text-primary transition-all duration-300 ${social.color} hover:border-primary/40 hover:shadow-[0_0_15px_rgba(163,255,18,0.2)] transform hover:-translate-y-1 outline-none focus:outline-none [-webkit-tap-highlight-color:transparent]`}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

        </div>

        {/* Glowing Gradient Divider Line */}
        <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-primary/30 to-transparent shadow-[0_0_10px_rgba(163,255,18,0.2)]"></div>

        {/* Bottom Bar Section */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 pt-8 text-xs text-secondary-text">
          
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left">
            <p className="font-medium tracking-wide">
              &copy; 2026 <span className="text-white font-semibold">SportNest</span>. All Rights Reserved.
            </p>
            <span className="hidden sm:inline h-3 w-[1px] bg-white/10"></span>
            <p className="font-medium">
              Made with <span className="text-red-400 mx-1">❤</span> by <a href="https://www.cavelen.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-200 transition-colors underline decoration-white/30 underline-offset-4 font-bold">Cavelen</a>
            </p>
          </div>

          <div className="flex items-center gap-6 font-medium">
            <Link href="/privacy" className="hover:text-primary transition-colors duration-300 outline-none focus:outline-none [-webkit-tap-highlight-color:transparent]">
              Privacy Policy
            </Link>
            <span className="h-3 w-[1px] bg-white/10"></span>
            <Link href="/terms" className="hover:text-primary transition-colors duration-300 outline-none focus:outline-none [-webkit-tap-highlight-color:transparent]">
              Terms of Service
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}