import React, { useState } from 'react';
import { Sprout, MapPin, User, Mail, Phone, Lock, Award, CheckCircle2, ArrowRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNotification } from '../../context/NotificationContext';

interface FarmerRegisterPageProps {
  onSuccessRedirect: () => void;
}

export const FarmerRegisterPage: React.FC<FarmerRegisterPageProps> = ({ onSuccessRedirect }) => {
  const { registerFarmer } = useAuth();
  const { showToast } = useNotification();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    farm_name: '',
    state: 'Andhra Pradesh',
    district: 'Guntur',
    village: 'Tenali',
    farm_location: 'Guntur, Andhra Pradesh',
    farm_size_acres: 10,
    years_farming: 15,
    primary_crops: 'Red Chillies, Turmeric, Cotton',
    bio: 'Direct organic cultivator growing chemical-free crops for Indian kitchens.',
    avatar_url: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const cropsArray = formData.primary_crops.split(',').map((c) => c.trim()).filter(Boolean);
      await registerFarmer({
        ...formData,
        primary_crops: cropsArray
      });
      showToast('Farmer Verification Submitted!', 'Welcome to AgriConnect. Your farm profile is now active!', 'success');
      onSuccessRedirect();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="py-12 px-4 lg:px-8 max-w-4xl mx-auto min-h-screen">
      
      {/* Banner */}
      <div className="bg-gradient-to-r from-agri-950 via-agri-900 to-agri-950 text-white p-8 rounded-3xl mb-8 shadow-2xl border border-agri-800 relative overflow-hidden">
        <div className="relative z-10 max-w-xl">
          <span className="text-xs font-black uppercase text-amber-400 tracking-wider bg-agri-800/80 px-3 py-1 rounded-full border border-agri-700">
            Kisan Merchant Onboarding
          </span>
          <h1 className="text-3xl font-black mt-2 tracking-tight">Register Your Farm Profile</h1>
          <p className="text-xs text-agri-200/90 mt-1">
            Join 25,000+ Indian farmers selling produce directly to buyers with zero middlemen fees.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-6 lg:p-10 rounded-3xl border border-agri-100 shadow-agri-card space-y-6">
        
        {/* Personal Details */}
        <div>
          <h3 className="text-sm font-black text-agri-950 uppercase tracking-wider mb-4 border-b border-earth-100 pb-2">
            1. Farmer Personal Details
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-bold text-earth-800 mb-1">Full Name *</label>
              <input
                type="text"
                required
                placeholder="Ramesh Kumar"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-earth-50 border border-earth-300 rounded-xl p-2.5 font-semibold focus:ring-2 focus:ring-agri-500"
              />
            </div>
            <div>
              <label className="block font-bold text-earth-800 mb-1">Email Address *</label>
              <input
                type="email"
                required
                placeholder="ramesh.guntur@agriconnect.in"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-earth-50 border border-earth-300 rounded-xl p-2.5 font-semibold focus:ring-2 focus:ring-agri-500"
              />
            </div>
            <div>
              <label className="block font-bold text-earth-800 mb-1">Mobile Number (Kisan ID Linked) *</label>
              <input
                type="tel"
                required
                placeholder="+91 98480 12345"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full bg-earth-50 border border-earth-300 rounded-xl p-2.5 font-semibold focus:ring-2 focus:ring-agri-500"
              />
            </div>
            <div>
              <label className="block font-bold text-earth-800 mb-1">Profile Photo URL</label>
              <input
                type="url"
                value={formData.avatar_url}
                onChange={(e) => setFormData({ ...formData, avatar_url: e.target.value })}
                className="w-full bg-earth-50 border border-earth-300 rounded-xl p-2.5 font-semibold focus:ring-2 focus:ring-agri-500"
              />
            </div>
          </div>
        </div>

        {/* Farm Metadata */}
        <div>
          <h3 className="text-sm font-black text-agri-950 uppercase tracking-wider mb-4 border-b border-earth-100 pb-2">
            2. Farm Location & Agriculture Details
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-bold text-earth-800 mb-1">Farm Name *</label>
              <input
                type="text"
                required
                placeholder="Green Valley Organics"
                value={formData.farm_name}
                onChange={(e) => setFormData({ ...formData, farm_name: e.target.value })}
                className="w-full bg-earth-50 border border-earth-300 rounded-xl p-2.5 font-semibold focus:ring-2 focus:ring-agri-500"
              />
            </div>
            <div>
              <label className="block font-bold text-earth-800 mb-1">State *</label>
              <select
                value={formData.state}
                onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                className="w-full bg-earth-50 border border-earth-300 rounded-xl p-2.5 font-semibold focus:ring-2 focus:ring-agri-500"
              >
                <option value="Andhra Pradesh">Andhra Pradesh</option>
                <option value="Telangana">Telangana</option>
                <option value="Maharashtra">Maharashtra</option>
                <option value="Karnataka">Karnataka</option>
                <option value="Punjab">Punjab</option>
              </select>
            </div>
            <div>
              <label className="block font-bold text-earth-800 mb-1">District *</label>
              <input
                type="text"
                required
                value={formData.district}
                onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                className="w-full bg-earth-50 border border-earth-300 rounded-xl p-2.5 font-semibold focus:ring-2 focus:ring-agri-500"
              />
            </div>
            <div>
              <label className="block font-bold text-earth-800 mb-1">Village / Mandal</label>
              <input
                type="text"
                value={formData.village}
                onChange={(e) => setFormData({ ...formData, village: e.target.value })}
                className="w-full bg-earth-50 border border-earth-300 rounded-xl p-2.5 font-semibold focus:ring-2 focus:ring-agri-500"
              />
            </div>
            <div>
              <label className="block font-bold text-earth-800 mb-1">Farm Size (Acres)</label>
              <input
                type="number"
                step="0.5"
                value={formData.farm_size_acres}
                onChange={(e) => setFormData({ ...formData, farm_size_acres: Number(e.target.value) })}
                className="w-full bg-earth-50 border border-earth-300 rounded-xl p-2.5 font-semibold focus:ring-2 focus:ring-agri-500"
              />
            </div>
            <div>
              <label className="block font-bold text-earth-800 mb-1">Years of Farming Experience</label>
              <input
                type="number"
                value={formData.years_farming}
                onChange={(e) => setFormData({ ...formData, years_farming: Number(e.target.value) })}
                className="w-full bg-earth-50 border border-earth-300 rounded-xl p-2.5 font-semibold focus:ring-2 focus:ring-agri-500"
              />
            </div>
          </div>

          <div className="mt-4 text-xs">
            <label className="block font-bold text-earth-800 mb-1">Primary Crops Cultivated (Comma Separated)</label>
            <input
              type="text"
              required
              placeholder="Red Chillies, Turmeric, Basmati Rice"
              value={formData.primary_crops}
              onChange={(e) => setFormData({ ...formData, primary_crops: e.target.value })}
              className="w-full bg-earth-50 border border-earth-300 rounded-xl p-2.5 font-semibold focus:ring-2 focus:ring-agri-500"
            />
          </div>

          <div className="mt-4 text-xs">
            <label className="block font-bold text-earth-800 mb-1">Farm Bio & Farming Philosophy</label>
            <textarea
              rows={3}
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              className="w-full bg-earth-50 border border-earth-300 rounded-xl p-2.5 font-semibold focus:ring-2 focus:ring-agri-500"
            ></textarea>
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-600 to-orange-600 text-white font-black text-xs shadow-xl hover:brightness-110 transition flex items-center justify-center space-x-2"
        >
          <Sprout className="w-5 h-5" />
          <span>Register Farm & Go To Dashboard</span>
          <ArrowRight className="w-4 h-4 ml-1" />
        </button>

      </form>
    </div>
  );
};
