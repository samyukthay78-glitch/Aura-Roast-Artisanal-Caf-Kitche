import React, { useState, useEffect } from 'react';
import { 
  CheckCircle2, Clock, MapPin, Phone, ShieldCheck, 
  ArrowRight, Bike, Store, Home, RefreshCw, Sparkles 
} from 'lucide-react';
import { DeliveryOrder, OrderStatus } from '../types/cafe';

interface DeliveryTrackerProps {
  orders: DeliveryOrder[];
  onOrderUpdate: (orderId: string, newStatus: OrderStatus) => void;
  onExploreMenu: () => void;
}

export const DeliveryTracker: React.FC<DeliveryTrackerProps> = ({
  orders,
  onOrderUpdate,
  onExploreMenu,
}) => {
  const [selectedOrderId, setSelectedOrderId] = useState<string>(
    orders.length > 0 ? orders[orders.length - 1].id : ''
  );
  
  // Simulated rider position percentage along route (0 to 100)
  const [riderProgress, setRiderProgress] = useState(35);
  const [showCallModal, setShowCallModal] = useState(false);

  // Sync latest order if selected is not found
  useEffect(() => {
    if (orders.length > 0 && (!selectedOrderId || !orders.some((o) => o.id === selectedOrderId))) {
      setSelectedOrderId(orders[orders.length - 1].id);
    }
  }, [orders, selectedOrderId]);

  const activeOrder = orders.find((o) => o.id === selectedOrderId) || orders[0];

  // Rider animated movement effect
  useEffect(() => {
    if (!activeOrder) return;
    if (activeOrder.status === 'on_the_way') {
      const interval = setInterval(() => {
        setRiderProgress((prev) => {
          if (prev >= 95) {
            clearInterval(interval);
            return 95;
          }
          return prev + 1;
        });
      }, 3000);
      return () => clearInterval(interval);
    } else if (activeOrder.status === 'delivered') {
      setRiderProgress(100);
    } else {
      setRiderProgress(15);
    }
  }, [activeOrder?.status]);

  if (!activeOrder) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center text-stone-400 mx-auto mb-4">
          <Bike className="w-8 h-8" />
        </div>
        <h2 className="font-serif-display text-2xl font-bold text-stone-800 mb-2">
          No Active Orders Yet
        </h2>
        <p className="text-xs text-stone-500 max-w-sm mx-auto mb-6">
          Order your favorite specialty espresso, hot bakery bakes, or wood-fired pizzas to start tracking live.
        </p>
        <button
          onClick={onExploreMenu}
          className="px-6 py-3 rounded-xl bg-amber-900 text-white text-xs font-semibold hover:bg-amber-800 transition-colors"
        >
          Browse Café Menu
        </button>
      </div>
    );
  }

  const steps = [
    { key: 'placed', label: 'Order Confirmed', time: 'Received at roastery' },
    { key: 'brewing', label: 'Kitchen Preparing', time: 'Barista & Chef crafting' },
    { key: 'packed', label: 'Eco-Packed & Sealed', time: 'Thermal insulated bag' },
    { key: 'on_the_way', label: 'Rider Out on Route', time: 'Live GPS moving' },
    { key: 'delivered', label: 'Delivered', time: 'Enjoy your hot meal!' },
  ];

  const getStepIndex = (status: OrderStatus) => {
    switch (status) {
      case 'placed': return 0;
      case 'brewing': return 1;
      case 'packed': return 2;
      case 'on_the_way': return 3;
      case 'delivered': return 4;
      default: return 0;
    }
  };

  const currentStepIdx = getStepIndex(activeOrder.status);

  // Manual fast-forward simulation button for user demonstration
  const handleAdvanceSimulation = () => {
    const nextStatuses: OrderStatus[] = ['placed', 'brewing', 'packed', 'on_the_way', 'delivered'];
    const nextIdx = (currentStepIdx + 1) % nextStatuses.length;
    onOrderUpdate(activeOrder.id, nextStatuses[nextIdx]);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      
      {/* Tracker Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs uppercase tracking-widest text-emerald-800 font-bold">
              Live Order Tracker · ఆర్డర్ స్థితి
            </span>
          </div>
          <h2 className="font-serif-display text-3xl font-bold text-stone-900">
            Order #{activeOrder.orderNumber}
          </h2>
          <p className="text-xs text-stone-500 mt-0.5">
            Placed at {activeOrder.createdAt} · Estimated Delivery in{' '}
            <strong className="text-amber-950 font-bold">
              {activeOrder.status === 'delivered' ? '0' : activeOrder.estimatedMinutes} mins
            </strong>
          </p>
        </div>

        {/* Order Selector & Simulator Advance */}
        <div className="flex items-center gap-2">
          {orders.length > 1 && (
            <select
              value={activeOrder.id}
              onChange={(e) => setSelectedOrderId(e.target.value)}
              className="text-xs bg-white border border-stone-200 rounded-lg px-3 py-2 font-medium text-stone-800"
            >
              {orders.map((o) => (
                <option key={o.id} value={o.id}>
                  Order #{o.orderNumber} ({o.status})
                </option>
              ))}
            </select>
          )}

          <button
            onClick={handleAdvanceSimulation}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-medium transition-colors cursor-pointer"
            title="Simulate step advance"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Simulate Step ({activeOrder.status})</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left 2 Cols: Live Map & Visual Progress Steps */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Interactive Simulated Live Map Container */}
          <div className="relative h-72 sm:h-80 bg-[#EFECE6] rounded-2xl border border-stone-300 overflow-hidden shadow-xs">
            {/* Map Canvas Background Grid */}
            <div 
              className="absolute inset-0 opacity-40"
              style={{
                backgroundImage: 'radial-gradient(#b8af9f 1px, transparent 1px)',
                backgroundSize: '24px 24px'
              }}
            />

            {/* Stylized street lines */}
            <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
              {/* Road paths */}
              <path
                d="M 60 210 Q 180 200, 240 140 T 450 110 T 680 70"
                fill="none"
                stroke="#d1c7b7"
                strokeWidth="18"
                strokeLinecap="round"
              />
              <path
                d="M 60 210 Q 180 200, 240 140 T 450 110 T 680 70"
                fill="none"
                stroke="#fcfbf9"
                strokeWidth="10"
                strokeLinecap="round"
              />
              {/* Route line highlight */}
              <path
                d="M 60 210 Q 180 200, 240 140 T 450 110 T 680 70"
                fill="none"
                stroke="#b45309"
                strokeWidth="4"
                strokeDasharray="6 4"
              />
            </svg>

            {/* Hub Marker (Aura & Roast Cafe) */}
            <div className="absolute left-8 bottom-12 flex flex-col items-center">
              <div className="p-2.5 rounded-full bg-amber-900 text-white shadow-lg ring-4 ring-amber-100 flex items-center justify-center">
                <Store className="w-5 h-5" />
              </div>
              <span className="mt-1 bg-white/90 backdrop-blur-xs px-2 py-0.5 rounded text-[10px] font-bold text-stone-800 shadow-xs border border-stone-200">
                Aura & Roast Kitchen
              </span>
            </div>

            {/* Moving Rider Icon Marker */}
            <div 
              className="absolute transition-all duration-1000 ease-out flex flex-col items-center"
              style={{
                left: `${Math.min(85, Math.max(15, riderProgress))}%`,
                top: `${Math.min(65, Math.max(25, 70 - riderProgress * 0.5))}%`,
              }}
            >
              <div className="p-2.5 rounded-full bg-emerald-600 text-white shadow-xl ring-4 ring-emerald-100 animate-bounce">
                <Bike className="w-5 h-5" />
              </div>
              <div className="mt-1 bg-stone-900 text-white px-2 py-0.5 rounded text-[10px] font-bold whitespace-nowrap shadow-sm">
                Kiran ({activeOrder.status === 'delivered' ? 'Delivered' : 'En Route'})
              </div>
            </div>

            {/* Customer Home Pin */}
            <div className="absolute right-8 top-10 flex flex-col items-center">
              <div className="p-2.5 rounded-full bg-stone-900 text-white shadow-lg ring-4 ring-stone-200 flex items-center justify-center">
                <Home className="w-5 h-5" />
              </div>
              <span className="mt-1 bg-white/90 backdrop-blur-xs px-2 py-0.5 rounded text-[10px] font-bold text-stone-800 shadow-xs border border-stone-200">
                Your Address
              </span>
            </div>

            {/* Bottom floating status overlay inside map */}
            <div className="absolute bottom-3 right-3 left-3 sm:left-auto bg-white/95 backdrop-blur-md p-3 rounded-xl border border-stone-200 shadow-sm flex items-center gap-3">
              <div className="p-2 rounded-lg bg-amber-50 text-amber-900">
                <Clock className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[11px] text-stone-500 font-medium">Estimated Arrival</p>
                <p className="text-xs font-bold text-stone-900 font-mono">
                  {activeOrder.status === 'delivered'
                    ? 'Delivered with care'
                    : `${activeOrder.estimatedMinutes} Mins · OTP: 4819`}
                </p>
              </div>
            </div>
          </div>

          {/* Stepper Progress bar */}
          <div className="bg-white p-6 rounded-2xl border border-stone-200/90 shadow-2xs">
            <h3 className="text-xs font-bold uppercase tracking-wider text-stone-700 mb-6">
              Preparation & Delivery Progress
            </h3>

            <div className="relative">
              {/* Line connector */}
              <div className="absolute top-4 left-4 right-4 h-0.5 bg-stone-200 -z-0" />
              <div 
                className="absolute top-4 left-4 h-0.5 bg-amber-800 transition-all duration-500 -z-0"
                style={{ width: `${(currentStepIdx / (steps.length - 1)) * 100}%` }}
              />

              <div className="flex items-start justify-between relative z-10">
                {steps.map((step, idx) => {
                  const isDone = idx <= currentStepIdx;
                  const isCurrent = idx === currentStepIdx;

                  return (
                    <div key={step.key} className="flex flex-col items-center text-center max-w-[80px]">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                          isDone
                            ? 'bg-amber-900 text-white shadow-xs'
                            : 'bg-stone-100 text-stone-400 border border-stone-300'
                        } ${isCurrent ? 'ring-4 ring-amber-100' : ''}`}
                      >
                        {isDone ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
                      </div>
                      <span className={`text-[11px] font-semibold mt-2 leading-tight ${isCurrent ? 'text-amber-950' : 'text-stone-600'}`}>
                        {step.label}
                      </span>
                      <span className="text-[9px] text-stone-400 mt-0.5 leading-tight hidden sm:block">
                        {step.time}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

        </div>

        {/* Right Col: Rider Profile & Order Summary */}
        <div className="space-y-6">
          
          {/* Rider Card */}
          <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-2xs">
            <h3 className="text-xs font-bold uppercase tracking-wider text-stone-700 mb-4">
              Your Delivery Partner
            </h3>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-amber-100 border border-amber-300 flex items-center justify-center text-amber-900 font-bold font-serif-display text-lg">
                KR
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-stone-900">{activeOrder.riderName}</h4>
                  <span className="text-xs text-amber-600 font-bold">⭐ {activeOrder.riderRating}</span>
                </div>
                <p className="text-[11px] text-stone-500 mt-0.5">{activeOrder.riderVehicle}</p>
              </div>
            </div>

            <div className="bg-stone-50 p-2.5 rounded-xl border border-stone-100 flex items-center justify-between text-xs text-stone-600 mb-4">
              <span>Delivery Delivery OTP</span>
              <span className="font-mono font-bold text-amber-900 text-sm tracking-wider">4819</span>
            </div>

            <button
              onClick={() => setShowCallModal(true)}
              className="w-full py-2.5 px-3 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Call Rider ({activeOrder.riderPhone})</span>
            </button>
          </div>

          {/* Itemized Order Receipt */}
          <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-2xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-stone-200">
              <h3 className="text-xs font-bold uppercase tracking-wider text-stone-700">
                Order Items ({activeOrder.items.length})
              </h3>
              <span className="text-[11px] font-mono text-stone-400">
                {activeOrder.paymentMethod.toUpperCase()} · {activeOrder.paymentStatus}
              </span>
            </div>

            <div className="space-y-3 max-h-60 overflow-y-auto">
              {activeOrder.items.map((it) => (
                <div key={it.cartItemId} className="flex justify-between items-start text-xs">
                  <div>
                    <span className="font-medium text-stone-900">
                      {it.quantity}x {it.menuItem.name}
                    </span>
                    {it.selectedOptions.length > 0 && (
                      <p className="text-[10px] text-stone-400">
                        {it.selectedOptions.map((o) => o.optionLabel).join(', ')}
                      </p>
                    )}
                  </div>
                  <span className="font-mono tabular-nums font-semibold text-stone-800">
                    ₹{it.totalPrice}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-stone-100 space-y-1.5 text-xs text-stone-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-mono tabular-nums">₹{activeOrder.subtotal}</span>
              </div>
              {activeOrder.discount > 0 && (
                <div className="flex justify-between text-emerald-700">
                  <span>Coupon Discount</span>
                  <span className="font-mono tabular-nums">-₹{activeOrder.discount}</span>
                </div>
              )}
              {activeOrder.beansDiscount ? (
                <div className="flex justify-between text-amber-800">
                  <span>Loyalty Discount</span>
                  <span className="font-mono tabular-nums">-₹{activeOrder.beansDiscount}</span>
                </div>
              ) : null}
              <div className="flex justify-between">
                <span>Delivery & GST</span>
                <span className="font-mono tabular-nums">
                  ₹{activeOrder.deliveryFee + activeOrder.taxes}
                </span>
              </div>
              <div className="pt-2 border-t border-stone-200 flex justify-between font-bold text-stone-900 text-sm">
                <span>Paid Total</span>
                <span className="font-mono tabular-nums text-amber-950">₹{activeOrder.total}</span>
              </div>
            </div>

            <div className="text-[11px] text-stone-500 bg-stone-50 p-2.5 rounded-lg border border-stone-200">
              <p className="font-medium text-stone-800 mb-0.5">Delivery Address:</p>
              <p>{activeOrder.deliveryAddress}</p>
            </div>
          </div>

        </div>

      </div>

      {/* Simulated Call Modal */}
      {showCallModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="call-rider-title"
          className="fixed inset-0 z-50 bg-stone-900/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in"
        >
          <div className="bg-white p-6 rounded-2xl max-w-sm w-full text-center space-y-4 border border-stone-200 shadow-2xl">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
              <Phone className="w-6 h-6 animate-pulse" />
            </div>
            <h3 id="call-rider-title" className="font-serif-display text-lg font-bold text-stone-900">
              Connecting with {activeOrder.riderName}...
            </h3>
            <p className="text-xs text-stone-500">
              Direct simulated VoIP call for order updates and address guidance.
            </p>
            <p className="font-mono text-sm font-bold text-stone-800">{activeOrder.riderPhone}</p>
            <button
              onClick={() => setShowCallModal(false)}
              className="w-full py-2 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-semibold"
            >
              End Simulated Call
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
