import React from 'react';
import { Sprout, ArrowRight, CheckCircle2 } from 'lucide-react';

interface FarmerCTAProps {
  onRegisterClick: () => void;
}

export const FarmerCTA: React.FC<FarmerCTAProps> = ({ onRegisterClick }) => {
  return (
    <section className="py-16 px-4 lg:px-8 max-w-7xl mx-auto">
      <div className="relative rounded-3xl bg-gradient-to-r from-agri-950 via-agri-900 to-agri-950 text-white p-8 lg:p-14 overflow-hidden shadow-2xl border border-agri-800">
        <div className="relative z-10 max-w-2xl space-y-6">
          <span className="px-3.5 py-1.5 rounded-full bg-amber-500 text-agri-950 text-xs font-black uppercase tracking-wider inline-block">
            🌾 Are You a Farmer?
          </span>

          <h2 className="text-3xl lg:text-4xl font-black tracking-tight text-white leading-tight">
            Sell Your Harvest Directly & Earn 40% More Income
          </h2>

          <p className="text-sm text-agri-200/90 leading-relaxed font-normal">
            Join over 25,000+ Indian farmers from Andhra Pradesh, Telangana, Maharashtra & Karnataka. Get instant digital payouts via Razorpay, free transportation logistics, and direct access to urban buyers.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-agri-200">
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Zero Registration & Listing Fee</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Instant Razorpay Payouts</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>You Set Your Own Crop Prices</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Kisan Helpline Assistance</span>
            </div>
          </div>

          <div className="pt-2">
            <button
              onClick={onRegisterClick}
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 text-agri-950 font-black text-sm shadow-xl hover:scale-105 transition flex items-center space-x-2"
            >
              <Sprout className="w-5 h-5" />
              <span>Register Farm Profile Now</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
