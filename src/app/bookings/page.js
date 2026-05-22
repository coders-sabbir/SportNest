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
        return "bg-green-100 border-green-200 text-green-700";
      case "Pending":
      default:
        return "bg-yellow-100 border-yellow-200 text-yellow-700";
      case "Cancelled":
        return "bg-red-100 border-red-200 text-red-700";
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFFFF] pt-32 pb-24 overflow-hidden relative font-sans">
      
      {/* Background Ambient Glows (Light Mode Adjusted) */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#0B47B3]/5 blur-[150px] rounded-full pointer-events-none z-0"></div>
      <div className="absolute bottom-20 left-10 w-[400px] h-[400px] bg-blue-400/5 blur-[120px] rounded-full pointer-events-none z-0"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* 1. Header Section */}
        <div className="flex flex-col items-start mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0B47B3]/10 border border-[#0B47B3]/20 mb-4">
            <Activity size={14} className="text-[#0B47B3]" />
            <span className="text-xs font-bold text-[#0B47B3] uppercase tracking-widest">Your Reservations</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-3 tracking-tight">My Bookings</h1>
          <p className="text-gray-500 text-base max-w-2xl">Track, manage, and cancel your sports facility reservations easily from your personal dashboard.</p>
        </div>

        {/* 2. Summary Cards Section */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {/* Total Bookings */}
          <div className="bg-white border border-gray-200 shadow-sm p-6 rounded-2xl flex flex-col hover:border-[#0B47B3]/40 transition-colors group">
            <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center mb-4 group-hover:bg-[#0B47B3]/10 transition-colors">
              <Calendar size={18} className="text-gray-500 group-hover:text-[#0B47B3]" />
            </div>
            <h3 className="text-3xl font-black text-gray-900 mb-1">{totalBookings}</h3>
            <p className="text-sm text-gray-500">Total Bookings</p>
          </div>
          {/* Active Reservations */}
          <div className="bg-white border border-[#0B47B3]/30 p-6 rounded-2xl flex flex-col shadow-md relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#0B47B3]/5 blur-[30px] rounded-full"></div>
            <div className="w-10 h-10 rounded-full bg-[#0B47B3]/10 flex items-center justify-center mb-4">
              <CheckCircle2 size={18} className="text-[#0B47B3]" />
            </div>
            <h3 className="text-3xl font-black text-gray-900 mb-1">{activeReservations}</h3>
            <p className="text-sm text-[#0B47B3] font-medium">Active Reservations</p>
          </div>
          {/* Pending */}
          <div className="bg-white border border-gray-200 shadow-sm p-6 rounded-2xl flex flex-col hover:border-yellow-400/40 transition-colors group">
            <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center mb-4 group-hover:bg-yellow-100 transition-colors">
              <Clock3 size={18} className="text-gray-500 group-hover:text-yellow-600" />
            </div>
            <h3 className="text-3xl font-black text-gray-900 mb-1">{pendingApprovals}</h3>
            <p className="text-sm text-gray-500">Pending Approvals</p>
          </div>
          {/* Cancelled */}
          <div className="bg-white border border-gray-200 shadow-sm p-6 rounded-2xl flex flex-col hover:border-red-400/40 transition-colors group">
            <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center mb-4 group-hover:bg-red-100 transition-colors">
              <XCircle size={18} className="text-gray-500 group-hover:text-red-600" />
            </div>
            <h3 className="text-3xl font-black text-gray-900 mb-1">{cancelledGames}</h3>
            <p className="text-sm text-gray-500">Cancelled Games</p>
          </div>
        </div>

        {/* 3. Sticky Filter & Search Bar */}
        <div className="sticky top-24 z-40 bg-white/90 backdrop-blur-xl border border-gray-200 rounded-2xl p-4 mb-8 shadow-sm">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            
            {/* Search Input */}
            <div className="relative w-full lg:w-1/3 group">
              <Search className="absolute left-4 top-3.5 text-gray-400 group-focus-within:text-[#0B47B3] transition-colors" size={18} />
              <input 
                type="text" 
                placeholder="Search by facility or ID..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pl-12 pr-4 text-gray-800 placeholder-gray-400 focus:border-[#0B47B3] focus:ring-1 focus:ring-[#0B47B3] transition-all outline-none"
              />
            </div>

            {/* Filter Dropdowns */}
            <div className="flex w-full lg:w-auto gap-3">
              <div className="relative w-full sm:w-48 group cursor-pointer">
                <select 
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full appearance-none bg-gray-50 border border-gray-200 rounded-xl py-3 pl-4 pr-10 text-gray-700 focus:border-[#0B47B3] focus:ring-1 focus:ring-[#0B47B3] transition-all outline-none cursor-pointer"
                >
                  <option value="All">All Statuses</option>
                  <option value="Confirmed">Confirmed</option>
                  <option value="Pending">Pending</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
                <ChevronDown className="absolute right-4 top-3.5 text-gray-400 pointer-events-none" size={18} />
              </div>
              
              <button className="bg-white border border-gray-200 text-gray-700 rounded-xl px-4 py-3 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 outline-none font-medium">
                <SlidersHorizontal size={18} />
                <span className="hidden sm:inline">Sort</span>
              </button>
            </div>
          </div>
        </div>

        {/* 4. Bookings Display Area */}
        {loading ? (
          <div className="text-center py-20 text-[#0B47B3] font-bold flex flex-col items-center gap-3">
            <div className="w-8 h-8 border-4 border-[#0B47B3]/20 border-t-[#0B47B3] rounded-full animate-spin"></div>
            Loading your bookings...
          </div>
        ) : (
          <>
            {/* Desktop View Table */}
            <div className="hidden lg:block bg-white border border-gray-200 rounded-3xl overflow-hidden shadow-sm mb-12">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider">Facility Details</th>
                    <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider">Schedule</th>
                    <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider">Amount</th>
                    <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredBookings.map((booking) => (
                    <tr key={booking._id} className="hover:bg-gray-50/50 transition-colors group">
                      <td className="py-5 px-6">
                        <div className="flex items-center gap-4">
                          <div className="w-14 h-14 rounded-xl overflow-hidden shrink-0 border border-gray-200 group-hover:border-[#0B47B3]/30 transition-colors">
                            <img src={booking.image || "https://images.unsplash.com/photo-1546519638-68e109498ffc"} alt={booking.facilityName} className="w-full h-full object-cover" />
                          </div>
                          <div>
                            <h4 className="text-gray-900 font-bold text-sm mb-1">{booking.facilityName}</h4>
                            <div className="flex items-center gap-2 text-xs">
                              <span className="text-gray-500 max-w-[100px] truncate">{booking._id}</span>
                              <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                              <span className="text-[#0B47B3] font-medium">Sports</span>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="py-5 px-6">
                        <div className="flex flex-col gap-1.5">
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Calendar size={14} className="text-[#0B47B3]" /> {booking.bookingDate || booking.date}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Clock size={14} className="text-[#0B47B3]" /> {booking.slot || booking.time}
                          </div>
                        </div>
                      </td>
                      <td className="py-5 px-6">
                        <div className="text-gray-900 font-bold">${booking.price}</div>
                        <div className="text-xs text-gray-500 font-medium">1 hr</div>
                      </td>
                      <td className="py-5 px-6">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-md border text-xs font-bold ${getStatusBadge(booking.status || "Pending")}`}>
                          {booking.status || "Pending"}
                        </span>
                      </td>
                      <td className="py-5 px-6 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button className="p-2 bg-white border border-gray-200 rounded-lg hover:bg-[#0B47B3]/5 hover:border-[#0B47B3]/30 hover:text-[#0B47B3] transition-all outline-none group/btn">
                            <Eye size={16} className="text-gray-500 group-hover/btn:text-[#0B47B3] transition-colors" />
                          </button>
                          {(booking.status !== "Cancelled" && booking.status !== "Completed") && (
                            <button 
                              onClick={() => handleDeleteBooking(booking._id)}
                              className="p-2 bg-white border border-gray-200 rounded-lg hover:bg-red-50 hover:border-red-200 transition-all outline-none group/btn"
                            >
                              <Trash2 size={16} className="text-gray-500 group-hover/btn:text-red-500 transition-colors" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filteredBookings.length === 0 && (
                 <div className="text-center py-12 text-gray-500 font-medium">No bookings found matching your criteria.</div>
              )}
            </div>

            {/* Mobile View: Stacked Responsive Cards */}
            <div className="grid grid-cols-1 gap-4 lg:hidden mb-12">
              {filteredBookings.map((booking) => (
                <div key={booking._id} className="bg-white border border-gray-200 rounded-2xl p-5 relative overflow-hidden shadow-sm">
                  <div className="flex justify-between items-start mb-4">
                    <span className={`inline-flex items-center px-2 py-1 rounded-md border text-[10px] font-bold uppercase tracking-wider ${getStatusBadge(booking.status || "Pending")}`}>
                      {booking.status || "Pending"}
                    </span>
                    <span className="text-xs text-gray-400 font-mono max-w-[100px] truncate">{booking._id}</span>
                  </div>
                  
                  <div className="flex gap-4 mb-5 border-b border-gray-100 pb-5">
                    <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0 border border-gray-200">
                      <img src={booking.image || "https://images.unsplash.com/photo-1546519638-68e109498ffc"} alt={booking.facilityName} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex flex-col justify-center">
                      <h4 className="text-gray-900 font-bold text-base mb-1 leading-tight">{booking.facilityName}</h4>
                      <span className="text-[#0B47B3] font-medium text-xs mb-2">Sports</span>
                      <div className="text-lg font-black text-gray-900">${booking.price} <span className="text-xs text-gray-500 font-normal">/ 1 hr</span></div>
                    </div>
                  </div>

                  <div className="space-y-2 mb-5">
                    <div className="flex items-center gap-3 text-sm text-gray-700 bg-gray-50 p-2.5 rounded-xl border border-gray-100">
                      <Calendar size={16} className="text-[#0B47B3]" /> <span className="font-medium">{booking.bookingDate || booking.date}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-700 bg-gray-50 p-2.5 rounded-xl border border-gray-100">
                      <Clock size={16} className="text-[#0B47B3]" /> <span className="font-medium">{booking.slot || booking.time}</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button className="flex-1 bg-white border border-gray-200 text-gray-700 font-bold py-2.5 rounded-xl hover:bg-gray-50 transition-colors text-sm flex justify-center items-center gap-2 outline-none">
                      Details
                    </button>
                    {(booking.status !== "Cancelled" && booking.status !== "Completed") && (
                      <button 
                        onClick={() => handleDeleteBooking(booking._id)}
                        className="flex-1 bg-red-50 border border-red-100 text-red-600 font-bold py-2.5 rounded-xl hover:bg-red-100 transition-colors text-sm flex justify-center items-center gap-2 outline-none"
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </div>
              ))}
              {filteredBookings.length === 0 && (
                 <div className="text-center py-10 border border-gray-200 rounded-2xl bg-gray-50 text-gray-500 text-sm font-medium">No bookings found.</div>
              )}
            </div>
          </>
        )}

        {/* 5. Bottom Area: Pagination / Load More */}
        <div className="flex flex-col items-center">
          <div className="w-full max-w-md h-px bg-gradient-to-r from-transparent via-[#0B47B3]/30 to-transparent mb-8"></div>
          <button className="group px-8 py-4 bg-[#0B47B3]/5 border border-[#0B47B3]/20 text-[#0B47B3] font-bold text-sm rounded-full flex items-center justify-center gap-2 hover:bg-[#0B47B3] hover:text-white hover:shadow-lg transition-all duration-300 transform active:scale-95 outline-none">
            Load More History
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-300" />
          </button>
        </div>

      </div>
    </div>
  );
}