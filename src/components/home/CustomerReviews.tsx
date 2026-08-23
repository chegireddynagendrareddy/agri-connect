import React from 'react';
import { Quote } from 'lucide-react';
import { RatingStars } from '../common/RatingStars';

export const CustomerReviews: React.FC = () => {
  const reviews = [
    {
      name: 'Priya Sharma',
      city: 'Hyderabad, Telangana',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80',
      rating: 5,
      text: 'AgriConnect is a game changer! The Guntur Sannam chillies from Ramesh ji arrived fresh with unbelievable farm aroma. Supporting real farmers directly gives so much joy.'
    },
    {
      name: 'Vikram Malhotra',
      city: 'Mumbai, Maharashtra',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
      rating: 5,
      text: 'Received 10kg Banganapalli mangoes directly from Vijayawada orchards. Zero chemical carbide smell, naturally grass-ripened. Razorpay checkout was smooth.'
    },
    {
      name: 'Sunita Menon',
      city: 'Bengaluru, Karnataka',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
      rating: 5,
      text: 'Unpolished Basmati rice and Nashik red onions delivered within 36 hours. Quality is 100x better than supermarket stored produce.'
    }
  ];

  return (
    <section className="py-20 px-4 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <span className="text-xs font-black uppercase text-agri-600 tracking-wider bg-agri-100 px-3 py-1 rounded-full">
          Customer Stories
        </span>
        <h2 className="text-3xl font-extrabold text-agri-950 mt-2 tracking-tight">
          What Buyers Say About Us
        </h2>
        <p className="text-sm text-earth-600 mt-2">
          Thousands of Indian households trust AgriConnect for their daily kitchen farm produce
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {reviews.map((r, i) => (
          <div key={i} className="bg-white p-6 rounded-3xl border border-agri-100 shadow-agri-card relative flex flex-col justify-between">
            <Quote className="w-8 h-8 text-agri-200 mb-4" />
            <p className="text-xs text-earth-700 leading-relaxed italic mb-6">"{r.text}"</p>

            <div className="flex items-center space-x-3 pt-4 border-t border-earth-100">
              <img src={r.avatar} alt={r.name} className="w-10 h-10 rounded-full object-cover border border-agri-400" />
              <div>
                <h4 className="text-xs font-extrabold text-agri-950">{r.name}</h4>
                <p className="text-[11px] text-earth-500 font-medium">{r.city}</p>
                <div className="mt-0.5">
                  <RatingStars rating={r.rating} size="sm" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
