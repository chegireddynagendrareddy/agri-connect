import React, { useState, useEffect } from 'react';
import { CheckCircle2, MapPin, Award, Sprout, ArrowLeft, Mail, Phone, Calendar } from 'lucide-react';
import { dbService } from '../../services/dbService';
import type { FarmerProfile, Product } from '../../types';
import { RatingStars } from '../common/RatingStars';
import { ProductCard } from '../marketplace/ProductCard';

interface FarmerProfilePageProps {
  farmer: FarmerProfile;
  onBack: () => void;
  onSelectProduct: (product: Product) => void;
}

export const FarmerProfilePage: React.FC<FarmerProfilePageProps> = ({
  farmer,
  onBack,
  onSelectProduct
}) => {
  const [farmerProducts, setFarmerProducts] = useState<Product[]>([]);

  useEffect(() => {
    dbService.getProducts({ farmer_id: farmer.id, status: 'approved' }).then((res) => {
      setFarmerProducts(res);
    });
  }, [farmer]);

  return (
    <div className="py-10 px-4 lg:px-8 max-w-7xl mx-auto min-h-screen">
      
      {/* Back Button */}
      <button
        onClick={onBack}
        className="mb-6 inline-flex items-center space-x-2 text-xs font-extrabold text-agri-800 hover:text-agri-600 bg-white px-4 py-2 rounded-full border border-earth-200 shadow-sm transition"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back</span>
      </button>

      {/* Farmer Header Hero Card */}
      <div className="bg-gradient-to-br from-agri-950 via-agri-900 to-agri-950 text-white rounded-3xl p-8 lg:p-12 shadow-2xl border border-agri-800 mb-12 relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8 relative z-10">
          <img
            src={farmer.avatar_url || 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80'}
            alt={farmer.farmer_name}
            className="w-32 h-32 lg:w-40 lg:h-40 rounded-full object-cover border-4 border-emerald-400 shadow-2xl"
          />

          <div className="flex-1 text-center md:text-left space-y-3">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
              <div>
                <div className="flex items-center justify-center md:justify-start space-x-2">
                  <h1 className="text-2xl lg:text-3xl font-black text-white">{farmer.farmer_name}</h1>
                  <span className="p-1 bg-emerald-500 rounded-full text-white" title="Verified Kisan">
                    <CheckCircle2 className="w-5 h-5" />
                  </span>
                </div>
                <p className="text-sm font-extrabold text-amber-300 mt-1">{farmer.farm_name}</p>
              </div>

              <div className="flex items-center justify-center md:justify-end">
                <RatingStars rating={farmer.rating} size="lg" />
              </div>
            </div>

            <p className="text-xs text-agri-200/90 leading-relaxed max-w-2xl">{farmer.bio}</p>

            <div className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs text-center md:text-left">
              <div className="bg-agri-900/80 p-3 rounded-2xl border border-agri-800">
                <span className="text-amber-400 font-black text-sm">{farmer.years_farming} Years</span>
                <p className="text-[10px] text-agri-300">Farming Experience</p>
              </div>
              <div className="bg-agri-900/80 p-3 rounded-2xl border border-agri-800">
                <span className="text-emerald-400 font-black text-sm">{farmer.farm_size_acres} Acres</span>
                <p className="text-[10px] text-agri-300">Farm Land Area</p>
              </div>
              <div className="bg-agri-900/80 p-3 rounded-2xl border border-agri-800">
                <span className="text-white font-black text-sm">{farmerProducts.length} Crops</span>
                <p className="text-[10px] text-agri-300">Listed Products</p>
              </div>
              <div className="bg-agri-900/80 p-3 rounded-2xl border border-agri-800">
                <span className="text-amber-400 font-black text-xs">{farmer.farm_location}</span>
                <p className="text-[10px] text-agri-300">Farm Region</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Farmer's Products Grid */}
      <div className="space-y-6">
        <h2 className="text-2xl font-black text-agri-950">
          Crops Harvested By {farmer.farmer_name} ({farmerProducts.length})
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {farmerProducts.map((p) => (
            <ProductCard
              key={p.id}
              product={p}
              onSelectProduct={onSelectProduct}
            />
          ))}
        </div>
      </div>

    </div>
  );
};
