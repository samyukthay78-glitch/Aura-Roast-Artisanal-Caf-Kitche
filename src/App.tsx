import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { OffersBanner } from './components/OffersBanner';
import { HeroSection } from './components/HeroSection';
import { MenuSection } from './components/MenuSection';
import { ItemCustomizerModal } from './components/ItemCustomizerModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { DeliveryTracker } from './components/DeliveryTracker';
import { TableReservationModal } from './components/TableReservationModal';
import { LoyaltyRewardsModal } from './components/LoyaltyRewardsModal';
import { OffersDrawer } from './components/OffersDrawer';
import { Footer } from './components/Footer';

import { 
  MenuItem, CartItem, SelectedOption, DeliveryOrder, 
  OrderStatus, TableReservation, LoyaltyProfile 
} from './types/cafe';
import { MENU_ITEMS, PROMO_OFFERS } from './data/menuData';

export default function App() {
  // Navigation tab state: 'menu' | 'reservation' | 'tracking' | 'loyalty'
  const [activeTab, setActiveTab] = useState<'menu' | 'reservation' | 'tracking' | 'loyalty'>('menu');

  // Cart state
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    // Initial pre-loaded favorite items to show rich cart immediately if desired
    const item1 = MENU_ITEMS[0]; // Velvet Flat White
    const item2 = MENU_ITEMS[4]; // French Butter Croissant
    return [
      {
        cartItemId: 'init-1',
        menuItem: item1,
        selectedOptions: [
          { groupId: 'milk', groupName: 'Milk', optionId: 'oat', optionLabel: 'Barista Oat Milk', price: 50 },
          { groupId: 'temp', groupName: 'Temperature', optionId: 'hot', optionLabel: 'Hot (Silky Microfoam)', price: 0 }
        ],
        quantity: 1,
        unitPrice: 290,
        totalPrice: 290,
      },
      {
        cartItemId: 'init-2',
        menuItem: item2,
        selectedOptions: [
          { groupId: 'warmth', groupName: 'Warmth', optionId: 'warmed', optionLabel: 'Warm & Crispy', price: 0 }
        ],
        quantity: 1,
        unitPrice: 220,
        totalPrice: 220,
      }
    ];
  });

  // Loyalty Program state
  const [loyalty, setLoyalty] = useState<LoyaltyProfile>({
    beans: 160,
    tier: 'Silver Roast',
    tierProgress: 65,
    beansToNextTier: 90,
    lifetimeBeans: 410,
    memberId: 'AR-70892',
    joinedDate: 'Jan 2026',
  });

  // Active Promo Code
  const [appliedPromo, setAppliedPromo] = useState<string>('WELCOME15');
  const [redeemedBeans, setRedeemedBeans] = useState<number>(0);

  // Active Delivery Orders (initialized with a realistic active order so user can immediately view live tracking)
  const [orders, setOrders] = useState<DeliveryOrder[]>([
    {
      id: 'demo-order-1',
      orderNumber: 'AR-4819',
      createdAt: 'Just now',
      items: [
        {
          cartItemId: 'demo-c1',
          menuItem: MENU_ITEMS[7], // Burrata Margherita Pizza
          selectedOptions: [
            { groupId: 'crust', groupName: 'Crust Style', optionId: 'garlic_butter', optionLabel: 'Garlic Herb Butter Crust', price: 50 },
            { groupId: 'extra_toppings', groupName: 'Extra Add-ons', optionId: 'hot_honey', optionLabel: 'Calabrian Hot Chili Honey', price: 50 }
          ],
          quantity: 1,
          unitPrice: 620,
          totalPrice: 620,
        },
        {
          cartItemId: 'demo-c2',
          menuItem: MENU_ITEMS[0], // Velvet Flat White
          selectedOptions: [
            { groupId: 'milk', groupName: 'Milk', optionId: 'whole', optionLabel: 'Farm Whole Milk', price: 0 }
          ],
          quantity: 2,
          unitPrice: 240,
          totalPrice: 480,
        }
      ],
      subtotal: 1100,
      discount: 165,
      couponCode: 'WELCOME15',
      deliveryFee: 0,
      taxes: 55,
      total: 990,
      status: 'on_the_way',
      estimatedMinutes: 18,
      customerName: 'Samyuktha Y.',
      phone: '+91 98480 12345',
      deliveryAddress: 'Flat 402, Oakwood Residences, Jubilee Hills, Hyderabad',
      paymentMethod: 'upi',
      paymentStatus: 'paid',
      riderName: 'Kiran Reddy',
      riderPhone: '+91 98765 43210',
      riderVehicle: 'Ather 450X (Electric) · TS 09 EA 4120',
      riderRating: 4.9,
    }
  ]);

  // Modal visibility states
  const [customizingItem, setCustomizingItem] = useState<MenuItem | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isReservationOpen, setIsReservationOpen] = useState(false);
  const [isLoyaltyOpen, setIsLoyaltyOpen] = useState(false);
  const [isOffersOpen, setIsOffersOpen] = useState(false);

  // Notification toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Cart pricing calculations
  const subtotal = cartItems.reduce((sum, item) => sum + item.totalPrice, 0);

  // Promo discount calculation
  let promoDiscount = 0;
  if (appliedPromo) {
    const offer = PROMO_OFFERS.find((o) => o.code === appliedPromo);
    if (offer && subtotal >= offer.minOrder) {
      if (offer.discountType === 'percentage') {
        promoDiscount = Math.round((subtotal * offer.discountValue) / 100);
      } else {
        promoDiscount = offer.discountValue;
      }
    }
  }

  const deliveryFee = subtotal > 500 || subtotal === 0 ? 0 : 40;
  const taxes = Math.round(subtotal * 0.05);
  const grandTotal = Math.max(0, subtotal - promoDiscount - redeemedBeans + deliveryFee + taxes);

  // Cart management handlers
  const handleAddToCart = (
    item: MenuItem,
    selectedOptions: SelectedOption[],
    quantity: number,
    notes?: string,
    unitPrice?: number
  ) => {
    const finalUnitPrice = unitPrice ?? item.price;
    const newItem: CartItem = {
      cartItemId: `${item.id}-${Date.now()}`,
      menuItem: item,
      selectedOptions,
      quantity,
      notes,
      unitPrice: finalUnitPrice,
      totalPrice: finalUnitPrice * quantity,
    };

    setCartItems((prev) => [...prev, newItem]);
    showToast(`Added ${quantity}x ${item.name} to order bag`);
  };

  const handleQuickAdd = (item: MenuItem) => {
    // If item has required options, open customizer modal
    const hasRequired = item.customizationGroups?.some((g) => g.required);
    if (hasRequired) {
      setCustomizingItem(item);
    } else {
      handleAddToCart(item, [], 1);
    }
  };

  const handleUpdateQuantity = (cartItemId: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((it) => {
          if (it.cartItemId === cartItemId) {
            const newQ = it.quantity + delta;
            return newQ > 0
              ? { ...it, quantity: newQ, totalPrice: it.unitPrice * newQ }
              : null;
          }
          return it;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveCartItem = (cartItemId: string) => {
    setCartItems((prev) => prev.filter((it) => it.cartItemId !== cartItemId));
    showToast('Item removed from order bag');
  };

  const handleApplyPromo = (code: string) => {
    const offer = PROMO_OFFERS.find((o) => o.code === code);
    if (offer) {
      setAppliedPromo(code);
      showToast(`Coupon ${code} applied successfully!`);
    }
  };

  const handleRemovePromo = () => {
    setAppliedPromo('');
    showToast('Coupon removed');
  };

  const handleToggleRedeemBeans = () => {
    if (redeemedBeans > 0) {
      setRedeemedBeans(0);
      showToast('Beans redemption cancelled');
    } else {
      if (loyalty.beans >= 50) {
        setRedeemedBeans(50);
        showToast('50 Beans redeemed for ₹50 discount!');
      } else {
        showToast('You need at least 50 Beans to redeem');
      }
    }
  };

  // Order Placement Success
  const handleOrderSuccess = (newOrder: DeliveryOrder) => {
    // Add to orders
    setOrders((prev) => [...prev, newOrder]);
    
    // Earn loyalty beans: 1 bean per ₹10 spent
    const earnedBeans = Math.round(newOrder.total / 10);
    setLoyalty((prev) => ({
      ...prev,
      beans: prev.beans - (newOrder.beansRedeemed || 0) + earnedBeans,
      lifetimeBeans: prev.lifetimeBeans + earnedBeans,
    }));

    // Clear cart & applied beans
    setCartItems([]);
    setRedeemedBeans(0);

    // Switch view to Live Delivery Tracking
    setActiveTab('tracking');
    showToast(`Order #${newOrder.orderNumber} confirmed! Tracking rider live.`);
  };

  // Order Status simulation update
  const handleOrderStatusUpdate = (orderId: string, newStatus: OrderStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );
  };

  // Table reservation confirmation
  const handleReservationSuccess = (res: TableReservation) => {
    showToast(`Table reserved for ${res.guests} guests in ${res.areaName}!`);
  };

  // Loyalty Catalog Redeem
  const handleRedeemLoyaltyCatalogItem = (rewardId: string, beansCost: number) => {
    if (loyalty.beans >= beansCost) {
      setLoyalty((prev) => ({
        ...prev,
        beans: prev.beans - beansCost,
      }));
      showToast(`Reward unlocked! Deducted ${beansCost} beans.`);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-stone-900 flex flex-col font-sans">
      
      {/* Top Announcements Banner */}
      <OffersBanner
        onApplyPromo={handleApplyPromo}
        appliedCode={appliedPromo}
      />

      {/* Main Navbar */}
      <Navbar
        cartItems={cartItems}
        loyalty={loyalty}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenLoyalty={() => setIsLoyaltyOpen(true)}
        onOpenOffers={() => setIsOffersOpen(true)}
        activeOrderCount={orders.filter((o) => o.status !== 'delivered').length}
      />

      {/* View routing based on active tab */}
      <main className="flex-1">
        {activeTab === 'menu' && (
          <>
            <HeroSection
              onOrderClick={() => {
                const el = document.getElementById('menu-section');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              onReserveClick={() => setIsReservationOpen(true)}
              onOffersClick={() => setIsOffersOpen(true)}
            />

            <MenuSection
              items={MENU_ITEMS}
              onSelectItem={(item) => setCustomizingItem(item)}
              onQuickAdd={handleQuickAdd}
            />
          </>
        )}

        {activeTab === 'reservation' && (
          <div className="py-10">
            <div className="max-w-4xl mx-auto px-4 text-center mb-8">
              <span className="text-xs uppercase tracking-widest text-amber-900 font-bold block mb-1">
                Ambiance & Hospitality · స్వాగతం
              </span>
              <h2 className="font-serif-display text-4xl font-bold text-stone-900 mb-2">
                Reserve an Unforgettable Experience
              </h2>
              <p className="text-sm text-stone-600 max-w-lg mx-auto">
                Whether you desire our breezy garden veranda, a quiet bookshelf alcove, 
                front-row barista counter, or sunset rooftop views.
              </p>
              <button
                onClick={() => setIsReservationOpen(true)}
                className="mt-6 px-6 py-3 bg-amber-900 hover:bg-amber-800 text-white rounded-xl text-xs font-semibold shadow-md transition-colors cursor-pointer"
              >
                Open Table Reservation Booking Pass
              </button>
            </div>

            {/* Quick table preview grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div 
                onClick={() => setIsReservationOpen(true)}
                className="bg-white rounded-2xl border border-stone-200 overflow-hidden cursor-pointer hover:border-amber-900/40 transition-all p-6 space-y-3"
              >
                <div className="flex justify-between items-center">
                  <h3 className="font-serif-display text-xl font-bold">🌿 Garden Veranda & Patio</h3>
                  <span className="text-xs text-emerald-800 font-semibold">6 Tables Open</span>
                </div>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Bathed in morning sunlight and enveloped by monstera palms and jasmine blooms. Perfect for lazy weekend brunches and coffee dates.
                </p>
                <span className="text-xs font-semibold text-amber-900 underline">Book this space →</span>
              </div>

              <div 
                onClick={() => setIsReservationOpen(true)}
                className="bg-white rounded-2xl border border-stone-200 overflow-hidden cursor-pointer hover:border-amber-900/40 transition-all p-6 space-y-3"
              >
                <div className="flex justify-between items-center">
                  <h3 className="font-serif-display text-xl font-bold">🌅 Rooftop Sunset Terrace</h3>
                  <span className="text-xs text-emerald-800 font-semibold">7 Tables Open</span>
                </div>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Panoramic skyline views, soft festoon lights, wood-fired sourdough pizzas, and cozy evening breezes.
                </p>
                <span className="text-xs font-semibold text-amber-900 underline">Book this space →</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'tracking' && (
          <DeliveryTracker
            orders={orders}
            onOrderUpdate={handleOrderStatusUpdate}
            onExploreMenu={() => setActiveTab('menu')}
          />
        )}

        {activeTab === 'loyalty' && (
          <div className="py-12 max-w-4xl mx-auto px-4">
            <div className="text-center mb-8">
              <h2 className="font-serif-display text-4xl font-bold text-stone-900 mb-2">
                Brew Club Rewards Program
              </h2>
              <p className="text-sm text-stone-600">
                You currently have <strong className="font-mono text-amber-950">{loyalty.beans} Beans</strong>. 
                Keep savoring coffees and kitchen specials to earn tier perks.
              </p>
              <button
                onClick={() => setIsLoyaltyOpen(true)}
                className="mt-5 px-6 py-2.5 bg-amber-900 text-white rounded-xl text-xs font-semibold hover:bg-amber-800"
              >
                Open Full Member Pass & Rewards
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer
        onMenuClick={() => setActiveTab('menu')}
        onReserveClick={() => setIsReservationOpen(true)}
        onOffersClick={() => setIsOffersOpen(true)}
      />

      {/* Item Customizer Modal */}
      <ItemCustomizerModal
        item={customizingItem}
        isOpen={Boolean(customizingItem)}
        onClose={() => setCustomizingItem(null)}
        onAddToCart={handleAddToCart}
      />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        loyalty={loyalty}
        appliedPromo={appliedPromo}
        onApplyPromo={handleApplyPromo}
        onRemovePromo={handleRemovePromo}
        promoDiscount={promoDiscount}
        redeemedBeans={redeemedBeans}
        onToggleRedeemBeans={handleToggleRedeemBeans}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveCartItem}
        onProceedToCheckout={() => setIsCheckoutOpen(true)}
      />

      {/* Checkout & Secure Payment Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        subtotal={subtotal}
        discount={promoDiscount}
        couponCode={appliedPromo}
        beansRedeemed={redeemedBeans}
        beansDiscount={redeemedBeans}
        deliveryFee={deliveryFee}
        taxes={taxes}
        total={grandTotal}
        onOrderSuccess={handleOrderSuccess}
      />

      {/* Table Reservation Modal */}
      <TableReservationModal
        isOpen={isReservationOpen}
        onClose={() => setIsReservationOpen(false)}
        onConfirmReservation={handleReservationSuccess}
      />

      {/* Brew Club Loyalty Modal */}
      <LoyaltyRewardsModal
        isOpen={isLoyaltyOpen}
        onClose={() => setIsLoyaltyOpen(false)}
        loyalty={loyalty}
        onRedeemReward={handleRedeemLoyaltyCatalogItem}
      />

      {/* Offers & Deals Drawer */}
      <OffersDrawer
        isOpen={isOffersOpen}
        onClose={() => setIsOffersOpen(false)}
        onApplyOffer={handleApplyPromo}
        appliedCode={appliedPromo}
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-stone-900/95 backdrop-blur-md text-stone-100 px-4 py-2.5 rounded-xl shadow-xl border border-stone-700 text-xs font-medium animate-in slide-in-from-bottom-2 duration-200">
          {toastMessage}
        </div>
      )}

    </div>
  );
}
