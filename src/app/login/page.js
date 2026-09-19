"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mail, Lock, Eye, EyeOff, Globe } from "lucide-react";
import { authClient } from "@/lib/auth-client";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGoogleSubmitting, setIsGoogleSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    const { error: signInError } = await authClient.signIn.email({ email, password });

    if (signInError) {
      setError(signInError.message || "Unable to sign in. Please try again.");
      setIsSubmitting(false);
      return;
    }

    router.push("/");
    router.refresh();
  };

  const handleGoogleSignIn = async () => {
    setError("");
    setIsGoogleSubmitting(true);

    const { error: googleError } = await authClient.signIn.social({
      provider: "google",
      callbackURL: "/",
    });

    if (googleError) {
      setError(googleError.message || "Google sign in is not configured yet.");
      setIsGoogleSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex bg-main-bg overflow-hidden">
      
      {/* Left Side: Futuristic Visual */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-card-bg items-center justify-center p-12">

        <div className="absolute inset-0 bg-[url('/login.jpg')] bg-cover bg-center opacity-80"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-main-bg/95 via-main-bg/80 to-transparent"></div>
        
        <div className="relative z-10 max-w-lg">
          <h2 className="text-4xl font-bold text-white mb-6">Book Premium Sports Facilities Instantly</h2>
          <p className="text-secondary-text mb-8">Join the ultimate community of athletes and arena owners. Experience seamless booking in seconds.</p>
          <div className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-2xl">
            <p className="text-primary font-bold text-lg mb-2">Pro Tip:</p>
            <p className="text-sm text-gray-300">Sync your bookings across all devices and get real-time availability alerts for your favorite turfs.</p>
          </div>
        </div>
      </div>

      {/* Right Side: Login Card */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md">
          
          <div className="mb-10 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-4">
              <span className="text-xs font-bold text-primary uppercase tracking-widest">Welcome Back</span>
            </div>
            <h1 className="text-4xl font-bold text-white mb-2">Login to SportNest</h1>
            <p className="text-secondary-text">Enter your credentials to access your dashboard.</p>
          </div>

          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={isSubmitting || isGoogleSubmitting}
            className="mb-6 flex w-full items-center justify-center gap-3 rounded-xl border border-white/10 bg-card-bg py-3.5 font-bold text-white transition-all hover:border-primary/40 hover:bg-white/5 disabled:cursor-not-allowed disabled:opacity-70"
          >
            <Globe size={18} />
            {isGoogleSubmitting ? "Connecting..." : "Sign in with Google"}
          </button>

          <div className="mb-6 flex items-center gap-4">
            <span className="h-px flex-1 bg-white/10"></span>
            <span className="text-xs font-semibold uppercase tracking-widest text-gray-500">or</span>
            <span className="h-px flex-1 bg-white/10"></span>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Email Input */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-400 ml-1">Email Address</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-3.5 text-gray-500 group-focus-within:text-primary transition-colors" size={18} />
                <input 
                  type="email" 
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="w-full bg-card-bg border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder-gray-600 focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all outline-none"
                  placeholder="name@email.com"
                  required
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium text-gray-400 ml-1">Password</label>
                <Link href="#" className="text-xs text-primary hover:text-white transition-colors">Forgot Password?</Link>
              </div>
              <div className="relative group">
                <Lock className="absolute left-4 top-3.5 text-gray-500 group-focus-within:text-primary transition-colors" size={18} />
                <input 
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="w-full bg-card-bg border border-white/10 rounded-xl py-3 pl-12 pr-12 text-white placeholder-gray-600 focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all outline-none"
                  placeholder="••••••••"
                  required
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-3.5 text-gray-500 hover:text-white"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {error && <p role="alert" className="rounded-lg border border-red-400/30 bg-red-400/10 px-4 py-3 text-sm text-red-300">{error}</p>}

            <button disabled={isSubmitting || isGoogleSubmitting} className="w-full bg-primary text-main-bg font-bold py-3.5 rounded-xl hover:bg-primary-hover shadow-[0_0_20px_rgba(163,255,18,0.2)] transition-all transform active:scale-95 disabled:cursor-not-allowed disabled:opacity-70">
              {isSubmitting ? "Signing in..." : "Login to Account"}
            </button>

            <p className="text-center text-sm text-gray-400">
              Don&apos;t have an account? {" "}
              <Link href="/register" className="text-primary font-bold hover:underline">Register</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
