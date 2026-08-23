import React, { useState, useEffect } from 'react';
import { Flame, Clock, ArrowRight } from 'lucide-react';
import type { Product } from '../../types';
import { ProductCard } from '../marketplace/ProductCard';

interface TodaysDealsProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onViewAll: () => void;
}

export const TodaysDeals: React.FC<TodaysDealsProps> = ({
  products,
  onSelectProduct,
  onViewAll
}) => {
  const [timeLeft, setTimeLeft] = useState({ hours: 7, minutes: 42, seconds: 18 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 12, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-16 bg-gradient-to-r from-amber-500/10 via-agri-50 to-emerald-50/40 border-y border-amber-200/50 px-4 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="p-1.5 bg-amber-500 text-white rounded-xl shadow-md">
                <Flame className="w-5 h-5 animate-bounce" />
              </span>
              <span className="text-xs font-black uppercase text-amber-800 tracking-wider">
                Limited Harvest Offer
              </span>
            </div>
            <h2 className="text-3xl font-extrabold text-agri-950 mt-2 tracking-tight">
              Today's Farmer Direct Deals
            </h2>
          </div>

          {/* Countdown Clock */}
          <div className="flex items-center space-x-3 bg-white p-3 rounded-2xl border border-amber-300 shadow-md">
            <Clock className="w-5 h-5 text-amber-600" />
            <span className="text-xs font-bold text-earth-700">Deals Expire In:</span>
            <div className="flex items-center space-x-1 font-mono font-black text-sm text-agri-950">
              <span className="bg-agri-950 text-amber-400 px-2 py-1 rounded-lg">{String(timeLeft.hours).padStart(2, '0')}h</span>
              <span>:</span>
              <span className="bg-agri-950 text-amber-400 px-2 py-1 rounded-lg">{String(timeLeft.minutes).padStart(2, '0')}m</span>
              <span>:</span>
              <span className="bg-agri-950 text-amber-400 px-2 py-1 rounded-lg">{String(timeLeft.seconds).padStart(2, '0')}s</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.slice(0, 4).map((product) => (
            <ProductCard
              key={product.id}
              product={{
                ...product,
                price: Math.round(product.price * 0.85) // 15% discount for deal preview
              }}
              onSelectProduct={onSelectProduct}
              onQuickBuy={onViewAll}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
