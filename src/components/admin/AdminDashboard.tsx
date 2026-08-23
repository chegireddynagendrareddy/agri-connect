import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Users, 
  Sprout, 
  Package, 
  ShoppingBag, 
  IndianRupee, 
  CheckCircle2, 
  XCircle, 
  Trash2, 
  AlertTriangle,
  BarChart3,
  TrendingUp,
  LogOut
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNotification } from '../../context/NotificationContext';
import { dbService } from '../../services/dbService';
import type { AdminStats, FarmerProfile, Product, UserProfile } from '../../types';

export const AdminDashboard: React.FC = () => {
  const { logout } = useAuth();
  const { showToast } = useNotification();

  const [activeTab, setActiveTab] = useState<'overview' | 'approvals' | 'farmers' | 'users'>('overview');
  
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [farmers, setFarmers] = useState<FarmerProfile[]>([]);
  const [users, setUsers] = useState<UserProfile[]>([]);

  const loadAdminData = async () => {
    const [s, p, f, u] = await Promise.all([
      dbService.getAdminStats(),
      dbService.getProducts({ status: undefined }),
      dbService.getFarmers(),
      Promise.resolve([
        { id: 'usr_farmer_1', email: 'ramesh.guntur@agriconnect.in', full_name: 'Ramesh Kumar', role: 'farmer', created_at: '2024-01-15' },
        { id: 'usr_farmer_2', email: 'suresh.reddy@agriconnect.in', full_name: 'Suresh Reddy', role: 'farmer', created_at: '2024-02-10' },
        { id: 'usr_buyer_1', email: 'priya.sharma@gmail.com', full_name: 'Priya Sharma', role: 'buyer', created_at: '2024-04-01' }
      ] as UserProfile[])
    ]);
    setStats(s);
    setProducts(p);
    setFarmers(f);
    setUsers(u);
  };

  useEffect(() => {
    loadAdminData();
  }, []);

  const handleApproveProduct = async (id: string) => {
    await dbService.approveProduct(id);
    showToast('Product Approved! 🟢', 'Listing is now live in marketplace', 'success');
    loadAdminData();
  };

  const handleRejectProduct = async (id: string) => {
    await dbService.rejectProduct(id);
    showToast('Product Rejected 🔴', 'Farmer notified to revise details', 'warning');
    loadAdminData();
  };

  const pendingProducts = products.filter((p) => p.status === 'pending');

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col md:flex-row">
      
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-slate-950 p-6 flex flex-col justify-between border-r border-slate-800">
        <div>
          <div className="flex items-center space-x-3 mb-8">
            <div className="w-10 h-10 rounded-2xl bg-amber-500 flex items-center justify-center text-slate-950 font-black text-xl">
              🛡️
            </div>
            <div>
              <h4 className="text-sm font-black text-white">Admin Portal</h4>
              <p className="text-[10px] text-amber-400 font-bold uppercase">Super Governance</p>
            </div>
          </div>

          <nav className="space-y-1.5 text-xs font-bold">
            {[
              { id: 'overview', label: 'Platform Analytics', icon: <BarChart3 className="w-4 h-4" /> },
              { id: 'approvals', label: `Crop Approvals (${pendingProducts.length})`, icon: <CheckCircle2 className="w-4 h-4" /> },
              { id: 'farmers', label: 'Farmer Verifications', icon: <Sprout className="w-4 h-4" /> },
              { id: 'users', label: 'User Directory', icon: <Users className="w-4 h-4" /> }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-2xl transition ${
                  activeTab === tab.id
                    ? 'bg-amber-500 text-slate-950 shadow-lg font-black'
                    : 'text-slate-400 hover:bg-slate-900 hover:text-white'
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
          className="mt-8 w-full flex items-center space-x-2 px-4 py-3 rounded-2xl bg-rose-950/40 text-rose-400 text-xs font-bold border border-rose-900/50"
        >
          <LogOut className="w-4 h-4" />
          <span>Exit Admin</span>
        </button>
      </aside>

      {/* Main Panel */}
      <main className="flex-1 p-6 lg:p-10 space-y-8 overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between bg-slate-800 p-6 rounded-3xl border border-slate-700">
          <div>
            <h1 className="text-2xl font-black text-white">Marketplace Control Center</h1>
            <p className="text-xs text-slate-400 mt-1">Supervise crop product approvals, farmer verifications and platform GMV</p>
          </div>
          <span className="px-3.5 py-1.5 rounded-full bg-emerald-950 text-emerald-400 text-xs font-black border border-emerald-800">
            ● System Health 100% Active
          </span>
        </div>

        {/* OVERVIEW TAB */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* KPI Cards */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              <div className="bg-slate-800 p-4 rounded-3xl border border-slate-700">
                <span className="text-[11px] font-bold text-slate-400 uppercase">Total Users</span>
                <p className="text-2xl font-black text-white mt-1">{stats?.total_users}</p>
              </div>
              <div className="bg-slate-800 p-4 rounded-3xl border border-slate-700">
                <span className="text-[11px] font-bold text-slate-400 uppercase">Total Farmers</span>
                <p className="text-2xl font-black text-amber-400 mt-1">{stats?.total_farmers}</p>
              </div>
              <div className="bg-slate-800 p-4 rounded-3xl border border-slate-700">
                <span className="text-[11px] font-bold text-slate-400 uppercase">Total Buyers</span>
                <p className="text-2xl font-black text-emerald-400 mt-1">{stats?.total_buyers}</p>
              </div>
              <div className="bg-slate-800 p-4 rounded-3xl border border-slate-700">
                <span className="text-[11px] font-bold text-slate-400 uppercase">Total Products</span>
                <p className="text-2xl font-black text-white mt-1">{stats?.total_products}</p>
              </div>
              <div className="bg-slate-800 p-4 rounded-3xl border border-slate-700">
                <span className="text-[11px] font-bold text-slate-400 uppercase">Total Orders</span>
                <p className="text-2xl font-black text-white mt-1">{stats?.total_orders}</p>
              </div>
              <div className="bg-slate-800 p-4 rounded-3xl border border-slate-700">
                <span className="text-[11px] font-bold text-slate-400 uppercase">Total Revenue</span>
                <p className="text-2xl font-black text-emerald-400 mt-1">₹{stats?.total_revenue}</p>
              </div>
            </div>
          </div>
        )}

        {/* APPROVALS TAB */}
        {activeTab === 'approvals' && (
          <div className="bg-slate-800 p-6 rounded-3xl border border-slate-700 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-black text-white">Pending Product Approvals ({pendingProducts.length})</h3>
              <p className="text-xs text-slate-400">Newly listed crops requiring quality & pricing check</p>
            </div>

            {pendingProducts.length === 0 ? (
              <div className="p-12 text-center text-slate-400">
                <CheckCircle2 className="w-12 h-12 mx-auto text-emerald-400 mb-2" />
                <p className="font-bold">No pending crop approvals</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {pendingProducts.map((p) => (
                  <div key={p.id} className="bg-slate-900 p-4 rounded-2xl border border-slate-700 flex flex-col justify-between">
                    <div>
                      <img src={p.images[0]} alt="" className="w-full h-40 object-cover rounded-xl mb-3" />
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-bold text-amber-400">Farmer: {p.farmer?.farmer_name}</span>
                        <span className="text-slate-400">{p.farmer?.location}</span>
                      </div>
                      <h4 className="text-sm font-extrabold text-white mt-1">{p.title}</h4>
                      <p className="text-xs font-black text-emerald-400 mt-1">₹{p.price} / {p.unit}</p>
                    </div>

                    <div className="pt-4 mt-4 border-t border-slate-800 flex items-center justify-end space-x-2">
                      <button
                        onClick={() => handleRejectProduct(p.id)}
                        className="px-4 py-2 bg-rose-950 text-rose-300 rounded-xl text-xs font-bold border border-rose-800"
                      >
                        Reject
                      </button>
                      <button
                        onClick={() => handleApproveProduct(p.id)}
                        className="px-5 py-2 bg-emerald-600 text-white rounded-xl text-xs font-black shadow-md hover:bg-emerald-500"
                      >
                        Approve Product
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </main>
    </div>
  );
};
