import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { NotificationProvider } from './context/NotificationContext';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { ToastContainer } from './components/common/ToastContainer';
import { NotificationDrawer } from './components/common/NotificationDrawer';
import { AuthModal } from './components/common/AuthModal';
import { CartDrawer } from './components/cart/CartDrawer';
import { Hero } from './components/home/Hero';
import { CategoryGrid } from './components/home/CategoryGrid';
import { FreshFromFarmers } from './components/home/FreshFromFarmers';
import { VerifiedFarmers } from './components/home/VerifiedFarmers';
import { TodaysDeals } from './components/home/TodaysDeals';
import { HowItWorks } from './components/home/HowItWorks';
import { WhyChooseAgriConnect } from './components/home/WhyChooseAgriConnect';
import { FarmerCTA } from './components/home/FarmerCTA';
import { CustomerReviews } from './components/home/CustomerReviews';
import { FAQ } from './components/home/FAQ';
import { ShopPage } from './components/marketplace/ShopPage';
import { ProductDetailPage } from './components/product/ProductDetailPage';
import { FarmerProfilePage } from './components/product/FarmerProfilePage';
import { CheckoutPage } from './components/checkout/CheckoutPage';
import { FarmerRegisterPage } from './components/farmer/FarmerRegisterPage';
import { FarmerDashboard } from './components/farmer/FarmerDashboard';
import { BuyerDashboard } from './components/buyer/BuyerDashboard';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { dbService } from './services/dbService';
import type { Category, FarmerProfile, Order, Product, UserRole } from './types';

