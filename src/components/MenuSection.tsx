import React, { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, Plus, Sparkles, Flame, Check, HelpCircle, ArrowRight } from 'lucide-react';
import { MenuItem, DietaryType } from '../types/cafe';

interface MenuSectionProps {
  items: MenuItem[];
  onSelectItem: (item: MenuItem) => void;
  onQuickAdd: (item: MenuItem) => void;
  onOpenDifferenceGuide: (topic?: 'coffee' | 'pizza' | 'burger') => void;
}

export const MenuSection: React.FC<MenuSectionProps> = ({
  items,
  onSelectItem,
  onQuickAdd,
  onOpenDifferenceGuide,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [dietaryFilter, setDietaryFilter] = useState<'all' | DietaryType>('all');
  const [sortBy, setSortBy] = useState<'recommended' | 'price-asc' | 'price-desc' | 'rating'>('recommended');

  const categories = [
    { id: 'all', label: 'All Menu' },
    { id: 'coffee', label: 'Specialty Coffee' },
    { id: 'pizza', label: 'Wood-Fired Pizza' },
    { id: 'burger', label: 'Gourmet Burgers' },
    { id: 'bakery', label: 'Bakery & Viennoiserie' },
    { id: 'pasta', label: 'Handmade Pasta' },
  ];

  // Filtering and sorting logic
  const filteredItems = useMemo(() => {
    return items
      .filter((item) => {
        // Category filter
        if (selectedCategory !== 'all' && item.category !== selectedCategory) {
          return false;
        }
        // Dietary filter
        if (dietaryFilter !== 'all' && item.dietary !== dietaryFilter) {
          return false;
        }
        // Search query
        if (searchQuery.trim()) {
          const query = searchQuery.toLowerCase();
          const matchName = item.name.toLowerCase().includes(query);
          const matchTelugu = item.teluguName?.toLowerCase().includes(query);
          const matchDesc = item.description.toLowerCase().includes(query);
          const matchCategory = item.categoryLabel.toLowerCase().includes(query);
          if (!matchName && !matchTelugu && !matchDesc && !matchCategory) {
            return false;
          }
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        return (b.reviewsCount || 0) - (a.reviewsCount || 0);
      });
  }, [items, selectedCategory, dietaryFilter, searchQuery, sortBy]);

  return (
    <section id="menu-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 scroll-mt-20">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <span className="text-xs uppercase tracking-widest text-amber-900/80 font-bold block mb-1">
            Artisanal Kitchen & Roastery
          </span>
          <h2 className="font-serif-display text-3xl sm:text-4xl font-bold tracking-tight text-stone-900">
            Our Handcrafted Menu
          </h2>
          <p className="text-stone-600 text-sm mt-1 max-w-xl">
            From single-estate coffees to slow-fermented wood-fired crusts, smash burgers, and fresh pasta. 
            Every dish has its own authentic recipe, distinct look, and sensory ratio.
          </p>
        </div>

        {/* Quick stat */}
        <div className="text-xs text-stone-500 font-medium">
          Showing <span className="font-mono tabular-nums font-bold text-stone-900">{filteredItems.length}</span> curated items
        </div>
      </div>

      {/* Interactive "What's the Difference?" Educational Guide Banner */}
      <div className="mb-8 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#2C1D17] to-[#1C120E] text-white flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-md border border-amber-900/40">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-xl bg-amber-500/20 text-amber-300 shrink-0 mt-0.5">
            <HelpCircle className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-serif-display text-base sm:text-lg font-bold text-amber-200">
              Not sure about the difference between items?
            </h3>
            <p className="text-xs text-stone-300 max-w-xl mt-0.5 leading-relaxed">
              Wondering how a <strong>Café Latte</strong> differs from a <strong>Cappuccino</strong>? 
              Or how our <strong>Paneer Tikka Pizza</strong> compares to the <strong>Smoked Chicken Pizza</strong>? 
              Explore our chef's visual comparison guide with milk ratios and ingredient breakdowns.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 shrink-0">
          <button
            onClick={() => onOpenDifferenceGuide('coffee')}
            className="px-3 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 border border-amber-500/30 text-xs font-semibold transition-colors cursor-pointer"
          >
            ☕ Latte vs Cappuccino
          </button>
          <button
            onClick={() => onOpenDifferenceGuide('pizza')}
            className="px-3 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 border border-amber-500/30 text-xs font-semibold transition-colors cursor-pointer"
          >
            🍕 Paneer vs Chicken Pizza
          </button>
          <button
            onClick={() => onOpenDifferenceGuide('burger')}
            className="px-3.5 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1 cursor-pointer"
          >
            <span>Full Guide</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Interactive Category Segmented Tabs (Functional Buttons) */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-3 mb-6 scrollbar-none border-b border-stone-200/80">
        {categories.map((cat) => {
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                isActive
                  ? 'bg-amber-900 text-white shadow-xs'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200/80'
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Search, Lower/Higher Price Sorting & Dietary Filters Bar */}
      <div className="bg-stone-100/70 p-3 sm:p-4 rounded-xl border border-stone-200/80 mb-10 flex flex-col md:flex-row md:items-center justify-between gap-3">
        
        {/* Search Input */}
        <div className="relative flex-1 min-w-[240px]">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search pizza, pasta, flat white, croissant, burger..."
            className="w-full pl-9 pr-4 py-2 bg-white rounded-lg border border-stone-200 text-xs text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-1 focus:ring-amber-900"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-stone-600 cursor-pointer"
            >
              Clear
            </button>
          )}
        </div>

        {/* Dietary toggles */}
        <div className="flex items-center gap-1.5 overflow-x-auto py-1">
          <button
            onClick={() => setDietaryFilter('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer whitespace-nowrap ${
              dietaryFilter === 'all'
                ? 'bg-stone-800 text-white'
                : 'bg-white text-stone-700 border border-stone-200 hover:bg-stone-50'
            }`}
          >
            All Diets
          </button>
          <button
            onClick={() => setDietaryFilter('veg')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
              dietaryFilter === 'veg'
                ? 'bg-emerald-800 text-white'
                : 'bg-white text-emerald-800 border border-emerald-200 hover:bg-emerald-50'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
            Pure Veg
          </button>
          <button
            onClick={() => setDietaryFilter('non-veg')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
              dietaryFilter === 'non-veg'
                ? 'bg-rose-800 text-white'
                : 'bg-white text-rose-800 border border-rose-200 hover:bg-rose-50'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-rose-500 inline-block" />
            Non-Veg
          </button>
          <button
            onClick={() => setDietaryFilter('vegan')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer whitespace-nowrap ${
              dietaryFilter === 'vegan'
                ? 'bg-amber-800 text-white'
                : 'bg-white text-stone-700 border border-stone-200 hover:bg-stone-50'
            }`}
          >
            Vegan
          </button>
        </div>

        {/* Price Sorting Selector */}
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-3.5 h-3.5 text-stone-500 shrink-0" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="bg-white border border-stone-200 text-stone-800 text-xs py-2 px-3 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-900 cursor-pointer font-medium"
            aria-label="Sort Menu By Price and Rating"
          >
            <option value="recommended">Featured & Popular</option>
            <option value="price-asc">Price: Low to High (₹ ↑)</option>
            <option value="price-desc">Price: High to Low (₹ ↓)</option>
            <option value="rating">Highest Rated (⭐)</option>
          </select>
        </div>

      </div>

      {/* Menu Cards 3-Column Grid */}
      {filteredItems.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-stone-200">
          <p className="font-serif-display text-xl text-stone-700 mb-2">No matching dishes found</p>
          <p className="text-xs text-stone-500 mb-4">Try clearing filters or search for another delicious craving.</p>
          <button
            onClick={() => {
              setSelectedCategory('all');
              setDietaryFilter('all');
              setSearchQuery('');
            }}
            className="px-4 py-2 bg-stone-900 text-white rounded-lg text-xs font-medium hover:bg-stone-800 transition-colors"
          >
            Reset All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {filteredItems.map((item) => (
            <article
              key={item.id}
              className="group bg-white rounded-2xl border border-stone-200/90 overflow-hidden flex flex-col hover:border-amber-700/40 hover:shadow-lg transition-all duration-200"
            >
              {/* Product Image */}
              <div
                onClick={() => onSelectItem(item)}
                className="relative aspect-[4/3] bg-stone-100 overflow-hidden cursor-pointer"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center group-hover:scale-104 transition-transform duration-300"
                />
                
                {/* Visual Scrim for Text/Badges */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/20 opacity-80" />

                {/* Tempting Food Tag */}
                {item.tag && (
                  <div className="absolute top-3 left-3 bg-stone-900/85 backdrop-blur-xs text-amber-300 px-2.5 py-1 rounded-md text-[11px] font-bold tracking-wide shadow-xs">
                    {item.tag}
                  </div>
                )}

                {/* Dietary Symbol & Prep Time */}
                <div className="absolute bottom-3 left-3 flex items-center gap-2 text-white text-xs">
                  <span
                    className={`w-4 h-4 rounded-sm flex items-center justify-center border ${
                      item.dietary === 'veg'
                        ? 'border-emerald-400 bg-emerald-950/80'
                        : item.dietary === 'vegan'
                        ? 'border-green-400 bg-green-950/80'
                        : 'border-rose-400 bg-rose-950/80'
                    }`}
                    title={item.dietary}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        item.dietary === 'veg'
                          ? 'bg-emerald-400'
                          : item.dietary === 'vegan'
                          ? 'bg-green-400'
                          : 'bg-rose-400'
                      }`}
                    />
                  </span>
                  <span className="text-[11px] font-semibold text-stone-100 drop-shadow-xs">
                    {item.prepTime}
                  </span>
                </div>

                <div className="absolute bottom-3 right-3 text-amber-300 text-xs font-semibold drop-shadow-xs bg-black/40 px-2 py-0.5 rounded backdrop-blur-xs">
                  ⭐ {item.rating}
                </div>
              </div>

              {/* Card Content & Metadata */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                
                <div>
                  {/* Clean metadata */}
                  <div className="flex items-center gap-2 text-xs text-stone-500 mb-1.5">
                    <span className="font-semibold text-stone-700">{item.categoryLabel}</span>
                    <span aria-hidden="true">·</span>
                    <span>{item.reviewsCount} reviews</span>
                  </div>

                  {/* Title & Telugu translation */}
                  <h3
                    onClick={() => onSelectItem(item)}
                    className="font-serif-display text-lg font-bold text-stone-900 group-hover:text-amber-900 transition-colors leading-snug cursor-pointer"
                  >
                    {item.name}
                  </h3>
                  {item.teluguName && (
                    <p className="text-xs text-amber-900/80 font-medium mb-2">
                      {item.teluguName}
                    </p>
                  )}

                  {/* Description */}
                  <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed mb-3">
                    {item.description}
                  </p>

                  {/* DISTINCTIVE CALLOUT: What makes it different? */}
                  {item.differenceExplainer && (
                    <div className="mb-3 p-2.5 bg-amber-50/80 border border-amber-200/70 rounded-xl text-[11px] leading-relaxed text-amber-950">
                      <div className="flex items-center justify-between mb-0.5">
                        <span className="font-bold text-amber-900 text-[10px] uppercase tracking-wider">
                          {item.differenceExplainer.differsFrom}
                        </span>
                        <button
                          type="button"
                          onClick={() => {
                            const topic = item.category === 'coffee' ? 'coffee' : item.category === 'pizza' ? 'pizza' : 'burger';
                            onOpenDifferenceGuide(topic);
                          }}
                          className="text-[10px] text-amber-800 hover:text-amber-950 font-semibold underline cursor-pointer"
                        >
                          Compare →
                        </button>
                      </div>
                      <p>{item.differenceExplainer.explanation}</p>
                    </div>
                  )}

                  {/* Visual Composition Ratio bar (For Coffees) */}
                  {item.composition && (
                    <div className="mb-3">
                      <div className="h-2 w-full rounded-full overflow-hidden flex bg-stone-100 shadow-inner">
                        {item.composition.layers.map((layer, i) => (
                          <div
                            key={i}
                            style={{ width: `${layer.percentage}%`, backgroundColor: layer.color }}
                            title={`${layer.name}: ${layer.percentage}%`}
                          />
                        ))}
                      </div>
                      <div className="flex justify-between text-[9px] text-stone-400 mt-1 font-mono">
                        {item.composition.layers.map((layer, i) => (
                          <span key={i}>{layer.name} ({layer.percentage}%)</span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Flavor Tags */}
                  {item.flavorTags && (
                    <div className="flex flex-wrap gap-1 mb-4">
                      {item.flavorTags.slice(0, 3).map((tag, i) => (
                        <span key={i} className="text-[10px] bg-stone-100 text-stone-600 px-2 py-0.5 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Price and Action Button */}
                <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
                  <div className="flex items-baseline gap-2">
                    <span className="font-mono tabular-nums text-lg font-bold text-stone-900">
                      ₹{item.price}
                    </span>
                    {item.originalPrice && (
                      <span className="font-mono tabular-nums text-xs text-stone-400 line-through">
                        ₹{item.originalPrice}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => onSelectItem(item)}
                      className="px-3 py-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-medium transition-colors cursor-pointer"
                    >
                      Customize
                    </button>

                    <button
                      type="button"
                      onClick={() => onQuickAdd(item)}
                      className="p-2 rounded-lg bg-amber-900 hover:bg-amber-800 text-white transition-colors cursor-pointer"
                      title="Quick Add to Order"
                      aria-label={`Add ${item.name} to cart`}
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

              </div>
            </article>
          ))}
        </div>
      )}

    </section>
  );
};
