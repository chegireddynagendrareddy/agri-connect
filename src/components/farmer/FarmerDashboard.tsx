import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Package, 
  PlusCircle, 
  ShoppingBag, 
  IndianRupee, 
  Warehouse, 
  UserCheck, 
  CheckCircle2, 
  Clock, 
  Trash2, 
  Edit3, 
  Sparkles, 
  AlertTriangle,
  LogOut,
  X,
  Upload,
  ArrowUpRight
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNotification } from '../../context/NotificationContext';
import { dbService } from '../../services/dbService';
import type { Category, Order, OrderStatus, Product } from '../../types';

export const FarmerDashboard: React.FC = () => {
  const { user, farmerProfile, logout } = useAuth();
  const { showToast } = useNotification();

  const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'add_product' | 'orders' | 'inventory' | 'earnings'>('overview');
  
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Add/Edit Product Modal State
  const [showProductModal, setShowProductModal] = useState<boolean>(false);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);

  const [productForm, setProductForm] = useState({
    title: '',
    category_id: 'spices',
    description: '',
    price: 200,
    unit: 'kg',
    available_quantity: 100,
    min_order_quantity: 1,
    harvest_date: new Date().toISOString().split('T')[0],
    is_organic: true,
    image_url_1: 'https://images.unsplash.com/photo-1588252303782-cb80119abd6d?auto=format&fit=crop&w=800&q=80',
    image_url_2: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=800&q=80'
  });

  const farmerId = farmerProfile?.id || 'frm_1';

  const loadDashboardData = async () => {
    setIsLoading(true);
    try {
      const [allProducts, allOrders, allCategories] = await Promise.all([
        dbService.getProducts({ farmer_id: farmerId, status: undefined }),
        dbService.getOrders({ farmer_id: farmerId }),
        dbService.getCategories()
      ]);
      setProducts(allProducts);
      setOrders(allOrders);
      setCategories(allCategories);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, [farmerId]);

  // Handle Save Product (Add or Edit)
  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    const images = [productForm.image_url_1, productForm.image_url_2].filter(Boolean);

    if (editingProductId) {
      await dbService.updateProduct(editingProductId, {
        title: productForm.title,
        category_id: productForm.category_id,
        description: productForm.description,
        price: productForm.price,
        unit: productForm.unit,
        available_quantity: productForm.available_quantity,
        min_order_quantity: productForm.min_order_quantity,
        harvest_date: productForm.harvest_date,
        is_organic: productForm.is_organic,
        images
      });
      showToast('Product Updated', 'Changes saved successfully', 'success');
    } else {
      await dbService.addProduct({
        farmer_id: farmerId,
        title: productForm.title,
        category_id: productForm.category_id,
        description: productForm.description,
        price: productForm.price,
        unit: productForm.unit,
        available_quantity: productForm.available_quantity,
        min_order_quantity: productForm.min_order_quantity,
        harvest_date: productForm.harvest_date,
        is_organic: productForm.is_organic,
        images,
        farmer: {
          id: farmerId,
          farmer_name: farmerProfile?.farmer_name || user?.full_name || 'Farmer',
          farm_name: farmerProfile?.farm_name || 'Farm Produce',
          location: farmerProfile?.district || 'Guntur',
          state: farmerProfile?.state || 'Andhra Pradesh',
          verification_status: 'verified',
          avatar_url: user?.avatar_url
        }
      });
      showToast('Product Submitted! 🌾', 'Submitted for Admin verification', 'success');
    }

    setShowProductModal(false);
    setEditingProductId(null);
    loadDashboardData();
  };

  const handleDeleteProduct = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this product listing?')) {
      await dbService.deleteProduct(id);
      showToast('Product Deleted', 'Listing removed from database', 'info');
      loadDashboardData();
    }
  };

  const handleUpdateOrderStatus = async (orderId: string, status: OrderStatus) => {
    await dbService.updateOrderStatus(orderId, status);
    showToast('Order Status Updated', `Order marked as ${status.toUpperCase()}`, 'success');
    loadDashboardData();
  };

  // Metrics Calculations
  const totalProducts = products.length;
  const activeProducts = products.filter((p) => p.status === 'approved').length;
  const totalOrders = orders.length;
  const pendingOrders = orders.filter((o) => o.status === 'confirmed' || o.status === 'processing').length;
  const totalSales = orders.reduce((sum, o) => sum + (o.payment_status === 'paid' ? o.total_amount : 0), 0);
  const totalStock = products.reduce((sum, p) => sum + p.available_quantity, 0);

  return (
    <div className="min-h-screen bg-earth-50 flex flex-col md:flex-row">
      
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-agri-950 text-white p-6 flex flex-col justify-between border-r border-agri-900">
        <div>
          <div className="flex items-center space-x-3 mb-8">
            <img
              src={user?.avatar_url || 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80'}
              alt={user?.full_name}
              className="w-12 h-12 rounded-2xl object-cover border-2 border-emerald-400"
            />
            <div className="min-w-0">
              <h4 className="text-sm font-extrabold text-white truncate">{farmerProfile?.farmer_name || user?.full_name}</h4>
              <p className="text-[11px] text-amber-300 font-bold truncate">{farmerProfile?.farm_name}</p>
              <span className="inline-block mt-0.5 text-[9px] font-black uppercase text-emerald-300 bg-emerald-950/80 px-2 py-0.2 rounded border border-emerald-500/40">
                ✓ Verified Kisan
              </span>
            </div>
          </div>

          <nav className="space-y-1.5 text-xs font-bold">
            {[
              { id: 'overview', label: 'Dashboard Overview', icon: <LayoutDashboard className="w-4 h-4" /> },
              { id: 'products', label: 'My Listed Products', icon: <Package className="w-4 h-4" /> },
              { id: 'orders', label: 'Received Orders', icon: <ShoppingBag className="w-4 h-4" /> },
              { id: 'inventory', label: 'Inventory & Stock', icon: <Warehouse className="w-4 h-4" /> },
              { id: 'earnings', label: 'Kisan Earnings ₹', icon: <IndianRupee className="w-4 h-4" /> }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-2xl transition ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-agri-600 to-emerald-600 text-white shadow-lg'
                    : 'text-agri-200/80 hover:bg-agri-900 hover:text-white'
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
          className="mt-8 w-full flex items-center space-x-2 px-4 py-3 rounded-2xl bg-rose-950/50 hover:bg-rose-900 text-rose-300 text-xs font-bold border border-rose-800/40 transition"
        >
          <LogOut className="w-4 h-4" />
          <span>Log Out Kisan Account</span>
        </button>
      </aside>

      {/* Main Dashboard Area */}
      <main className="flex-1 p-6 lg:p-10 space-y-8 overflow-y-auto">
        
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-agri-100 shadow-sm">
          <div>
            <h1 className="text-2xl font-black text-agri-950">Farmer Dashboard Portal</h1>
            <p className="text-xs text-earth-600 mt-1">Manage crops, track live buyer orders and view Razorpay earnings</p>
          </div>

          <button
            onClick={() => {
              setEditingProductId(null);
              setProductForm({
                title: '',
                category_id: 'spices',
                description: '',
                price: 150,
                unit: 'kg',
                available_quantity: 200,
                min_order_quantity: 1,
                harvest_date: new Date().toISOString().split('T')[0],
                is_organic: true,
                image_url_1: 'https://images.unsplash.com/photo-1588252303782-cb80119abd6d?auto=format&fit=crop&w=800&q=80',
                image_url_2: ''
              });
              setShowProductModal(true);
            }}
            className="px-5 py-3 rounded-2xl bg-gradient-to-r from-agri-600 to-agri-800 text-white font-extrabold text-xs shadow-lg hover:brightness-110 transition flex items-center space-x-2"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Add New Product Listing</span>
          </button>
        </div>

        {/* OVERVIEW TAB */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            
            {/* KPI Cards Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              <div className="bg-white p-4 rounded-3xl border border-earth-200 shadow-sm">
                <p className="text-[11px] font-bold text-earth-500 uppercase">Total Listed</p>
                <p className="text-2xl font-black text-agri-950 mt-1">{totalProducts}</p>
                <span className="text-[10px] text-earth-400 font-semibold">Crop items</span>
              </div>

              <div className="bg-white p-4 rounded-3xl border border-emerald-200 bg-emerald-50/30 shadow-sm">
                <p className="text-[11px] font-bold text-emerald-800 uppercase">Active Approved</p>
                <p className="text-2xl font-black text-emerald-700 mt-1">{activeProducts}</p>
                <span className="text-[10px] text-emerald-600 font-semibold">Live in shop</span>
              </div>

              <div className="bg-white p-4 rounded-3xl border border-earth-200 shadow-sm">
                <p className="text-[11px] font-bold text-earth-500 uppercase">Total Orders</p>
                <p className="text-2xl font-black text-agri-950 mt-1">{totalOrders}</p>
                <span className="text-[10px] text-earth-400 font-semibold">Buyer purchases</span>
              </div>

              <div className="bg-white p-4 rounded-3xl border border-amber-200 bg-amber-50/30 shadow-sm">
                <p className="text-[11px] font-bold text-amber-800 uppercase">Pending Packing</p>
                <p className="text-2xl font-black text-amber-700 mt-1">{pendingOrders}</p>
                <span className="text-[10px] text-amber-600 font-semibold">Needs action</span>
              </div>

              <div className="bg-white p-4 rounded-3xl border border-agri-300 bg-agri-50/50 shadow-sm">
                <p className="text-[11px] font-bold text-agri-800 uppercase">Total Sales</p>
                <p className="text-2xl font-black text-agri-800 mt-1">₹{totalSales}</p>
                <span className="text-[10px] text-agri-600 font-semibold">Razorpay payouts</span>
              </div>

              <div className="bg-white p-4 rounded-3xl border border-earth-200 shadow-sm">
                <p className="text-[11px] font-bold text-earth-500 uppercase">Total Stock</p>
                <p className="text-2xl font-black text-agri-950 mt-1">{totalStock}</p>
                <span className="text-[10px] text-earth-400 font-semibold">Units available</span>
              </div>
            </div>

            {/* Recent Orders Table */}
            <div className="bg-white p-6 rounded-3xl border border-agri-100 shadow-agri-card space-y-4">
              <h3 className="text-base font-extrabold text-agri-950">Recent Buyer Orders</h3>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-earth-200 text-earth-500 uppercase font-extrabold text-[10px]">
                      <th className="py-3 px-4">Order ID</th>
                      <th className="py-3 px-4">Buyer</th>
                      <th className="py-3 px-4">Amount</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-earth-100 font-semibold">
                    {orders.map((ord) => (
                      <tr key={ord.id} className="hover:bg-earth-50">
                        <td className="py-3 px-4 font-extrabold text-agri-950">{ord.order_number}</td>
                        <td className="py-3 px-4 text-earth-800">{ord.buyer_name}</td>
                        <td className="py-3 px-4 font-black text-agri-800">₹{ord.total_amount}</td>
                        <td className="py-3 px-4">
                          <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase bg-agri-100 text-agri-800">
                            {ord.status.replace(/_/g, ' ')}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <select
                            value={ord.status}
                            onChange={(e) => handleUpdateOrderStatus(ord.id, e.target.value as any)}
                            className="bg-earth-100 border border-earth-300 rounded-lg px-2 py-1 text-[11px] font-bold text-agri-900"
                          >
                            <option value="confirmed">Confirmed</option>
                            <option value="processing">Processing</option>
                            <option value="packed">Packed</option>
                            <option value="shipped">Shipped</option>
                            <option value="delivered">Delivered</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* PRODUCTS TAB */}
        {activeTab === 'products' && (
          <div className="bg-white p-6 rounded-3xl border border-agri-100 shadow-agri-card space-y-6">
            <h3 className="text-base font-black text-agri-950">My Crop Listings</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((p) => (
                <div key={p.id} className="bg-earth-50 rounded-2xl p-4 border border-earth-200 flex flex-col justify-between">
                  <div>
                    <img src={p.images[0]} alt="" className="w-full h-40 object-cover rounded-xl mb-3" />
                    <div className="flex items-center justify-between">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase ${
                        p.status === 'approved' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {p.status}
                      </span>
                      <span className="text-xs font-bold text-earth-600">Stock: {p.available_quantity} {p.unit}</span>
                    </div>

                    <h4 className="text-sm font-extrabold text-agri-950 mt-2">{p.title}</h4>
                    <p className="text-xs font-black text-agri-700 mt-1">₹{p.price} / {p.unit}</p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-earth-200 flex items-center justify-between">
                    <button
                      onClick={() => {
                        setEditingProductId(p.id);
                        setProductForm({
                          title: p.title,
                          category_id: p.category_id,
                          description: p.description,
                          price: p.price,
                          unit: p.unit,
                          available_quantity: p.available_quantity,
                          min_order_quantity: p.min_order_quantity,
                          harvest_date: p.harvest_date || '',
                          is_organic: p.is_organic,
                          image_url_1: p.images[0] || '',
                          image_url_2: p.images[1] || ''
                        });
                        setShowProductModal(true);
                      }}
                      className="p-2 bg-white rounded-xl text-agri-700 border hover:bg-agri-50"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteProduct(p.id)}
                      className="p-2 bg-white rounded-xl text-rose-600 border hover:bg-rose-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </main>

      {/* ADD / EDIT PRODUCT MODAL */}
      {showProductModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-agri-950/70 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 space-y-4 shadow-2xl border border-agri-100 my-8">
            <div className="flex items-center justify-between border-b border-earth-100 pb-3">
              <h3 className="text-base font-black text-agri-950">
                {editingProductId ? 'Edit Product Listing' : 'Add New Agricultural Crop Listing'}
              </h3>
              <button onClick={() => setShowProductModal(false)} className="text-earth-500 hover:text-earth-800">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-earth-800 mb-1">Product Title *</label>
                <input
                  type="text"
                  required
                  placeholder="Guntur Special Sun-Dried Red Chillies"
                  value={productForm.title}
                  onChange={(e) => setProductForm({ ...productForm, title: e.target.value })}
                  className="w-full bg-earth-50 border border-earth-300 rounded-xl p-2.5 font-semibold"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-earth-800 mb-1">Category *</label>
                  <select
                    value={productForm.category_id}
                    onChange={(e) => setProductForm({ ...productForm, category_id: e.target.value })}
                    className="w-full bg-earth-50 border border-earth-300 rounded-xl p-2.5 font-semibold"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>{c.icon} {c.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-earth-800 mb-1">Price Per Unit (₹) *</label>
                  <input
                    type="number"
                    required
                    value={productForm.price}
                    onChange={(e) => setProductForm({ ...productForm, price: Number(e.target.value) })}
                    className="w-full bg-earth-50 border border-earth-300 rounded-xl p-2.5 font-semibold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold text-earth-800 mb-1">Unit *</label>
                  <select
                    value={productForm.unit}
                    onChange={(e) => setProductForm({ ...productForm, unit: e.target.value })}
                    className="w-full bg-earth-50 border border-earth-300 rounded-xl p-2.5 font-semibold"
                  >
                    <option value="kg">kg</option>
                    <option value="quintal">quintal</option>
                    <option value="crate">crate</option>
                    <option value="dozen">dozen</option>
                    <option value="bunch">bunch</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-earth-800 mb-1">Available Quantity *</label>
                  <input
                    type="number"
                    required
                    value={productForm.available_quantity}
                    onChange={(e) => setProductForm({ ...productForm, available_quantity: Number(e.target.value) })}
                    className="w-full bg-earth-50 border border-earth-300 rounded-xl p-2.5 font-semibold"
                  />
                </div>
                <div>
                  <label className="block font-bold text-earth-800 mb-1">Min Order Qty</label>
                  <input
                    type="number"
                    value={productForm.min_order_quantity}
                    onChange={(e) => setProductForm({ ...productForm, min_order_quantity: Number(e.target.value) })}
                    className="w-full bg-earth-50 border border-earth-300 rounded-xl p-2.5 font-semibold"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-earth-800 mb-1">Harvest Date</label>
                <input
                  type="date"
                  value={productForm.harvest_date}
                  onChange={(e) => setProductForm({ ...productForm, harvest_date: e.target.value })}
                  className="w-full bg-earth-50 border border-earth-300 rounded-xl p-2.5 font-semibold"
                />
              </div>

              <div>
                <label className="block font-bold text-earth-800 mb-1">Crop Image URL 1 *</label>
                <input
                  type="url"
                  required
                  value={productForm.image_url_1}
                  onChange={(e) => setProductForm({ ...productForm, image_url_1: e.target.value })}
                  className="w-full bg-earth-50 border border-earth-300 rounded-xl p-2.5 font-semibold"
                />
              </div>

              <div>
                <label className="block font-bold text-earth-800 mb-1">Description</label>
                <textarea
                  rows={3}
                  value={productForm.description}
                  onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                  className="w-full bg-earth-50 border border-earth-300 rounded-xl p-2.5 font-semibold"
                ></textarea>
              </div>

              <label className="flex items-center space-x-2 font-bold text-earth-800 cursor-pointer pt-2">
                <input
                  type="checkbox"
                  checked={productForm.is_organic}
                  onChange={(e) => setProductForm({ ...productForm, is_organic: e.target.checked })}
                  className="w-4 h-4 text-agri-600 rounded"
                />
                <span>100% Certified Organic Crop</span>
              </label>

              <div className="pt-3 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowProductModal(false)}
                  className="px-4 py-2.5 bg-earth-100 font-bold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-agri-600 text-white font-extrabold rounded-xl shadow-md"
                >
                  Submit Listing
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
