import React from 'react';
import { ShieldCheck, Coins, RefreshCw, Sparkles, HeartHandshake, Leaf } from 'lucide-react';

export const WhyChooseAgriConnect: React.FC = () => {
  const benefits = [
    {
      title: '100% Direct Farmer Pricing',
      desc: 'Eliminates 3 to 5 layers of wholesale middlemen. Farmers earn up to 40% higher income while buyers get lower prices.',
      icon: <Coins className="w-6 h-6 text-amber-500" />
    },
    {
      title: 'Certified Farm Verification',
      desc: 'Every farmer profile and farm location is physically verified by AgriConnect Kisan Agents.',
      icon: <ShieldCheck className="w-6 h-6 text-emerald-500" />
    },
    {
      title: 'Chemical-Free Freshness',
      desc: 'Harvested fresh upon order placement. No artificial waxes, harmful carbide gases or chemical sprays.',
      icon: <Leaf className="w-6 h-6 text-agri-600" />
    },
    {
      title: 'Escrow Payment Protection',
      desc: 'Payments via Razorpay remain secure until buyers confirm receipt of good quality produce.',
      icon: <HeartHandshake className="w-6 h-6 text-sky-500" />
    }
  ];

  return (
    <section className="py-16 bg-earth-100/60 px-4 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-black uppercase text-agri-700 tracking-wider bg-agri-100 px-3 py-1 rounded-full">
            Startup Mission & Values
          </span>
          <h2 className="text-3xl font-extrabold text-agri-950 mt-2 tracking-tight">
            Why Choose AgriConnect?
          </h2>
          <p className="text-sm text-earth-600 mt-2">
            Reinventing Indian Agriculture for fair trade, rural prosperity, and healthier families
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((b, i) => (
            <div key={i} className="bg-white p-6 rounded-3xl border border-earth-200 shadow-agri-card hover:border-agri-400 transition">
              <div className="w-12 h-12 rounded-2xl bg-earth-50 flex items-center justify-center mb-4 border border-earth-200">
                {b.icon}
              </div>
              <h3 className="text-base font-extrabold text-agri-950 mb-2">{b.title}</h3>
              <p className="text-xs text-earth-600 leading-relaxed">{b.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
