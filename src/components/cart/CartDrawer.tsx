import React from 'react';
import { X, ShoppingBag, Trash2, Plus, Minus, ArrowRight } from 'lucide-react';
import { useCart } from '../../context/CartContext';

interface CartDrawerProps {
  onProceedToCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ onProceedToCheckout }) => {
  const {
    cartItems,
    isCartOpen,
    setIsCartOpen,
    subtotal,
    deliveryFee,
    totalAmount,
    updateQuantity,
    removeFromCart
  } = useCart();

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div
        className="absolute inset-0 bg-agri-950/60 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col border-l border-agri-100 animate-in slide-in-from-right duration-300">
          
          {/* Header */}
          <div className="p-5 border-b border-earth-100 flex items-center justify-between bg-agri-50">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-agri-600 text-white rounded-xl">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-extrabold text-agri-950">Your Farm Cart</h3>
                <p className="text-xs text-earth-600 font-medium">{cartItems.length} unique items</p>
              </div>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 rounded-full text-earth-500 hover:bg-earth-200 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cartItems.length === 0 ? (
              <div className="py-20 text-center text-earth-500">
                <ShoppingBag className="w-16 h-16 mx-auto text-earth-300 mb-3" />
                <p className="text-base font-bold text-earth-800">Your cart is empty</p>
                <p className="text-xs text-earth-500 mt-1">Explore fresh crops from verified farmers.</p>
              </div>
            ) : (
              cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center space-x-4 p-3 rounded-2xl border border-earth-200 bg-white shadow-sm"
                >
                  <img
                    src={item.product?.images[0] || 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=400&q=80'}
                    alt={item.product?.title}
                    className="w-16 h-16 rounded-xl object-cover border border-earth-200"
                  />

                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-agri-950 truncate">{item.product?.title}</h4>
                    <p className="text-[11px] text-earth-500 font-semibold">
                      👨‍🌾 {item.product?.farmer?.farmer_name || 'Farmer'}
                    </p>
                    <p className="text-xs font-black text-agri-700 mt-1">
                      ₹{item.product?.price} / {item.product?.unit}
                    </p>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex flex-col items-end space-y-2">
                    <button
                      onClick={() => removeFromCart(item.product_id)}
                      className="text-rose-500 hover:text-rose-700 p-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>

                    <div className="flex items-center space-x-1.5 bg-earth-100 p-1 rounded-xl">
                      <button
                        onClick={() => updateQuantity(item.product_id, item.quantity - 1)}
                        className="w-5 h-5 rounded-md bg-white text-earth-800 flex items-center justify-center text-xs font-bold shadow-sm"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-extrabold px-1">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.product_id, item.quantity + 1)}
                        className="w-5 h-5 rounded-md bg-white text-earth-800 flex items-center justify-center text-xs font-bold shadow-sm"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Cart Footer Calculation & Checkout Button */}
          {cartItems.length > 0 && (
            <div className="p-5 border-t border-earth-100 bg-earth-50 space-y-3">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-earth-600">
                  <span>Subtotal</span>
                  <span className="font-extrabold text-earth-900">₹{subtotal}</span>
                </div>
                <div className="flex justify-between text-earth-600">
                  <span>Delivery Charge</span>
                  <span className="font-extrabold text-earth-900">
                    {deliveryFee === 0 ? <span className="text-emerald-600">FREE</span> : `₹${deliveryFee}`}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-black text-agri-950 pt-2 border-t border-earth-200">
                  <span>Total Payable</span>
                  <span className="text-agri-700">₹{totalAmount}</span>
                </div>
              </div>

              <button
                onClick={() => {
                  setIsCartOpen(false);
                  onProceedToCheckout();
                }}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-agri-600 to-agri-800 text-white font-black text-xs shadow-xl hover:brightness-110 transition flex items-center justify-center space-x-2"
              >
                <span>Proceed to 3-Step Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
