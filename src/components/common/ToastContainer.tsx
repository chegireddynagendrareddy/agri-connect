import React from 'react';
import { CheckCircle2, AlertCircle, AlertTriangle, Info, X } from 'lucide-react';
import { useNotification } from '../../context/NotificationContext';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useNotification();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col space-y-3 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => {
        const isSuccess = toast.type === 'success';
        const isError = toast.type === 'error';
        const isWarning = toast.type === 'warning';

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto p-4 rounded-2xl shadow-2xl border flex items-start space-x-3 transition-all duration-300 transform translate-y-0 animate-in slide-in-from-right-5 ${
              isSuccess
                ? 'bg-agri-950 text-white border-agri-600'
                : isError
                ? 'bg-rose-950 text-white border-rose-600'
                : isWarning
                ? 'bg-amber-950 text-white border-amber-500'
                : 'bg-slate-900 text-white border-slate-700'
            }`}
          >
            <div className="mt-0.5">
              {isSuccess && <CheckCircle2 className="w-5 h-5 text-emerald-400" />}
              {isError && <AlertCircle className="w-5 h-5 text-rose-400" />}
              {isWarning && <AlertTriangle className="w-5 h-5 text-amber-400" />}
              {toast.type === 'info' && <Info className="w-5 h-5 text-sky-400" />}
            </div>

            <div className="flex-1 min-w-0">
              <h5 className="text-xs font-bold leading-snug">{toast.title}</h5>
              <p className="text-xs text-slate-300 mt-0.5">{toast.message}</p>
            </div>

            <button
              onClick={() => removeToast(toast.id)}
              className="text-slate-400 hover:text-white p-1 rounded-lg transition"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
