export type DietaryType = 'veg' | 'vegan' | 'non-veg';

export interface CustomizationOptionGroup {
  id: string;
  name: string;
  required: boolean;
  maxSelect?: number;
  options: {
    id: string;
    label: string;
    price: number;
    default?: boolean;
  }[];
}

export interface MenuItem {
  id: string;
  name: string;
  teluguName?: string;
  category: 'coffee' | 'bakery' | 'pizza' | 'burger' | 'pasta' | 'drinks' | 'desserts';
  categoryLabel: string;
  price: number;
  originalPrice?: number;
  description: string;
  tag?: string; // e.g. "Chef's Signature 🌟", "Bestseller 🔥", "Freshly Baked Daily 🥐"
  dietary: DietaryType;
  prepTime: string; // e.g. "10-12 mins"
  rating: number;
  reviewsCount: number;
  image: string;
  customizationGroups?: CustomizationOptionGroup[];
  differenceExplainer?: {
    differsFrom: string; // e.g. "vs Cappuccino" or "vs Chicken Pizza"
    explanation: string;
  };
  composition?: {
    layers: { name: string; percentage: number; color: string }[];
    notes: string;
  };
  flavorTags?: string[];
}

export interface SelectedOption {
  groupId: string;
  groupName: string;
  optionId: string;
  optionLabel: string;
  price: number;
}

export interface CartItem {
  cartItemId: string;
  menuItem: MenuItem;
  selectedOptions: SelectedOption[];
  quantity: number;
  notes?: string;
  unitPrice: number;
  totalPrice: number;
}

export type OrderStatus = 'placed' | 'brewing' | 'packed' | 'on_the_way' | 'delivered';

export interface DeliveryOrder {
  id: string;
  orderNumber: string;
  createdAt: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  couponCode?: string;
  beansRedeemed?: number;
  beansDiscount?: number;
  deliveryFee: number;
  taxes: number;
  total: number;
  status: OrderStatus;
  estimatedMinutes: number;
  customerName: string;
  phone: string;
  deliveryAddress: string;
  paymentMethod: 'upi' | 'card' | 'cod' | 'netbanking';
  paymentStatus: 'paid' | 'pending';
  riderName: string;
  riderPhone: string;
  riderVehicle: string;
  riderRating: number;
}

export type SeatingAreaId = 'garden' | 'library' | 'espresso_bar' | 'rooftop';

export interface SeatingArea {
  id: SeatingAreaId;
  name: string;
  description: string;
  ambiance: string;
  tag: string;
  availableTables: number;
  image: string;
}

export interface TableReservation {
  id: string;
  bookingCode: string;
  customerName: string;
  phone: string;
  email: string;
  date: string;
  timeSlot: string;
  guests: number;
  areaId: SeatingAreaId;
  areaName: string;
  specialRequests?: string;
  status: 'confirmed' | 'completed' | 'cancelled';
  createdAt: string;
}

export interface LoyaltyProfile {
  beans: number;
  tier: 'Bronze Brew' | 'Silver Roast' | 'Gold Connoisseur';
  tierProgress: number; // 0 to 100
  beansToNextTier: number;
  lifetimeBeans: number;
  memberId: string;
  joinedDate: string;
}

export interface PromoOffer {
  code: string;
  title: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  minOrder: number;
  description: string;
  tag: string;
}
