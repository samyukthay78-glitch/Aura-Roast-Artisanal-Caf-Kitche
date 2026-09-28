import React from 'react';
import { ArrowRight, Calendar, Sparkles, Clock, ShieldCheck, Flame } from 'lucide-react';
import heroAmbiance from '../assets/images/hero_cafe_ambiance_1790578973387.jpg';

interface HeroSectionProps {
  onOrderClick: () => void;
  onReserveClick: () => void;
  onOffersClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOrderClick,
  onReserveClick,
  onOffersClick,
}) => {
  return (
    <section className="relative overflow-hidden bg-[#1E140F] text-stone-100">
      {/* Background Hero Image with measured scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroAmbiance}
          alt="Aura & Roast Artisan Cafe Interior"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center opacity-40 scale-105 transition-transform duration-1000 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#170E0A] via-[#170E0A]/90 to-[#170E0A]/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#170E0A] via-transparent to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20 md:pt-24 md:pb-28">
        <div className="max-w-3xl">
          
          {/* Subtle Warm Welcome Tag */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-medium tracking-wide mb-6">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>స్వాగతం · Welcome to Aura & Roast Café & Kitchen</span>
          </div>

          {/* Main Headline */}
          <h1 className="font-serif-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.12] mb-6 text-balance">
            Slow Roasts, Handmade Pastas & Wood-Fired Slices.
          </h1>

          {/* Editorial Subtitle */}
          <p className="text-base sm:text-lg text-stone-300 font-normal leading-relaxed mb-8 max-w-2xl">
            A boutique culinary haven serving micro-lot coffees, laminated morning croissants, 
            48-hour fermented Neapolitan pizzas, smash brioche burgers, and freshly pulled pastas.
            Dine in our botanical veranda or enjoy lightning-fast doorstep delivery with live tracking.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-4 mb-12">
            <button
              onClick={onOrderClick}
              className="px-6 py-3.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-semibold text-sm transition-all shadow-lg shadow-amber-900/30 flex items-center gap-2 group cursor-pointer active:scale-95"
            >
              <span>Explore Menu & Order Online</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={onReserveClick}
              className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium text-sm backdrop-blur-md border border-white/20 transition-all flex items-center gap-2 cursor-pointer active:scale-95"
            >
              <Calendar className="w-4 h-4 text-amber-300" />
              <span>Reserve a Table</span>
            </button>

            <button
              onClick={onOffersClick}
              className="text-stone-300 hover:text-amber-300 text-xs font-medium underline underline-offset-4 transition-colors cursor-pointer py-2 px-1"
            >
              View Active Offers & Vouchers
            </button>
          </div>

          {/* Clean Trust Strip */}
          <div className="pt-6 border-t border-stone-800/80 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs text-stone-300 font-medium">
            <div className="flex items-center gap-2">
              <Flame className="w-4 h-4 text-amber-500 shrink-0" />
              <span>450°C Wood-Fired Crusts</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-500 shrink-0" />
              <span>Live Delivery Tracking</span>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />
              <span>Single-Origin Arabica</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-amber-500 shrink-0" />
              <span>100% Secure Checkout</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
