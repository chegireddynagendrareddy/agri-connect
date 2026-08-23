import React from 'react';
import { X, Bell, CheckCircle2, Clock, ShoppingBag, ShieldAlert } from 'lucide-react';
import { useNotification } from '../../context/NotificationContext';

interface NotificationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  setActiveTab?: (tab: string) => void;
}

export const NotificationDrawer: React.FC<NotificationDrawerProps> = ({
  isOpen,
  onClose,
  setActiveTab
}) => {
  const { notifications, markAsRead } = useNotification();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity" onClick={onClose} />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col border-l border-agri-100 animate-in slide-in-from-right duration-300">
          {/* Header */}
          <div className="p-5 border-b border-earth-100 flex items-center justify-between bg-agri-50/50">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-agri-100 rounded-xl text-agri-700">
                <Bell className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-extrabold text-agri-950">Notifications Center</h3>
                <p className="text-xs text-earth-600">Live order & farm updates</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full text-earth-500 hover:bg-earth-200 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {notifications.length === 0 ? (
              <div className="py-16 text-center text-earth-500">
                <Bell className="w-12 h-12 mx-auto text-earth-300 mb-3" />
                <p className="text-sm font-bold">No notifications yet</p>
                <p className="text-xs text-earth-400 mt-1">Order confirmations and harvest alerts will appear here.</p>
              </div>
            ) : (
              notifications.map((notif) => (
                <div
                  key={notif.id}
                  onClick={() => {
                    markAsRead(notif.id);
                    if (notif.link && setActiveTab) {
                      if (notif.link.includes('buyer')) setActiveTab('buyer_dashboard');
                      else if (notif.link.includes('farmer')) setActiveTab('farmer_dashboard');
                      else if (notif.link.includes('admin')) setActiveTab('admin_dashboard');
                      onClose();
                    }
                  }}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                    notif.is_read
                      ? 'bg-white border-earth-200 opacity-75'
                      : 'bg-agri-50/60 border-agri-300 shadow-sm'
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <div className="mt-0.5">
                      {notif.type === 'success' && <CheckCircle2 className="w-5 h-5 text-emerald-600" />}
                      {notif.type === 'warning' && <ShieldAlert className="w-5 h-5 text-amber-600" />}
                      {notif.type === 'info' && <ShoppingBag className="w-5 h-5 text-agri-600" />}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h5 className="text-xs font-bold text-earth-900">{notif.title}</h5>
                        <span className="text-[10px] text-earth-400 flex items-center">
                          <Clock className="w-3 h-3 mr-1" />
                          {new Date(notif.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                      <p className="text-xs text-earth-700 mt-1 leading-relaxed">{notif.message}</p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
