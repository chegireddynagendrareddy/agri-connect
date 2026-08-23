import React, { useState } from 'react';
import { X, Sprout, ShoppingBag, ShieldCheck, Mail, Lock, User, Phone, ArrowRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNotification } from '../../context/NotificationContext';
import type { UserRole } from '../../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialRole?: UserRole;
  setActiveTab: (tab: string) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  initialRole = 'buyer',
  setActiveTab
}) => {
  const { login, registerBuyer, switchRole } = useAuth();
  const { showToast } = useNotification();

  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [role, setRole] = useState<UserRole>(initialRole);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (mode === 'login') {
      if (!email) {
        showToast('Required', 'Please enter your email address', 'error');
        return;
      }
      await login(email, role);
      showToast('Welcome Back!', `Logged in successfully as ${role.toUpperCase()}`, 'success');
    } else {
      if (role === 'farmer') {
        onClose();
        setActiveTab('farmer_register');
        return;
      }
      if (!name || !email || !phone) {
        showToast('Required Fields', 'Please fill all buyer registration fields', 'error');
        return;
      }
      await registerBuyer(name, email, phone);
      showToast('Registration Complete!', 'Welcome to AgriConnect marketplace!', 'success');
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-agri-950/70 backdrop-blur-sm transition-opacity" onClick={onClose} />

      <div className="relative bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden border border-agri-100 animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-gradient-to-br from-agri-900 to-agri-950 p-6 text-white text-center relative">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-agri-300 hover:text-white p-1 rounded-full hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="w-12 h-12 rounded-2xl bg-agri-600 mx-auto flex items-center justify-center mb-3 shadow-lg shadow-agri-600/30">
            <Sprout className="w-7 h-7 text-agri-200" />
          </div>

          <h3 className="text-xl font-extrabold">AgriConnect Account</h3>
          <p className="text-xs text-agri-200/80 mt-1">Direct Farmer to Buyer Marketplace Portal</p>
        </div>

        {/* Role Selector Tabs */}
        <div className="p-6">
          <div className="grid grid-cols-2 gap-2 p-1 bg-earth-100 rounded-2xl mb-6">
            <button
              onClick={() => setRole('buyer')}
              className={`py-2.5 rounded-xl text-xs font-extrabold flex items-center justify-center space-x-2 transition ${
                role === 'buyer' ? 'bg-white text-agri-900 shadow-sm' : 'text-earth-600 hover:text-earth-900'
              }`}
            >
              <ShoppingBag className="w-4 h-4 text-agri-600" />
              <span>Buyer</span>
            </button>
            <button
              onClick={() => setRole('farmer')}
              className={`py-2.5 rounded-xl text-xs font-extrabold flex items-center justify-center space-x-2 transition ${
                role === 'farmer' ? 'bg-amber-600 text-white shadow-sm' : 'text-earth-600 hover:text-earth-900'
              }`}
            >
              <Sprout className="w-4 h-4" />
              <span>Farmer</span>
            </button>
          </div>

          {/* Quick Demo Login Preset Buttons */}
          <div className="mb-6 p-3 rounded-2xl bg-agri-50 border border-agri-200">
            <p className="text-[11px] font-bold text-agri-900 uppercase tracking-wider mb-2">⚡ Instant Demo One-Click Sign In:</p>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => {
                  switchRole('buyer');
                  showToast('Signed in', 'Logged in as Priya Sharma (Buyer)', 'success');
                  onClose();
                }}
                className="py-1.5 px-2 bg-white rounded-xl border text-[11px] font-bold text-agri-800 hover:bg-agri-100"
              >
                🛒 Buyer
              </button>
              <button
                type="button"
                onClick={() => {
                  switchRole('farmer');
                  showToast('Signed in', 'Logged in as Ramesh Kumar (Farmer)', 'success');
                  onClose();
                }}
                className="py-1.5 px-2 bg-white rounded-xl border text-[11px] font-bold text-amber-800 hover:bg-amber-100"
              >
                🌾 Farmer
              </button>
              <button
                type="button"
                onClick={() => {
                  switchRole('admin');
                  showToast('Signed in', 'Logged in as AgriConnect Admin', 'success');
                  onClose();
                }}
                className="py-1.5 px-2 bg-white rounded-xl border text-[11px] font-bold text-rose-800 hover:bg-rose-100"
              >
                🛡️ Admin
              </button>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'register' && role === 'buyer' && (
              <div>
                <label className="block text-xs font-bold text-earth-800 mb-1">Full Name</label>
                <div className="relative">
                  <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-earth-400" />
                  <input
                    type="text"
                    required
                    placeholder="Priya Sharma"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-earth-50 border border-earth-300 rounded-xl pl-9 pr-3 py-2 text-xs focus:ring-2 focus:ring-agri-500"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-earth-800 mb-1">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-earth-400" />
                <input
                  type="email"
                  required
                  placeholder="ramesh.guntur@agriconnect.in"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-earth-50 border border-earth-300 rounded-xl pl-9 pr-3 py-2 text-xs focus:ring-2 focus:ring-agri-500"
                />
              </div>
            </div>

            {mode === 'register' && role === 'buyer' && (
              <div>
                <label className="block text-xs font-bold text-earth-800 mb-1">Mobile Number</label>
                <div className="relative">
                  <Phone className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-earth-400" />
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-earth-50 border border-earth-300 rounded-xl pl-9 pr-3 py-2 text-xs focus:ring-2 focus:ring-agri-500"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-earth-800 mb-1">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-earth-400" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-earth-50 border border-earth-300 rounded-xl pl-9 pr-3 py-2 text-xs focus:ring-2 focus:ring-agri-500"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-agri-600 to-agri-800 text-white font-extrabold text-xs shadow-lg shadow-agri-600/20 hover:brightness-110 transition flex items-center justify-center space-x-2"
            >
              <span>{mode === 'login' ? `Login as ${role.toUpperCase()}` : role === 'farmer' ? 'Proceed to Farmer Profile Registration' : 'Register Buyer Account'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Toggle Login/Register */}
          <div className="mt-4 text-center">
            {mode === 'login' ? (
              <p className="text-xs text-earth-600">
                New to AgriConnect?{' '}
                <button
                  onClick={() => setMode('register')}
                  className="text-agri-700 font-bold hover:underline"
                >
                  Create an Account
                </button>
              </p>
            ) : (
              <p className="text-xs text-earth-600">
                Already registered?{' '}
                <button
                  onClick={() => setMode('login')}
                  className="text-agri-700 font-bold hover:underline"
                >
                  Sign In Here
                </button>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
