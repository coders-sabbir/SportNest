"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Search, SlidersHorizontal, ChevronDown, MapPin, 
  Users, Calendar, Star, TrendingUp, ArrowRight, Loader2
} from "lucide-react";
import axios from "axios";

export default function AllFacilitiesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [facilities, setFacilities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // ১. নতুন স্টেট: কোন বাটনটিতে ক্লিক করা হয়েছে তার লোডিং ট্র্যাক করার জন্য
  const [processingId, setProcessingId] = useState(null);

  useEffect(() => {
    const API_URL = "https://sport-nest-server-a4sz.vercel.app/facilities";

    axios.get(API_URL)
      .then((res) => {
        setFacilities(res.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching facilities:", error);
        setIsLoading(false);
      });
  }, []);

  // ২. নতুন ফাংশন: ডাটাবেসে বুকিং সেভ করার জন্য (ঠিক এখানেই বসাতে হয়)
  const handleBookNow = async (facility) => {
    setProcessingId(facility._id); // লোডিং শুরু
    
    const bookingInfo = {
      facilityId: facility._id,
      facilityName: facility.name || facility.facilityName,
      userEmail: "user@example.com", // ডাইনামিক ইউজারের ইমেইল
      bookingDate: "2026-05-25", 
      slot: "10AM-11AM", 
      price: facility.price_per_hour || facility.price
    };

    try {
      const response = await axios.post("https://sport-nest-server-a4sz.vercel.app/bookings", bookingInfo);
      if (response.status === 201) {
        alert(`Booking Successful for ${facility.name}! 🎉 Go to My Bookings page.`);
      }
    } catch (error) {
      console.error("Booking Error:", error);
      alert("Failed to book. Try again!");
    } finally {
      setProcessingId(null); // লোডিং শেষ
    }
  };

  return (
    <div className="min-h-screen bg-main-bg pt-28 pb-24 overflow-hidden relative">
      
      {/* Background Ambient Glows & Grid */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-primary/5 blur-[150px] rounded-full pointer-events-none z-0"></div>
      <div className="absolute bottom-20 left-10 w-[400px] h-[400px] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none z-0"></div>
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 mix-blend-overlay pointer-events-none z-0"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Area: Header */}
        <div className="flex flex-col items-center text-center mb-12">
          <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 shadow-[0_0_15px_rgba(163,255,18,0.05)] mb-6">
            <span className="text-xs font-bold text-primary tracking-widest uppercase">
              Explore Premium Venues
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-6">
            All Sports Facilities
          </h1>
          
          <p className="text-secondary-text max-w-2xl text-base leading-relaxed">
            Discover and book premium football turfs, tennis courts, swimming pools, basketball arenas, badminton courts, and cricket grounds near you.
          </p>
        </div>

        {/* Search & Filter Section */}
        <div className="sticky top-24 z-40 bg-[#111827]/80 backdrop-blur-2xl border border-white/10 rounded-2xl p-4 mb-12 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.5)]">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            
            {/* Search Input */}
            <div className="relative w-full lg:w-1/3 group">
              <Search className="absolute left-4 top-3.5 text-gray-500 group-focus-within:text-primary transition-colors" size={18} />
              <input 
                type="text" 
                placeholder="Search facilities..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#0F172A]/50 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder-gray-500 focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all outline-none"
              />
            </div>

            {/* Dropdown Filters */}
            <div className="flex flex-col sm:flex-row w-full lg:w-auto gap-4">
              <div className="relative w-full sm:w-40 group cursor-pointer">
                <select className="w-full appearance-none bg-[#0F172A]/50 border border-white/10 rounded-xl py-3 pl-4 pr-10 text-gray-300 focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all outline-none cursor-pointer">
                  <option value="">All Sports</option>
                  <option value="football">Football</option>
                  <option value="tennis">Tennis</option>
                </select>
                <ChevronDown className="absolute right-4 top-3.5 text-gray-500 pointer-events-none" size={18} />
              </div>
            </div>
            
          </div>
        </div>

        {/*Loading State & Facilities Grid */}
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
             <Loader2 size={40} className="text-primary animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {facilities.map((facility) => (
              <div 
                key={facility._id}
                className="group flex flex-col h-full bg-card-bg/60 backdrop-blur-xl border border-white/5 rounded-2xl overflow-hidden hover:border-primary/40 hover:shadow-[0_15px_40px_-10px_rgba(163,255,18,0.15)] transition-all duration-500 transform hover:-translate-y-2"
              >
                {/* Card Image Area */}
                <div className="relative h-56 w-full overflow-hidden bg-[#111827]">
                  <img 
                    src={facility.image} 
                    alt={facility.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card-bg via-transparent to-transparent opacity-80"></div>
                  
                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className="bg-main-bg/80 backdrop-blur-md border border-white/10 text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-lg">
                      {facility.facility_type}
                    </span>
                  </div>
                </div>

                {/* Card Content Area */}
                <div className="p-6 flex flex-col flex-grow relative">
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors duration-300">
                    {facility.name}
                  </h3>
                  
                  <div className="flex items-center gap-2 text-secondary-text mb-5">
                    <MapPin size={16} className="text-gray-500" />
                    <span className="text-sm">{facility.location}</span>
                  </div>

                  {/* Info Grid */}
                  <div className="grid grid-cols-2 gap-4 mb-6 border-y border-white/5 py-4">
                    <div className="flex items-center gap-2 text-gray-300">
                      <Users size={16} className="text-primary/70" />
                      <span className="text-sm font-medium">{facility.capacity} Persons</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-300">
                      <Calendar size={16} className="text-primary/70" />
                      <span className="text-sm font-medium">{facility.available_slots?.length || 0} Slots Left</span>
                    </div>
                  </div>

                  {/* Footer: Price & Buttons */}
                  <div className="mt-auto">
                    <div className="flex items-end justify-between mb-4">
                      <div>
                        <p className="text-xs text-gray-500 mb-0.5">Price</p>
                        <p className="text-white font-bold text-xl">
                          ${facility.price_per_hour}
                          <span className="text-sm text-secondary-text font-normal">/hr</span>
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <Link 
                        href={`/facilities/${facility._id}`}
                        className="flex-1 text-center bg-white/5 text-white border border-white/10 hover:bg-white/10 font-bold text-sm px-4 py-3 rounded-xl transition-all duration-300 outline-none focus:outline-none"
                      >
                        Details
                      </Link>
                      
                      {/* ৩. নতুন আপডেট করা Book Now বাটন */}
                      <button 
                        type="button"
                        onClick={() => handleBookNow(facility)}
                        disabled={processingId === facility._id}
                        className="flex-[2] flex justify-center items-center gap-2 text-center bg-primary/10 text-primary border border-primary/20 hover:bg-primary hover:text-main-bg hover:shadow-[0_0_20px_rgba(163,255,18,0.3)] disabled:opacity-50 disabled:cursor-not-allowed font-bold text-sm px-4 py-3 rounded-xl transition-all duration-300 outline-none focus:outline-none"
                      >
                        {processingId === facility._id ? (
                          <>
                            <Loader2 size={16} className="animate-spin" /> Booking...
                          </>
                        ) : (
                          "Book Now"
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}