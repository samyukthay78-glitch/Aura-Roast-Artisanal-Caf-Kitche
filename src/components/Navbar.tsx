import React from 'react';
import { ShoppingBag, Coffee, Sparkles, Calendar, MapPin, Tag } from 'lucide-react';
import { CartItem, LoyaltyProfile } from '../types/cafe';

interface NavbarProps {
  cartItems: CartItem[];
  loyalty: LoyaltyProfile;
  activeTab: 'menu' | 'reservation' | 'tracking' | 'loyalty';
  setActiveTab: (tab: 'menu' | 'reservation' | 'tracking' | 'loyalty') => void;
  onOpenCart: () => void;
  onOpenLoyalty: () => void;
  onOpenOffers: () => void;
  onOpenDifferenceGuide?: () => void;
  activeOrderCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartItems,
  loyalty,
  activeTab,
  setActiveTab,
  onOpenCart,
  onOpenLoyalty,
  onOpenOffers,
  onOpenDifferenceGuide,
  activeOrderCount,
}) => {
  const totalItemsCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotal = cartItems.reduce((sum, item) => sum + item.totalPrice, 0);

  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-stone-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Zone 1: Single element brand wordmark */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveTab('menu')}
              className="text-left group cursor-pointer focus:outline-none"
            >
              <span className="font-serif-display text-2xl sm:text-3xl font-bold tracking-tight text-stone-900 group-hover:text-amber-900 transition-colors">
                Aura & Roast
              </span>
              <span className="block text-[11px] text-amber-900/80 font-medium tracking-wide uppercase">
                Artisanal Café & Kitchen · స్వాగతం
              </span>
            </button>
          </div>

          {/* Zone 2: Clean 4-5 text nav links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-stone-700">
            <button
              onClick={() => setActiveTab('menu')}
              className={`transition-colors pb-0.5 hover:text-amber-900 cursor-pointer ${
                activeTab === 'menu'
                  ? 'text-amber-900 font-semibold border-b-2 border-amber-900'
                  : 'hover:text-stone-950'
              }`}
            >
              Menu & Ordering
            </button>

            <button
              onClick={() => setActiveTab('reservation')}
              className={`flex items-center gap-1.5 transition-colors pb-0.5 hover:text-amber-900 cursor-pointer ${
                activeTab === 'reservation'
                  ? 'text-amber-900 font-semibold border-b-2 border-amber-900'
                  : 'hover:text-stone-950'
              }`}
            >
              <Calendar className="w-4 h-4 text-amber-800/80" />
              Table Reservation
            </button>

            <button
              onClick={() => setActiveTab('tracking')}
              className={`flex items-center gap-1.5 transition-colors pb-0.5 hover:text-amber-900 cursor-pointer ${
                activeTab === 'tracking'
                  ? 'text-amber-900 font-semibold border-b-2 border-amber-900'
                  : 'hover:text-stone-950'
              }`}
            >
              <MapPin className="w-4 h-4 text-amber-800/80" />
              Live Delivery Tracking
              {activeOrderCount > 0 && (
                <span className="ml-1 px-1.5 py-0.2 bg-amber-900 text-white text-[10px] font-bold rounded-full">
                  {activeOrderCount}
                </span>
              )}
            </button>

            {onOpenDifferenceGuide && (
              <button
                onClick={onOpenDifferenceGuide}
                className="flex items-center gap-1.5 text-amber-900 font-semibold bg-amber-50 border border-amber-200/80 px-2.5 py-1 rounded-lg hover:bg-amber-100 transition-colors cursor-pointer text-xs"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-700" />
                <span>Dish Differences Guide</span>
              </button>
            )}

            <button
              onClick={onOpenOffers}
              className="flex items-center gap-1.5 text-stone-700 hover:text-amber-900 transition-colors cursor-pointer"
            >
              <Tag className="w-3.5 h-3.5 text-amber-700" />
              Offers
            </button>

            <button
              onClick={onOpenLoyalty}
              className={`flex items-center gap-1.5 transition-colors pb-0.5 hover:text-amber-900 cursor-pointer ${
                activeTab === 'loyalty'
                  ? 'text-amber-900 font-semibold border-b-2 border-amber-900'
                  : 'hover:text-stone-950'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              Brew Club
            </button>
          </nav>

          {/* Zone 3: 1-2 primary actions */}
          <div className="flex items-center gap-3">
            {/* Loyalty Beans balance pill */}
            <button
              onClick={onOpenLoyalty}
              className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-100/70 border border-amber-200/80 text-amber-950 hover:bg-amber-100 text-xs font-medium transition-colors cursor-pointer"
              title="View Brew Club Loyalty Beans"
            >
              <Coffee className="w-3.5 h-3.5 text-amber-800" />
              <span>{loyalty.beans} Beans</span>
            </button>

            {/* Cart trigger button */}
            <button
              onClick={onOpenCart}
              className="relative flex items-center gap-2 px-4 py-2.5 rounded-xl bg-stone-900 text-stone-50 hover:bg-stone-800 text-xs font-semibold tracking-wide transition-all shadow-sm active:scale-95 cursor-pointer"
              aria-label="Shopping Cart"
            >
              <ShoppingBag className="w-4 h-4 text-amber-200" />
              <span className="hidden sm:inline">Order Bag</span>
              {totalItemsCount > 0 && (
                <>
                  <span className="px-1.5 py-0.5 bg-amber-600 text-white rounded-full text-[10px] font-bold">
                    {totalItemsCount}
                  </span>
                  <span className="hidden md:inline font-mono tabular-nums text-stone-300">
                    · ₹{cartSubtotal}
                  </span>
                </>
              )}
            </button>
          </div>

        </div>

        {/* Mobile secondary navigation */}
        <div className="md:hidden flex items-center justify-around py-2 border-t border-stone-200/60 text-xs font-medium text-stone-600 overflow-x-auto">
          <button
            onClick={() => setActiveTab('menu')}
            className={`px-2 py-1 whitespace-nowrap ${activeTab === 'menu' ? 'text-amber-900 font-bold' : ''}`}
          >
            Menu
          </button>
          <button
            onClick={() => setActiveTab('reservation')}
            className={`px-2 py-1 whitespace-nowrap ${activeTab === 'reservation' ? 'text-amber-900 font-bold' : ''}`}
          >
            Reserve Table
          </button>
          <button
            onClick={() => setActiveTab('tracking')}
            className={`px-2 py-1 whitespace-nowrap flex items-center gap-1 ${activeTab === 'tracking' ? 'text-amber-900 font-bold' : ''}`}
          >
            Tracking
            {activeOrderCount > 0 && (
              <span className="w-2 h-2 rounded-full bg-amber-600 inline-block" />
            )}
          </button>
          <button
            onClick={onOpenLoyalty}
            className="px-2 py-1 whitespace-nowrap text-amber-800 font-medium"
          >
            {loyalty.beans} Beans
          </button>
          <button
            onClick={onOpenOffers}
            className="px-2 py-1 whitespace-nowrap text-stone-700"
          >
            Deals
          </button>
        </div>
      </div>
    </header>
  );
};
