"use client";

import Link from "next/link";
import { Zap, Trophy, Clock, ShieldCheck, ArrowRight } from "lucide-react";

export default function WhyChooseUs() {
  const features = [
    {
      id: 1,
      icon: <Zap size={28} />,
      title: "Instant Booking",
      description: "No more waiting. Book your favorite sports arena in just a few clicks with real-time slot updates.",
    },
    {
      id: 2,
      icon: <Trophy size={28} />,
      title: "Premium Facilities",
      description: "We partner only with top-tier, well-maintained venues to ensure you get the best playing experience.",
    },
    {
      id: 3,
      icon: <Clock size={28} />,
      title: "24/7 Access",
      description: "Whether it's an early morning practice or a midnight match, our platform is always ready for you.",
    },
    {
      id: 4,
      icon: <ShieldCheck size={28} />,
      title: "Secure Experience",
      description: "100% safe payments and verified facility owners guarantee a hassle-free sporting experience.",
    }
  ];

  return (
    <section className="relative w-full py-24 bg-main-bg overflow-hidden">
      
      {/* Background Ambient Glows */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 blur-[150px] rounded-full pointer-events-none z-0"></div>
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none z-0"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Area: Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 shadow-[0_0_15px_rgba(163,255,18,0.05)] mb-6">
            <span className="text-xs font-bold text-primary tracking-widest uppercase">
              Why Players Choose Us
            </span>
          </div>
          
          <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
            Why Choose SportNest
          </h2>
          
          <p className="text-secondary-text max-w-2xl text-sm md:text-base leading-relaxed">
            Experience a seamless, fast, and secure sports facility booking platform designed for athletes, by athletes.
          </p>
        </div>

        {/* Main Content: Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {features.map((feature) => (
            <div 
              key={feature.id}
              className="group relative flex flex-col h-full bg-card-bg/60 backdrop-blur-xl border border-white/5 rounded-2xl p-8 hover:border-primary/40 hover:shadow-[0_15px_40px_-10px_rgba(163,255,18,0.15)] transition-all duration-500 transform hover:-translate-y-2 overflow-hidden"
            >
              {/* Subtle hover gradient inside card */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative z-10">
                {/* Glowing Icon Box */}
                <div className="h-16 w-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mb-6 shadow-[0_0_15px_rgba(163,255,18,0.1)] group-hover:scale-110 group-hover:bg-primary group-hover:text-main-bg group-hover:shadow-[0_0_25px_rgba(163,255,18,0.4)] transition-all duration-500">
                  {feature.icon}
                </div>
                
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-primary transition-colors duration-300">
                  {feature.title}
                </h3>
                
                <p className="text-sm text-secondary-text leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Area: Small Glowing CTA Card */}
        <div className="relative overflow-hidden bg-card-bg/80 backdrop-blur-2xl border border-primary/30 rounded-3xl p-8 md:p-12 shadow-[0_0_40px_rgba(163,255,18,0.08)] flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left transform hover:-translate-y-1 transition-transform duration-500">
          
          {/* CTA Inner Background Glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[80px] rounded-full pointer-events-none z-0"></div>
          
          <div className="relative z-10">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">Ready to Book Your Next Game?</h3>
            <p className="text-secondary-text">Join thousands of players and secure your premium slot today.</p>
          </div>
          
          <div className="relative z-10 shrink-0">
            <Link 
              href="/facilities" 
              className="group px-8 py-4 bg-primary text-main-bg font-bold text-base rounded-full flex items-center justify-center gap-2 hover:bg-primary-hover hover:shadow-[0_0_25px_rgba(163,255,18,0.5)] transition-all duration-300 transform active:scale-95 outline-none focus:outline-none [-webkit-tap-highlight-color:transparent]"
            >
              Explore Facilities <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}