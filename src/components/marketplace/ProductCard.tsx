import React from 'react';
import { Heart, ShoppingBag, CheckCircle2, MapPin, Eye, Calendar, Sparkles } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import type { Product } from '../../types';
import { RatingStars } from '../common/RatingStars';

interface ProductCardProps {
  product: Product;
  onSelectProduct: (product: Product) => void;
  onQuickBuy?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onSelectProduct,
  onQuickBuy
}) => {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const isWishlisted = isInWishlist(product.id);

  return (
    <div className="group bg-white rounded-3xl overflow-hidden border border-agri-100/80 shadow-agri-card hover:shadow-2xl hover:border-agri-400 transition-all duration-300 flex flex-col justify-between relative">
      
      {/* Product Image & Badges */}
      <div className="relative h-52 w-full overflow-hidden bg-earth-100 cursor-pointer" onClick={() => onSelectProduct(product)}>
        <img
          src={product.images[0] || 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80'}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Organic Badge */}
        {product.is_organic && (
          <span className="absolute top-3 left-3 bg-agri-950/90 text-emerald-300 text-[10px] font-black uppercase px-2.5 py-1 rounded-full backdrop-blur-md border border-emerald-500/40 flex items-center space-x-1 shadow-md">
            <Sparkles className="w-3 h-3 text-amber-400" />
            <span>Organic</span>
          </span>
        )}

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className={`absolute top-3 right-3 p-2.5 rounded-full backdrop-blur-md transition-all shadow-md ${
            isWishlisted
              ? 'bg-rose-500 text-white'
              : 'bg-white/80 hover:bg-white text-earth-700 hover:text-rose-500'
          }`}
          title="Add to Wishlist"
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-white' : ''}`} />
        </button>

        {/* Quick View Hover Button */}
        <div className="absolute inset-0 bg-agri-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
          <span className="bg-white/90 text-agri-950 px-4 py-2 rounded-full text-xs font-bold shadow-xl backdrop-blur-md flex items-center space-x-1.5 transform translate-y-2 group-hover:translate-y-0 transition-transform">
            <Eye className="w-4 h-4 text-agri-600" />
            <span>Quick View</span>
          </span>
        </div>
      </div>

      {/* Product Content Details */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Rating & Stock */}
          <div className="flex items-center justify-between mb-2">
            <RatingStars rating={product.rating} reviewsCount={product.reviews_count} size="sm" />
            <span className={`text-[11px] font-bold ${product.available_quantity > 0 ? 'text-agri-700' : 'text-rose-600'}`}>
              {product.available_quantity > 0 ? `${product.available_quantity} ${product.unit} left` : 'Out of Stock'}
            </span>
          </div>

          {/* Product Title */}
          <h3 
            onClick={() => onSelectProduct(product)}
            className="text-sm font-extrabold text-agri-950 hover:text-agri-600 cursor-pointer transition line-clamp-2 leading-snug"
          >
            {product.title}
          </h3>

          {/* Farmer Info */}
          <div className="mt-3 pt-3 border-t border-earth-100 flex items-center justify-between text-xs">
            <div className="flex items-center space-x-1.5 min-w-0">
              <img
                src={product.farmer?.avatar_url || 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=100&q=80'}
                alt={product.farmer?.farmer_name}
                className="w-5 h-5 rounded-full object-cover border border-agri-400"
              />
              <span className="font-bold text-earth-800 truncate">{product.farmer?.farmer_name || 'Ramesh Kumar'}</span>
              <CheckCircle2 className="w-3.5 h-3.5 text-agri-600 flex-shrink-0" title="Verified Farmer" />
            </div>

            <div className="flex items-center text-earth-500 text-[11px] font-medium ml-2">
              <MapPin className="w-3 h-3 text-amber-500 mr-0.5" />
              <span className="truncate max-w-[80px]">{product.farmer?.location || 'Guntur'}</span>
            </div>
          </div>
        </div>

        {/* Pricing & CTA Actions */}
        <div className="mt-4 pt-3 border-t border-earth-100 flex items-center justify-between gap-2">
          <div>
            <div className="flex items-baseline space-x-1">
              <span className="text-lg font-black text-agri-950">₹{product.price}</span>
              <span className="text-xs text-earth-500 font-semibold">/{product.unit}</span>
            </div>
            {product.harvest_date && (
              <p className="text-[10px] text-earth-400 flex items-center mt-0.5">
                <Calendar className="w-2.5 h-2.5 mr-0.5" />
                Harvested: {new Date(product.harvest_date).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })}
              </p>
            )}
          </div>

          <div className="flex items-center space-x-1.5">
            <button
              onClick={() => addToCart(product.id, product.min_order_quantity || 1)}
              disabled={product.available_quantity <= 0}
              className="p-2.5 rounded-2xl bg-agri-100 text-agri-800 hover:bg-agri-600 hover:text-white transition shadow-sm disabled:opacity-50"
              title="Add to Cart"
            >
              <ShoppingBag className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                addToCart(product.id, product.min_order_quantity || 1);
                if (onQuickBuy) onQuickBuy(product);
              }}
              disabled={product.available_quantity <= 0}
              className="px-3 py-2 rounded-2xl bg-gradient-to-r from-agri-600 to-agri-800 text-white font-black text-xs shadow-md hover:brightness-110 transition disabled:opacity-50"
            >
              Buy Now
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
