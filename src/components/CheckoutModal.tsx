import React, { useState } from 'react';
import { X, ShieldCheck, QrCode, CreditCard, Banknote, Smartphone, Check, Lock, ArrowRight, Loader2 } from 'lucide-react';
import { CartItem, DeliveryOrder, OrderStatus } from '../types/cafe';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  subtotal: number;
  discount: number;
  couponCode?: string;
  beansRedeemed?: number;
  beansDiscount?: number;
  deliveryFee: number;
  taxes: number;
  total: number;
  onOrderSuccess: (order: DeliveryOrder) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  subtotal,
  discount,
  couponCode,
  beansRedeemed,
  beansDiscount,
  deliveryFee,
  taxes,
  total,
  onOrderSuccess,
}) => {
  const [name, setName] = useState('Samyuktha Y.');
  const [phone, setPhone] = useState('+91 98480 12345');
  const [address, setAddress] = useState('Flat 402, Oakwood Residences, Jubilee Hills, Hyderabad');
  const [landmark, setLandmark] = useState('Opposite Botanical Garden');
  const [deliveryNote, setDeliveryNote] = useState('');
  const [includeCutlery, setIncludeCutlery] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'cod' | 'netbanking'>('upi');
  
  // Card mock state
  const [cardNumber, setCardNumber] = useState('4532 •••• •••• 8921');
  const [cardExpiry, setCardExpiry] = useState('08/29');
  const [cardCvv, setCardCvv] = useState('•••');
  
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate payment gateway authentication and bank processing
    setTimeout(() => {
      setIsProcessing(false);
      const randomOrderNum = Math.floor(1000 + Math.random() * 9000);
      const newOrder: DeliveryOrder = {
        id: `order-${Date.now()}`,
        orderNumber: `AR-${randomOrderNum}`,
        createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        items: [...items],
        subtotal,
        discount,
        couponCode,
        beansRedeemed,
        beansDiscount,
        deliveryFee,
        taxes,
        total,
        status: 'placed' as OrderStatus,
        estimatedMinutes: 28,
        customerName: name,
        phone,
        deliveryAddress: `${address}, ${landmark}`,
        paymentMethod,
        paymentStatus: paymentMethod === 'cod' ? 'pending' : 'paid',
        riderName: 'Kiran Reddy',
        riderPhone: '+91 98765 43210',
        riderVehicle: 'Ather 450X (Electric) · TS 09 EA 4120',
        riderRating: 4.9,
      };

      onOrderSuccess(newOrder);
      onClose();
    }, 1400);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="checkout-heading"
      className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-xl bg-[#FAF8F5] rounded-2xl shadow-2xl border border-stone-200 overflow-hidden my-6">
        
        {/* Header */}
        <div className="p-5 border-b border-stone-200 flex items-center justify-between bg-white">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-emerald-700" />
            <h2 id="checkout-heading" className="font-serif-display text-xl font-bold text-stone-900">
              Secure Checkout & Payment
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors cursor-pointer"
            aria-label="Close checkout"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Checkout Form */}
        <form onSubmit={handleSubmitOrder} className="p-5 max-h-[75vh] overflow-y-auto space-y-6 text-stone-800">
          
          {/* Section 1: Delivery Details */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-stone-700 flex items-center justify-between">
              <span>1. Delivery Destination</span>
              <span className="text-[11px] text-emerald-700 font-semibold">Live GPS Route Available</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] text-stone-500 font-medium mb-1">Your Full Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-lg border border-stone-200 bg-white focus:outline-none focus:ring-1 focus:ring-amber-900"
                />
              </div>

              <div>
                <label className="block text-[11px] text-stone-500 font-medium mb-1">Phone Number (for Delivery OTP)</label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-lg border border-stone-200 bg-white focus:outline-none focus:ring-1 focus:ring-amber-900"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] text-stone-500 font-medium mb-1">Complete Address</label>
              <input
                type="text"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="House/Flat number, building name, street"
                className="w-full text-xs p-2.5 rounded-lg border border-stone-200 bg-white focus:outline-none focus:ring-1 focus:ring-amber-900"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] text-stone-500 font-medium mb-1">Nearby Landmark (Optional)</label>
                <input
                  type="text"
                  value={landmark}
                  onChange={(e) => setLandmark(e.target.value)}
                  placeholder="e.g. Near HDFC Bank, Metro Pillar"
                  className="w-full text-xs p-2.5 rounded-lg border border-stone-200 bg-white focus:outline-none focus:ring-1 focus:ring-amber-900"
                />
              </div>

              <div>
                <label className="block text-[11px] text-stone-500 font-medium mb-1">Rider Instructions</label>
                <input
                  type="text"
                  value={deliveryNote}
                  onChange={(e) => setDeliveryNote(e.target.value)}
                  placeholder="e.g. Leave at door, don't ring bell"
                  className="w-full text-xs p-2.5 rounded-lg border border-stone-200 bg-white focus:outline-none focus:ring-1 focus:ring-amber-900"
                />
              </div>
            </div>

            {/* Eco Cutlery preference */}
            <label className="flex items-center gap-2 p-2.5 rounded-lg bg-stone-100 border border-stone-200 cursor-pointer text-xs">
              <input
                type="checkbox"
                checked={includeCutlery}
                onChange={(e) => setIncludeCutlery(e.target.checked)}
                className="rounded text-amber-900 focus:ring-amber-900"
              />
              <span className="text-stone-700">Include wooden cutlery and organic napkins</span>
            </label>
          </div>

          {/* Section 2: Payment Gateway Selection */}
          <div className="space-y-3 pt-4 border-t border-stone-200">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-stone-700">
                2. Select Payment Method
              </h3>
              <div className="flex items-center gap-1 text-[11px] text-emerald-700 font-medium">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>256-Bit SSL Encrypted</span>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <button
                type="button"
                onClick={() => setPaymentMethod('upi')}
                className={`p-3 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center gap-1.5 ${
                  paymentMethod === 'upi'
                    ? 'bg-amber-50/80 border-amber-900 text-amber-950 font-bold'
                    : 'bg-white border-stone-200 text-stone-600 hover:border-stone-300'
                }`}
              >
                <Smartphone className="w-5 h-5 text-amber-900" />
                <span className="text-xs">UPI / QR</span>
                <span className="text-[10px] text-emerald-700 font-medium">Instant · GPay, PhonePe</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('card')}
                className={`p-3 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center gap-1.5 ${
                  paymentMethod === 'card'
                    ? 'bg-amber-50/80 border-amber-900 text-amber-950 font-bold'
                    : 'bg-white border-stone-200 text-stone-600 hover:border-stone-300'
                }`}
              >
                <CreditCard className="w-5 h-5 text-amber-900" />
                <span className="text-xs">Cards</span>
                <span className="text-[10px] text-stone-500">Visa, Mastercard</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('netbanking')}
                className={`p-3 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center gap-1.5 ${
                  paymentMethod === 'netbanking'
                    ? 'bg-amber-50/80 border-amber-900 text-amber-950 font-bold'
                    : 'bg-white border-stone-200 text-stone-600 hover:border-stone-300'
                }`}
              >
                <Lock className="w-5 h-5 text-amber-900" />
                <span className="text-xs">NetBanking</span>
                <span className="text-[10px] text-stone-500">All Major Banks</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('cod')}
                className={`p-3 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center gap-1.5 ${
                  paymentMethod === 'cod'
                    ? 'bg-amber-50/80 border-amber-900 text-amber-950 font-bold'
                    : 'bg-white border-stone-200 text-stone-600 hover:border-stone-300'
                }`}
              >
                <Banknote className="w-5 h-5 text-amber-900" />
                <span className="text-xs">Cash on Delivery</span>
                <span className="text-[10px] text-stone-500">Pay at Doorstep</span>
              </button>
            </div>

            {/* Payment Details Container */}
            {paymentMethod === 'upi' && (
              <div className="bg-white p-4 rounded-xl border border-stone-200 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-20 h-20 bg-stone-100 rounded-lg border border-stone-300 flex items-center justify-center p-1.5 shrink-0">
                    <QrCode className="w-16 h-16 text-stone-800" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-stone-900">Scan & Pay using any UPI App</p>
                    <p className="text-[11px] text-stone-500 mt-0.5">Google Pay · PhonePe · Paytm · CRED · BHIM</p>
                    <p className="text-xs font-mono font-semibold text-amber-900 mt-1">auraandroast@icici</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-[11px] text-stone-500 pt-2 border-t border-stone-100">
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Auto-verified in real time upon placing order</span>
                </div>
              </div>
            )}

            {paymentMethod === 'card' && (
              <div className="bg-white p-4 rounded-xl border border-stone-200 space-y-3">
                <div>
                  <label className="block text-[11px] text-stone-500 font-medium mb-1">Card Number</label>
                  <input
                    type="text"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    placeholder="4532 0000 0000 0000"
                    className="w-full text-xs font-mono p-2.5 rounded-lg border border-stone-200 bg-white"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] text-stone-500 font-medium mb-1">Valid Thru</label>
                    <input
                      type="text"
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      placeholder="MM/YY"
                      className="w-full text-xs font-mono p-2.5 rounded-lg border border-stone-200 bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-stone-500 font-medium mb-1">CVV</label>
                    <input
                      type="password"
                      value={cardCvv}
                      onChange={(e) => setCardCvv(e.target.value)}
                      maxLength={4}
                      placeholder="•••"
                      className="w-full text-xs font-mono p-2.5 rounded-lg border border-stone-200 bg-white"
                    />
                  </div>
                </div>
              </div>
            )}

            {paymentMethod === 'cod' && (
              <div className="bg-amber-50/70 p-3.5 rounded-xl border border-amber-200/80 text-xs text-amber-950">
                <p className="font-semibold mb-1">Cash / UPI on Delivery</p>
                <p className="text-[11px] text-stone-600">
                  You can pay cash directly to the delivery partner or scan their dynamic QR code upon arrival. 
                  Exact change is appreciated.
                </p>
              </div>
            )}

            {paymentMethod === 'netbanking' && (
              <div className="bg-white p-3.5 rounded-xl border border-stone-200 text-xs space-y-2">
                <p className="font-medium text-stone-800">Popular Banks</p>
                <div className="grid grid-cols-3 gap-2 text-center text-[11px]">
                  <div className="p-2 border rounded-md hover:bg-stone-50 cursor-pointer">HDFC Bank</div>
                  <div className="p-2 border rounded-md hover:bg-stone-50 cursor-pointer">ICICI Bank</div>
                  <div className="p-2 border rounded-md hover:bg-stone-50 cursor-pointer">SBI</div>
                </div>
              </div>
            )}
          </div>

          {/* Section 3: Final Order Snapshot */}
          <div className="bg-stone-100 p-4 rounded-xl border border-stone-200 text-xs text-stone-700 space-y-1.5">
            <div className="flex justify-between font-medium">
              <span>Order Amount ({items.length} items)</span>
              <span className="font-mono tabular-nums">₹{subtotal}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-emerald-700">
                <span>Discount Applied</span>
                <span className="font-mono tabular-nums">-₹{discount}</span>
              </div>
            )}
            {beansDiscount ? (
              <div className="flex justify-between text-amber-800">
                <span>Loyalty Beans Discount</span>
                <span className="font-mono tabular-nums">-₹{beansDiscount}</span>
              </div>
            ) : null}
            <div className="flex justify-between">
              <span>Delivery & GST</span>
              <span className="font-mono tabular-nums">₹{deliveryFee + taxes}</span>
            </div>
            <div className="pt-2 border-t border-stone-200 flex justify-between items-baseline font-bold text-stone-900 text-sm">
              <span>Total Payable</span>
              <span className="font-mono tabular-nums text-base text-amber-950">₹{total}</span>
            </div>
          </div>

          {/* Action button */}
          <button
            type="submit"
            disabled={isProcessing}
            className="w-full py-3.5 px-5 bg-amber-900 hover:bg-amber-800 disabled:bg-stone-400 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
          >
            {isProcessing ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Securing Transaction & Alerting Kitchen...</span>
              </>
            ) : (
              <>
                <span>Pay ₹{total} & Confirm Order</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>

        </form>

      </div>
    </div>
  );
};
