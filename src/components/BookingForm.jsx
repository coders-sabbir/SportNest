"use client";

import { useState } from "react";
import { 
  Calendar, Clock, Mail, FileText, 
  ShieldCheck, CheckCircle2, ArrowRight, X, Info
} from "lucide-react";

export default function BookingForm() {
  const [hours, setHours] = useState(1);
  const [date, setDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("");
  const [email, setEmail] = useState("");
  
  // Static data for demonstration
  const facilityName = "Elite Football Turf";
  const pricePerHour = 40;
  const totalPrice = hours * pricePerHour;

  return (
    <section className="relative w-full py-24 bg-[#0F172A] overflow-hidden font-sans">
      
      {/* Background Ambient Glows & Particles */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#A3FF12]/5 blur-[150px] rounded-full pointer-events-none z-0"></div>
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none z-0"></div>
      
      {/* Subtle Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 mix-blend-overlay pointer-events-none z-0"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Area: Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-[#A3FF12]/10 border border-[#A3FF12]/20 shadow-[0_0_15px_rgba(163,255,18,0.05)] mb-6 animate-pulse">
            <span className="text-xs font-bold text-[#A3FF12] tracking-widest uppercase">
              Reserve Your Spot
            </span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
            Book Your Facility
          </h2>
          
          <p className="text-gray-400 max-w-2xl text-base leading-relaxed">
            Choose your preferred date and time to confirm your booking instantly. Experience seamless sports facility reservations.
          </p>
        </div>

        {/* Main Booking Area: Split Layout */}
        <div className="flex flex-col lg:flex-row gap-10">
          
          {/* Left Side: Booking Form */}
          <div className="w-full lg:w-2/3 bg-[#111827]/60 backdrop-blur-xl border border-white/10 rounded-3xl p-8 lg:p-10 shadow-2xl relative">
            
            {/* Form Glow Effect */}
            <div className="absolute -inset-[1px] bg-gradient-to-b from-[#A3FF12]/20 to-transparent rounded-3xl opacity-0 hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>

            <form className="relative z-10 space-y-6" onSubmit={(e) => e.preventDefault()}>
              
              {/* 1. Facility Name (Readonly) */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-400 ml-1">Facility Name</label>
                <div className="relative">
                  <input 
                    type="text" 
                    value={facilityName}
                    readOnly
                    className="w-full bg-[#0F172A]/50 border border-white/10 rounded-xl py-3.5 px-4 text-gray-400 cursor-not-allowed outline-none"
                  />
                  <CheckCircle2 className="absolute right-4 top-3.5 text-[#A3FF12]" size={18} />
                </div>
              </div>

              {/* 2 & 3. Date and Time Slot */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-400 ml-1">Booking Date</label>
                  <div className="relative group">
                    <Calendar className="absolute left-4 top-3.5 text-gray-500 group-focus-within:text-[#A3FF12] transition-colors" size={18} />
                    <input 
                      type="date" 
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full bg-[#0F172A]/80 border border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-white focus:border-[#A3FF12]/50 focus:ring-1 focus:ring-[#A3FF12]/50 transition-all outline-none [color-scheme:dark]"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-400 ml-1">Time Slot</label>
                  <div className="relative group">
                    <Clock className="absolute left-4 top-3.5 text-gray-500 group-focus-within:text-[#A3FF12] transition-colors" size={18} />
                    <select 
                      value={timeSlot}
                      onChange={(e) => setTimeSlot(e.target.value)}
                      className="w-full appearance-none bg-[#0F172A]/80 border border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-white focus:border-[#A3FF12]/50 focus:ring-1 focus:ring-[#A3FF12]/50 transition-all outline-none cursor-pointer"
                    >
                      <option value="" disabled>Select time</option>
                      <option value="08:00 AM">08:00 AM - 09:00 AM</option>
                      <option value="05:00 PM">05:00 PM - 06:00 PM</option>
                      <option value="08:00 PM">08:00 PM - 09:00 PM</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* 4 & 6. Hours and Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-400 ml-1">Duration (Hours)</label>
                  <input 
                    type="number" 
                    min="1" max="10"
                    value={hours}
                    onChange={(e) => setHours(e.target.value)}
                    className="w-full bg-[#0F172A]/80 border border-white/10 rounded-xl py-3.5 px-4 text-white focus:border-[#A3FF12]/50 focus:ring-1 focus:ring-[#A3FF12]/50 transition-all outline-none"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-400 ml-1">Your Email</label>
                  <div className="relative group">
                    <Mail className="absolute left-4 top-3.5 text-gray-500 group-focus-within:text-[#A3FF12] transition-colors" size={18} />
                    <input 
                      type="email" 
                      placeholder="athlete@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-[#0F172A]/80 border border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-white placeholder-gray-600 focus:border-[#A3FF12]/50 focus:ring-1 focus:ring-[#A3FF12]/50 transition-all outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* 7. Additional Notes */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-400 ml-1">Additional Notes (Optional)</label>
                <div className="relative group">
                  <FileText className="absolute left-4 top-4 text-gray-500 group-focus-within:text-[#A3FF12] transition-colors" size={18} />
                  <textarea 
                    rows="3"
                    placeholder="Any special requests or equipment needs?"
                    className="w-full bg-[#0F172A]/80 border border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-white placeholder-gray-600 focus:border-[#A3FF12]/50 focus:ring-1 focus:ring-[#A3FF12]/50 transition-all outline-none resize-none custom-scrollbar"
                  ></textarea>
                </div>
              </div>
              
              {/* Form Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
                <button type="submit" className="w-full sm:w-2/3 bg-[#A3FF12] text-[#0F172A] font-bold py-4 rounded-xl hover:bg-[#8ee60e] shadow-[0_0_20px_rgba(163,255,18,0.3)] transition-all transform active:scale-95 flex items-center justify-center gap-2 outline-none">
                  Confirm Booking <ArrowRight size={18} />
                </button>
                <button type="button" className="w-full sm:w-1/3 bg-white/5 border border-white/10 text-white font-semibold py-4 rounded-xl hover:bg-white/10 transition-all flex items-center justify-center gap-2 outline-none">
                  <X size={18} /> Cancel
                </button>
              </div>

            </form>
          </div>

          {/* Right Side: Floating Booking Summary Card */}
          <div className="w-full lg:w-1/3">
            <div className="sticky top-28 bg-gradient-to-b from-[#111827] to-[#0F172A] backdrop-blur-2xl border border-white/10 rounded-3xl p-6 lg:p-8 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)]">
              
              <h3 className="text-xl font-bold text-white mb-6 border-b border-white/10 pb-4">Booking Summary</h3>
              
              <div className="space-y-4 mb-8">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-400">Facility</span>
                  <span className="text-white font-semibold text-right">{facilityName}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-400">Date</span>
                  <span className="text-white font-semibold">{date || "Not selected"}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-400">Time</span>
                  <span className="text-white font-semibold">{timeSlot || "Not selected"}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-400">Hourly Rate</span>
                  <span className="text-white font-semibold">${pricePerHour}/hr</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-400">Duration</span>
                  <span className="text-white font-semibold">{hours} {hours > 1 ? 'Hours' : 'Hour'}</span>
                </div>
              </div>

              {/* Live Total Price */}
              <div className="bg-[#A3FF12]/10 border border-[#A3FF12]/20 rounded-2xl p-5 mb-6">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-[#A3FF12] font-semibold text-sm">Total Cost</span>
                  <span className="text-xs text-[#A3FF12]/70 uppercase tracking-wider">USD</span>
                </div>
                <div className="text-4xl font-black text-white">${totalPrice}</div>
              </div>

              {/* Trust Indicators */}
              <div className="space-y-3">
                <div className="flex items-start gap-3 bg-white/5 p-3 rounded-xl border border-white/5">
                  <ShieldCheck size={18} className="text-[#A3FF12] shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-semibold text-white">Secure Booking</p>
                    <p className="text-[10px] text-gray-400 mt-0.5">Your payment details are protected with 256-bit encryption.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 bg-white/5 p-3 rounded-xl border border-white/5">
                  <Info size={18} className="text-[#A3FF12] shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-semibold text-white">Cancellation Policy</p>
                    <p className="text-[10px] text-gray-400 mt-0.5">Free cancellation up to 24 hours before your slot.</p>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}