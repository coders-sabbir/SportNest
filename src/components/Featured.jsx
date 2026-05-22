"use client";

import Link from "next/link";
import { MapPin, Users, Calendar, Star, ArrowRight } from "lucide-react";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Featured() {
  const [isLoading, setIsLoading] = useState(true);
  const [facilities, setFacilities] = useState([]);

  useEffect(() => {
  const API_URL = "https://sport-nest-server-a4sz.vercel.app/facilities";

  axios
    .get(API_URL)
    .then((res) => {
      setFacilities(res.data);
      setIsLoading(false);
    })
    .catch((error) => {
      console.log(error);
      setIsLoading(false);
    });

}, []);
  return (
    <section className="relative w-full py-24 bg-main-bg overflow-hidden">
      
      {/* Background Ambient Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/5 blur-[150px] rounded-full pointer-events-none z-0"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 shadow-[0_0_15px_rgba(163,255,18,0.05)] mb-6">
            <span className="text-xs font-bold text-primary tracking-widest uppercase">
              Top Sports Venues
            </span>
          </div>
          
          <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
            Featured Facilities
          </h2>
          
          <p className="text-secondary-text max-w-2xl text-sm md:text-base leading-relaxed">
            Discover and book premium football turfs, tennis arenas, badminton courts, swimming pools, and more. Elevate your game with top-tier sports venues.
          </p>
        </div>

        {/* 6 Cards Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {facilities.slice(0, 6).map((facility) => (
            <div 
              key={facility._id}
              className="group flex flex-col h-full bg-card-bg/60 backdrop-blur-xl border border-white/5 rounded-2xl overflow-hidden hover:border-primary/40 hover:shadow-[0_10px_40px_-10px_rgba(163,255,18,0.15)] transition-all duration-500 transform hover:-translate-y-2"
            >
              {/* Card Image & Badge */}
              <div className="relative h-56 w-full overflow-hidden bg-[#111827]">
                <img 
                  src={facility.image} 
                  alt={facility.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card-bg via-transparent to-transparent opacity-80"></div>
                
                {/* Sport Type Badge */}
                <span className="absolute top-4 left-4 bg-main-bg/80 backdrop-blur-md border border-white/10 text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-lg">
                  {facility.facility_type}
                </span>
                
                {/* Rating */}
                <div className="absolute top-4 right-4 bg-main-bg/80 backdrop-blur-md border border-white/10 flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg shadow-lg">
                  <Star size={14} className="text-primary fill-current" />
                  <span className="text-white text-xs font-bold">{facility.rating}</span>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors duration-300">
                  {facility.name}
                </h3>
                
                <div className="flex items-center gap-2 text-secondary-text mb-5">
                  <MapPin size={16} className="text-gray-500" />
                  <span className="text-sm">{facility.location}</span>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-2 gap-4 mb-6 border-y border-white/5 py-4">
                  <div className="flex items-center gap-2 text-gray-300">
                    <Users size={16} className="text-primary/70" />
                    <span className="text-sm font-medium">{facility.capacity} Persons</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-300">
                    <Calendar size={16} className="text-primary/70" />
                    <span className="text-sm font-medium">{facility.available_slots.length} Slots Left</span>
                  </div>
                </div>

                {/* Footer: Price & Button */}
                <div className="mt-auto flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-500 mb-0.5">Price</p>
                    <p className="text-white font-bold text-xl">
                      ${facility.price_per_hour}
                      <span className="text-sm text-secondary-text font-normal">/hr</span>
                    </p>
                  </div>
                  
                  <Link 
                    href={`/facilities/${facility._id}`}
                    className="bg-primary/10 text-primary border border-primary/20 hover:bg-primary hover:text-main-bg hover:shadow-[0_0_20px_rgba(163,255,18,0.3)] font-bold text-sm px-6 py-2.5 rounded-xl transition-all duration-300 transform active:scale-95 outline-none focus:outline-none [-webkit-tap-highlight-color:transparent]"
                  >
                    Book Now
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="mt-16 flex justify-center">
          <Link 
            href="/facilities" 
            className="group px-8 py-4 bg-white/5 backdrop-blur-md border border-white/10 text-white font-semibold text-sm rounded-full flex items-center justify-center gap-2 hover:bg-white/10 hover:border-primary/40 transition-all duration-300 transform active:scale-95 outline-none focus:outline-none [-webkit-tap-highlight-color:transparent]"
          >
            View All Facilities 
            <ArrowRight size={18} className="group-hover:translate-x-1 group-hover:text-primary transition-all duration-300" />
          </Link>
        </div>

      </div>
    </section>
  );
}