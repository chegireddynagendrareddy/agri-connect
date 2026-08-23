import React, { useState, useEffect } from 'react';
import { 
  ShoppingBag, 
  Heart, 
  MapPin, 
  User, 
  Clock, 
  CheckCircle2, 
  Truck, 
  Package, 
  IndianRupee, 
  Star,
  ChevronRight,
  LogOut
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { dbService } from '../../services/dbService';
import type { Address, Order, Product, WishlistItem } from '../../types';
import { ProductCard } from '../marketplace/ProductCard';

interface BuyerDashboardProps {
  onSelectProduct?: (product: Product) => void;
}

export const BuyerDashboard: React.FC<BuyerDashboardProps> = ({ onSelectProduct }) => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<'orders' | 'wishlist' | 'addresses' | 'profile'>('orders');

  const [orders, setOrders] = useState<Order[]>([]);
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const userId = user?.id || 'usr_buyer_1';

  useEffect(() => {
    dbService.getOrders({ buyer_id: userId }).then((res) => {
      setOrders(res);
      if (res.length > 0) setSelectedOrder(res[0]);
    });
    setWishlist(dbService.getWishlist(userId));
    setAddresses(dbService.getAddresses(userId));
  }, [userId]);

  const totalOrders = orders.length;
  const pendingOrders = orders.filter((o) => o.status !== 'delivered' && o.status !== 'cancelled').length;
  const deliveredOrders = orders.filter((o) => o.status === 'delivered').length;
  const totalSpent = orders.reduce((sum, o) => sum + (o.payment_status === 'paid' ? o.total_amount : 0), 0);

  const getStepIndex = (status: string) => {
    switch (status) {
      case 'confirmed': return 1;
      case 'processing': return 2;
      case 'packed': return 3;
      case 'shipped': return 4;
      case 'out_for_delivery': return 5;
      case 'delivered': return 6;
      default: return 1;
    }
  };

  return (
    <div className="min-h-screen bg-earth-50 flex flex-col md:flex-row">
      
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-white border-r border-earth-200 p-6 flex flex-col justify-between">
        <div>
          <div className="flex items-center space-x-3 mb-8">
            <img
              src={user?.avatar_url || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80'}
              alt=""
              className="w-12 h-12 rounded-2xl object-cover border-2 border-agri-500"
            />
            <div className="min-w-0">
              <h4 className="text-sm font-extrabold text-agri-950 truncate">{user?.full_name || 'Priya Sharma'}</h4>
              <p className="text-[11px] text-earth-500 font-semibold truncate">{user?.email}</p>
            </div>
          </div>

          <nav className="space-y-1.5 text-xs font-bold">
            {[
              { id: 'orders', label: 'My Orders & Tracking', icon: <ShoppingBag className="w-4 h-4" /> },
              { id: 'wishlist', label: 'Saved Wishlist', icon: <Heart className="w-4 h-4" /> },
              { id: 'addresses', label: 'Address Book', icon: <MapPin className="w-4 h-4" /> },
              { id: 'profile', label: 'Account Profile', icon: <User className="w-4 h-4" /> }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-2xl transition ${
                  activeTab === tab.id
                    ? 'bg-agri-600 text-white shadow-md font-extrabold'
                    : 'text-earth-700 hover:bg-agri-50'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        <button
          onClick={logout}
          className="mt-8 w-full flex items-center space-x-2 px-4 py-3 rounded-2xl bg-rose-50 text-rose-700 text-xs font-bold border border-rose-200"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </button>
      </aside>

      {/* Content */}
      <main className="flex-1 p-6 lg:p-10 space-y-8 overflow-y-auto">
        
        {/* KPI Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-3xl border border-earth-200 shadow-sm">
            <span className="text-xs font-bold text-earth-500 uppercase">Total Orders</span>
            <p className="text-2xl font-black text-agri-950 mt-1">{totalOrders}</p>
          </div>
          <div className="bg-white p-5 rounded-3xl border border-amber-200 bg-amber-50/40 shadow-sm">
            <span className="text-xs font-bold text-amber-800 uppercase">Pending In-Transit</span>
            <p className="text-2xl font-black text-amber-700 mt-1">{pendingOrders}</p>
          </div>
          <div className="bg-white p-5 rounded-3xl border border-emerald-200 bg-emerald-50/40 shadow-sm">
            <span className="text-xs font-bold text-emerald-800 uppercase">Delivered</span>
            <p className="text-2xl font-black text-emerald-700 mt-1">{deliveredOrders}</p>
          </div>
          <div className="bg-white p-5 rounded-3xl border border-agri-200 bg-agri-50/40 shadow-sm">
            <span className="text-xs font-bold text-agri-800 uppercase">Total Spent</span>
            <p className="text-2xl font-black text-agri-800 mt-1">₹{totalSpent}</p>
          </div>
        </div>

        {/* ORDERS TAB */}
        {activeTab === 'orders' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Orders List Column */}
            <div className="bg-white p-6 rounded-3xl border border-agri-100 shadow-agri-card space-y-4">
              <h3 className="text-base font-black text-agri-950">Order History</h3>
              
              <div className="space-y-3">
                {orders.map((ord) => (
                  <div
                    key={ord.id}
                    onClick={() => setSelectedOrder(ord)}
                    className={`p-4 rounded-2xl border-2 transition cursor-pointer ${
                      selectedOrder?.id === ord.id
                        ? 'border-agri-600 bg-agri-50/60 shadow-sm'
                        : 'border-earth-200 bg-white hover:border-earth-300'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <span className="text-xs font-black text-agri-950">{ord.order_number}</span>
                      <span className="text-xs font-black text-agri-700">₹{ord.total_amount}</span>
                    </div>

                    <p className="text-[11px] text-earth-500 font-semibold mt-1">
                      Farmer: {ord.farmer_name || 'AgriConnect Farmer'}
                    </p>

                    <div className="mt-3 flex items-center justify-between">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-agri-100 text-agri-800">
                        {ord.status.replace(/_/g, ' ')}
                      </span>
                      <span className="text-[10px] text-earth-400 font-bold">
                        {new Date(ord.created_at).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Visual Tracking Timeline Column */}
            {selectedOrder && (
              <div className="lg:col-span-2 bg-white p-6 lg:p-8 rounded-3xl border border-agri-100 shadow-agri-card space-y-6">
                <div className="flex items-center justify-between border-b border-earth-100 pb-4">
                  <div>
                    <span className="text-xs font-bold text-earth-500">Live Order Tracking</span>
                    <h3 className="text-xl font-black text-agri-950">{selectedOrder.order_number}</h3>
                  </div>
                  <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-extrabold">
                    {selectedOrder.payment_status.toUpperCase()} (Razorpay)
                  </span>
                </div>

                {/* Timeline Component */}
                <div className="p-6 bg-earth-50 rounded-3xl border border-earth-200 space-y-6">
                  <h4 className="text-xs font-extrabold text-earth-800 uppercase tracking-wider">Shipment Progress</h4>
                  
                  <div className="relative pl-6 space-y-6 border-l-2 border-agri-300">
                    {[
                      { title: 'Order Confirmed', desc: 'Payment verified via Razorpay Escrow' },
                      { title: 'Processing', desc: 'Farmer harvesting fresh crops' },
                      { title: 'Packed', desc: 'Packed in eco-friendly aerated crates' },
                      { title: 'Shipped', desc: 'Dispatched via cold logistics transport' },
                      { title: 'Out for Delivery', desc: 'Local delivery partner en route' },
                      { title: 'Delivered', desc: 'Package delivered to your home' }
                    ].map((step, idx) => {
                      const currIdx = getStepIndex(selectedOrder.status);
                      const isCompleted = currIdx >= idx + 1;
                      const isCurrent = currIdx === idx + 1;

                      return (
                        <div key={idx} className="relative">
                          <span
                            className={`absolute -left-[31px] top-0 w-4 h-4 rounded-full border-2 transition ${
                              isCompleted
                                ? 'bg-agri-600 border-white ring-2 ring-agri-500'
                                : 'bg-earth-200 border-earth-300'
                            }`}
                          />
                          <h5 className={`text-xs font-extrabold ${isCompleted ? 'text-agri-950' : 'text-earth-400'}`}>
                            {step.title} {isCurrent && '● (Active Status)'}
                          </h5>
                          <p className="text-[11px] text-earth-500 mt-0.5">{step.desc}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Items in Order */}
                <div className="space-y-3">
                  <h4 className="text-xs font-extrabold text-earth-800 uppercase">Items in this Order</h4>
                  {selectedOrder.items?.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-3 bg-earth-50 rounded-2xl text-xs">
                      <div className="flex items-center space-x-3">
                        <img src={item.image_url} alt="" className="w-10 h-10 rounded-xl object-cover" />
                        <div>
                          <p className="font-bold text-agri-950">{item.product_title}</p>
                          <p className="text-earth-500">{item.quantity} {item.unit} × ₹{item.price_per_unit}</p>
                        </div>
                      </div>
                      <span className="font-black text-agri-950">₹{item.subtotal}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        )}

        {/* WISHLIST TAB */}
        {activeTab === 'wishlist' && (
          <div className="space-y-6">
            <h3 className="text-lg font-black text-agri-950">Saved Wishlist Products</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {wishlist.map((w) => (
                w.product && (
                  <ProductCard
                    key={w.id}
                    product={w.product}
                    onSelectProduct={(p) => onSelectProduct && onSelectProduct(p)}
                  />
                )
              ))}
            </div>
          </div>
        )}

      </main>
    </div>
  );
};
