"use client";

import { useState } from "react";
import { 
  UploadCloud, MapPin, DollarSign, Users, Clock, 
  Mail, FileText, Image as ImageIcon, Star, Settings, CheckCircle2, X, Eye 
} from "lucide-react";

export default function AddFacilityPage() {
  // Form States for Live Preview
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    location: "",
    price: "",
    capacity: "",
    slots: "",
    description: "",
    image: null
  });

  const [previewImage, setPreviewImage] = useState(null);
  const ownerEmail = "admin@email.com";

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, image: file }));
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleReset = () => {
    setFormData({
      name: "", type: "", location: "", price: "", capacity: "", slots: "", description: "", image: null
    });
    setPreviewImage(null);
  };

  return (
    <div className="min-h-screen bg-[#0F172A] pt-28 pb-24 overflow-hidden relative font-sans">
      
      {/* Background Ambient Glows */}
      <div className="absolute top-20 left-1/4 w-[500px] h-[500px] bg-[#A3FF12]/5 blur-[150px] rounded-full pointer-events-none z-0"></div>
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none z-0"></div>
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 mix-blend-overlay pointer-events-none z-0"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* 1. Header Section */}
        <div className="flex flex-col items-center text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#A3FF12]/10 border border-[#A3FF12]/20 mb-4 shadow-[0_0_15px_rgba(163,255,18,0.05)] animate-pulse">
            <Settings size={14} className="text-[#A3FF12]" />
            <span className="text-xs font-bold text-[#A3FF12] uppercase tracking-widest">Facility Management</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">Add New Facility</h1>
          <p className="text-gray-400 text-base max-w-2xl">Create and publish premium sports facilities for players and teams. Your listing will go live instantly.</p>
        </div>

        {/* 2. Main Content Container */}
        <div className="flex flex-col lg:flex-row gap-10">
          
          {/* Left Side: Form Section */}
          <div className="w-full lg:w-3/5">
            <div className="bg-[#111827]/60 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl relative overflow-hidden group">
              
              {/* Form Card Glow */}
              <div className="absolute -inset-[1px] bg-gradient-to-b from-[#A3FF12]/20 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>

              <form className="relative z-10 space-y-6" onSubmit={(e) => e.preventDefault()}>
                
                {/* Image Upload Area */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-400 ml-1">Facility Image</label>
                  <div className="relative w-full h-40 border-2 border-dashed border-white/10 rounded-2xl bg-[#0F172A]/50 hover:bg-[#0F172A]/80 hover:border-[#A3FF12]/50 transition-all group/upload flex flex-col items-center justify-center cursor-pointer overflow-hidden">
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={handleImageChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    />
                    {previewImage ? (
                      <div className="absolute inset-0">
                         <img src={previewImage} alt="Preview" className="w-full h-full object-cover opacity-50 group-hover/upload:opacity-30 transition-opacity" />
                         <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/upload:opacity-100 transition-opacity">
                            <span className="bg-black/60 text-white px-4 py-2 rounded-lg text-sm font-semibold backdrop-blur-sm flex items-center gap-2"><UploadCloud size={18}/> Change Image</span>
                         </div>
                      </div>
                    ) : (
                      <>
                        <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-3 group-hover/upload:bg-[#A3FF12]/10 transition-colors group-hover/upload:scale-110 duration-300">
                          <UploadCloud className="text-gray-400 group-hover/upload:text-[#A3FF12] transition-colors" />
                        </div>
                        <p className="text-sm text-gray-400 font-medium">Drag & drop or click to upload</p>
                        <p className="text-xs text-gray-500 mt-1">High quality 16:9 images recommended</p>
                      </>
                    )}
                  </div>
                </div>

                {/* Name and Type */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-400 ml-1">Facility Name</label>
                    <input 
                      type="text" name="name" value={formData.name} onChange={handleInputChange}
                      placeholder="e.g. Elite Football Turf"
                      className="w-full bg-[#0F172A]/80 border border-white/10 rounded-xl py-3.5 px-4 text-white focus:border-[#A3FF12]/50 focus:ring-1 focus:ring-[#A3FF12]/50 transition-all outline-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-400 ml-1">Sport Type</label>
                    <select 
                      name="type" value={formData.type} onChange={handleInputChange}
                      className="w-full appearance-none bg-[#0F172A]/80 border border-white/10 rounded-xl py-3.5 px-4 text-gray-300 focus:border-[#A3FF12]/50 focus:ring-1 focus:ring-[#A3FF12]/50 transition-all outline-none cursor-pointer"
                    >
                      <option value="" disabled>Select sport</option>
                      <option value="Football">Football</option>
                      <option value="Tennis">Tennis</option>
                      <option value="Basketball">Basketball</option>
                      <option value="Swimming">Swimming</option>
                      <option value="Cricket">Cricket</option>
                    </select>
                  </div>
                </div>

                {/* Location and Price */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-400 ml-1">Location</label>
                    <div className="relative group/input">
                      <MapPin className="absolute left-4 top-3.5 text-gray-500 group-focus-within/input:text-[#A3FF12] transition-colors" size={18} />
                      <input 
                        type="text" name="location" value={formData.location} onChange={handleInputChange}
                        placeholder="City, Area"
                        className="w-full bg-[#0F172A]/80 border border-white/10 rounded-xl py-3.5 pl-11 pr-4 text-white focus:border-[#A3FF12]/50 focus:ring-1 focus:ring-[#A3FF12]/50 transition-all outline-none"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-400 ml-1">Price Per Hour ($)</label>
                    <div className="relative group/input">
                      <DollarSign className="absolute left-4 top-3.5 text-gray-500 group-focus-within/input:text-[#A3FF12] transition-colors" size={18} />
                      <input 
                        type="number" name="price" value={formData.price} onChange={handleInputChange}
                        placeholder="0.00"
                        className="w-full bg-[#0F172A]/80 border border-white/10 rounded-xl py-3.5 pl-11 pr-4 text-white focus:border-[#A3FF12]/50 focus:ring-1 focus:ring-[#A3FF12]/50 transition-all outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Capacity and Slots */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-400 ml-1">Max Capacity</label>
                    <div className="relative group/input">
                      <Users className="absolute left-4 top-3.5 text-gray-500 group-focus-within/input:text-[#A3FF12] transition-colors" size={18} />
                      <input 
                        type="number" name="capacity" value={formData.capacity} onChange={handleInputChange}
                        placeholder="Number of players"
                        className="w-full bg-[#0F172A]/80 border border-white/10 rounded-xl py-3.5 pl-11 pr-4 text-white focus:border-[#A3FF12]/50 focus:ring-1 focus:ring-[#A3FF12]/50 transition-all outline-none"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-400 ml-1">Available Time Slots</label>
                    <div className="relative group/input">
                      <Clock className="absolute left-4 top-3.5 text-gray-500 group-focus-within/input:text-[#A3FF12] transition-colors" size={18} />
                      <input 
                        type="text" name="slots" value={formData.slots} onChange={handleInputChange}
                        placeholder="e.g. 8AM-10PM"
                        className="w-full bg-[#0F172A]/80 border border-white/10 rounded-xl py-3.5 pl-11 pr-4 text-white focus:border-[#A3FF12]/50 focus:ring-1 focus:ring-[#A3FF12]/50 transition-all outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-400 ml-1">Facility Description</label>
                  <div className="relative group/input">
                    <FileText className="absolute left-4 top-4 text-gray-500 group-focus-within/input:text-[#A3FF12] transition-colors" size={18} />
                    <textarea 
                      name="description" value={formData.description} onChange={handleInputChange}
                      rows="3" placeholder="Describe the amenities, rules, and vibe..."
                      className="w-full bg-[#0F172A]/80 border border-white/10 rounded-xl py-3.5 pl-11 pr-4 text-white placeholder-gray-600 focus:border-[#A3FF12]/50 focus:ring-1 focus:ring-[#A3FF12]/50 transition-all outline-none resize-none custom-scrollbar"
                    ></textarea>
                  </div>
                </div>

                {/* Owner Email*/}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-400 ml-1">Owner Email</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-3.5 text-[#A3FF12]/50" size={18} />
                    <input 
                      type="email" value={ownerEmail} readOnly
                      className="w-full bg-[#0F172A]/30 border border-white/5 rounded-xl py-3.5 pl-11 pr-10 text-gray-500 cursor-not-allowed outline-none"
                    />
                    <CheckCircle2 className="absolute right-4 top-3.5 text-[#A3FF12]/50" size={18} />
                  </div>
                </div>
                
                {/* Form Buttons */}
                <div className="flex flex-col sm:flex-row items-center gap-4 pt-4 border-t border-white/10 mt-6">
                  <button type="submit" className="w-full sm:w-2/3 bg-[#A3FF12] text-[#0F172A] font-bold py-4 rounded-xl hover:bg-[#8ee60e] shadow-[0_0_20px_rgba(163,255,18,0.3)] transition-all transform active:scale-95 flex items-center justify-center gap-2 outline-none">
                    Publish Facility <CheckCircle2 size={18} />
                  </button>
                  <button type="button" onClick={handleReset} className="w-full sm:w-1/3 bg-white/5 border border-white/10 text-white font-semibold py-4 rounded-xl hover:bg-white/10 hover:text-red-400 transition-all flex items-center justify-center gap-2 outline-none">
                    <X size={18} /> Reset
                  </button>
                </div>

              </form>
            </div>
          </div>

          {/* Right Side: Live Preview Section */}
          <div className="w-full lg:w-2/5">
            <div className="sticky top-28">
              <h3 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
                <Eye size={20} className="text-[#A3FF12]" /> Live Preview
              </h3>
              
              {/* Preview Card */}
              <div className="bg-[#111827]/80 backdrop-blur-2xl border border-white/10 rounded-3xl overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)] group/card">
                
                {/* Image Area */}
                <div className="relative h-56 w-full bg-[#0F172A] flex items-center justify-center overflow-hidden">
                  {previewImage ? (
                    <img src={previewImage} alt="Preview" className="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-700" />
                  ) : (
                    <div className="text-center text-gray-600 flex flex-col items-center">
                      <ImageIcon size={48} className="mb-2 opacity-50" />
                      <span className="text-sm font-medium">Image Preview</span>
                    </div>
                  )}
                  {/* Status Badge */}
                  <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-full text-white text-xs font-bold flex items-center gap-1.5 shadow-lg">
                    <span className="w-2 h-2 rounded-full bg-[#A3FF12] animate-pulse"></span> Available
                  </div>
                </div>

                {/* Content Area */}
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <span className="text-[#A3FF12] text-xs font-bold tracking-wider uppercase mb-1 block">
                        {formData.type || "Sport Type"}
                      </span>
                      <h3 className="text-2xl font-bold text-white leading-tight">
                        {formData.name || "Facility Name"}
                      </h3>
                    </div>
                    <div className="bg-white/5 p-2 rounded-xl border border-white/10 text-center min-w-[70px]">
                      <div className="text-[#A3FF12] font-black text-lg">${formData.price || "0"}</div>
                      <div className="text-gray-500 text-[10px] uppercase font-bold tracking-wider">Per Hr</div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-4 mt-5 pt-5 border-t border-white/10">
                    <div className="flex items-center gap-2 text-sm text-gray-400 w-[45%]">
                      <MapPin size={16} className="text-gray-500" /> {formData.location || "Location"}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-400 w-[45%]">
                      <Users size={16} className="text-gray-500" /> {formData.capacity ? `Up to ${formData.capacity}` : "Capacity"}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-400 w-[45%]">
                      <Clock size={16} className="text-gray-500" /> {formData.slots || "Time Slots"}
                    </div>
                  </div>

                  {formData.description && (
                    <p className="mt-5 text-sm text-gray-500 line-clamp-2 leading-relaxed bg-[#0F172A]/50 p-3 rounded-xl border border-white/5">
                      {formData.description}
                    </p>
                  )}
                </div>
              </div>

              {/* Helper Note */}
              <div className="mt-6 bg-[#A3FF12]/10 border border-[#A3FF12]/20 rounded-xl p-4 flex items-start gap-3">
                 <CheckCircle2 size={18} className="text-[#A3FF12] shrink-0 mt-0.5" />
                 <p className="text-xs text-gray-400 leading-relaxed">
                   <strong className="text-[#A3FF12] font-semibold">Pro Tip:</strong> Ensure your image is high-resolution. Premium listings with clear images get 3x more bookings on SportNest.
                 </p>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}