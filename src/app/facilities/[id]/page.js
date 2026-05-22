"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { 
  MapPin, Star, Users, Calendar as CalendarIcon, 
  Clock, ShieldCheck, CheckCircle2, Car, Wifi, 
  Coffee, Dumbbell, Heart, ArrowRight, Activity, Tag, Loader2
} from "lucide-react";
import axios from "axios";

export default function FacilityDetailsPage() {
  const params = useParams();
  const id = params?.id;

  const [facility, setFacility] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const [date, setDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("");
  const [hours, setHours] = useState(1);
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (!id) return;

    axios.get("https://sport-nest-server-a4sz.vercel.app/facilities")
      .then((res) => {
        const foundFacility = res.data.find((item) => String(item._id) === String(id));
        setFacility(foundFacility);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching facility details:", error);
        setIsLoading(false);
      });
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-main-bg flex items-center justify-center">
        <Loader2 size={40} className="text-primary animate-spin" />
      </div>
    );
  }

  if (!facility) {
    return (
      <div className="min-h-screen bg-main-bg flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-4">Facility Not Found!</h1>
          <Link href="/facilities" className="text-primary hover:underline">Go back to all facilities</Link>
        </div>
      </div>
    );
  }

  const totalPrice = hours * facility.price_per_hour;

  return (
    <div className="min-h-screen bg-main-bg pb-24 font-sans">
      
      {/* 1. Top Banner Section */}
      <div className="relative h-[45vh] lg:h-[55vh] w-full overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={facility.image} 
            alt={facility.name} 
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="absolute inset-0 bg-gradient-to-t from-main-bg via-main-bg/80 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-main-bg/90 to-transparent"></div>
        
        <div className="absolute top-28 left-4 lg:left-8 bg-card-bg/60 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full flex items-center gap-2 shadow-lg animate-pulse">
          <Activity size={16} className="text-primary" />
          <span className="text-xs text-white font-medium">3 people are viewing this right now</span>
        </div>
      </div>

      {/* 2. Main Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 -mt-32 lg:-mt-48 flex flex-col lg:flex-row gap-10">
        
        {/* Left Side: Facility Details */}
        <div className="w-full lg:w-2/3 space-y-8">
          
          <div className="bg-card-bg/40 backdrop-blur-xl border border-white/10 rounded-3xl p-6 lg:p-8 shadow-2xl">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="bg-primary/20 border border-primary/30 text-primary text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1 shadow-[0_0_10px_rgba(163,255,18,0.2)]">
                <Tag size={12} /> Premium Status
              </span>
              <span className="bg-white/5 border border-white/10 text-white text-xs font-bold px-3 py-1.5 rounded-lg">
                {facility.facility_type}
              </span>
              <div className="flex items-center gap-1 bg-white/5 border border-white/10 px-2.5 py-1.5 rounded-lg ml-auto">
                <Star size={14} className="text-primary fill-current" />
                <span className="text-white text-xs font-bold">{facility.rating}</span>
              </div>
            </div>

            <h1 className="text-4xl lg:text-5xl font-extrabold text-white mb-4 tracking-tight">
              {facility.name}
            </h1>
            
            <div className="flex flex-wrap items-center gap-6 text-secondary-text text-sm">
              <div className="flex items-center gap-1.5">
                <MapPin size={18} className="text-gray-400" /> {facility.location}
              </div>
              <div className="flex items-center gap-1.5">
                <Users size={18} className="text-gray-400" /> Up to {facility.capacity} Players
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck size={18} className="text-primary" /> {facility.booking_count || 0}+ Bookings
              </div>
            </div>
          </div>

          <div className="bg-card-bg/40 backdrop-blur-xl border border-white/10 rounded-3xl p-6 lg:p-8">
            <h3 className="text-2xl font-bold text-white mb-4">About the Facility</h3>
            <p className="text-secondary-text leading-relaxed">
              {facility.description}
            </p>
          </div>

          <div className="bg-card-bg/40 backdrop-blur-xl border border-white/10 rounded-3xl p-6 lg:p-8">
            <h3 className="text-2xl font-bold text-white mb-6">Premium Amenities</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {facility.amenities?.map((amenityName, idx) => (
                <div key={idx} className="flex items-center gap-3 bg-white/5 border border-white/10 p-4 rounded-xl hover:bg-white/10 transition-colors">
                  <div className="text-primary"><CheckCircle2 size={20} /></div>
                  <span className="text-sm font-medium text-white">{amenityName}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-card-bg/40 backdrop-blur-xl border border-white/10 rounded-3xl p-6 lg:p-8">
            <h3 className="text-xl font-bold text-white mb-4">Rules & Guidelines</h3>
            <ul className="space-y-3">
              {facility.rules?.map((rule, idx) => (
                <li key={idx} className="flex items-start gap-3 text-secondary-text text-sm">
                  <CheckCircle2 size={18} className="text-primary shrink-0 mt-0.5" /> {rule}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Side: Sticky Booking Card */}
        <div className="w-full lg:w-1/3">
          <div className="sticky top-28 bg-[#111827]/80 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.7)] group">
            
            <div className="absolute -inset-[1px] bg-gradient-to-b from-primary/30 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

            <div className="relative z-10">
              <div className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-4">
                <span className="text-[10px] font-bold text-primary uppercase tracking-widest">Reserve Your Slot</span>
              </div>
              
              <h2 className="text-3xl font-bold text-white mb-2">Book This Facility</h2>
              <div className="flex items-end gap-1 mb-8">
                <span className="text-3xl font-black text-primary">${facility.price_per_hour}</span>
                <span className="text-gray-400 font-medium pb-1">/ hour</span>
              </div>

              <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-gray-400 ml-1">Select Date</label>
                  <div className="relative">
                    <CalendarIcon className="absolute left-4 top-3.5 text-gray-500" size={18} />
                    <input 
                      type="date" 
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full bg-[#0F172A]/50 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:border-primary/50 focus:ring-1 focus:ring-primary/50 outline-none [color-scheme:dark]"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-gray-400 ml-1">Available Time Slots</label>
                  <div className="relative">
                    <Clock className="absolute left-4 top-3.5 text-gray-500" size={18} />
                    <select 
                      value={timeSlot}
                      onChange={(e) => setTimeSlot(e.target.value)}
                      className="w-full appearance-none bg-[#0F172A]/50 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:border-primary/50 focus:ring-1 focus:ring-primary/50 outline-none cursor-pointer"
                      required
                    >
                      <option value="" disabled>Choose a time slot</option>
                      {facility.available_slots?.map((slot, idx) => (
                        <option key={idx} value={slot}>{slot}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-gray-400 ml-1">Duration (Hrs)</label>
                    <input 
                      type="number" 
                      min="1" max="12"
                      value={hours}
                      onChange={(e) => setHours(e.target.value)}
                      className="w-full bg-[#0F172A]/50 border border-white/10 rounded-xl py-3 px-4 text-white focus:border-primary/50 focus:ring-1 focus:ring-primary/50 outline-none"
                      required
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-gray-400 ml-1">Your Email</label>
                    <input 
                      type="email" 
                      placeholder="name@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-[#0F172A]/50 border border-white/10 rounded-xl py-3 px-4 text-white focus:border-primary/50 focus:ring-1 focus:ring-primary/50 outline-none text-sm"
                      required
                    />
                  </div>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-center justify-between mt-6">
                  <span className="text-gray-300 font-medium">Total Amount</span>
                  <span className="text-2xl font-bold text-white">${totalPrice}</span>
                </div>

                <div className="pt-4 space-y-3">
                  <button type="submit" className="w-full bg-primary text-main-bg font-bold py-4 rounded-xl hover:bg-primary-hover shadow-[0_0_25px_rgba(163,255,18,0.3)] transition-all transform active:scale-95 flex items-center justify-center gap-2 outline-none focus:outline-none [-webkit-tap-highlight-color:transparent]">
                    Confirm Booking <ArrowRight size={18} />
                  </button>
                  <button type="button" className="w-full bg-white/5 border border-white/10 text-white font-semibold py-4 rounded-xl hover:bg-white/10 transition-all flex items-center justify-center gap-2 outline-none focus:outline-none [-webkit-tap-highlight-color:transparent]">
                    <Heart size={18} className="text-gray-400 hover:text-red-400 transition-colors" /> Add to Wishlist
                  </button>
                </div>
                
                <p className="text-center text-xs text-gray-500 pt-2">No hidden fees. Free cancellation up to 24 hours.</p>
              </form>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}