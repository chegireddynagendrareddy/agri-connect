import React, { useState, useEffect, useRef } from 'react';
import { 
  ShoppingBag, 
  Heart, 
  Search, 
  User, 
  Menu, 
  X, 
  Bell, 
  ChevronDown, 
  Sprout, 
  LogOut, 
  LayoutDashboard, 
  CheckCircle2,
  ShieldCheck
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useNotification } from '../../context/NotificationContext';
import { dbService } from '../../services/dbService';
import type { Product, UserRole } from '../../types';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  openAuthModal: (role?: UserRole) => void;
  openNotifications: () => void;
  onSelectProduct?: (product: Product) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  openAuthModal,
  openNotifications,
  onSelectProduct
}) => {
  const { user, isAuthenticated, logout, switchRole } = useAuth();
  const { totalItems, setIsCartOpen } = useCart();
  const { wishlistItems } = useWishlist();
  const { unreadCount } = useNotification();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [searchFocused, setSearchFocused] = useState(false);

  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (searchQuery.trim().length > 1) {
      dbService.getProducts({ search: searchQuery }).then((res) => {
        setSearchResults(res.slice(0, 5));
      });
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleProductClick = (product: Product) => {
    if (onSelectProduct) {
      onSelectProduct(product);
      setActiveTab('product_detail');
    } else {
      setActiveTab('shop');
    }
    setSearchFocused(false);
    setSearchQuery('');
  };

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-200">
      {/* Top Banner */}
      <div className="bg-agri-950 text-agri-200 text-xs py-1.5 px-4 text-center flex items-center justify-between font-medium">
        <div className="hidden sm:flex items-center space-x-2">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>📍 Connecting 25,000+ Verified Farmers Across India</span>
        </div>
        <div className="mx-auto sm:mx-0 flex items-center space-x-3">
          <span>🌾 100% Direct Farmer Sourced</span>
          <span className="hidden md:inline">|</span>
          <span className="hidden md:inline">📞 Kisan Toll Free Helpline: 1800-AGRI-CONN</span>
        </div>
        {/* Role Quick Switcher for Testing */}
        <div className="hidden lg:flex items-center space-x-2 bg-agri-900/80 px-2.5 py-0.5 rounded-full border border-agri-700/50">
          <span className="text-[10px] uppercase text-agri-400 font-bold">Switch Role:</span>
          <button
            onClick={() => switchRole('buyer')}
            className={`px-2 py-0.5 rounded text-[11px] font-semibold transition ${user?.role === 'buyer' ? 'bg-agri-500 text-white' : 'hover:text-white'}`}
          >
            Buyer
          </button>
          <button
            onClick={() => switchRole('farmer')}
            className={`px-2 py-0.5 rounded text-[11px] font-semibold transition ${user?.role === 'farmer' ? 'bg-agri-500 text-white' : 'hover:text-white'}`}
          >
            Farmer
          </button>
          <button
            onClick={() => switchRole('admin')}
            className={`px-2 py-0.5 rounded text-[11px] font-semibold transition ${user?.role === 'admin' ? 'bg-amber-600 text-white' : 'hover:text-white'}`}
          >
            Admin
          </button>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="glass-panel border-b border-agri-100 shadow-agri-soft px-4 lg:px-8 py-3.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          
          {/* Logo */}
          <div 
            onClick={() => setActiveTab('home')}
            className="flex items-center space-x-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-agri-600 to-agri-800 flex items-center justify-center text-white shadow-md shadow-agri-600/30 group-hover:scale-105 transition-transform">
              <Sprout className="w-6 h-6 text-agri-200" />
            </div>
            <div>
              <div className="flex items-center space-x-1">
                <span className="text-xl font-extrabold text-agri-950 tracking-tight">Agri</span>
                <span className="text-xl font-extrabold text-agri-600 tracking-tight">Connect</span>
              </div>
              <p className="text-[10px] text-earth-600 font-semibold tracking-wider uppercase -mt-1 hidden sm:block">
                Direct Farmer Market
              </p>
            </div>
          </div>

          {/* Navigation Links - Desktop */}
          <div className="hidden md:flex items-center space-x-1 lg:space-x-2 font-semibold text-sm">
            {[
              { id: 'home', label: 'Home' },
              { id: 'shop', label: 'Shop Products' },
              { id: 'categories', label: 'Categories' },
              { id: 'farmers', label: 'Verified Farmers' },
              { id: 'how_it_works', label: 'How It Works' }
            ].map((link) => (
              <button
                key={link.id}
                onClick={() => setActiveTab(link.id)}
                className={`px-3.5 py-2 rounded-lg transition-all ${
                  activeTab === link.id
                    ? 'bg-agri-100 text-agri-900 font-bold shadow-sm'
                    : 'text-earth-800 hover:bg-agri-50/80 hover:text-agri-700'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div ref={searchRef} className="relative hidden lg:block w-72">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-earth-500" />
              <input
                type="text"
                placeholder="Search chillies, basmati, mangoes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setSearchFocused(true)}
                className="w-full bg-earth-100/80 border border-earth-300 rounded-full pl-10 pr-4 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-agri-500 focus:bg-white transition"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-earth-400 hover:text-earth-700"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Quick Live Search Results */}
            {searchFocused && searchResults.length > 0 && (
              <div className="absolute top-full mt-2 w-full bg-white rounded-2xl shadow-xl border border-agri-100 p-2 z-50 animate-in fade-in slide-in-from-top-2">
                <p className="text-[10px] font-bold text-earth-500 uppercase px-3 py-1">Top Matching Crops</p>
                {searchResults.map((p) => (
                  <div
                    key={p.id}
                    onClick={() => handleProductClick(p)}
                    className="flex items-center space-x-3 p-2 hover:bg-agri-50 rounded-xl cursor-pointer transition"
                  >
                    <img src={p.images[0]} alt={p.title} className="w-10 h-10 object-cover rounded-lg" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-earth-900 truncate">{p.title}</p>
                      <p className="text-[11px] text-agri-700 font-semibold">₹{p.price}/{p.unit} • {p.farmer?.location}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Action Icons & User Account */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Wishlist Button */}
            <button
              onClick={() => setActiveTab(user?.role === 'buyer' ? 'buyer_wishlist' : 'shop')}
              className="relative p-2.5 rounded-full hover:bg-agri-100/70 text-earth-700 transition"
              title="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlistItems.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-rose-500 text-white rounded-full text-[10px] font-bold flex items-center justify-center animate-pulse">
                  {wishlistItems.length}
                </span>
              )}
            </button>

            {/* Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 rounded-full bg-agri-600 hover:bg-agri-700 text-white shadow-md shadow-agri-600/20 transition flex items-center space-x-1 px-3"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="text-xs font-bold hidden sm:inline">Cart</span>
              {totalItems > 0 && (
                <span className="ml-1 px-1.5 py-0.5 bg-amber-400 text-agri-950 rounded-full text-[11px] font-extrabold">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Notification Bell */}
            <button
              onClick={openNotifications}
              className="relative p-2.5 rounded-full hover:bg-agri-100/70 text-earth-700 transition"
              title="Notifications"
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-amber-500 text-white rounded-full text-[10px] font-bold flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* User Profile / Dashboard Menu */}
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center space-x-2 pl-2 pr-1 py-1 rounded-full hover:bg-agri-100/70 transition border border-agri-200"
                >
                  <img
                    src={user?.avatar_url || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=400&q=80'}
                    alt={user?.full_name}
                    className="w-8 h-8 rounded-full object-cover border border-agri-500"
                  />
                  <div className="text-left hidden lg:block">
                    <p className="text-xs font-bold text-agri-950 truncate max-w-[100px]">{user?.full_name}</p>
                    <span className="text-[10px] font-bold uppercase text-agri-700 px-1.5 py-0.2 bg-agri-100 rounded">
                      {user?.role}
                    </span>
                  </div>
                  <ChevronDown className="w-4 h-4 text-earth-600" />
                </button>

                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-agri-100 py-2 z-50 animate-in fade-in">
                    <div className="px-4 py-2 border-b border-earth-100">
                      <p className="text-xs font-bold text-earth-900">{user?.full_name}</p>
                      <p className="text-[11px] text-earth-500 truncate">{user?.email}</p>
                    </div>

                    {user?.role === 'farmer' && (
                      <button
                        onClick={() => {
                          setActiveTab('farmer_dashboard');
                          setUserDropdownOpen(false);
                        }}
                        className="w-full text-left px-4 py-2.5 text-xs font-semibold text-earth-800 hover:bg-agri-50 flex items-center space-x-2"
                      >
                        <LayoutDashboard className="w-4 h-4 text-agri-600" />
                        <span>Farmer Dashboard</span>
                      </button>
                    )}

                    {user?.role === 'buyer' && (
                      <button
                        onClick={() => {
                          setActiveTab('buyer_dashboard');
                          setUserDropdownOpen(false);
                        }}
                        className="w-full text-left px-4 py-2.5 text-xs font-semibold text-earth-800 hover:bg-agri-50 flex items-center space-x-2"
                      >
                        <LayoutDashboard className="w-4 h-4 text-agri-600" />
                        <span>My Buyer Dashboard</span>
                      </button>
                    )}

                    {user?.role === 'admin' && (
                      <button
                        onClick={() => {
                          setActiveTab('admin_dashboard');
                          setUserDropdownOpen(false);
                        }}
                        className="w-full text-left px-4 py-2.5 text-xs font-semibold text-earth-800 hover:bg-agri-50 flex items-center space-x-2"
                      >
                        <ShieldCheck className="w-4 h-4 text-amber-600" />
                        <span>Admin Governance Panel</span>
                      </button>
                    )}

                    <div className="border-t border-earth-100 mt-1 pt-1">
                      <button
                        onClick={() => {
                          logout();
                          setUserDropdownOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 flex items-center space-x-2"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Log Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => openAuthModal('buyer')}
                  className="px-3.5 py-1.5 text-xs font-bold text-agri-800 hover:bg-agri-100 rounded-full transition"
                >
                  Login
                </button>
                <button
                  onClick={() => setActiveTab('farmer_register')}
                  className="hidden sm:flex items-center space-x-1 px-4 py-2 text-xs font-extrabold text-white bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 rounded-full shadow-md transition"
                >
                  <Sprout className="w-3.5 h-3.5" />
                  <span>Sell As Farmer</span>
                </button>
              </div>
            )}

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-earth-800 hover:bg-agri-100"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-dark text-white p-4 space-y-3 animate-in slide-in-from-top border-b border-agri-700">
          {[
            { id: 'home', label: 'Home' },
            { id: 'shop', label: 'Shop Marketplace' },
            { id: 'categories', label: 'Categories' },
            { id: 'farmers', label: 'Verified Farmers' },
            { id: 'how_it_works', label: 'How It Works' }
          ].map((link) => (
            <button
              key={link.id}
              onClick={() => {
                setActiveTab(link.id);
                setMobileMenuOpen(false);
              }}
              className="block w-full text-left py-2 px-3 rounded-lg font-medium hover:bg-agri-800 text-sm"
            >
              {link.label}
            </button>
          ))}
          {!isAuthenticated && (
            <div className="pt-2 border-t border-agri-800 flex flex-col space-y-2">
              <button
                onClick={() => {
                  openAuthModal('buyer');
                  setMobileMenuOpen(false);
                }}
                className="w-full py-2 text-center text-xs font-bold bg-agri-700 rounded-xl"
              >
                Buyer Login
              </button>
              <button
                onClick={() => {
                  setActiveTab('farmer_register');
                  setMobileMenuOpen(false);
                }}
                className="w-full py-2 text-center text-xs font-bold bg-amber-600 rounded-xl"
              >
                Register as Farmer
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
};
