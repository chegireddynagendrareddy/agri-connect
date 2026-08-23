import React from 'react';
import { ArrowRight } from 'lucide-react';
import type { Category } from '../../types';

interface CategoryGridProps {
  categories: Category[];
  onSelectCategory: (categoryId: string) => void;
}

export const CategoryGrid: React.FC<CategoryGridProps> = ({ categories, onSelectCategory }) => {
  return (
    <section className="py-16 px-4 lg:px-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
        <div>
          <span className="text-xs font-black uppercase text-agri-600 tracking-wider bg-agri-100 px-3 py-1 rounded-full">
            Explore Farm Harvests
          </span>
          <h2 className="text-3xl font-extrabold text-agri-950 mt-2 tracking-tight">
            Agricultural Categories
          </h2>
          <p className="text-sm text-earth-600 mt-1">
            Pick from 10+ fresh agricultural categories sourced directly from Indian farms
          </p>
        </div>
        <button
          onClick={() => onSelectCategory('all')}
          className="inline-flex items-center space-x-2 text-xs font-extrabold text-agri-700 hover:text-agri-900 transition"
        >
          <span>View All Categories</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 lg:gap-6">
        {categories.map((cat) => (
          <div
            key={cat.id}
            onClick={() => onSelectCategory(cat.id)}
            className="group relative bg-white rounded-3xl overflow-hidden shadow-agri-card border border-agri-100 hover:shadow-2xl hover:border-agri-400 transition-all duration-300 cursor-pointer"
          >
            <div className="h-32 w-full overflow-hidden relative">
              <img
                src={cat.image_url}
                alt={cat.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-agri-950/80 via-agri-950/20 to-transparent"></div>
              <span className="absolute top-2.5 left-2.5 text-2xl bg-white/90 backdrop-blur-md w-9 h-9 rounded-xl flex items-center justify-center shadow-md">
                {cat.icon}
              </span>
            </div>

            <div className="p-4 text-center">
              <h3 className="text-sm font-extrabold text-agri-950 group-hover:text-agri-600 transition">
                {cat.name}
              </h3>
              <p className="text-[11px] text-earth-500 font-medium line-clamp-1 mt-0.5">
                {cat.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
