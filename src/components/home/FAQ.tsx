import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

export const FAQ: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: 'How does AgriConnect guarantee produce freshness?',
      a: 'Produce is harvested directly from the farm only after your order is confirmed. It is packed in aerated eco-friendly boxes and shipped via direct transport within 24 to 48 hours.'
    },
    {
      q: 'How do farmers receive payment?',
      a: 'We integrate with Razorpay for instant payouts directly into verified Kisan bank accounts or UPI IDs as soon as produce delivery is confirmed.'
    },
    {
      q: 'Can buyers filter produce by organic certification or location?',
      a: 'Yes! The marketplace allows filtering by State (Andhra Pradesh, Telangana, Maharashtra, etc.), District, 100% Organic certified status, price range, and minimum order quantity.'
    },
    {
      q: 'What happens if a product arrives damaged?',
      a: 'AgriConnect offers a 100% Money-Back Guarantee. Simply upload a photo of the damaged package in your Buyer Dashboard order history for an instant refund.'
    },
    {
      q: 'How can a farmer get verified on AgriConnect?',
      a: 'Farmers register with their Kisan ID / Aadhaar card and farm location. Our regional Kisan Field Agents perform a quick location verification before issuing the "✓ Verified Farmer" badge.'
    }
  ];

  return (
    <section className="py-20 bg-earth-100/40 px-4 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-14">
          <span className="text-xs font-black uppercase text-agri-600 tracking-wider bg-agri-100 px-3 py-1 rounded-full">
            Help & Knowledge Base
          </span>
          <h2 className="text-3xl font-extrabold text-agri-950 mt-2 tracking-tight">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-earth-200 overflow-hidden shadow-sm transition"
            >
              <button
                onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
                className="w-full p-5 text-left font-extrabold text-sm text-agri-950 flex items-center justify-between hover:text-agri-600 transition"
              >
                <span className="flex items-center space-x-3">
                  <HelpCircle className="w-4 h-4 text-agri-600 flex-shrink-0" />
                  <span>{faq.q}</span>
                </span>
                <ChevronDown className={`w-4 h-4 text-earth-500 transition-transform ${openIdx === idx ? 'rotate-180 text-agri-600' : ''}`} />
              </button>

              {openIdx === idx && (
                <div className="px-5 pb-5 pt-1 text-xs text-earth-600 leading-relaxed border-t border-earth-100 bg-earth-50/50">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
