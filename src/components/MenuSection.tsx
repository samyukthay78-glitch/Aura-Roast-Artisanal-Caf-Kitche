import React, { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, Plus, Sparkles, Flame, Check } from 'lucide-react';
import { MenuItem, DietaryType } from '../types/cafe';

interface MenuSectionProps {
  items: MenuItem[];
  onSelectItem: (item: MenuItem) => void;
  onQuickAdd: (item: MenuItem) => void;
}

export const MenuSection: React.FC<MenuSectionProps> = ({
  items,
  onSelectItem,
  onQuickAdd,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [dietaryFilter, setDietaryFilter] = useState<'all' | DietaryType>('all');
  const [sortBy, setSortBy] = useState<'recommended' | 'price-asc' | 'price-desc' | 'rating'>('recommended');

  const categories = [
    { id: 'all', label: 'All Menu' },
    { id: 'coffee', label: 'Specialty Coffee' },
    { id: 'bakery', label: 'Bakery & Viennoiserie' },
    { id: 'pizza', label: 'Wood-Fired Pizza' },
    { id: 'burger', label: 'Gourmet Burgers' },
    { id: 'pasta', label: 'Handmade Pasta' },
    { id: 'drinks', label: 'Coolers & Drinks' },
    { id: 'desserts', label: 'Desserts' },
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
        // Search query (search in English, Telugu name, and description)
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
        // Default recommended: Chef's signature & bestsellers first
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
            All dishes prepared fresh to order.
          </p>
        </div>

        {/* Quick stat */}
        <div className="text-xs text-stone-500 font-medium">
          Showing <span className="font-mono tabular-nums font-bold text-stone-900">{filteredItems.length}</span> curated items
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
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-stone-600"
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

        {/* Price Sorting Selector (Lower to Higher / Higher to Lower requested by user) */}
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
              className="group bg-white rounded-2xl border border-stone-200/90 overflow-hidden flex flex-col hover:border-amber-700/40 hover:shadow-md transition-all duration-200"
            >
              {/* Product Image (Takes 65-70% visual presence of top portion) */}
              <div
                onClick={() => onSelectItem(item)}
                className="relative aspect-[4/3] bg-stone-100 overflow-hidden cursor-pointer"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center group-hover:scale-103 transition-transform duration-300"
                />
                
                {/* Visual Scrim for Text/Badges */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 opacity-70" />

                {/* Tempting Food Tag (Zero pill clutter - unboxed sleek label) */}
                {item.tag && (
                  <div className="absolute top-3 left-3 bg-stone-900/80 backdrop-blur-xs text-amber-300 px-2.5 py-1 rounded-md text-[11px] font-bold tracking-wide shadow-xs">
                    {item.tag}
                  </div>
                )}

                {/* Dietary Symbol & Prep Time */}
                <div className="absolute bottom-3 left-3 flex items-center gap-2 text-white text-xs">
                  <span
                    className={`w-3.5 h-3.5 rounded-sm flex items-center justify-center border ${
                      item.dietary === 'veg'
                        ? 'border-emerald-400 bg-emerald-950/70'
                        : item.dietary === 'vegan'
                        ? 'border-green-400 bg-green-950/70'
                        : 'border-rose-400 bg-rose-950/70'
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
                  <span className="text-[11px] font-medium text-stone-200 drop-shadow-xs">
                    {item.prepTime}
                  </span>
                </div>

                <div className="absolute bottom-3 right-3 text-amber-300 text-xs font-semibold drop-shadow-xs">
                  ⭐ {item.rating}
                </div>
              </div>

              {/* Card Content & Metadata */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                
                <div>
                  {/* Clean unboxed metadata with typographic separators */}
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
                  <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed mb-4">
                    {item.description}
                  </p>
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
