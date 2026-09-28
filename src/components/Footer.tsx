import React from 'react';
import { MapPin, Phone, Mail, Clock, Instagram, Facebook } from 'lucide-react';

interface FooterProps {
  onMenuClick: () => void;
  onReserveClick: () => void;
  onOffersClick: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onMenuClick,
  onReserveClick,
  onOffersClick,
}) => {
  return (
    <footer className="bg-[#1C130E] text-stone-300 border-t border-stone-800 pt-16 pb-12 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          {/* Brand & Vibe */}
          <div className="space-y-3 md:col-span-1">
            <span className="font-serif-display text-2xl font-bold tracking-tight text-white block">
              Aura & Roast
            </span>
            <p className="text-stone-400 text-xs leading-relaxed">
              Artisan Coffee Roasters, Sourdough Bakery & Wood-Fired Kitchen. 
              Serving warmth, slow-crafted espresso, and authentic Neapolitan bakes.
            </p>
            <p className="text-amber-400/90 text-xs font-serif-display italic">
              "ప్రతి కప్పులోనూ నాణ్యత, ప్రతి బైట్‌లోనూ రుచి"
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-2">
            <h4 className="font-bold text-white uppercase tracking-wider text-xs mb-3">
              Explore
            </h4>
            <ul className="space-y-2 text-stone-400">
              <li>
                <button onClick={onMenuClick} className="hover:text-white transition-colors cursor-pointer">
                  Specialty Coffee & Brews
                </button>
              </li>
              <li>
                <button onClick={onMenuClick} className="hover:text-white transition-colors cursor-pointer">
                  Wood-Fired Neapolitan Pizzas
                </button>
              </li>
              <li>
                <button onClick={onMenuClick} className="hover:text-white transition-colors cursor-pointer">
                  Fresh Handcrafted Pastas
                </button>
              </li>
              <li>
                <button onClick={onReserveClick} className="hover:text-white transition-colors cursor-pointer">
                  Book Table (Garden / Rooftop)
                </button>
              </li>
              <li>
                <button onClick={onOffersClick} className="hover:text-white transition-colors cursor-pointer">
                  Promotions & Brew Club
                </button>
              </li>
            </ul>
          </div>

          {/* Timings & Hours */}
          <div className="space-y-2">
            <h4 className="font-bold text-white uppercase tracking-wider text-xs mb-3">
              Café & Delivery Hours
            </h4>
            <div className="space-y-2 text-stone-400">
              <div className="flex items-start gap-2">
                <Clock className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-stone-200">Monday – Friday</p>
                  <p className="text-[11px]">08:00 AM – 11:00 PM</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Clock className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-stone-200">Saturday – Sunday</p>
                  <p className="text-[11px]">07:30 AM – 11:30 PM (Brunch & Sunset Slices)</p>
                </div>
              </div>
            </div>
          </div>

          {/* Visit & Connect */}
          <div className="space-y-2">
            <h4 className="font-bold text-white uppercase tracking-wider text-xs mb-3">
              Visit & Contact
            </h4>
            <div className="space-y-2 text-stone-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                <span>Road No. 36, Jubilee Hills, Hyderabad, Telangana 500033</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                <span>+91 98480 12345</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                <span>hello@auraandroastcafe.com</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-stone-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-stone-500">
          <p>© {new Date().getFullYear()} Aura & Roast Artisanal Café & Kitchen. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span>FSSAI Lic. No: 13622014000492</span>
            <span>·</span>
            <span>100% Organic Flours & Single-Origin Arabica</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
