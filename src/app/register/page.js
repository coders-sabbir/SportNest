"use client";

import { useState } from "react";
import Link from "next/link";
import { User, Mail, Image as ImageIcon, Lock, Eye, EyeOff, CheckCircle2, Circle } from "lucide-react";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");

  const validations = {
    length: password.length >= 6,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
  };

  return (
    <div className="min-h-screen w-full flex bg-main-bg overflow-hidden">
      
      {/* Left Side: Futuristic Visual */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-card-bg items-center justify-center p-12">

        <div className="absolute inset-0 bg-[url('/login.jpg')] bg-cover bg-center opacity-80"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-main-bg/95 via-main-bg/80 to-transparent"></div>
        
        {/* Glowing Orbs */}
        <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] bg-primary/10 blur-[100px] rounded-full pointer-events-none"></div>
        
        <div className="relative z-10 max-w-lg">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
            Join the Future of <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-white">Sports Booking</span>
          </h2>
          <p className="text-secondary-text mb-8 text-lg">
            Create an account to unlock premium facilities, manage your bookings, and connect with other athletes.
          </p>
          
          <div className="flex gap-4">
            <div className="bg-card-bg/60 backdrop-blur-md border border-white/10 p-4 rounded-2xl flex-1 shadow-xl">
              <h4 className="text-white font-bold mb-1">10K+</h4>
              <p className="text-xs text-gray-400">Active Athletes</p>
            </div>
            <div className="bg-card-bg/60 backdrop-blur-md border border-white/10 p-4 rounded-2xl flex-1 shadow-xl">
              <h4 className="text-white font-bold mb-1">500+</h4>
              <p className="text-xs text-gray-400">Premium Venues</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side: Register Card */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 h-screen overflow-y-auto custom-scrollbar">
        <div className="w-full max-w-md py-10">
          
          <div className="mb-8 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-4 shadow-[0_0_15px_rgba(163,255,18,0.05)]">
              <span className="text-xs font-bold text-primary uppercase tracking-widest">Create Account</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">Register to SportNest</h1>
            <p className="text-secondary-text">Fill in your details to get started.</p>
          </div>

          <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
            
            {/* Full Name Input */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-400 ml-1">Full Name</label>
              <div className="relative group">
                <User className="absolute left-4 top-3.5 text-gray-500 group-focus-within:text-primary transition-colors" size={18} />
                <input 
                  type="text" 
                  className="w-full bg-card-bg border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder-gray-600 focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all outline-none"
                  placeholder="Mr. X"
                  required
                />
              </div>
            </div>

            {/* Email Input */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-400 ml-1">Email Address</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-3.5 text-gray-500 group-focus-within:text-primary transition-colors" size={18} />
                <input 
                  type="email" 
                  className="w-full bg-card-bg border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder-gray-600 focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all outline-none"
                  placeholder="name@email.com"
                  required
                />
              </div>
            </div>

            {/* Photo URL Input */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-400 ml-1">Profile Photo URL</label>
              <div className="relative group">
                <ImageIcon className="absolute left-4 top-3.5 text-gray-500 group-focus-within:text-primary transition-colors" size={18} />
                <input 
                  type="url" 
                  className="w-full bg-card-bg border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder-gray-600 focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all outline-none"
                  placeholder="https://example.com/photo.jpg"
                  required
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-400 ml-1">Password</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-3.5 text-gray-500 group-focus-within:text-primary transition-colors" size={18} />
                <input 
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-card-bg border border-white/10 rounded-xl py-3 pl-12 pr-12 text-white placeholder-gray-600 focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all outline-none"
                  placeholder="••••••••"
                  required
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-3.5 text-gray-500 hover:text-white transition-colors outline-none focus:outline-none [-webkit-tap-highlight-color:transparent]"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Password Validation Indicators */}
            <div className="flex flex-col gap-2 pt-1 pb-2">
              <div className={`flex items-center gap-2 text-xs transition-colors duration-300 ${validations.length ? 'text-primary' : 'text-gray-500'}`}>
                {validations.length ? <CheckCircle2 size={14} /> : <Circle size={14} />}
                <span>At least 6 characters</span>
              </div>
              <div className={`flex items-center gap-2 text-xs transition-colors duration-300 ${validations.uppercase ? 'text-primary' : 'text-gray-500'}`}>
                {validations.uppercase ? <CheckCircle2 size={14} /> : <Circle size={14} />}
                <span>One uppercase letter</span>
              </div>
              <div className={`flex items-center gap-2 text-xs transition-colors duration-300 ${validations.lowercase ? 'text-primary' : 'text-gray-500'}`}>
                {validations.lowercase ? <CheckCircle2 size={14} /> : <Circle size={14} />}
                <span>One lowercase letter</span>
              </div>
            </div>

            {/* Register Button */}
            <button 
              type="submit"
              className="w-full bg-primary text-main-bg font-bold py-3.5 rounded-xl hover:bg-primary-hover shadow-[0_0_20px_rgba(163,255,18,0.2)] transition-all transform active:scale-95 outline-none focus:outline-none [-webkit-tap-highlight-color:transparent]"
            >
              Create Account
            </button>

            {/* Login Redirect */}
            <p className="text-center text-sm text-gray-400 pt-2">
              Already have an account? {" "}
              <Link href="/login" className="text-primary font-bold hover:underline outline-none focus:outline-none [-webkit-tap-highlight-color:transparent]">Login</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}