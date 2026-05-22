import Link from "next/link";
import { ArrowLeft, Search, Trophy } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0F172A] flex items-center justify-center relative overflow-hidden font-sans px-4">
      
      {/* Background Effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-[#A3FF12]/5 blur-[150px] rounded-full pointer-events-none"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 mix-blend-overlay pointer-events-none"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-2xl">
        
        {/* Futuristic 404 Text */}
        <div className="relative">
          <h1 className="text-[120px] md:text-[180px] font-black text-transparent bg-clip-text bg-gradient-to-b from-white/20 to-transparent leading-none select-none tracking-tighter">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <Trophy size={100} className="text-[#A3FF12]/20 animate-bounce" />
          </div>
        </div>

        {/* Badge & Heading */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#A3FF12]/10 border border-[#A3FF12]/20 mb-6 shadow-[0_0_15px_rgba(163,255,18,0.05)]">
          <span className="text-xs font-bold text-[#A3FF12] uppercase tracking-widest">Oops! Page Not Found</span>
        </div>
        
        <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6 tracking-tight">
          Looks Like You Missed the <span className="text-[#A3FF12]">Stadium Entrance</span>
        </h2>
        
        <p className="text-gray-400 text-lg mb-10 max-w-lg leading-relaxed">
          The page you are looking for doesn't exist or has been moved. Don't worry, even the pros get lost sometimes.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
          <Link 
            href="/" 
            className="group px-8 py-4 bg-[#A3FF12] text-[#0F172A] font-bold rounded-xl hover:bg-[#8ee60e] shadow-[0_0_25px_rgba(163,255,18,0.3)] transition-all transform active:scale-95 flex items-center justify-center gap-2 outline-none"
          >
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> Back To Home
          </Link>
          <Link 
            href="/facilities" 
            className="px-8 py-4 bg-white/5 border border-white/10 text-white font-semibold rounded-xl hover:bg-white/10 transition-all flex items-center justify-center gap-2 outline-none"
          >
            <Search size={18} /> Explore Facilities
          </Link>
        </div>

        {/* Floating Decoration Particles */}
        <div className="absolute -top-20 -right-20 w-40 h-40 border border-[#A3FF12]/10 rounded-full animate-spin-slow"></div>
        <div className="absolute -bottom-20 -left-20 w-32 h-32 border border-blue-500/10 rounded-full animate-spin-reverse-slow"></div>
      </div>
    </div>
  );
}