import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, Tag, Coffee, ShieldCheck, ArrowRight } from 'lucide-react';
import { CartItem, LoyaltyProfile } from '../types/cafe';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  loyalty: LoyaltyProfile;
  appliedPromo: string;
  onApplyPromo: (code: string) => void;
  onRemovePromo: () => void;
  promoDiscount: number;
  redeemedBeans: number;
  onToggleRedeemBeans: () => void;
  onUpdateQuantity: (cartItemId: string, delta: number) => void;
  onRemoveItem: (cartItemId: string) => void;
  onProceedToCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  loyalty,
  appliedPromo,
  onApplyPromo,
  onRemovePromo,
  promoDiscount,
  redeemedBeans,
  onToggleRedeemBeans,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
}) => {
  const [promoInput, setPromoInput] = useState('');
  const [promoError, setPromoError] = useState('');

  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.totalPrice, 0);
  const beansDiscount = redeemedBeans; // 1 bean = ₹1
  const deliveryFee = subtotal > 500 || subtotal === 0 ? 0 : 40;
  const taxes = Math.round(subtotal * 0.05); // 5% GST
  const grandTotal = Math.max(0, subtotal - promoDiscount - beansDiscount + deliveryFee + taxes);

  const handleApplyPromoCode = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError('');
    const code = promoInput.trim().toUpperCase();
    if (!code) return;
    if (code === 'WELCOME15' || code === 'BREWCLUB' || code === 'MONSOON20') {
      onApplyPromo(code);
      setPromoInput('');
    } else {
      setPromoError('Invalid coupon code. Try WELCOME15 or BREWCLUB');
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="cart-drawer-heading"
      className="fixed inset-0 z-50 overflow-hidden bg-stone-900/60 backdrop-blur-xs flex justify-end animate-in fade-in duration-200"
    >
      <div className="w-full max-w-md bg-[#FAF8F5] h-full shadow-2xl flex flex-col justify-between border-l border-stone-200 animate-in slide-in-from-right duration-300">
        
        {/* Drawer Header */}
        <div className="p-5 border-b border-stone-200 flex items-center justify-between bg-white">
          <div className="flex items-center gap-2">
            <h2 id="cart-drawer-heading" className="font-serif-display text-xl font-bold text-stone-900">
              Your Order Bag
            </h2>
            <span className="text-xs text-stone-500 font-mono tabular-nums">
              ({items.reduce((acc, i) => acc + i.quantity, 0)} items)
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg text-stone-500 hover:text-stone-900 hover:bg-stone-100 transition-colors cursor-pointer"
            aria-label="Close cart"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Drawer Body */}
        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
            <div className="w-16 h-16 rounded-full bg-amber-100/60 flex items-center justify-center text-amber-900 mb-4">
              <Coffee className="w-8 h-8 opacity-80" />
            </div>
            <h3 className="font-serif-display text-lg font-bold text-stone-800 mb-1">
              Your bag is empty
            </h3>
            <p className="text-xs text-stone-500 max-w-xs mb-6">
              Add some freshly pulled flat whites, wood-fired sourdough pizzas, or flaky bakery treats.
            </p>
            <button
              onClick={onClose}
              className="px-5 py-2.5 bg-amber-900 text-white rounded-xl text-xs font-semibold hover:bg-amber-800 transition-colors"
            >
              Explore Menu
            </button>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto p-5 space-y-6">
            
            {/* Delivery threshold indicator */}
            <div className="bg-amber-50/70 border border-amber-200/80 rounded-xl p-3 text-xs text-amber-900">
              {subtotal >= 500 ? (
                <div className="flex items-center gap-2 font-medium text-emerald-800">
                  <span>🎉 Free Doorstep Delivery unlocked!</span>
                </div>
              ) : (
                <div>
                  Add <span className="font-mono font-bold">₹{500 - subtotal}</span> more for <strong className="font-semibold">FREE Delivery</strong>
                  <div className="w-full bg-amber-200/60 h-1.5 rounded-full mt-2 overflow-hidden">
                    <div
                      className="bg-amber-800 h-full rounded-full transition-all"
                      style={{ width: `${Math.min(100, (subtotal / 500) * 100)}%` }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Itemized List */}
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.cartItemId}
                  className="bg-white p-3.5 rounded-xl border border-stone-200/90 shadow-2xs flex gap-3"
                >
                  <img
                    src={item.menuItem.image}
                    alt={item.menuItem.name}
                    className="w-16 h-16 rounded-lg object-cover shrink-0"
                  />

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-1">
                      <h4 className="font-medium text-xs text-stone-900 truncate">
                        {item.menuItem.name}
                      </h4>
                      <button
                        onClick={() => onRemoveItem(item.cartItemId)}
                        className="text-stone-400 hover:text-rose-600 transition-colors p-0.5"
                        title="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Custom options list */}
                    {item.selectedOptions.length > 0 && (
                      <p className="text-[11px] text-stone-500 mt-0.5 line-clamp-2">
                        {item.selectedOptions.map((o) => o.optionLabel).join(', ')}
                      </p>
                    )}

                    {item.notes && (
                      <p className="text-[10px] text-amber-800 italic mt-0.5">
                        Note: {item.notes}
                      </p>
                    )}

                    <div className="flex items-center justify-between mt-3">
                      <span className="font-mono tabular-nums text-xs font-bold text-stone-900">
                        ₹{item.totalPrice}
                      </span>

                      {/* Stepper */}
                      <div className="flex items-center gap-2 bg-stone-100 px-2 py-1 rounded-lg">
                        <button
                          onClick={() => onUpdateQuantity(item.cartItemId, -1)}
                          className="text-stone-600 hover:text-stone-900 p-0.5"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="font-mono text-xs font-bold text-stone-900 w-3 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.cartItemId, 1)}
                          className="text-stone-600 hover:text-stone-900 p-0.5"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Brew Club Loyalty Beans Redemption */}
            {loyalty.beans > 0 && (
              <div className="bg-stone-100 p-3.5 rounded-xl border border-stone-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Coffee className="w-4 h-4 text-amber-900" />
                    <div>
                      <p className="text-xs font-bold text-stone-900">Brew Club Rewards</p>
                      <p className="text-[11px] text-stone-500">
                        Available: <span className="font-mono font-bold text-amber-900">{loyalty.beans} Beans</span> (1 Bean = ₹1)
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={onToggleRedeemBeans}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                      redeemedBeans > 0
                        ? 'bg-amber-900 text-white'
                        : 'bg-white text-stone-800 border border-stone-300 hover:bg-stone-50'
                    }`}
                  >
                    {redeemedBeans > 0 ? `Redeemed (-₹${redeemedBeans})` : 'Redeem 50 Beans'}
                  </button>
                </div>
              </div>
            )}

            {/* Promo Voucher Form */}
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-700">
                Apply Coupon or Voucher
              </label>

              {appliedPromo ? (
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs">
                  <div className="flex items-center gap-2">
                    <Tag className="w-3.5 h-3.5 text-emerald-700" />
                    <span>
                      Code <strong className="font-mono font-bold">{appliedPromo}</strong> applied (-₹{promoDiscount})
                    </span>
                  </div>
                  <button
                    onClick={onRemovePromo}
                    className="text-stone-400 hover:text-rose-600 text-[11px] font-semibold underline cursor-pointer"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyPromoCode} className="flex gap-2">
                  <input
                    type="text"
                    value={promoInput}
                    onChange={(e) => {
                      setPromoInput(e.target.value);
                      setPromoError('');
                    }}
                    placeholder="Enter code: WELCOME15"
                    className="flex-1 bg-white border border-stone-200 rounded-lg px-3 py-2 text-xs uppercase font-mono tracking-wider focus:outline-none focus:ring-1 focus:ring-amber-900"
                  />
                  <button
                    type="submit"
                    className="px-3.5 py-2 bg-stone-900 hover:bg-stone-800 text-white rounded-lg text-xs font-semibold transition-colors cursor-pointer"
                  >
                    Apply
                  </button>
                </form>
              )}

              {promoError && (
                <p className="text-[11px] text-rose-600 font-medium">{promoError}</p>
              )}
            </div>

            {/* Bill Summary */}
            <div className="bg-white p-4 rounded-xl border border-stone-200 space-y-2 text-xs text-stone-600">
              <h4 className="font-bold text-stone-900 text-xs uppercase tracking-wider mb-2">
                Bill Summary
              </h4>
              <div className="flex justify-between">
                <span>Items Subtotal</span>
                <span className="font-mono tabular-nums text-stone-900">₹{subtotal}</span>
              </div>

              {promoDiscount > 0 && (
                <div className="flex justify-between text-emerald-700">
                  <span>Coupon Discount ({appliedPromo})</span>
                  <span className="font-mono tabular-nums">-₹{promoDiscount}</span>
                </div>
              )}

              {redeemedBeans > 0 && (
                <div className="flex justify-between text-amber-800">
                  <span>Beans Redemption ({redeemedBeans} Beans)</span>
                  <span className="font-mono tabular-nums">-₹{beansDiscount}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Doorstep Eco-Delivery</span>
                <span className="font-mono tabular-nums text-stone-900">
                  {deliveryFee === 0 ? <strong className="text-emerald-700">FREE</strong> : `₹${deliveryFee}`}
                </span>
              </div>

              <div className="flex justify-between">
                <span>Restaurant Packaging & GST (5%)</span>
                <span className="font-mono tabular-nums text-stone-900">₹{taxes}</span>
              </div>

              <div className="pt-2 border-t border-stone-200 flex justify-between items-baseline font-bold text-stone-900 text-sm">
                <span>Grand Total</span>
                <span className="font-mono tabular-nums text-base text-amber-950">
                  ₹{grandTotal}
                </span>
              </div>
            </div>

          </div>
        )}

        {/* Drawer Footer with Checkout CTA */}
        {items.length > 0 && (
          <div className="p-4 bg-white border-t border-stone-200 space-y-2">
            <div className="flex items-center justify-between text-xs text-stone-500 mb-1">
              <div className="flex items-center gap-1.5 text-stone-700">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>256-bit Secure Gateway</span>
              </div>
              <span className="text-[11px] text-amber-900 font-medium">
                Earn +{Math.round(grandTotal / 10)} Beans on this order
              </span>
            </div>

            <button
              onClick={() => {
                onClose();
                onProceedToCheckout();
              }}
              className="w-full py-3.5 px-4 bg-amber-900 hover:bg-amber-800 text-white rounded-xl font-bold text-xs flex items-center justify-between shadow-md transition-all cursor-pointer active:scale-98"
            >
              <span>Proceed to Checkout</span>
              <div className="flex items-center gap-2">
                <span className="font-mono tabular-nums text-sm">₹{grandTotal}</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
