import React from 'react';
import { X, Tag, Sparkles, Check, ArrowRight } from 'lucide-react';
import { PROMO_OFFERS } from '../data/menuData';

interface OffersDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyOffer: (code: string) => void;
  appliedCode?: string;
}

export const OffersDrawer: React.FC<OffersDrawerProps> = ({
  isOpen,
  onClose,
  onApplyOffer,
  appliedCode,
}) => {
  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="offers-drawer-title"
      className="fixed inset-0 z-50 overflow-hidden bg-stone-900/60 backdrop-blur-xs flex justify-end animate-in fade-in duration-200"
    >
      <div className="w-full max-w-md bg-[#FAF8F5] h-full shadow-2xl flex flex-col justify-between border-l border-stone-200 animate-in slide-in-from-right duration-300">
        
        {/* Header */}
        <div className="p-5 border-b border-stone-200 flex items-center justify-between bg-white">
          <div className="flex items-center gap-2">
            <Tag className="w-4 h-4 text-amber-900" />
            <h2 id="offers-drawer-title" className="font-serif-display text-xl font-bold text-stone-900">
              Exclusive Offers & Deals
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors cursor-pointer"
            aria-label="Close offers drawer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Offers List */}
        <div className="p-5 flex-1 overflow-y-auto space-y-4">
          <p className="text-xs text-stone-500">
            Apply these limited-time promotional codes directly to your order bag for instant savings.
          </p>

          <div className="space-y-4">
            {PROMO_OFFERS.map((offer) => {
              const isApplied = appliedCode === offer.code;

              return (
                <div
                  key={offer.code}
                  className="bg-white p-4 rounded-xl border border-stone-200/90 shadow-2xs space-y-3 relative overflow-hidden"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 bg-amber-50 px-2 py-0.5 rounded-sm">
                        {offer.tag}
                      </span>
                      <h4 className="font-serif-display text-base font-bold text-stone-900 mt-1">
                        {offer.title}
                      </h4>
                    </div>

                    <div className="font-mono text-xs font-bold text-stone-900 bg-stone-100 px-2.5 py-1 rounded border border-stone-200">
                      {offer.code}
                    </div>
                  </div>

                  <p className="text-xs text-stone-600 leading-relaxed">
                    {offer.description}
                  </p>

                  <div className="pt-2 border-t border-stone-100 flex items-center justify-between">
                    <span className="text-[11px] text-stone-400">
                      Min. Order: ₹{offer.minOrder}
                    </span>

                    <button
                      type="button"
                      onClick={() => {
                        onApplyOffer(offer.code);
                        onClose();
                      }}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1 cursor-pointer ${
                        isApplied
                          ? 'bg-emerald-50 text-emerald-800 border border-emerald-300'
                          : 'bg-amber-900 hover:bg-amber-800 text-white shadow-xs'
                      }`}
                    >
                      {isApplied ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Applied</span>
                        </>
                      ) : (
                        <>
                          <span>Apply to Bag</span>
                          <ArrowRight className="w-3 h-3" />
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-white border-t border-stone-200 text-center">
          <p className="text-[11px] text-stone-500">
            Coupons can be combined with Brew Club loyalty beans at checkout!
          </p>
        </div>

      </div>
    </div>
  );
};
