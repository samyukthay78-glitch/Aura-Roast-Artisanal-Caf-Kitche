import React, { useState } from 'react';
import { X, Sparkles, Coffee, Pizza, Flame, Check, ArrowRight } from 'lucide-react';
import { MenuItem } from '../types/cafe';
import { MENU_ITEMS } from '../data/menuData';

interface DishDifferenceGuideProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectItem: (item: MenuItem) => void;
  initialTopic?: 'coffee' | 'pizza' | 'burger';
}

export const DishDifferenceGuide: React.FC<DishDifferenceGuideProps> = ({
  isOpen,
  onClose,
  onSelectItem,
  initialTopic = 'coffee',
}) => {
  const [activeTopic, setActiveTopic] = useState<'coffee' | 'pizza' | 'burger'>(initialTopic);

  if (!isOpen) return null;

  const latteItem = MENU_ITEMS.find((i) => i.id === 'coffee-latte')!;
  const cappuccinoItem = MENU_ITEMS.find((i) => i.id === 'coffee-cappuccino')!;
  const cortadoItem = MENU_ITEMS.find((i) => i.id === 'coffee-cortado')!;

  const paneerPizzaItem = MENU_ITEMS.find((i) => i.id === 'pizza-paneer')!;
  const chickenPizzaItem = MENU_ITEMS.find((i) => i.id === 'pizza-chicken')!;
  const burrataPizzaItem = MENU_ITEMS.find((i) => i.id === 'pizza-burrata')!;

  const smashBurgerItem = MENU_ITEMS.find((i) => i.id === 'burger-smash')!;
  const chickenBurgerItem = MENU_ITEMS.find((i) => i.id === 'burger-chicken')!;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="guide-heading"
      className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/70 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-4xl bg-[#FAF8F5] rounded-3xl shadow-2xl border border-stone-200 overflow-hidden my-6">
        
        {/* Modal Header */}
        <div className="p-5 sm:p-6 bg-white border-b border-stone-200 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="p-1.5 rounded-lg bg-amber-100 text-amber-900">
                <Sparkles className="w-4 h-4" />
              </span>
              <span className="text-[11px] uppercase tracking-widest text-amber-900 font-bold">
                The Roaster & Chef's Guide
              </span>
            </div>
            <h2 id="guide-heading" className="font-serif-display text-2xl sm:text-3xl font-bold text-stone-900">
              What Makes Each Dish Unique?
            </h2>
            <p className="text-xs text-stone-500 mt-0.5">
              Never get confused again. Compare anatomy, ingredients, milk-to-coffee ratios, and flavor profiles side by side.
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-stone-400 hover:text-stone-900 hover:bg-stone-100 transition-colors cursor-pointer"
            aria-label="Close comparison guide"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Category Switcher Tabs */}
        <div className="flex border-b border-stone-200 bg-stone-100/80 px-6 pt-3 gap-2">
          <button
            onClick={() => setActiveTopic('coffee')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-t-xl text-xs font-bold transition-colors cursor-pointer border-t border-x ${
              activeTopic === 'coffee'
                ? 'bg-white text-amber-950 border-stone-200 -mb-px'
                : 'text-stone-600 hover:text-stone-900 border-transparent'
            }`}
          >
            <Coffee className="w-4 h-4 text-amber-800" />
            <span>Café Latte vs Cappuccino vs Cortado</span>
          </button>

          <button
            onClick={() => setActiveTopic('pizza')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-t-xl text-xs font-bold transition-colors cursor-pointer border-t border-x ${
              activeTopic === 'pizza'
                ? 'bg-white text-amber-950 border-stone-200 -mb-px'
                : 'text-stone-600 hover:text-stone-900 border-transparent'
            }`}
          >
            <Pizza className="w-4 h-4 text-amber-800" />
            <span>Paneer Tikka vs Smoked Chicken Pizza</span>
          </button>

          <button
            onClick={() => setActiveTopic('burger')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-t-xl text-xs font-bold transition-colors cursor-pointer border-t border-x ${
              activeTopic === 'burger'
                ? 'bg-white text-amber-950 border-stone-200 -mb-px'
                : 'text-stone-600 hover:text-stone-900 border-transparent'
            }`}
          >
            <Flame className="w-4 h-4 text-amber-800" />
            <span>Smash Burger vs Buttermilk Chicken</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 max-h-[70vh] overflow-y-auto space-y-6">
          
          {/* TOPIC 1: COFFEE COMPARISON */}
          {activeTopic === 'coffee' && (
            <div className="space-y-6">
              <div className="bg-amber-50/60 p-4 rounded-2xl border border-amber-200/80 text-xs text-amber-950 leading-relaxed">
                <strong className="font-bold">The Golden Rule: </strong>
                All 3 use the same freshly ground single-origin espresso, but the <em>ratio of steamed milk and foam texture completely transforms the sip</em>.
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* 1. Silky Café Latte */}
                <div className="bg-white rounded-2xl border border-stone-200 p-5 flex flex-col justify-between shadow-2xs space-y-4">
                  <div>
                    <div className="relative aspect-[4/3] rounded-xl overflow-hidden mb-3 border border-stone-100">
                      <img
                        src={latteItem.image}
                        alt="Silky Café Latte"
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute top-2 left-2 bg-amber-900/90 text-amber-200 text-[10px] font-bold px-2 py-0.5 rounded">
                        Milky & Mild
                      </span>
                    </div>

                    <h3 className="font-serif-display text-lg font-bold text-stone-900">
                      Silky Café Latte
                    </h3>
                    <p className="text-[11px] text-stone-500 mb-3">
                      ₹{latteItem.price} · 220ml Serving
                    </p>

                    {/* Ratio Breakdown */}
                    <div className="space-y-1.5 mb-4">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400">
                        Cup Composition
                      </span>
                      <div className="h-6 w-full rounded-lg overflow-hidden flex text-[9px] font-bold text-stone-800 font-mono shadow-inner">
                        <div style={{ width: '20%', backgroundColor: '#5D4037' }} className="text-white flex items-center justify-center" title="20% Espresso">
                          20%
                        </div>
                        <div style={{ width: '65%', backgroundColor: '#EFEBE9' }} className="text-stone-700 flex items-center justify-center" title="65% Steamed Milk">
                          65% Steamed Milk
                        </div>
                        <div style={{ width: '15%', backgroundColor: '#FFFFFF' }} className="text-stone-800 flex items-center justify-center border-l" title="15% Microfoam">
                          15%
                        </div>
                      </div>
                      <div className="flex justify-between text-[10px] text-stone-500">
                        <span>Espresso</span>
                        <span>Sweet Steamed Milk</span>
                        <span>Microfoam Art</span>
                      </div>
                    </div>

                    <div className="space-y-1.5 text-xs text-stone-600">
                      <p><strong>Texture:</strong> Silky, liquid smooth, subtle foam.</p>
                      <p><strong>Coffee Intensity:</strong> Gentle (2/5) — milk sweetness dominates.</p>
                      <p><strong>Best For:</strong> People who like a creamy morning warm hug without bitterness.</p>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      onClose();
                      onSelectItem(latteItem);
                    }}
                    className="w-full py-2.5 px-3 rounded-xl bg-amber-900 hover:bg-amber-800 text-white text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>Customize & Order Latte</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* 2. Traditional Italian Cappuccino */}
                <div className="bg-white rounded-2xl border-2 border-amber-800/80 p-5 flex flex-col justify-between shadow-md space-y-4 relative">
                  <div className="absolute -top-3 right-4 bg-amber-900 text-amber-200 text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow-xs">
                    Thick Foam Dome
                  </div>

                  <div>
                    <div className="relative aspect-[4/3] rounded-xl overflow-hidden mb-3 border border-stone-100">
                      <img
                        src={cappuccinoItem.image}
                        alt="Italian Cappuccino"
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute top-2 left-2 bg-stone-900/90 text-amber-300 text-[10px] font-bold px-2 py-0.5 rounded">
                        Bold & Frothy ☁️
                      </span>
                    </div>

                    <h3 className="font-serif-display text-lg font-bold text-stone-900">
                      Italian Cappuccino
                    </h3>
                    <p className="text-[11px] text-stone-500 mb-3">
                      ₹{cappuccinoItem.price} · 180ml Serving
                    </p>

                    {/* Ratio Breakdown */}
                    <div className="space-y-1.5 mb-4">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400">
                        Cup Composition (1:1:1 Equal)
                      </span>
                      <div className="h-6 w-full rounded-lg overflow-hidden flex text-[9px] font-bold text-stone-800 font-mono shadow-inner">
                        <div style={{ width: '33%', backgroundColor: '#3E2723' }} className="text-white flex items-center justify-center" title="33% Espresso">
                          33% Esp.
                        </div>
                        <div style={{ width: '33%', backgroundColor: '#EFEBE9' }} className="text-stone-700 flex items-center justify-center" title="33% Steamed Milk">
                          33% Milk
                        </div>
                        <div style={{ width: '34%', backgroundColor: '#D7CCC8' }} className="text-amber-950 flex items-center justify-center" title="34% Foam Dome + Cocoa">
                          34% Foam & Cocoa
                        </div>
                      </div>
                      <div className="flex justify-between text-[10px] text-stone-500">
                        <span>Espresso</span>
                        <span>Warm Milk</span>
                        <span>Dense Foam Dome</span>
                      </div>
                    </div>

                    <div className="space-y-1.5 text-xs text-stone-600">
                      <p><strong>Texture:</strong> Airy, thick cloud-like foam that rests on your lips.</p>
                      <p><strong>Coffee Intensity:</strong> Strong (4/5) — punchy dark chocolate notes.</p>
                      <p><strong>Best For:</strong> Coffee lovers wanting rich foam and intense espresso aroma.</p>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      onClose();
                      onSelectItem(cappuccinoItem);
                    }}
                    className="w-full py-2.5 px-3 rounded-xl bg-amber-900 hover:bg-amber-800 text-white text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>Customize & Order Cappuccino</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* 3. Spanish Honey Cortado */}
                <div className="bg-white rounded-2xl border border-stone-200 p-5 flex flex-col justify-between shadow-2xs space-y-4">
                  <div>
                    <div className="relative aspect-[4/3] rounded-xl overflow-hidden mb-3 border border-stone-100">
                      <img
                        src={cortadoItem.image}
                        alt="Spanish Honey Cortado"
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute top-2 left-2 bg-stone-900/90 text-amber-300 text-[10px] font-bold px-2 py-0.5 rounded">
                        1:1 Intense Kick
                      </span>
                    </div>

                    <h3 className="font-serif-display text-lg font-bold text-stone-900">
                      Spanish Honey Cortado
                    </h3>
                    <p className="text-[11px] text-stone-500 mb-3">
                      ₹{cortadoItem.price} · 120ml Small Glass
                    </p>

                    {/* Ratio Breakdown */}
                    <div className="space-y-1.5 mb-4">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400">
                        Cup Composition (50/50 Cut)
                      </span>
                      <div className="h-6 w-full rounded-lg overflow-hidden flex text-[9px] font-bold text-stone-800 font-mono shadow-inner">
                        <div style={{ width: '50%', backgroundColor: '#3E2723' }} className="text-white flex items-center justify-center" title="50% Double Ristretto">
                          50% Espresso
                        </div>
                        <div style={{ width: '50%', backgroundColor: '#EFEBE9' }} className="text-stone-800 flex items-center justify-center" title="50% Warm Milk + Honey">
                          50% Milk & Honey
                        </div>
                      </div>
                      <div className="flex justify-between text-[10px] text-stone-500">
                        <span>Double Shot</span>
                        <span>Warm Milk & Honey</span>
                      </div>
                    </div>

                    <div className="space-y-1.5 text-xs text-stone-600">
                      <p><strong>Texture:</strong> Velvety, concentrated, slightly sweet finish.</p>
                      <p><strong>Coffee Intensity:</strong> Powerful (5/5) — pure energy burst.</p>
                      <p><strong>Best For:</strong> Serious espresso fans who want just enough milk to take off the edge.</p>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      onClose();
                      onSelectItem(cortadoItem);
                    }}
                    className="w-full py-2.5 px-3 rounded-xl bg-amber-900 hover:bg-amber-800 text-white text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>Customize & Order Cortado</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            </div>
          )}

          {/* TOPIC 2: PIZZA COMPARISON (PANEER VS CHICKEN VS BURRATA) */}
          {activeTopic === 'pizza' && (
            <div className="space-y-6">
              <div className="bg-amber-50/60 p-4 rounded-2xl border border-amber-200/80 text-xs text-amber-950 leading-relaxed">
                <strong className="font-bold">Wood-Fired Purity: </strong>
                All our pizzas are blistered in a 450°C stone oven with 48-hour fermented sourdough. Here is how our toppings make them completely different:
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* 1. Paneer Tikka Pizza */}
                <div className="bg-white rounded-2xl border-2 border-emerald-700/60 p-5 flex flex-col justify-between shadow-sm space-y-4">
                  <div>
                    <div className="relative aspect-[4/3] rounded-xl overflow-hidden mb-3 border border-stone-100">
                      <img
                        src={paneerPizzaItem.image}
                        alt="Charred Malai Paneer Pizza"
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute top-2 left-2 bg-emerald-900 text-emerald-100 text-[10px] font-bold px-2 py-0.5 rounded flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                        100% Pure Veg
                      </span>
                    </div>

                    <h3 className="font-serif-display text-lg font-bold text-stone-900">
                      Charred Malai Paneer Sourdough
                    </h3>
                    <p className="text-[11px] text-stone-500 mb-3">
                      ₹{paneerPizzaItem.price} · 11-inch Neapolitan Crust
                    </p>

                    <div className="space-y-2 text-xs text-stone-600">
                      <p><strong>The Core Star:</strong> Golden charred malai cottage cheese cubes marinated in roasted cumin, garlic, and cold-pressed mustard oil.</p>
                      <p><strong>Sauces & Cheese:</strong> San Marzano tomato base, drops of fresh mint-coriander pesto, and molten fior di latte mozzarella.</p>
                      <p><strong>Flavor:</strong> Herbaceous, smoky Indian tandoor aroma meeting crisp Italian sourdough.</p>
                      <p className="text-emerald-800 font-semibold">Zero meat · Vegetarian friendly.</p>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      onClose();
                      onSelectItem(paneerPizzaItem);
                    }}
                    className="w-full py-2.5 px-3 rounded-xl bg-emerald-900 hover:bg-emerald-800 text-white text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>Select Paneer Pizza</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* 2. Smoked Barbecue Chicken Pizza */}
                <div className="bg-white rounded-2xl border-2 border-rose-700/60 p-5 flex flex-col justify-between shadow-sm space-y-4">
                  <div>
                    <div className="relative aspect-[4/3] rounded-xl overflow-hidden mb-3 border border-stone-100">
                      <img
                        src={chickenPizzaItem.image}
                        alt="Smoked Chicken BBQ Pizza"
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute top-2 left-2 bg-rose-900 text-rose-100 text-[10px] font-bold px-2 py-0.5 rounded flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                        Smoked Poultry
                      </span>
                    </div>

                    <h3 className="font-serif-display text-lg font-bold text-stone-900">
                      Smoked Herb & BBQ Chicken Pizza
                    </h3>
                    <p className="text-[11px] text-stone-500 mb-3">
                      ₹{chickenPizzaItem.price} · 11-inch Neapolitan Crust
                    </p>

                    <div className="space-y-2 text-xs text-stone-600">
                      <p><strong>The Core Star:</strong> Slow-smoked pulled tender chicken breast chunks infused with rosemary and thyme.</p>
                      <p><strong>Sauces & Cheese:</strong> Tangy artisanal barbecue glaze, charred sweet red onions, fior di latte, and smoked Dutch gouda cheese.</p>
                      <p><strong>Flavor:</strong> Savory umami, deep hickory smoke, and mouthwatering meatiness with blistered crust.</p>
                      <p className="text-rose-800 font-semibold">Non-vegetarian · High protein.</p>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      onClose();
                      onSelectItem(chickenPizzaItem);
                    }}
                    className="w-full py-2.5 px-3 rounded-xl bg-rose-950 hover:bg-rose-900 text-white text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>Select Chicken Pizza</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* 3. Fresh Burrata Margherita Pizza */}
                <div className="bg-white rounded-2xl border border-stone-200 p-5 flex flex-col justify-between shadow-2xs space-y-4">
                  <div>
                    <div className="relative aspect-[4/3] rounded-xl overflow-hidden mb-3 border border-stone-100">
                      <img
                        src={burrataPizzaItem.image}
                        alt="Fresh Burrata Margherita"
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute top-2 left-2 bg-amber-900 text-amber-200 text-[10px] font-bold px-2 py-0.5 rounded">
                        Italian Gourmet 🌟
                      </span>
                    </div>

                    <h3 className="font-serif-display text-lg font-bold text-stone-900">
                      Fresh Burrata Margherita
                    </h3>
                    <p className="text-[11px] text-stone-500 mb-3">
                      ₹{burrataPizzaItem.price} · 11-inch Neapolitan Crust
                    </p>

                    <div className="space-y-2 text-xs text-stone-600">
                      <p><strong>The Core Star:</strong> A whole 120g handcrafted chilled burrata ball placed at the center that bursts with sweet cream.</p>
                      <p><strong>Sauces & Cheese:</strong> San Marzano tomato DOP sauce, cold-pressed Genovese basil oil, and Maldon sea salt.</p>
                      <p><strong>Flavor:</strong> Ultra clean, refreshing, creamy contrast between hot blistered dough and cold creamy cheese.</p>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      onClose();
                      onSelectItem(burrataPizzaItem);
                    }}
                    className="w-full py-2.5 px-3 rounded-xl bg-amber-900 hover:bg-amber-800 text-white text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>Select Burrata Pizza</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            </div>
          )}

          {/* TOPIC 3: BURGER COMPARISON */}
          {activeTopic === 'burger' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Smash Burger */}
                <div className="bg-white rounded-2xl border border-stone-200 p-5 space-y-4 flex flex-col justify-between">
                  <div>
                    <div className="relative aspect-[4/3] rounded-xl overflow-hidden mb-3">
                      <img
                        src={smashBurgerItem.image}
                        alt="Smash Cheeseburger"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="font-serif-display text-xl font-bold text-stone-900">
                      Smoked Truffle Portobello Smash Burger
                    </h3>
                    <p className="text-xs text-stone-500 mb-3">Double patty · Crispy lace edges</p>
                    <div className="space-y-2 text-xs text-stone-600">
                      <p><strong>Cooking Method:</strong> Smashed paper-thin on blazing 260°C cast-iron for Maillard browning and crispy lace frills.</p>
                      <p><strong>Sauce & Cheese:</strong> Oozing aged sharp cheddar melt and black truffle garlic aioli.</p>
                      <p><strong>Texture:</strong> Juiciness locked in with caramelized crunchy perimeter.</p>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      onClose();
                      onSelectItem(smashBurgerItem);
                    }}
                    className="w-full py-2.5 px-3 rounded-xl bg-amber-900 text-white text-xs font-semibold flex items-center justify-center gap-1.5"
                  >
                    <span>Order Smash Burger</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Buttermilk Fried Chicken Burger */}
                <div className="bg-white rounded-2xl border border-stone-200 p-5 space-y-4 flex flex-col justify-between">
                  <div>
                    <div className="relative aspect-[4/3] rounded-xl overflow-hidden mb-3">
                      <img
                        src={chickenBurgerItem.image}
                        alt="Crispy Buttermilk Chicken Burger"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="font-serif-display text-xl font-bold text-stone-900">
                      Crispy Nashville Buttermilk Chicken Burger
                    </h3>
                    <p className="text-xs text-stone-500 mb-3">Whole chicken thigh · Ultra crunchy</p>
                    <div className="space-y-2 text-xs text-stone-600">
                      <p><strong>Cooking Method:</strong> 24-hour spiced buttermilk marinade, double floured for dramatic jagged golden ridges.</p>
                      <p><strong>Sauce & Crunch:</strong> Dipped in spicy Nashville chili glaze with tangy purple cabbage slaw and thick dill pickles.</p>
                      <p><strong>Texture:</strong> Loud, shattering crunch with steamy juicy center.</p>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      onClose();
                      onSelectItem(chickenBurgerItem);
                    }}
                    className="w-full py-2.5 px-3 rounded-xl bg-amber-900 text-white text-xs font-semibold flex items-center justify-center gap-1.5"
                  >
                    <span>Order Fried Chicken Burger</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
