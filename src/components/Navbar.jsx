"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { 
  Home, LayoutGrid, Calendar, Plus, Settings, 
  Search, Bell, Menu, X, LogOut, ChevronDown
} from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const dummyUser = null; // Simulated user state

  // Scroll logic for sticky dynamic compact state
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/", icon: <Home size={18} /> },
    { name: "All Facilities", href: "/facilities", icon: <LayoutGrid size={18} /> },
    { name: "My Bookings", href: "/bookings", icon: <Calendar size={18} /> },
    { name: "Add Facility", href: "/add", icon: <Plus size={18} /> },
    { name: "Manage Facilities", href: "/manage", icon: <Settings size={18} /> },
  ];

  const checkActive = (href) => {
    if (href === "/") return pathname === "/";
    return pathname?.startsWith(href);
  };

  return (
    <>
      <nav 
        className={`fixed top-0 w-full z-50 transition-all duration-500 ease-in-out ${
          isScrolled 
            ? "py-2 bg-[#111827]/90 backdrop-blur-xl border-b border-white/10 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)] h-16" 
            : "py-4 bg-transparent h-20"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between gap-4">
          
          {/* Left Area: Mobile Menu & Logo */}
          <div className="flex items-center gap-3 shrink-0">
             <button 
               className="lg:hidden text-gray-400 hover:text-[#A3FF12] transition-colors bg-white/5 p-2 rounded-xl" 
               onClick={() => setIsMobileMenuOpen(true)}
             >
               <Menu size={22} />
             </button>
             <Link href="/" className="flex group outline-none">
               <div className="relative transition-transform duration-300 group-hover:scale-105">
                 <Image 
                   src="/logo.png" 
                   alt="SportNest Logo" 
                   width={isScrolled ? 120 : 140} 
                   height={isScrolled ? 35 : 45} 
                   priority
                   className="object-contain transition-all duration-500"
                 />
               </div>
             </Link>
          </div>

          {/* Center Area: Desktop Navigation */}
          <div className="hidden lg:flex items-center justify-center space-x-1 xl:space-x-2 grow">
            {navLinks.map((link) => {
              const isActive = checkActive(link.href);
              return (
                <Link 
                  key={link.name} 
                  href={link.href}
                  className={`relative flex items-center gap-2 px-3 xl:px-4 py-2 text-[13px] xl:text-sm font-semibold rounded-full transition-all duration-300 whitespace-nowrap ${
                    isActive 
                      ? "text-[#A3FF12] bg-[#A3FF12]/10 shadow-[0_0_15px_rgba(163,255,18,0.15)]" 
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {link.icon}
                  <span>{link.name}</span>
                  {isActive && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-[2px] bg-[#A3FF12] rounded-t-full shadow-[0_0_10px_#A3FF12]"></span>
                  )}
                </Link>
              )
            })}
          </div>

          {/* Right Area: Search, Bell, Profile */}
          <div className="flex items-center gap-3 xl:gap-5 shrink-0">
             
             <div className="hidden md:flex items-center bg-[#0F172A]/80 border border-white/10 rounded-full px-4 py-2 hover:bg-[#0F172A] hover:border-[#A3FF12]/30 focus-within:border-[#A3FF12]/50 focus-within:shadow-[0_0_15px_rgba(163,255,18,0.1)] transition-all duration-300 w-48 xl:w-64">
               <Search size={16} className="text-gray-400 mr-2 shrink-0" />
               <input 
                 type="text" 
                 placeholder="Search arenas..." 
                 className="bg-transparent border-none outline-none text-sm text-white placeholder-gray-500 w-full"
               />
             </div>
             
             <button className="md:hidden text-gray-400 hover:text-[#A3FF12] bg-white/5 p-2 rounded-full transition-colors outline-none"><Search size={20} /></button>
             
             {/* Bell Icon */}
             <button className="relative text-gray-400 hover:text-[#A3FF12] transition-colors group outline-none focus:scale-110">
               <Bell size={20} className="group-hover:animate-swing" />
               <span className="absolute -top-1 -right-1 bg-[#A3FF12] text-[#0F172A] text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center shadow-[0_0_8px_#A3FF12]">3</span>
             </button>

             {/* Profile Area */}
             <div className="relative">
                <button 
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center gap-2 hover:opacity-80 transition-opacity outline-none"
                >
                  <div className="h-9 w-9 rounded-full bg-[#111827] overflow-hidden border border-[#A3FF12]/30 shadow-lg relative shrink-0">
                    <img 
                      src={dummyUser?.image || `https://ui-avatars.com/api/?name=${dummyUser?.name || 'User'}&background=A3FF12&color=0F172A&bold=true`} 
                      alt="User Profile" 
                      className="w-full h-full object-cover" 
                    />
                    <div className="absolute bottom-0 right-0 h-2.5 w-2.5 bg-[#A3FF12] rounded-full border-2 border-[#111827] animate-pulse"></div>
                  </div>
                  <ChevronDown size={16} className="hidden sm:block text-gray-400 shrink-0" />
                </button>

                {isProfileOpen && (
                  <div className="absolute right-0 mt-4 w-60 bg-[#111827]/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-[0_20px_40px_-10px_rgba(0,0,0,0.7)] py-2 flex flex-col z-50 overflow-hidden transform opacity-100 scale-100 transition-all duration-300">
                    <div className="px-5 py-3 border-b border-white/10 mb-2">
                      <p className="text-sm text-white font-semibold">{dummyUser?.name || "Guest User"}</p>
                      <p className="text-xs text-gray-400 mt-0.5">Manage your arena account</p>
                    </div>
                    {navLinks.slice(2).map(link => (
                        <Link key={link.name} href={link.href} onClick={() => setIsProfileOpen(false)} className="flex items-center gap-3 px-5 py-2.5 text-sm text-gray-300 hover:text-[#A3FF12] hover:bg-white/5 transition-colors outline-none">
                            {link.icon} {link.name}
                        </Link>
                    ))}
                    <div className="border-t border-white/10 mt-2 pt-2">
                      <button 
                        onClick={() => {
                          alert("Logged Out Successfully");
                          setIsProfileOpen(false);
                        }}
                        className="flex items-center gap-3 px-5 py-2.5 text-sm text-red-400 hover:text-red-300 hover:bg-red-400/10 transition-colors w-full text-left outline-none"
                      >
                        <LogOut size={16} /> Logout Arena
                      </button>
                    </div>
                  </div>
                )}
             </div>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && <div className="fixed inset-0 bg-[#0F172A]/80 backdrop-blur-sm z-40 lg:hidden transition-opacity" onClick={() => setIsMobileMenuOpen(false)} />}
      <div className={`fixed top-0 left-0 h-screen w-80 max-w-[80vw] bg-[#111827] border-r border-white/10 z-50 transform transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] lg:hidden flex flex-col shadow-2xl ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex items-center justify-between p-6 border-b border-white/10 bg-[#0F172A]/50">
           <Image src="/logo.png" alt="SportNest Mobile Logo" width={130} height={40} className="object-contain" />
            <button onClick={() => setIsMobileMenuOpen(false)} className="text-gray-400 hover:text-[#A3FF12] bg-white/5 p-2 rounded-full outline-none"><X size={20} /></button>
        </div>
        <div className="flex flex-col gap-1 p-4 overflow-y-auto">
          {navLinks.map((link) => {
            const isActive = checkActive(link.href);
            return (
              <Link key={link.name} href={link.href} onClick={() => setIsMobileMenuOpen(false)} className={`flex items-center gap-4 p-4 rounded-xl text-sm font-semibold transition-all outline-none ${isActive ? "bg-[#A3FF12]/10 text-[#A3FF12] border border-[#A3FF12]/20 shadow-[0_0_10px_rgba(163,255,18,0.1)]" : "text-gray-400 hover:bg-white/5 hover:text-white"}`}>
                {link.icon} {link.name}
              </Link>
            )
          })}
          <Link href="/add" onClick={() => setIsMobileMenuOpen(false)} className="mt-6 bg-[#A3FF12] text-[#0F172A] hover:bg-[#b4ff3b] hover:shadow-[0_0_20px_rgba(163,255,18,0.4)] font-bold py-4 px-4 rounded-xl flex items-center justify-center gap-2 transition-all outline-none">
            <Plus size={20} /> Add New Facility
          </Link>
        </div>
      </div>
    </>
  );
}