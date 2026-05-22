"use client";

import Image from "next/image";
import Link from "next/link";
import { 
  ArrowRight, ShieldCheck, Activity, 
  Star, MapPin 
} from "lucide-react";

export default function Hero() {
  const stats = [
    { value: "500+", label: "Facilities" },
    { value: "10K+", label: "Bookings" },
    { value: "24/7", label: "Access" },
  ];

  return (
    <section className="relative w-full min-h-[90vh] flex items-center pt-24 pb-16 overflow-hidden bg-main-bg">
      
      {/* 1. Background Image & Dark Overlays */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="/hero.png" 
          alt="Stadium Background" 
          fill 
          priority
          className="object-cover object-center opacity-30 mix-blend-lighten"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-main-bg via-main-bg/95 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-main-bg via-transparent to-transparent"></div>
      </div>

      {/* 2. Neon Ambient Glows  */}
      <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-primary/15 blur-[150px] rounded-full z-0 pointer-events-none"></div>
      <div className="absolute bottom-10 left-10 w-[300px] h-[300px] bg-primary/5 blur-[120px] rounded-full z-0 pointer-events-none"></div>

      {/* 3. Main Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-8">
          
          {/* Left Side: Typography & CTAs */}
          <div className="w-full lg:w-1/2 flex flex-col gap-8 text-center lg:text-left pt-10 lg:pt-0">
            
            {/* Glowing Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card-bg/80 backdrop-blur-md border border-white/5 shadow-lg w-max mx-auto lg:mx-0">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary shadow-[0_0_8px_#A3FF12]"></span>
              </span>
              <span className="text-xs font-semibold text-gray-300 tracking-wide uppercase">
                Next-Gen Arena Booking
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white leading-[1.1] tracking-tight">
              Book Premium <br className="hidden lg:block" />
              Sports Facilities <br className="hidden lg:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-white drop-shadow-[0_0_15px_rgba(163,255,18,0.2)]">
                Anytime.
              </span>
            </h1>

            {/* Description */}
            <p className="text-lg text-secondary-text max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Reserve premium football turfs, badminton courts, tennis arenas, and swimming pools instantly. The ultimate platform for athletes and arena owners.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
              {/* Book Now is highly highlighted now */}
              <Link 
                href="/add" 
                className="w-full sm:w-auto px-8 py-4 bg-primary text-main-bg font-bold text-base rounded-full flex items-center justify-center gap-2 hover:bg-primary-hover hover:shadow-[0_0_25px_rgba(163,255,18,0.5)] transition-all duration-300 transform active:scale-95 cursor-pointer outline-none focus:outline-none [-webkit-tap-highlight-color:transparent]"
              >
                Book Now
              </Link>
              
              {/* Explore Facilities is fully round shape */}
              <Link 
                href="/facilities" 
                className="w-full sm:w-auto px-8 py-4 bg-card-bg/40 backdrop-blur-md border border-white/10 text-white font-medium text-base rounded-full flex items-center justify-center gap-2 hover:bg-white/5 hover:border-primary/30 transition-all duration-300 transform active:scale-95 cursor-pointer outline-none focus:outline-none [-webkit-tap-highlight-color:transparent]"
              >
                Explore Facilities <ArrowRight size={18} />
              </Link>
            </div>

            {/* Stats */}
            <div className="flex items-center justify-center lg:justify-start gap-8 sm:gap-12 pt-8 mt-2 border-t border-white/5">
              {stats.map((stat, idx) => (
                <div key={idx} className="flex flex-col gap-1">
                  <h3 className="text-3xl font-black text-white">{stat.value}</h3>
                  <p className="text-sm font-medium text-secondary-text uppercase tracking-wider">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side: Floating Glass Cards */}
          <div className="w-full lg:w-1/2 relative h-[450px] lg:h-[600px] hidden md:block">
            
            {/* Card 1: Facility Status */}
            <div className="absolute top-12 right-4 lg:right-10 w-72 bg-card-bg/60 backdrop-blur-2xl border border-white/10 p-5 rounded-2xl shadow-[0_20px_40px_-10px_rgba(0,0,0,0.7)] transform hover:-translate-y-2 transition-transform duration-500 z-20">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold text-sm">Banasree</h4>
                    <p className="text-secondary-text text-xs">Khilgaon, Dhaka City</p>
                  </div>
                </div>
                <div className="flex items-center gap-1 bg-white/5 border border-white/10 px-2 py-1 rounded-md">
                  <Star size={12} className="text-primary fill-current" />
                  <span className="text-white text-xs font-bold">4.9</span>
                </div>
              </div>
              <div className="flex justify-between items-center pt-4 border-t border-white/5">
                <div>
                  <p className="text-secondary-text text-xs mb-1">Price</p>
                  <p className="text-primary font-bold text-lg">$25<span className="text-sm text-gray-400 font-normal">/hr</span></p>
                </div>
                {/* Book Slot has explicit pointer cursor and scale feedback */}
                <button className="bg-primary/10 hover:bg-primary hover:text-main-bg text-primary text-xs font-bold px-4 py-2 rounded-lg transition-all duration-300 border border-primary/20 cursor-pointer hover:scale-105 active:scale-95 shadow-[0_0_15px_rgba(163,255,18,0.1)]">
                  Book Slot
                </button>
              </div>
            </div>

            {/* Card 2: Live Availability */}
            <div className="absolute top-1/2 left-0 lg:left-4 -translate-y-1/2 w-64 bg-card-bg/80 backdrop-blur-xl border border-primary/20 p-5 rounded-2xl shadow-[0_0_30px_rgba(163,255,18,0.1)] transform hover:-translate-y-2 transition-transform duration-500 z-30">
              <div className="flex items-center gap-3 mb-3">
                <div className="relative">
                  <Activity size={20} className="text-primary" />
                  <span className="absolute -top-1 -right-1 flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                  </span>
                </div>
                <h4 className="text-white font-semibold text-sm">Live Status</h4>
              </div>
              <p className="text-white text-lg font-bold mb-1">3 Slots Available</p>
              <p className="text-secondary-text text-xs">For tonight (8:00 PM - 11:00 PM)</p>
              <div className="mt-4 h-1.5 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                <div className="h-full bg-primary w-[75%] shadow-[0_0_10px_#A3FF12]"></div>
              </div>
            </div>

            {/* Card 3: Feature Highlight */}
            <div className="absolute bottom-16 right-16 lg:right-24 bg-card-bg/70 backdrop-blur-lg border border-white/10 p-4 rounded-xl shadow-2xl flex items-center gap-4 transform hover:-translate-y-2 transition-transform duration-500 z-10">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary border border-primary/20 shadow-[0_0_15px_rgba(163,255,18,0.1)]">
                <ShieldCheck size={24} />
              </div>
              <div>
                <h4 className="text-white font-semibold text-sm">Secure Booking</h4>
                <p className="text-secondary-text text-xs mt-0.5">Instant confirmation</p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}