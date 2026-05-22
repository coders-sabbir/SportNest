"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Search, SlidersHorizontal, ChevronDown, Calendar, 
  Clock, MapPin, Activity, CheckCircle2, XCircle, 
  Clock3, ArrowRight, Eye, Trash2
} from "lucide-react";

export default function MyBookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const response = await fetch("https://sport-nest-server-a4sz.vercel.app/bookings");
      const data = await response.json();
      setBookings(data);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleDeleteBooking = async (id) => {
    const proceed = window.confirm("Are you sure you want to cancel this booking?");
    if (!proceed) return;

    try {
      const response = await fetch(`https://sport-nest-server-a4sz.vercel.app/bookings/${id}`, {
        method: "DELETE",
      });
      const data = await response.json();
      
      if (response.ok) {
        alert("Booking cancelled successfully!");
        setBookings(bookings.filter((b) => b._id !== id));
      } else {
        alert(data.message || "Failed to delete booking");
      }
    } catch (error) {
      console.error("Error deleting booking:", error);
      alert("Something went wrong!");
    }
  };

  const filteredBookings = bookings.filter(booking => {
    const facilityName = booking.facilityName || "";
    const bookingId = booking._id || "";
    const status = booking.status || "Pending"; 

    const matchesSearch = facilityName.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          bookingId.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "All" || status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const totalBookings = bookings.length;
  const activeReservations = bookings.filter(b => b.status === "Confirmed").length;
  const pendingApprovals = bookings.filter(b => b.status === "Pending" || !b.status).length;
  const cancelledGames = bookings.filter(b => b.status === "Cancelled").length;

  const getStatusBadge = (status) => {
    switch(status) {
      case "Confirmed":
      case "Completed":
        return "bg-green-500/10 border-green-500/20 text-green-400";
      case "Pending":
      default:
        return "bg-yellow-500/10 border-yellow-500/20 text-yellow-400";
      case "Cancelled":
        return "bg-red-500/10 border-red-500/20 text-red-400";
    }
  };

  return (
    <div className="min-h-screen bg-[#0F172A] pt-28 pb-24 overflow-hidden relative font-sans">
      
      {/* Background Ambient Glows */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#A3FF12]/5 blur-[150px] rounded-full pointer-events-none z-0"></div>
      <div className="absolute bottom-20 left-10 w-[400px] h-[400px] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none z-0"></div>
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 mix-blend-overlay pointer-events-none z-0"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* 1. Header Section */}
        <div className="flex flex-col items-start mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#A3FF12]/10 border border-[#A3FF12]/20 mb-4 shadow-[0_0_15px_rgba(163,255,18,0.05)]">
            <Activity size={14} className="text-[#A3FF12]" />
            <span className="text-xs font-bold text-[#A3FF12] uppercase tracking-widest">Your Reservations</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-3 tracking-tight">My Bookings</h1>
          <p className="text-gray-400 text-base max-w-2xl">Track, manage, and cancel your sports facility reservations easily from your personal dashboard.</p>
        </div>

        {/* 2. Summary Cards Section */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {/* Total Bookings */}
          <div className="bg-[#111827]/60 backdrop-blur-xl border border-white/10 p-6 rounded-2xl flex flex-col hover:border-[#A3FF12]/30 transition-colors group">
            <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center mb-4 group-hover:bg-[#A3FF12]/10 transition-colors">
              <Calendar size={18} className="text-gray-400 group-hover:text-[#A3FF12]" />
            </div>
            <h3 className="text-3xl font-black text-white mb-1">{totalBookings}</h3>
            <p className="text-sm text-gray-500">Total Bookings</p>
          </div>
          {/* Active Reservations */}
          <div className="bg-[#111827]/60 backdrop-blur-xl border border-[#A3FF12]/20 p-6 rounded-2xl flex flex-col shadow-[0_0_20px_rgba(163,255,18,0.05)] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#A3FF12]/10 blur-[30px] rounded-full"></div>
            <div className="w-10 h-10 rounded-full bg-[#A3FF12]/10 flex items-center justify-center mb-4">
              <CheckCircle2 size={18} className="text-[#A3FF12]" />
            </div>
            <h3 className="text-3xl font-black text-white mb-1">{activeReservations}</h3>
            <p className="text-sm text-[#A3FF12]/80">Active Reservations</p>
          </div>
          {/* Pending */}
          <div className="bg-[#111827]/60 backdrop-blur-xl border border-white/10 p-6 rounded-2xl flex flex-col hover:border-yellow-500/30 transition-colors group">
            <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center mb-4 group-hover:bg-yellow-500/10 transition-colors">
              <Clock3 size={18} className="text-gray-400 group-hover:text-yellow-400" />
            </div>
            <h3 className="text-3xl font-black text-white mb-1">{pendingApprovals}</h3>
            <p className="text-sm text-gray-500">Pending Approvals</p>
          </div>
          {/* Cancelled */}
          <div className="bg-[#111827]/60 backdrop-blur-xl border border-white/10 p-6 rounded-2xl flex flex-col hover:border-red-500/30 transition-colors group">
            <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center mb-4 group-hover:bg-red-500/10 transition-colors">
              <XCircle size={18} className="text-gray-400 group-hover:text-red-400" />
            </div>
            <h3 className="text-3xl font-black text-white mb-1">{cancelledGames}</h3>
            <p className="text-sm text-gray-500">Cancelled Games</p>
          </div>
        </div>

        {/* 3. Sticky Filter & Search Bar */}
        <div className="sticky top-24 z-40 bg-[#111827]/80 backdrop-blur-2xl border border-white/10 rounded-2xl p-4 mb-8 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.5)]">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            
            {/* Search Input */}
            <div className="relative w-full lg:w-1/3 group">
              <Search className="absolute left-4 top-3.5 text-gray-500 group-focus-within:text-[#A3FF12] transition-colors" size={18} />
              <input 
                type="text" 
                placeholder="Search by facility or ID..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#0F172A]/50 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder-gray-500 focus:border-[#A3FF12]/50 focus:ring-1 focus:ring-[#A3FF12]/50 transition-all outline-none"
              />
            </div>

            {/* Filter Dropdowns */}
            <div className="flex w-full lg:w-auto gap-3">
              <div className="relative w-full sm:w-48 group cursor-pointer">
                <select 
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full appearance-none bg-[#0F172A]/50 border border-white/10 rounded-xl py-3 pl-4 pr-10 text-gray-300 focus:border-[#A3FF12]/50 focus:ring-1 focus:ring-[#A3FF12]/50 transition-all outline-none cursor-pointer"
                >
                  <option value="All">All Statuses</option>
                  <option value="Confirmed">Confirmed</option>
                  <option value="Pending">Pending</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
                <ChevronDown className="absolute right-4 top-3.5 text-gray-500 pointer-events-none" size={18} />
              </div>
              
              <button className="bg-white/5 border border-white/10 text-white rounded-xl px-4 py-3 hover:bg-white/10 transition-colors flex items-center justify-center gap-2 outline-none">
                <SlidersHorizontal size={18} />
                <span className="hidden sm:inline">Sort</span>
              </button>
            </div>
          </div>
        </div>

        {/* 4. Bookings Display Area */}
        {loading ? (
          <div className="text-center py-20 text-[#A3FF12] font-bold">Loading your bookings...</div>
        ) : (
          <>
            {/* Desktop View Table */}
            <div className="hidden lg:block bg-[#111827]/60 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl mb-12">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-white/5 border-b border-white/10">
                    <th className="py-4 px-6 text-xs font-semibold text-gray-400 uppercase tracking-wider">Facility Details</th>
                    <th className="py-4 px-6 text-xs font-semibold text-gray-400 uppercase tracking-wider">Schedule</th>
                    <th className="py-4 px-6 text-xs font-semibold text-gray-400 uppercase tracking-wider">Amount</th>
                    <th className="py-4 px-6 text-xs font-semibold text-gray-400 uppercase tracking-wider">Status</th>
                    <th className="py-4 px-6 text-xs font-semibold text-gray-400 uppercase tracking-wider text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {filteredBookings.map((booking) => (
                    <tr key={booking._id} className="hover:bg-white/[0.02] transition-colors group">
                      <td className="py-5 px-6">
                        <div className="flex items-center gap-4">
                          <div className="w-14 h-14 rounded-xl overflow-hidden shrink-0 border border-white/10 group-hover:border-[#A3FF12]/30 transition-colors">
                            <img src={booking.image || "https://images.unsplash.com/photo-1546519638-68e109498ffc"} alt={booking.facilityName} className="w-full h-full object-cover" />
                          </div>
                          <div>
                            <h4 className="text-white font-bold text-sm mb-1">{booking.facilityName}</h4>
                            <div className="flex items-center gap-2 text-xs">
                              <span className="text-gray-400 max-w-[100px] truncate">{booking._id}</span>
                              <span className="w-1 h-1 rounded-full bg-gray-600"></span>
                              <span className="text-[#A3FF12]">Sports</span>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="py-5 px-6">
                        <div className="flex flex-col gap-1.5">
                          <div className="flex items-center gap-2 text-sm text-gray-300">
                            <Calendar size={14} className="text-gray-500" /> {booking.bookingDate || booking.date}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-400">
                            <Clock size={14} className="text-gray-500" /> {booking.slot || booking.time}
                          </div>
                        </div>
                      </td>
                      <td className="py-5 px-6">
                        <div className="text-white font-bold">${booking.price}</div>
                        <div className="text-xs text-gray-500">1 hr</div>
                      </td>
                      <td className="py-5 px-6">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-md border text-xs font-semibold ${getStatusBadge(booking.status || "Pending")}`}>
                          {booking.status || "Pending"}
                        </span>
                      </td>
                      <td className="py-5 px-6 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button className="p-2 bg-white/5 border border-white/10 rounded-lg hover:bg-[#A3FF12]/10 hover:border-[#A3FF12]/30 hover:text-[#A3FF12] transition-all outline-none group/btn">
                            <Eye size={16} className="text-gray-400 group-hover/btn:text-[#A3FF12] transition-colors" />
                          </button>
                          {(booking.status !== "Cancelled" && booking.status !== "Completed") && (
                            <button 
                              onClick={() => handleDeleteBooking(booking._id)}
                              className="p-2 bg-white/5 border border-white/10 rounded-lg hover:bg-red-500/10 hover:border-red-500/30 transition-all outline-none group/btn"
                            >
                              <Trash2 size={16} className="text-gray-400 group-hover/btn:text-red-400 transition-colors" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filteredBookings.length === 0 && (
                 <div className="text-center py-12 text-gray-500">No bookings found matching your criteria.</div>
              )}
            </div>

            {/* Mobile View: Stacked Responsive Cards */}
            <div className="grid grid-cols-1 gap-4 lg:hidden mb-12">
              {filteredBookings.map((booking) => (
                <div key={booking._id} className="bg-[#111827]/60 backdrop-blur-xl border border-white/10 rounded-2xl p-5 relative overflow-hidden">
                  <div className="flex justify-between items-start mb-4">
                    <span className={`inline-flex items-center px-2 py-1 rounded-md border text-[10px] font-bold uppercase tracking-wider ${getStatusBadge(booking.status || "Pending")}`}>
                      {booking.status || "Pending"}
                    </span>
                    <span className="text-xs text-gray-500 font-mono max-w-[100px] truncate">{booking._id}</span>
                  </div>
                  
                  <div className="flex gap-4 mb-5 border-b border-white/5 pb-5">
                    <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0 border border-white/10">
                      <img src={booking.image || "https://images.unsplash.com/photo-1546519638-68e109498ffc"} alt={booking.facilityName} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex flex-col justify-center">
                      <h4 className="text-white font-bold text-base mb-1 leading-tight">{booking.facilityName}</h4>
                      <span className="text-[#A3FF12] text-xs mb-2">Sports</span>
                      <div className="text-lg font-black text-white">${booking.price} <span className="text-xs text-gray-500 font-normal">/ 1 hr</span></div>
                    </div>
                  </div>

                  <div className="space-y-2 mb-5">
                    <div className="flex items-center gap-3 text-sm text-gray-300 bg-white/5 p-2 rounded-lg">
                      <Calendar size={16} className="text-[#A3FF12]" /> {booking.bookingDate || booking.date}
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-300 bg-white/5 p-2 rounded-lg">
                      <Clock size={16} className="text-[#A3FF12]" /> {booking.slot || booking.time}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button className="flex-1 bg-white/5 border border-white/10 text-white font-semibold py-2.5 rounded-xl hover:bg-white/10 transition-colors text-sm flex justify-center items-center gap-2 outline-none">
                      Details
                    </button>
                    {(booking.status !== "Cancelled" && booking.status !== "Completed") && (
                      <button 
                        onClick={() => handleDeleteBooking(booking._id)}
                        className="flex-1 bg-red-500/10 border border-red-500/20 text-red-400 font-semibold py-2.5 rounded-xl hover:bg-red-500/20 transition-colors text-sm flex justify-center items-center gap-2 outline-none"
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </div>
              ))}
              {filteredBookings.length === 0 && (
                 <div className="text-center py-10 border border-white/10 rounded-2xl bg-[#111827]/40 text-gray-500 text-sm">No bookings found.</div>
              )}
            </div>
          </>
        )}

        {/* 5. Bottom Area: Pagination / Load More */}
        <div className="flex flex-col items-center">
          <div className="w-full max-w-md h-px bg-gradient-to-r from-transparent via-[#A3FF12]/30 to-transparent mb-8"></div>
          <button className="group px-8 py-4 bg-[#A3FF12]/10 border border-[#A3FF12]/30 text-[#A3FF12] font-bold text-sm rounded-full flex items-center justify-center gap-2 hover:bg-[#A3FF12] hover:text-[#0F172A] hover:shadow-[0_0_30px_rgba(163,255,18,0.4)] transition-all duration-300 transform active:scale-95 outline-none">
            Load More History
            <ArrowRight size={18} className="group-hover:translate-x-1 group-hover:text-[#0F172A] transition-transform duration-300" />
          </button>
        </div>

      </div>
    </div>
  );
}