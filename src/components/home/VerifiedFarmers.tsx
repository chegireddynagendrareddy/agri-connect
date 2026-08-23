import React from 'react';
import { CheckCircle2, MapPin, Award, Sprout, ArrowRight } from 'lucide-react';
import type { FarmerProfile } from '../../types';
import { RatingStars } from '../common/RatingStars';

interface VerifiedFarmersProps {
  farmers: FarmerProfile[];
  onSelectFarmer: (farmer: FarmerProfile) => void;
}

export const VerifiedFarmers: React.FC<VerifiedFarmersProps> = ({ farmers, onSelectFarmer }) => {
  return (
    <section className="py-16 bg-gradient-to-b from-agri-950 to-agri-900 text-white px-4 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs font-black uppercase text-amber-300 tracking-wider bg-agri-800/80 px-3 py-1 rounded-full border border-agri-700">
              Kisan Superstars
            </span>
            <h2 className="text-3xl font-extrabold text-white mt-2 tracking-tight">
              Meet Our Verified Farmers
            </h2>
            <p className="text-sm text-agri-200/80 mt-1">
              Hardworking agricultural pioneers using organic methods & sustainable crop care
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {farmers.map((farmer) => (
            <div
              key={farmer.id}
              className="bg-agri-900/60 rounded-3xl p-6 border border-agri-800 backdrop-blur-md hover:border-emerald-500/50 hover:bg-agri-800/80 transition duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Avatar & Verified Badge */}
                <div className="relative w-20 h-20 mx-auto mb-4">
                  <img
                    src={farmer.avatar_url || 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80'}
                    alt={farmer.farmer_name}
                    className="w-full h-full object-cover rounded-full border-2 border-emerald-400 shadow-xl"
                  />
                  <span className="absolute bottom-0 right-0 p-1 bg-emerald-500 rounded-full text-white shadow-md">
                    <CheckCircle2 className="w-4 h-4" />
                  </span>
                </div>

                <div className="text-center">
                  <h3 className="text-lg font-extrabold text-white">{farmer.farmer_name}</h3>
                  <p className="text-xs text-amber-300 font-bold mt-0.5">{farmer.farm_name}</p>

                  <div className="flex items-center justify-center space-x-1 text-xs text-agri-300 mt-2">
                    <MapPin className="w-3.5 h-3.5 text-amber-400" />
                    <span>{farmer.farm_location}</span>
                  </div>

                  <div className="mt-3 flex items-center justify-center">
                    <RatingStars rating={farmer.rating} size="sm" />
                  </div>
                </div>

                {/* Farming Details */}
                <div className="mt-6 pt-4 border-t border-agri-800/80 grid grid-cols-2 gap-2 text-center text-xs">
                  <div className="bg-agri-950/60 p-2 rounded-xl">
                    <p className="text-amber-400 font-black">{farmer.years_farming} Years</p>
                    <p className="text-[10px] text-agri-300">Farming Exp.</p>
                  </div>
                  <div className="bg-agri-950/60 p-2 rounded-xl">
                    <p className="text-emerald-400 font-black">{farmer.farm_size_acres} Acres</p>
                    <p className="text-[10px] text-agri-300">Farm Size</p>
                  </div>
                </div>

                {/* Crops */}
                <div className="mt-4 flex flex-wrap justify-center gap-1.5">
                  {farmer.primary_crops.map((crop, i) => (
                    <span key={i} className="text-[10px] font-bold bg-agri-800 text-agri-200 px-2 py-0.5 rounded-full border border-agri-700">
                      🌾 {crop}
                    </span>
                  ))}
                </div>
              </div>

              <button
                onClick={() => onSelectFarmer(farmer)}
                className="mt-6 w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-agri-600 hover:from-emerald-600 hover:to-agri-700 text-white font-black text-xs shadow-lg transition flex items-center justify-center space-x-2"
              >
                <span>View Farmer Profile</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
