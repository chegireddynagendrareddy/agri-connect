import React, { useState, useEffect } from 'react';
import { 
  CheckCircle2, 
  MapPin, 
  ShoppingBag, 
  Heart, 
  Calendar, 
  Sparkles, 
  ShieldCheck, 
  Truck, 
  Minus, 
  Plus, 
  Share2, 
  Star,
  Award,
  ArrowLeft
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useNotification } from '../../context/NotificationContext';
import { dbService } from '../../services/dbService';
import type { FarmerProfile, Product, Review } from '../../types';
import { RatingStars } from '../common/RatingStars';

interface ProductDetailPageProps {
  product: Product;
  onBack: () => void;
  onSelectFarmer?: (farmer: FarmerProfile) => void;
  onBuyNowCheckout: () => void;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  product,
  onBack,
  onSelectFarmer,
  onBuyNowCheckout
}) => {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { showToast } = useNotification();

  const [selectedImage, setSelectedImage] = useState<string>(product.images[0] || '');
  const [quantity, setQuantity] = useState<number>(product.min_order_quantity || 1);
  const [farmer, setFarmer] = useState<FarmerProfile | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);

  // New Review State
  const [newReviewText, setNewReviewText] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);

  useEffect(() => {
    if (product.farmer_id) {
      dbService.getFarmerById(product.farmer_id).then((f) => setFarmer(f));
    }
    dbService.getProductReviews(product.id).then((r) => setReviews(r));
  }, [product]);

  const isWishlisted = isInWishlist(product.id);

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewText.trim()) return;

    setIsSubmittingReview(true);
    try {
      const review = await dbService.addReview({
        product_id: product.id,
        buyer_id: 'usr_buyer_1',
        buyer_name: 'Priya Sharma',
        buyer_avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80',
        rating: newRating,
        comment: newReviewText
      });

      setReviews((prev) => [review, ...prev]);
      setNewReviewText('');
      showToast('Review Submitted', 'Thank you for rating this farm harvest!', 'success');
    } finally {
      setIsSubmittingReview(false);
    }
  };

  return (
    <div className="py-10 px-4 lg:px-8 max-w-7xl mx-auto min-h-screen">
      
      {/* Back Button */}
      <button
        onClick={onBack}
        className="mb-6 inline-flex items-center space-x-2 text-xs font-extrabold text-agri-800 hover:text-agri-600 bg-white px-4 py-2 rounded-full border border-earth-200 shadow-sm transition"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Marketplace</span>
      </button>

      {/* Main Product Container */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 bg-white p-6 lg:p-10 rounded-3xl border border-agri-100 shadow-agri-card mb-12">
        
        {/* Left Side: Image Gallery */}
        <div className="space-y-4">
          <div className="relative h-96 sm:h-[480px] w-full rounded-3xl overflow-hidden bg-earth-100 border border-earth-200 group">
            <img
              src={selectedImage || product.images[0]}
              alt={product.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 cursor-zoom-in"
            />
            {product.is_organic && (
              <span className="absolute top-4 left-4 bg-agri-950/90 text-emerald-300 text-xs font-black uppercase px-3 py-1.5 rounded-full backdrop-blur-md border border-emerald-500/40 flex items-center space-x-1 shadow-lg">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>100% Certified Organic</span>
              </span>
            )}
          </div>

          {/* Thumbnail Strip */}
          {product.images.length > 1 && (
            <div className="flex items-center space-x-3 overflow-x-auto pb-2">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(img)}
                  className={`w-20 h-20 rounded-2xl overflow-hidden border-2 transition ${
                    selectedImage === img ? 'border-agri-600 ring-2 ring-agri-400' : 'border-earth-200 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Side: Product Details & Purchase Actions */}
        <div className="flex flex-col justify-between space-y-6">
          <div>
            
            {/* Title & Share */}
            <div className="flex items-start justify-between gap-4">
              <h1 className="text-2xl lg:text-3xl font-black text-agri-950 leading-tight">
                {product.title}
              </h1>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  showToast('Link Copied', 'Product link copied to clipboard', 'info');
                }}
                className="p-2.5 rounded-full bg-earth-100 hover:bg-earth-200 text-earth-700 transition"
              >
                <Share2 className="w-4 h-4" />
              </button>
            </div>

            {/* Rating & Stock */}
            <div className="flex items-center space-x-4 mt-3">
              <RatingStars rating={product.rating} reviewsCount={product.reviews_count} size="md" />
              <span className="text-earth-300">|</span>
              <span className={`text-xs font-extrabold ${product.available_quantity > 0 ? 'text-agri-700' : 'text-rose-600'}`}>
                {product.available_quantity > 0 ? `In Stock: ${product.available_quantity} ${product.unit}` : 'Out of Stock'}
              </span>
            </div>

            {/* Price Banner */}
            <div className="mt-6 p-4 rounded-2xl bg-agri-50 border border-agri-200 flex items-baseline justify-between">
              <div>
                <span className="text-3xl font-black text-agri-950">₹{product.price}</span>
                <span className="text-sm font-bold text-earth-600"> / {product.unit}</span>
                <p className="text-[11px] text-earth-500 font-semibold mt-0.5">Inclusive of all local kisan taxes</p>
              </div>

              {product.harvest_date && (
                <div className="text-right">
                  <span className="text-[10px] font-bold uppercase text-agri-700 bg-agri-100 px-2.5 py-1 rounded-full">
                    Harvest Date
                  </span>
                  <p className="text-xs font-extrabold text-agri-950 mt-1 flex items-center justify-end">
                    <Calendar className="w-3.5 h-3.5 text-amber-500 mr-1" />
                    {new Date(product.harvest_date).toLocaleDateString('en-IN', { month: 'long', day: 'numeric', year: 'numeric' })}
                  </p>
                </div>
              )}
            </div>

            {/* Product Specifications Grid */}
            <div className="mt-6 grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-earth-50 rounded-xl border border-earth-200">
                <span className="text-earth-500 font-medium">Min Order Qty</span>
                <p className="font-extrabold text-agri-950 mt-0.5">{product.min_order_quantity || 1} {product.unit}</p>
              </div>
              <div className="p-3 bg-earth-50 rounded-xl border border-earth-200">
                <span className="text-earth-500 font-medium">Category</span>
                <p className="font-extrabold text-agri-950 mt-0.5 capitalize">{product.category_id}</p>
              </div>
            </div>

            {/* Description */}
            <div className="mt-6">
              <h4 className="text-xs font-extrabold text-earth-800 uppercase tracking-wider mb-2">Crop Description</h4>
              <p className="text-xs text-earth-700 leading-relaxed">{product.description}</p>
            </div>
          </div>

          {/* Quantity Selector & Action Buttons */}
          <div className="space-y-4 pt-6 border-t border-earth-100">
            <div className="flex items-center space-x-4">
              <span className="text-xs font-extrabold text-earth-800">Select Quantity ({product.unit}):</span>
              <div className="flex items-center space-x-3 bg-earth-100 p-1.5 rounded-2xl border border-earth-300">
                <button
                  onClick={() => setQuantity(Math.max(product.min_order_quantity || 1, quantity - 1))}
                  className="w-8 h-8 rounded-xl bg-white text-agri-900 font-bold flex items-center justify-center shadow-sm hover:bg-agri-100"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="text-sm font-black px-2">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(product.available_quantity, quantity + 1))}
                  className="w-8 h-8 rounded-xl bg-white text-agri-900 font-bold flex items-center justify-center shadow-sm hover:bg-agri-100"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                onClick={() => {
                  addToCart(product.id, quantity);
                  showToast('Added to Cart', `${quantity} ${product.unit} added to your cart`, 'success');
                }}
                disabled={product.available_quantity <= 0}
                className="py-4 rounded-2xl bg-agri-100 text-agri-900 font-black text-xs shadow-sm hover:bg-agri-600 hover:text-white transition flex items-center justify-center space-x-2"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Cart</span>
              </button>

              <button
                onClick={() => {
                  addToCart(product.id, quantity);
                  onBuyNowCheckout();
                }}
                disabled={product.available_quantity <= 0}
                className="py-4 rounded-2xl bg-gradient-to-r from-agri-600 to-agri-800 text-white font-black text-xs shadow-xl shadow-agri-600/30 hover:brightness-110 transition flex items-center justify-center space-x-2"
              >
                <span>Buy Now with Razorpay</span>
              </button>
            </div>
          </div>

        </div>

      </div>

      {/* MEET THE FARMER SECTION */}
      <div className="bg-gradient-to-br from-agri-950 to-agri-900 rounded-3xl p-8 text-white border border-agri-800 shadow-2xl mb-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6 text-center md:text-left">
            <img
              src={farmer?.avatar_url || product.farmer?.avatar_url || 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80'}
              alt={product.farmer?.farmer_name}
              className="w-24 h-24 rounded-full object-cover border-4 border-emerald-400 shadow-xl"
            />
            <div>
              <div className="flex items-center justify-center md:justify-start space-x-2">
                <h3 className="text-xl font-black text-white">{product.farmer?.farmer_name || 'Ramesh Kumar'}</h3>
                <span className="p-1 bg-emerald-500 rounded-full text-white" title="Verified Farmer">
                  <CheckCircle2 className="w-4 h-4" />
                </span>
              </div>
              <p className="text-xs text-amber-300 font-bold mt-0.5">{farmer?.farm_name || 'Guntur Organic Farms'}</p>
              
              <div className="flex items-center justify-center md:justify-start space-x-3 text-xs text-agri-200 mt-2">
                <span className="flex items-center"><MapPin className="w-3.5 h-3.5 text-amber-400 mr-1" />{farmer?.farm_location || product.farmer?.location}</span>
                <span>•</span>
                <span>{farmer?.years_farming || 18} Years Farming Experience</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => farmer && onSelectFarmer && onSelectFarmer(farmer)}
            className="px-6 py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-agri-950 font-black text-xs shadow-lg transition"
          >
            View Farmer Profile
          </button>
        </div>
      </div>

      {/* REVIEWS SECTION */}
      <div className="bg-white p-8 rounded-3xl border border-agri-100 shadow-agri-card">
        <h3 className="text-lg font-black text-agri-950 mb-6">Customer Reviews ({reviews.length})</h3>

        {/* Add Review Form */}
        <form onSubmit={handleReviewSubmit} className="mb-8 p-4 rounded-2xl bg-agri-50 border border-agri-200 space-y-3">
          <h4 className="text-xs font-bold text-agri-950">Write a Verified Buyer Review:</h4>
          <div className="flex items-center space-x-2">
            <span className="text-xs text-earth-700 font-semibold">Rating:</span>
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setNewRating(star)}
                className="text-amber-400"
              >
                <Star className={`w-5 h-5 ${star <= newRating ? 'fill-amber-400' : 'text-earth-300'}`} />
              </button>
            ))}
          </div>

          <textarea
            required
            rows={3}
            placeholder="Share your experience regarding produce freshness, aroma and delivery..."
            value={newReviewText}
            onChange={(e) => setNewReviewText(e.target.value)}
            className="w-full bg-white border border-earth-300 rounded-xl p-3 text-xs focus:ring-2 focus:ring-agri-500"
          ></textarea>

          <button
            type="submit"
            disabled={isSubmittingReview}
            className="px-4 py-2 bg-agri-600 text-white rounded-xl text-xs font-extrabold hover:bg-agri-700 transition"
          >
            Submit Review
          </button>
        </form>

        {/* Reviews List */}
        <div className="space-y-4">
          {reviews.map((rev) => (
            <div key={rev.id} className="p-4 rounded-2xl border border-earth-100 bg-earth-50/50">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <img src={rev.buyer_avatar} alt="" className="w-7 h-7 rounded-full object-cover" />
                  <span className="text-xs font-bold text-agri-950">{rev.buyer_name}</span>
                </div>
                <RatingStars rating={rev.rating} size="sm" />
              </div>
              <p className="text-xs text-earth-700 leading-relaxed">{rev.comment}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
