"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Search, SlidersHorizontal, ChevronDown, MapPin, 
  Users, Calendar, Star, TrendingUp, ArrowRight, Loader2, X
} from "lucide-react";
import axios from "axios";

export default function AllFacilitiesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [facilities, setFacilities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [processingId, setProcessingId] = useState(null);

  // Modal & Booking States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFacility, setSelectedFacility] = useState(null);
  const [bookingDate, setBookingDate] = useState("");
  const [selectedSlot, setSelectedSlot] = useState("");

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

  const handleOpenModal = (facility) => {
    setSelectedFacility(facility);
    setBookingDate(""); 
    setSelectedSlot("");
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedFacility(null);
  };

  const confirmBooking = async () => {
    if (!bookingDate || !selectedSlot) {
      alert("Please select both a date and a time slot!");
      return;
    }

    setProcessingId(selectedFacility._id); 
    
    const bookingInfo = {
      facilityId: selectedFacility._id,
      facilityName: selectedFacility.name || selectedFacility.facilityName,
      userEmail: "user@example.com", 
      bookingDate: bookingDate, 
      slot: selectedSlot, 
      price: selectedFacility.price_per_hour || selectedFacility.price
    };

    try {
      const response = await axios.post("https://sport-nest-server-a4sz.vercel.app/bookings", bookingInfo);
      if (response.status === 201) {
        alert(`Booking Successful for ${selectedFacility.name}! Date: ${bookingDate}, Slot: ${selectedSlot}`);
        handleCloseModal(); 
      }
    } catch (error) {
      console.error("Booking Error:", error);
      alert("Failed to book. Try again!");
    } finally {
      setProcessingId(null); 
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
                        className="flex-1 text-center bg-white/5 text-white border border-white/10 hover:bg-white/10 font-bold text-sm px-4 py-3 rounded-xl transition-all duration-300 outline-none"
                      >
                        Details
                      </Link>
                      
                      <button 
                        type="button"
                        onClick={() => handleOpenModal(facility)}
                        className="flex-[2] text-center bg-primary/10 text-primary border border-primary/20 hover:bg-primary hover:text-main-bg hover:shadow-[0_0_20px_rgba(163,255,18,0.3)] font-bold text-sm px-4 py-3 rounded-xl transition-all duration-300 outline-none"
                      >
                        Book Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

// Modal for Booking
      {isModalOpen && selectedFacility && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
          <div className="bg-[#FFFFFF] w-full max-w-md rounded-2xl p-6 relative shadow-2xl transform transition-all">
            
            <button 
              onClick={handleCloseModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors outline-none"
            >
              <X size={24} />
            </button>

            <div className="mb-6">
              <h2 className="text-2xl font-black text-[#0B47B3] mb-1">Schedule Booking</h2>
              <p className="text-gray-500 text-sm font-medium">{selectedFacility.name}</p>
            </div>

            <div className="mb-5">
              <label className="block text-sm font-bold text-gray-700 mb-2">Select Date</label>
              <input 
                type="date" 
                value={bookingDate}
                onChange={(e) => setBookingDate(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 text-gray-800 focus:border-[#0B47B3] focus:ring-1 focus:ring-[#0B47B3] outline-none transition-all"
                min={new Date().toISOString().split('T')[0]} 
              />
            </div>

            <div className="mb-8">
              <label className="block text-sm font-bold text-gray-700 mb-2">Available Time Slots</label>
              <div className="grid grid-cols-2 gap-3">
                {selectedFacility?.available_slots && selectedFacility.available_slots.length > 0 ? (
                  selectedFacility.available_slots.map((slot, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => setSelectedSlot(slot)}
                      className={`py-2 px-3 rounded-xl text-sm font-bold border transition-all outline-none ${
                        selectedSlot === slot 
                          ? "bg-[#0B47B3] border-[#0B47B3] text-white shadow-md" 
                          : "bg-white border-gray-200 text-gray-600 hover:border-[#0B47B3]/50 hover:text-[#0B47B3]"
                      }`}
                    >
                      {slot}
                    </button>
                  ))
                ) : (
                  <div className="col-span-2 bg-red-50 border border-red-100 text-red-500 text-sm font-semibold p-3 rounded-xl text-center">
                    No slots available right now.
                  </div>
                )}
              </div>
            </div>

            <button 
              onClick={confirmBooking}
              disabled={processingId !== null || !selectedFacility?.available_slots?.length}
              className="w-full bg-[#0B47B3] hover:bg-[#08368b] text-white font-bold py-3.5 rounded-xl transition-colors flex justify-center items-center gap-2 outline-none disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {processingId !== null ? (
                <>
                  <Loader2 size={18} className="animate-spin" /> Confirming...
                </>
              ) : (
                `Confirm Booking ($${selectedFacility.price_per_hour || selectedFacility.price})`
              )}
            </button>

          </div>
        </div>
      )}

    </div>
  );
}