const MainAppContent: React.FC = () => {
  const { user } = useAuth();

  const [activeTab, setActiveTab] = useState<string>('home');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedFarmer, setSelectedFarmer] = useState<FarmerProfile | null>(null);

  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [farmers, setFarmers] = useState<FarmerProfile[]>([]);

  // Modals & Drawers
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalRole, setAuthModalRole] = useState<UserRole>('buyer');
  const [isNotificationDrawerOpen, setIsNotificationDrawerOpen] = useState(false);

  useEffect(() => {
    dbService.getCategories().then((res) => setCategories(res));
    dbService.getProducts({ status: 'approved' }).then((res) => setProducts(res));
    dbService.getFarmers().then((res) => setFarmers(res));
  }, [activeTab]);

  const openAuthModal = (role: UserRole = 'buyer') => {
    setAuthModalRole(role);
    setIsAuthModalOpen(true);
  };

  const handleSelectCategory = (catId: string) => {
    setSelectedCategory(catId);
    setActiveTab('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
    setActiveTab('product_detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectFarmer = (farmer: FarmerProfile) => {
    setSelectedFarmer(farmer);
    setActiveTab('farmer_profile');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Dedicated Renderers for Admin & Dashboards (which have custom sidebars)
  if (activeTab === 'farmer_dashboard') {
    return (
      <div className="min-h-screen bg-earth-50 text-slate-800 flex flex-col">
        <Navbar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          openAuthModal={openAuthModal}
          openNotifications={() => setIsNotificationDrawerOpen(true)}
          onSelectProduct={handleSelectProduct}
        />
        <FarmerDashboard />
        <ToastContainer />
        <NotificationDrawer
          isOpen={isNotificationDrawerOpen}
          onClose={() => setIsNotificationDrawerOpen(false)}
          setActiveTab={setActiveTab}
        />
      </div>
    );
  }

  if (activeTab === 'buyer_dashboard' || activeTab === 'buyer_wishlist') {
    return (
      <div className="min-h-screen bg-earth-50 text-slate-800 flex flex-col">
        <Navbar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          openAuthModal={openAuthModal}
          openNotifications={() => setIsNotificationDrawerOpen(true)}
          onSelectProduct={handleSelectProduct}
        />
        <BuyerDashboard onSelectProduct={handleSelectProduct} />
        <ToastContainer />
        <NotificationDrawer
          isOpen={isNotificationDrawerOpen}
          onClose={() => setIsNotificationDrawerOpen(false)}
          setActiveTab={setActiveTab}
        />
      </div>
    );
  }

  if (activeTab === 'admin_dashboard') {
    return (
      <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col">
        <Navbar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          openAuthModal={openAuthModal}
          openNotifications={() => setIsNotificationDrawerOpen(true)}
          onSelectProduct={handleSelectProduct}
        />
        <AdminDashboard />
        <ToastContainer />
        <NotificationDrawer
          isOpen={isNotificationDrawerOpen}
          onClose={() => setIsNotificationDrawerOpen(false)}
          setActiveTab={setActiveTab}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-earth-50 text-slate-800 flex flex-col justify-between selection:bg-agri-200 selection:text-agri-950">
      
      {/* Sticky Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        openAuthModal={openAuthModal}
        openNotifications={() => setIsNotificationDrawerOpen(true)}
        onSelectProduct={handleSelectProduct}
      />

      {/* Main Dynamic View Switcher */}
      <main className="flex-1">
        
        {/* HOMEPAGE VIEW */}
        {activeTab === 'home' && (
          <>
            <Hero
              setActiveTab={setActiveTab}
              openFarmerRegister={() => setActiveTab('farmer_register')}
            />
            <CategoryGrid
              categories={categories}
              onSelectCategory={handleSelectCategory}
            />
            <FreshFromFarmers
              products={products}
              onSelectProduct={handleSelectProduct}
              onViewAll={() => setActiveTab('shop')}
            />
            <TodaysDeals
              products={products}
              onSelectProduct={handleSelectProduct}
              onViewAll={() => setActiveTab('shop')}
            />
            <VerifiedFarmers
              farmers={farmers}
              onSelectFarmer={handleSelectFarmer}
            />
            <HowItWorks />
            <WhyChooseAgriConnect />
            <FarmerCTA
              onRegisterClick={() => setActiveTab('farmer_register')}
            />
            <CustomerReviews />
            <FAQ />
          </>
        )}

        {/* SHOP MARKETPLACE VIEW */}
        {activeTab === 'shop' && (
          <ShopPage
            initialCategory={selectedCategory}
            onSelectProduct={handleSelectProduct}
            onSelectFarmer={handleSelectFarmer}
          />
        )}

        {/* CATEGORIES GRID VIEW */}
        {activeTab === 'categories' && (
          <div className="py-10">
            <CategoryGrid
              categories={categories}
              onSelectCategory={handleSelectCategory}
            />
          </div>
        )}

        {/* VERIFIED FARMERS VIEW */}
        {activeTab === 'farmers' && (
          <div className="py-10">
            <VerifiedFarmers
              farmers={farmers}
              onSelectFarmer={handleSelectFarmer}
            />
          </div>
        )}

        {/* HOW IT WORKS VIEW */}
        {activeTab === 'how_it_works' && (
          <div className="py-10">
            <HowItWorks />
            <WhyChooseAgriConnect />
          </div>
        )}

        {/* PRODUCT DETAIL VIEW */}
        {activeTab === 'product_detail' && selectedProduct && (
          <ProductDetailPage
            product={selectedProduct}
            onBack={() => setActiveTab('shop')}
            onSelectFarmer={handleSelectFarmer}
            onBuyNowCheckout={() => setActiveTab('checkout')}
          />
        )}

        {/* FARMER PROFILE VIEW */}
        {activeTab === 'farmer_profile' && selectedFarmer && (
          <FarmerProfilePage
            farmer={selectedFarmer}
            onBack={() => setActiveTab('farmers')}
            onSelectProduct={handleSelectProduct}
          />
        )}

        {/* FARMER REGISTRATION VIEW */}
        {activeTab === 'farmer_register' && (
          <FarmerRegisterPage
            onSuccessRedirect={() => setActiveTab('farmer_dashboard')}
          />
        )}

        {/* 3-STEP CHECKOUT VIEW */}
        {activeTab === 'checkout' && (
          <CheckoutPage
            onBackToCart={() => setActiveTab('shop')}
            onOrderCompleted={() => setActiveTab('buyer_dashboard')}
          />
        )}

      </main>

      {/* Footer */}
      <Footer setActiveTab={setActiveTab} />

      {/* Global Slide-Out Cart Drawer */}
      <CartDrawer
        onProceedToCheckout={() => setActiveTab('checkout')}
      />

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialRole={authModalRole}
        setActiveTab={setActiveTab}
      />

      {/* Notification Center Drawer */}
      <NotificationDrawer
        isOpen={isNotificationDrawerOpen}
        onClose={() => setIsNotificationDrawerOpen(false)}
        setActiveTab={setActiveTab}
      />

      {/* Toast Alert System */}
      <ToastContainer />

    </div>
  );
};

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <WishlistProvider>
          <NotificationProvider>
            <MainAppContent />
          </NotificationProvider>
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  );
};

export default App;
