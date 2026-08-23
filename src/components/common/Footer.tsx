import React from 'react';
import { Sprout, Phone, Mail, MapPin, Heart, ShieldCheck, Truck, RefreshCw, Award } from 'lucide-react';

interface FooterProps {
  setActiveTab: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab }) => {
  return (
    <footer className="bg-agri-950 text-white pt-16 pb-8 border-t border-agri-900">
      {/* Value Proposition Badges */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8 pb-12 grid grid-cols-2 md:grid-cols-4 gap-6 border-b border-agri-800/60 mb-12">
        <div className="flex items-center space-x-4 p-4 rounded-2xl bg-agri-900/40 border border-agri-800/40">
          <div className="p-3 rounded-xl bg-agri-800 text-agri-300">
            <Sprout className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white">Direct From Farmers</h4>
            <p className="text-xs text-agri-300/80">No middlemen, fair pricing</p>
          </div>
        </div>

        <div className="flex items-center space-x-4 p-4 rounded-2xl bg-agri-900/40 border border-agri-800/40">
          <div className="p-3 rounded-xl bg-agri-800 text-agri-300">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white">100% Quality Tested</h4>
            <p className="text-xs text-agri-300/80">Verified farm inspections</p>
          </div>
        </div>

        <div className="flex items-center space-x-4 p-4 rounded-2xl bg-agri-900/40 border border-agri-800/40">
          <div className="p-3 rounded-xl bg-agri-800 text-agri-300">
            <Truck className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white">Express Cold Transport</h4>
            <p className="text-xs text-agri-300/80">Fresh harvest within 24-48h</p>
          </div>
        </div>

        <div className="flex items-center space-x-4 p-4 rounded-2xl bg-agri-900/40 border border-agri-800/40">
          <div className="p-3 rounded-xl bg-agri-800 text-agri-300">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white">Razorpay Secure</h4>
            <p className="text-xs text-agri-300/80">Encrypted instant payouts</p>
          </div>
        </div>
      </div>

      {/* Footer Content Columns */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
        {/* Company Bio */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-agri-600 flex items-center justify-center text-white font-extrabold text-xl shadow-lg">
              <Sprout className="w-6 h-6 text-agri-200" />
            </div>
            <span className="text-2xl font-black text-white">AgriConnect</span>
          </div>
          <p className="text-xs text-agri-200/80 leading-relaxed max-w-sm">
            AgriConnect is India’s premier direct farmer-to-buyer e-commerce ecosystem. Empowering rural agriculturalists with digital storefronts, guaranteed transparent pricing, and instant payment settlements.
          </p>
          <div className="pt-2 flex items-center space-x-4 text-agri-300 text-xs">
            <span className="flex items-center space-x-1.5"><MapPin className="w-4 h-4 text-amber-400" /> <span>Guntur • Nashik • Warangal</span></span>
            <span className="flex items-center space-x-1.5"><Phone className="w-4 h-4 text-emerald-400" /> <span>1800-AGRI-CONN</span></span>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h5 className="text-sm font-bold text-white mb-4 uppercase tracking-wider text-agri-400">Marketplace</h5>
          <ul className="space-y-2.5 text-xs text-agri-200">
            <li><button onClick={() => setActiveTab('shop')} className="hover:text-amber-400 transition">Vegetables & Fruits</button></li>
            <li><button onClick={() => setActiveTab('shop')} className="hover:text-amber-400 transition">Spices & Herbs</button></li>
            <li><button onClick={() => setActiveTab('shop')} className="hover:text-amber-400 transition">Basmati & Grains</button></li>
            <li><button onClick={() => setActiveTab('shop')} className="hover:text-amber-400 transition">Organic Certified Crops</button></li>
            <li><button onClick={() => setActiveTab('shop')} className="hover:text-amber-400 transition">Today's Hot Deals</button></li>
          </ul>
        </div>

        {/* Farmer Portal */}
        <div>
          <h5 className="text-sm font-bold text-white mb-4 uppercase tracking-wider text-agri-400">For Farmers</h5>
          <ul className="space-y-2.5 text-xs text-agri-200">
            <li><button onClick={() => setActiveTab('farmer_register')} className="hover:text-amber-400 transition font-bold text-amber-400">Sell With AgriConnect</button></li>
            <li><button onClick={() => setActiveTab('farmer_dashboard')} className="hover:text-amber-400 transition">Farmer Dashboard Login</button></li>
            <li><button onClick={() => setActiveTab('how_it_works')} className="hover:text-amber-400 transition">Kisan Verification Process</button></li>
            <li><button onClick={() => setActiveTab('how_it_works')} className="hover:text-amber-400 transition">Pricing & Logistics Support</button></li>
          </ul>
        </div>

        {/* Trust & Newsletter */}
        <div>
          <h5 className="text-sm font-bold text-white mb-4 uppercase tracking-wider text-agri-400">Kisan Newsletter</h5>
          <p className="text-xs text-agri-200/80 mb-3">Get weekly wholesale crop price trends & fresh harvest updates.</p>
          <div className="space-y-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full bg-agri-900 border border-agri-700 rounded-xl px-3 py-2 text-xs text-white placeholder-agri-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
            />
            <button className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-agri-950 font-bold py-2 rounded-xl text-xs hover:brightness-110 transition">
              Subscribe Free
            </button>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8 pt-6 border-t border-agri-900 flex flex-col md:flex-row items-center justify-between text-xs text-agri-400 gap-4">
        <p>© 2026 AgriConnect Marketplace Private Limited. All rights reserved.</p>
        <div className="flex items-center space-x-6">
          <span className="hover:text-white cursor-pointer">Privacy Policy</span>
          <span className="hover:text-white cursor-pointer">Terms of Service</span>
          <span className="hover:text-white cursor-pointer">Kisan Helpdesk</span>
        </div>
      </div>
    </footer>
  );
};
