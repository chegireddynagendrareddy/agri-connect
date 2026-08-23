import React from 'react';
import { UserCheck, ShoppingBag, CreditCard, Truck, HeartHandshake } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'Farmer Harvests & Lists',
      desc: 'Verified farmers upload fresh crop details, set prices, harvest date & stock.',
      icon: <UserCheck className="w-6 h-6 text-agri-600" />
    },
    {
      num: '02',
      title: 'Buyer Browses & Orders',
      desc: 'Select fresh vegetables, spices,Basmati or fruits directly from farmer storefronts.',
      icon: <ShoppingBag className="w-6 h-6 text-agri-600" />
    },
    {
      num: '03',
      title: 'Razorpay Online Payment',
      desc: 'Secure UPI, Card, Netbanking payment held in escrow until delivery verification.',
      icon: <CreditCard className="w-6 h-6 text-amber-600" />
    },
    {
      num: '04',
      title: 'Direct Farm Transport',
      desc: 'Express temperature-controlled cold transport delivers harvest directly to your home.',
      icon: <Truck className="w-6 h-6 text-agri-600" />
    }
  ];

  return (
    <section className="py-20 px-4 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <span className="text-xs font-black uppercase text-agri-600 tracking-wider bg-agri-100 px-3 py-1 rounded-full">
          Transparent Supply Chain
        </span>
        <h2 className="text-3xl font-extrabold text-agri-950 mt-2 tracking-tight">
          How AgriConnect Works
        </h2>
        <p className="text-sm text-earth-600 mt-2">
          From Indian farm fields directly to your doorstep in 4 simple steps
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
        {steps.map((step, index) => (
          <div
            key={index}
            className="bg-white rounded-3xl p-6 border border-agri-100 shadow-agri-card hover:shadow-xl transition-all duration-300 relative group"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="w-12 h-12 rounded-2xl bg-agri-50 border border-agri-200 flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform">
                {step.icon}
              </div>
              <span className="text-3xl font-black text-earth-200 group-hover:text-agri-500 transition-colors">
                {step.num}
              </span>
            </div>

            <h3 className="text-base font-extrabold text-agri-950 mb-2">{step.title}</h3>
            <p className="text-xs text-earth-600 leading-relaxed">{step.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};
