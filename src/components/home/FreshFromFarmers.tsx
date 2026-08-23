import React from 'react';
import { ArrowRight, Sprout } from 'lucide-react';
import type { Product } from '../../types';
import { ProductCard } from '../marketplace/ProductCard';

interface FreshFromFarmersProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onViewAll: () => void;
}

export const FreshFromFarmers: React.FC<FreshFromFarmersProps> = ({
  products,
  onSelectProduct,
  onViewAll
}) => {
  return (
    <section className="py-16 px-4 lg:px-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
        <div>
          <span className="text-xs font-black uppercase text-agri-600 tracking-wider bg-agri-100 px-3 py-1 rounded-full flex items-center space-x-1.5 w-max">
            <Sprout className="w-3.5 h-3.5" />
            <span>Freshly Harvested Today</span>
          </span>
          <h2 className="text-3xl font-extrabold text-agri-950 mt-2 tracking-tight">
            Fresh From Trusted Farmers
          </h2>
          <p className="text-sm text-earth-600 mt-1">
            Directly sourced within 24 hours of harvest with zero chemical processing
          </p>
        </div>
        <button
          onClick={onViewAll}
          className="inline-flex items-center space-x-2 text-xs font-extrabold text-agri-700 hover:text-agri-900 transition"
        >
          <span>Explore Marketplace</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.slice(0, 4).map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onSelectProduct={onSelectProduct}
            onQuickBuy={() => onViewAll()}
          />
        ))}
      </div>
    </section>
  );
};
