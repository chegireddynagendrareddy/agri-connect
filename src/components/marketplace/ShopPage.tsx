import React, { useState, useEffect } from 'react';
import { Search, Filter, SlidersHorizontal, Sparkles, MapPin, X, RotateCcw, LayoutGrid, List } from 'lucide-react';
import type { Category, FarmerProfile, Product } from '../../types';
import { dbService } from '../../services/dbService';
import { ProductCard } from './ProductCard';

interface ShopPageProps {
  initialCategory?: string;
  onSelectProduct: (product: Product) => void;
  onSelectFarmer?: (farmer: FarmerProfile) => void;
}

export const ShopPage: React.FC<ShopPageProps> = ({
  initialCategory = 'all',
  onSelectProduct
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Filters State
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedLocation, setSelectedLocation] = useState<string>('all');
  const [maxPrice, setMaxPrice] = useState<number>(1000);
  const [organicOnly, setOrganicOnly] = useState<boolean>(false);
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [minRating, setMinRating] = useState<number>(0);
  const [sortBy, setSortBy] = useState<'newest' | 'price_asc' | 'price_desc' | 'rating' | 'popular'>('newest');

  const [mobileFilterOpen, setMobileFilterOpen] = useState<boolean>(false);

  useEffect(() => {
    setSelectedCategory(initialCategory);
  }, [initialCategory]);

  useEffect(() => {
    dbService.getCategories().then((cats) => setCategories(cats));
  }, []);

  const loadProducts = async () => {
    setIsLoading(true);
    try {
      const res = await dbService.getProducts({
        category_id: selectedCategory,
        search: searchQuery,
        location: selectedLocation,
        maxPrice,
        organicOnly,
        inStockOnly,
        sortBy
      });
      setProducts(res);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, [selectedCategory, searchQuery, selectedLocation, maxPrice, organicOnly, inStockOnly, sortBy]);

  const resetFilters = () => {
    setSelectedCategory('all');
    setSearchQuery('');
    setSelectedLocation('all');
    setMaxPrice(1000);
    setOrganicOnly(false);
    setInStockOnly(false);
    setMinRating(0);
    setSortBy('newest');
  };

  const locations = [
    { id: 'all', label: 'All India Locations' },
    { id: 'guntur', label: 'Guntur, Andhra Pradesh' },
    { id: 'vijayawada', label: 'Vijayawada, Andhra Pradesh' },
    { id: 'warangal', label: 'Warangal, Telangana' },
    { id: 'nashik', label: 'Nashik, Maharashtra' }
  ];

  return (
    <div className="py-10 px-4 lg:px-8 max-w-7xl mx-auto min-h-screen">
      
      {/* Header Title */}
      <div className="bg-gradient-to-r from-agri-950 via-agri-900 to-agri-950 rounded-3xl p-8 text-white mb-10 shadow-xl relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <span className="text-xs font-black uppercase text-emerald-400 tracking-wider bg-agri-800/80 px-3 py-1 rounded-full border border-agri-700">
            Kisan Direct Marketplace
          </span>
          <h1 className="text-3xl lg:text-4xl font-black mt-2 tracking-tight">
            Fresh Products From Verified Farmers
          </h1>
          <p className="text-xs lg:text-sm text-agri-200/90 mt-2">
            Directly connect with cultivators in Andhra Pradesh, Telangana, Maharashtra & Punjab
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Sidebar Filters - Desktop */}
        <div className="hidden lg:block space-y-6 bg-white p-6 rounded-3xl border border-agri-100 shadow-agri-card h-fit">
          <div className="flex items-center justify-between border-b border-earth-100 pb-4">
            <div className="flex items-center space-x-2 font-extrabold text-agri-950">
              <SlidersHorizontal className="w-5 h-5 text-agri-600" />
              <span>Filters</span>
            </div>
            <button
              onClick={resetFilters}
              className="text-xs text-earth-500 hover:text-agri-600 flex items-center space-x-1 font-semibold"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-xs font-bold text-earth-800 uppercase tracking-wider mb-3">Categories</h4>
            <div className="space-y-1 max-h-60 overflow-y-auto pr-1">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold transition flex items-center justify-between ${
                  selectedCategory === 'all' ? 'bg-agri-600 text-white shadow-sm' : 'text-earth-700 hover:bg-agri-50'
                }`}
              >
                <span>All Crop Categories</span>
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold transition flex items-center justify-between ${
                    selectedCategory === cat.id ? 'bg-agri-600 text-white shadow-sm' : 'text-earth-700 hover:bg-agri-50'
                  }`}
                >
                  <span className="flex items-center space-x-2">
                    <span>{cat.icon}</span>
                    <span>{cat.name}</span>
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Location Filter */}
          <div className="pt-4 border-t border-earth-100">
            <h4 className="text-xs font-bold text-earth-800 uppercase tracking-wider mb-3">Farm Region</h4>
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="w-full bg-earth-50 border border-earth-300 rounded-xl px-3 py-2 text-xs font-semibold text-earth-800 focus:ring-2 focus:ring-agri-500"
            >
              {locations.map((loc) => (
                <option key={loc.id} value={loc.id}>{loc.label}</option>
              ))}
            </select>
          </div>

          {/* Price Range Slider */}
          <div className="pt-4 border-t border-earth-100">
            <div className="flex justify-between items-center mb-2">
              <h4 className="text-xs font-bold text-earth-800 uppercase tracking-wider">Max Price (₹)</h4>
              <span className="text-xs font-black text-agri-700">₹{maxPrice}</span>
            </div>
            <input
              type="range"
              min="10"
              max="5000"
              step="10"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-agri-600"
            />
          </div>

          {/* Toggles */}
          <div className="pt-4 border-t border-earth-100 space-y-3">
            <label className="flex items-center space-x-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={organicOnly}
                onChange={(e) => setOrganicOnly(e.target.checked)}
                className="w-4 h-4 text-agri-600 rounded focus:ring-agri-500"
              />
              <span className="text-xs font-bold text-earth-800 flex items-center space-x-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>100% Organic Only</span>
              </span>
            </label>

            <label className="flex items-center space-x-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
                className="w-4 h-4 text-agri-600 rounded focus:ring-agri-500"
              />
              <span className="text-xs font-bold text-earth-800">Available In Stock</span>
            </label>
          </div>
        </div>

        {/* Main Product Grid Column */}
        <div className="lg:col-span-3 space-y-6">
          
          {/* Top Search & Sorting Toolbar */}
          <div className="bg-white p-4 rounded-3xl border border-agri-100 shadow-agri-card flex flex-col sm:flex-row items-center justify-between gap-4">
            
            {/* Search Input */}
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-earth-400" />
              <input
                type="text"
                placeholder="Search chillies, basmati, mangoes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-earth-50 border border-earth-300 rounded-2xl pl-10 pr-4 py-2 text-xs focus:ring-2 focus:ring-agri-500"
              />
            </div>

            {/* Mobile Filter Toggle & Sort Selector */}
            <div className="flex items-center justify-between w-full sm:w-auto gap-3">
              <button
                onClick={() => setMobileFilterOpen(true)}
                className="lg:hidden p-2 px-3 rounded-2xl border border-earth-300 text-xs font-bold flex items-center space-x-1 text-earth-800 bg-earth-50"
              >
                <Filter className="w-4 h-4 text-agri-600" />
                <span>Filter</span>
              </button>

              <div className="flex items-center space-x-2">
                <span className="text-xs text-earth-500 font-bold hidden sm:inline">Sort By:</span>
                <select
                  value={sortBy}
                  onChange={(e: any) => setSortBy(e.target.value)}
                  className="bg-earth-50 border border-earth-300 rounded-2xl px-3 py-2 text-xs font-bold text-earth-800 focus:ring-2 focus:ring-agri-500"
                >
                  <option value="newest">Newest Fresh Harvest</option>
                  <option value="price_asc">Price: Low → High</option>
                  <option value="price_desc">Price: High → Low</option>
                  <option value="rating">Highest Rated</option>
                  <option value="popular">Most Popular</option>
                </select>
              </div>
            </div>

          </div>

          {/* Results Summary */}
          <div className="flex items-center justify-between text-xs text-earth-600 font-semibold px-2">
            <p>Showing <span className="font-bold text-agri-950">{products.length}</span> fresh agricultural products</p>
            {selectedCategory !== 'all' && (
              <span className="bg-agri-100 text-agri-800 px-2.5 py-0.5 rounded-full font-bold">
                Category: {selectedCategory.toUpperCase()}
              </span>
            )}
          </div>

          {/* Product Grid */}
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 py-12">
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <div key={n} className="bg-white rounded-3xl h-80 animate-pulse border border-earth-200 p-4 space-y-4">
                  <div className="bg-earth-200 h-40 rounded-2xl"></div>
                  <div className="bg-earth-200 h-4 rounded w-3/4"></div>
                  <div className="bg-earth-200 h-4 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-agri-100 shadow-sm my-8">
              <Filter className="w-12 h-12 mx-auto text-earth-300 mb-3" />
              <h3 className="text-base font-extrabold text-earth-900">No products found matching filters</h3>
              <p className="text-xs text-earth-500 mt-1 max-w-sm mx-auto">
                Try resetting your search query, price slider, or location filter.
              </p>
              <button
                onClick={resetFilters}
                className="mt-4 px-4 py-2 bg-agri-600 text-white rounded-xl text-xs font-bold shadow-md hover:bg-agri-700 transition"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onSelectProduct={onSelectProduct}
                />
              ))}
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
