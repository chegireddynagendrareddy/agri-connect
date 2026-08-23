import React from 'react';
import { ArrowRight, Sprout, ShieldCheck, Truck, Users, Sparkles, MapPin } from 'lucide-react';

interface HeroProps {
  setActiveTab: (tab: string) => void;
  openFarmerRegister: () => void;
}

export const Hero: React.FC<HeroProps> = ({ setActiveTab, openFarmerRegister }) => {
  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden bg-agri-950">
      {/* Background Image Overlay with Indian Farmer & Lush Green Agricultural Fields */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=2000&q=85"
          alt="Indian Farmer in Green Fields"
          className="w-full h-full object-cover object-center scale-105 filter brightness-75 contrast-110"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-agri-950/95 via-agri-950/80 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-agri-950 via-transparent to-agri-950/40"></div>
      </div>

      {/* Animated Floating Leaves */}
      <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-10 text-emerald-400/40 animate-float-slow">
          <Sprout className="w-12 h-12 transform -rotate-12" />
        </div>
        <div className="absolute top-1/3 right-16 text-agri-300/30 animate-float-slow [animation-delay:2s]">
          <Sprout className="w-16 h-16 transform rotate-45" />
        </div>
        <div className="absolute bottom-1/4 left-1/3 text-amber-400/30 animate-float-slow [animation-delay:4s]">
          <Sparkles className="w-10 h-10" />
        </div>
      </div>

      {/* Main Content Container */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 lg:px-8 py-20 w-full">
        <div className="max-w-2xl space-y-6">
          
          {/* Indian Agri Startup Trust Badge */}
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-agri-800/80 border border-agri-600/50 backdrop-blur-md text-agri-200 text-xs font-extrabold shadow-lg animate-in fade-in">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span className="flex items-center space-x-1">
              <span>🌾 Direct Farmer-to-Buyer Marketplace</span>
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1]">
            Fresh From Farmers.{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-agri-300 to-amber-300">
              Directly To You.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-agri-100/90 leading-relaxed font-normal">
            Buy fresh agricultural products directly from trusted Indian farmers. Guaranteed transparent fair prices, farm-gate quality checks, and fast delivery to your home.
          </p>

          {/* CTA Buttons */}
          <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <button
              onClick={() => setActiveTab('shop')}
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-agri-500 to-emerald-600 hover:from-agri-600 hover:to-emerald-700 text-white font-black text-sm shadow-xl shadow-agri-600/30 hover:scale-[1.02] transition-all flex items-center justify-center space-x-2 group"
            >
              <span>Shop Products</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={openFarmerRegister}
              className="px-8 py-4 rounded-2xl bg-amber-500/90 hover:bg-amber-500 text-agri-950 font-black text-sm border border-amber-400/50 backdrop-blur-md shadow-xl hover:scale-[1.02] transition-all flex items-center justify-center space-x-2"
            >
              <Sprout className="w-5 h-5" />
              <span>Sell With Us (Farmer)</span>
            </button>
          </div>

          {/* Real Metrics Bar */}
          <div className="pt-8 border-t border-agri-800/80 grid grid-cols-3 gap-4">
            <div>
              <p className="text-2xl lg:text-3xl font-black text-white">25,000+</p>
              <p className="text-xs text-agri-300 font-medium mt-0.5">Verified Farmers</p>
            </div>
            <div>
              <p className="text-2xl lg:text-3xl font-black text-emerald-400">100%</p>
              <p className="text-xs text-agri-300 font-medium mt-0.5">Direct Farm Fresh</p>
            </div>
            <div>
              <p className="text-2xl lg:text-3xl font-black text-amber-400">₹0</p>
              <p className="text-xs text-agri-300 font-medium mt-0.5">Middlemen Margin</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
