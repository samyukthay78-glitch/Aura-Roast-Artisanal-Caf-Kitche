import React, { useState } from 'react';
import { Tag, Sparkles, X, Check } from 'lucide-react';
import { PROMO_OFFERS } from '../data/menuData';

interface OffersBannerProps {
  onApplyPromo: (code: string) => void;
  appliedCode?: string;
}

export const OffersBanner: React.FC<OffersBannerProps> = ({ onApplyPromo, appliedCode }) => {
  const [isDismissed, setIsDismissed] = useState(false);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  if (isDismissed) return null;

  const currentOffer = PROMO_OFFERS[0]; // 'WELCOME15'

  const handleCopyAndApply = (code: string) => {
    onApplyPromo(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  return (
    <aside aria-label="Special Offers" className="bg-[#2B1B15] text-[#F3ECE6] text-xs py-2 px-4 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        
        <div className="flex items-center gap-2 overflow-hidden text-ellipsis whitespace-nowrap">
          <span className="hidden sm:inline-flex items-center justify-center w-5 h-5 rounded-full bg-amber-500/20 text-amber-300">
            <Sparkles className="w-3 h-3" />
          </span>
          <p className="text-stone-200 text-xs truncate">
            <strong className="text-amber-300 font-semibold">Special Offer: </strong>
            Get 15% off your first craft order with code{' '}
            <span className="font-mono font-bold text-amber-200 tracking-wider">
              {currentOffer.code}
            </span>{' '}
            <span className="hidden md:inline text-stone-400">
              · Min spend ₹{currentOffer.minOrder}
            </span>
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => handleCopyAndApply(currentOffer.code)}
            className="px-2.5 py-1 rounded bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 border border-amber-500/40 text-[11px] font-medium transition-colors flex items-center gap-1 cursor-pointer"
          >
            {appliedCode === currentOffer.code || copiedCode === currentOffer.code ? (
              <>
                <Check className="w-3 h-3 text-emerald-400" />
                <span>Applied!</span>
              </>
            ) : (
              <>
                <Tag className="w-3 h-3" />
                <span>Apply Code</span>
              </>
            )}
          </button>

          <button
            onClick={() => setIsDismissed(true)}
            className="text-stone-400 hover:text-stone-200 p-0.5 rounded transition-colors"
            title="Dismiss announcement"
            aria-label="Dismiss banner"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </aside>
  );
};
