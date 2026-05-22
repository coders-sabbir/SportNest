"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  LayoutDashboard, TrendingUp, Star, Activity, Search, 
  SlidersHorizontal, ChevronDown, Edit, Trash2, Eye, 
  MapPin, Users, AlertTriangle, X, ArrowRight, CheckCircle2
} from "lucide-react";

import { manageFacilitiesData } from "@/data/manageFacilitiesData";

export default function ManageFacilitiesPage() {
  const [facilities, setFacilities] = useState(manageFacilitiesData);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  
  // Modal States
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [facilityToDelete, setFacilityToDelete] = useState(null);

  const filteredFacilities = facilities.filter(facility => {
    const matchesSearch = facility.name.toLowerCase().includes(searchQuery.toLowerCase()) || facility.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === "All" || facility.type === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const openDeleteModal = (facility) => {
    setFacilityToDelete(facility);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setFacilityToDelete(null);
    setIsDeleteModalOpen(false);
  };

  const confirmDelete = () => {
    if (facilityToDelete) {
      setFacilities(facilities.filter(f => f.id !== facilityToDelete.id));
      closeDeleteModal();
    }
  };

  const getStatusBadge = (status) => {
    return status === "Active" 
      ? "bg-[#A3FF12]/10 border-[#A3FF12]/20 text-[#A3FF12]" 
      : "bg-yellow-500/10 border-yellow-500/20 text-yellow-400";
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
            <LayoutDashboard size={14} className="text-[#A3FF12]" />
            <span className="text-xs font-bold text-[#A3FF12] uppercase tracking-widest">Facility Dashboard</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-3 tracking-tight">Manage My Facilities</h1>
          <p className="text-gray-400 text-base max-w-2xl">Update, monitor, and manage your premium sports facilities efficiently from one centralized hub.</p>
        </div>

        {/* 2. Statistics Overview Section */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          <div className="bg-[#111827]/60 backdrop-blur-xl border border-white/10 p-6 rounded-2xl flex flex-col hover:border-[#A3FF12]/30 transition-colors group">
            <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center mb-4 group-hover:bg-[#A3FF12]/10 transition-colors">
              <MapPin size={18} className="text-gray-400 group-hover:text-[#A3FF12]" />
            </div>
            <h3 className="text-3xl font-black text-white mb-1">{facilities.length}</h3>
            <p className="text-sm text-gray-500">Total Facilities</p>
          </div>
          <div className="bg-[#111827]/60 backdrop-blur-xl border border-[#A3FF12]/20 p-6 rounded-2xl flex flex-col shadow-[0_0_20px_rgba(163,255,18,0.05)] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#A3FF12]/10 blur-[30px] rounded-full"></div>
            <div className="w-10 h-10 rounded-full bg-[#A3FF12]/10 flex items-center justify-center mb-4">
              <Activity size={18} className="text-[#A3FF12]" />
            </div>
            <h3 className="text-3xl font-black text-white mb-1">404</h3>
            <p className="text-sm text-[#A3FF12]/80">Active Bookings</p>
          </div>
          <div className="bg-[#111827]/60 backdrop-blur-xl border border-white/10 p-6 rounded-2xl flex flex-col hover:border-blue-500/30 transition-colors group">
            <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center mb-4 group-hover:bg-blue-500/10 transition-colors">
              <TrendingUp size={18} className="text-gray-400 group-hover:text-blue-400" />
            </div>
            <h3 className="text-3xl font-black text-white mb-1">$12.5k</h3>
            <p className="text-sm text-gray-500">Monthly Revenue</p>
          </div>
          <div className="bg-[#111827]/60 backdrop-blur-xl border border-white/10 p-6 rounded-2xl flex flex-col hover:border-yellow-500/30 transition-colors group">
            <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center mb-4 group-hover:bg-yellow-500/10 transition-colors">
              <Star size={18} className="text-gray-400 group-hover:text-yellow-400" />
            </div>
            <h3 className="text-3xl font-black text-white mb-1">4.8</h3>
            <p className="text-sm text-gray-500">Average Rating</p>
          </div>
        </div>

        {/* 3. Sticky Action Bar */}
        <div className="sticky top-24 z-30 bg-[#111827]/80 backdrop-blur-2xl border border-white/10 rounded-2xl p-4 mb-8 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.5)] flex flex-col lg:flex-row gap-4 items-center justify-between">
          <div className="relative w-full lg:w-2/5 group">
            <Search className="absolute left-4 top-3.5 text-gray-500 group-focus-within:text-[#A3FF12] transition-colors" size={18} />
            <input 
              type="text" 
              placeholder="Search facilities by name or location..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#0F172A]/50 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder-gray-500 focus:border-[#A3FF12]/50 focus:ring-1 focus:ring-[#A3FF12]/50 transition-all outline-none"
            />
          </div>
          <div className="flex w-full lg:w-auto gap-3">
            <div className="relative w-full sm:w-48 group cursor-pointer">
              <select 
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="w-full appearance-none bg-[#0F172A]/50 border border-white/10 rounded-xl py-3 pl-4 pr-10 text-gray-300 focus:border-[#A3FF12]/50 focus:ring-1 focus:ring-[#A3FF12]/50 transition-all outline-none cursor-pointer"
              >
                <option value="All">All Categories</option>
                <option value="Football">Football</option>
                <option value="Tennis">Tennis</option>
                <option value="Swimming">Swimming</option>
                <option value="Badminton">Badminton</option>
              </select>
              <ChevronDown className="absolute right-4 top-3.5 text-gray-500 pointer-events-none" size={18} />
            </div>
            <button className="bg-white/5 border border-white/10 text-white rounded-xl px-4 py-3 hover:bg-white/10 transition-colors flex items-center justify-center gap-2 outline-none">
              <SlidersHorizontal size={18} />
              <span className="hidden sm:inline">Sort</span>
            </button>
          </div>
        </div>

        {/* 4. Main Facilities Section */}
        
        {/* Desktop View*/}
        <div className="hidden lg:block bg-[#111827]/60 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl mb-12">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/5 border-b border-white/10">
                <th className="py-4 px-6 text-xs font-semibold text-gray-400 uppercase tracking-wider">Facility & Location</th>
                <th className="py-4 px-6 text-xs font-semibold text-gray-400 uppercase tracking-wider">Statistics</th>
                <th className="py-4 px-6 text-xs font-semibold text-gray-400 uppercase tracking-wider">Status & Rating</th>
                <th className="py-4 px-6 text-xs font-semibold text-gray-400 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredFacilities.map((facility) => (
                <tr key={facility.id} className="hover:bg-white/[0.02] transition-colors group">
                  <td className="py-5 px-6">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 border border-white/10 group-hover:border-[#A3FF12]/30 transition-colors relative">
                        <img src={facility.image} alt={facility.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <h4 className="text-white font-bold text-base mb-1">{facility.name}</h4>
                        <div className="flex items-center gap-2 text-xs text-gray-400">
                          <span className="text-[#A3FF12]">{facility.type}</span>
                          <span className="w-1 h-1 rounded-full bg-gray-600"></span>
                          <MapPin size={12} /> {facility.location}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-5 px-6">
                    <div className="flex flex-col gap-1 text-sm">
                      <div className="text-white font-semibold">${facility.price} <span className="text-gray-500 font-normal">/hr</span></div>
                      <div className="text-gray-400 flex items-center gap-1"><Users size={14}/> {facility.capacity} Players</div>
                    </div>
                  </td>
                  <td className="py-5 px-6">
                    <div className="flex flex-col items-start gap-2">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-md border text-[10px] font-bold uppercase tracking-wider ${getStatusBadge(facility.status)}`}>
                        {facility.status}
                      </span>
                      <div className="flex items-center gap-1 text-sm font-semibold text-white">
                        <Star size={14} className="text-yellow-400 fill-current" /> {facility.rating} <span className="text-gray-500 font-normal text-xs">({facility.bookingCount})</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-5 px-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link href={`/facilities/${facility.id}`} className="p-2.5 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 text-gray-400 hover:text-white transition-all outline-none group/btn">
                        <Eye size={16} />
                      </Link>
                      <button className="p-2.5 bg-white/5 border border-white/10 rounded-xl hover:bg-[#A3FF12]/10 hover:border-[#A3FF12]/30 text-gray-400 hover:text-[#A3FF12] transition-all outline-none group/btn">
                        <Edit size={16} />
                      </button>
                      <button 
                        onClick={() => openDeleteModal(facility)}
                        className="p-2.5 bg-white/5 border border-white/10 rounded-xl hover:bg-red-500/10 hover:border-red-500/30 text-gray-400 hover:text-red-400 transition-all outline-none group/btn"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredFacilities.length === 0 && (
             <div className="text-center py-16 text-gray-500">No facilities found.</div>
          )}
        </div>

        {/* Mobile & Tablet View */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:hidden mb-12">
          {filteredFacilities.map((facility) => (
            <div key={facility.id} className="bg-[#111827]/60 backdrop-blur-xl border border-white/10 rounded-2xl p-5 relative overflow-hidden flex flex-col">
              
              <div className="flex justify-between items-start mb-4">
                <span className={`inline-flex items-center px-2 py-1 rounded-md border text-[10px] font-bold uppercase tracking-wider ${getStatusBadge(facility.status)}`}>
                  {facility.status}
                </span>
                <div className="flex items-center gap-1 text-sm font-semibold text-white">
                  <Star size={14} className="text-yellow-400 fill-current" /> {facility.rating}
                </div>
              </div>
              
              <div className="flex gap-4 mb-4">
                <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0 border border-white/10">
                  <img src={facility.image} alt={facility.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex flex-col justify-center">
                  <span className="text-[#A3FF12] text-xs font-bold uppercase mb-1">{facility.type}</span>
                  <h4 className="text-white font-bold text-base mb-1 leading-tight">{facility.name}</h4>
                  <div className="text-sm text-gray-400 flex items-center gap-1"><MapPin size={12}/> {facility.location}</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 mb-5">
                <div className="bg-white/5 p-2.5 rounded-xl border border-white/5 text-center">
                  <div className="text-white font-bold">${facility.price}</div>
                  <div className="text-xs text-gray-500">Per Hour</div>
                </div>
                <div className="bg-white/5 p-2.5 rounded-xl border border-white/5 text-center">
                  <div className="text-white font-bold">{facility.bookingCount}</div>
                  <div className="text-xs text-gray-500">Bookings</div>
                </div>
              </div>

              <div className="mt-auto pt-4 border-t border-white/5 flex gap-2">
                <button className="flex-1 bg-white/5 border border-white/10 text-white py-2.5 rounded-xl hover:bg-[#A3FF12]/10 hover:text-[#A3FF12] hover:border-[#A3FF12]/30 transition-colors flex justify-center items-center gap-2 outline-none">
                  <Edit size={16} /> Edit
                </button>
                <button 
                  onClick={() => openDeleteModal(facility)}
                  className="flex-1 bg-red-500/10 border border-red-500/20 text-red-400 py-2.5 rounded-xl hover:bg-red-500/20 transition-colors flex justify-center items-center gap-2 outline-none"
                >
                  <Trash2 size={16} /> Delete
                </button>
              </div>
            </div>
          ))}
          {filteredFacilities.length === 0 && (
             <div className="col-span-full text-center py-10 border border-white/10 rounded-2xl bg-[#111827]/40 text-gray-500">No facilities found.</div>
          )}
        </div>

        {/* 5. Bottom Area: Pagination */}
        <div className="flex flex-col items-center">
          <div className="w-full max-w-md h-px bg-gradient-to-r from-transparent via-[#A3FF12]/30 to-transparent mb-8"></div>
          <button className="group px-8 py-4 bg-[#A3FF12]/10 border border-[#A3FF12]/30 text-[#A3FF12] font-bold text-sm rounded-full flex items-center justify-center gap-2 hover:bg-[#A3FF12] hover:text-[#0F172A] hover:shadow-[0_0_30px_rgba(163,255,18,0.4)] transition-all duration-300 transform active:scale-95 outline-none">
            Load More Facilities
            <ArrowRight size={18} className="group-hover:translate-x-1 group-hover:text-[#0F172A] transition-transform duration-300" />
          </button>
        </div>

      </div>

      {/* 6. Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-[#0F172A]/80 backdrop-blur-sm transition-opacity" 
            onClick={closeDeleteModal}
          ></div>
          
          {/* Modal Content */}
          <div className="relative w-full max-w-md bg-[#111827] border border-red-500/30 rounded-3xl p-8 shadow-[0_0_50px_rgba(239,68,68,0.15)] transform transition-all">
            <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 blur-[40px] rounded-full pointer-events-none"></div>
            
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-6">
                <AlertTriangle size={32} className="text-red-500" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Remove Facility?</h3>
              <p className="text-gray-400 text-sm mb-8">
                Are you sure you want to remove <strong className="text-white">{facilityToDelete?.name}</strong>? This action cannot be undone and will cancel all upcoming bookings.
              </p>
              
              <div className="flex w-full gap-3">
                <button 
                  onClick={closeDeleteModal}
                  className="flex-1 bg-white/5 border border-white/10 text-white font-semibold py-3.5 rounded-xl hover:bg-white/10 transition-colors outline-none"
                >
                  Cancel
                </button>
                <button 
                  onClick={confirmDelete}
                  className="flex-1 bg-red-500 text-white font-bold py-3.5 rounded-xl hover:bg-red-600 shadow-[0_0_20px_rgba(239,68,68,0.3)] transition-all outline-none"
                >
                  Yes, Remove
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}