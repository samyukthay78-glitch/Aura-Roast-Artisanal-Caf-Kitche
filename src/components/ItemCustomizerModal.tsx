import React, { useState, useEffect } from 'react';
import { X, Plus, Minus, Check, Sparkles } from 'lucide-react';
import { MenuItem, SelectedOption } from '../types/cafe';

interface ItemCustomizerModalProps {
  item: MenuItem | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (
    item: MenuItem,
    selectedOptions: SelectedOption[],
    quantity: number,
    notes?: string,
    unitPrice?: number
  ) => void;
}

export const ItemCustomizerModal: React.FC<ItemCustomizerModalProps> = ({
  item,
  isOpen,
  onClose,
  onAddToCart,
}) => {
  const [selectedOptions, setSelectedOptions] = useState<SelectedOption[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState('');

  // Initialize default options when item changes
  useEffect(() => {
    if (item && item.customizationGroups) {
      const defaults: SelectedOption[] = [];
      item.customizationGroups.forEach((group) => {
        const defaultOpt = group.options.find((o) => o.default) || group.options[0];
        if (defaultOpt) {
          defaults.push({
            groupId: group.id,
            groupName: group.name,
            optionId: defaultOpt.id,
            optionLabel: defaultOpt.label,
            price: defaultOpt.price,
          });
        }
      });
      setSelectedOptions(defaults);
      setQuantity(1);
      setNotes('');
    } else {
      setSelectedOptions([]);
      setQuantity(1);
      setNotes('');
    }
  }, [item]);

  if (!isOpen || !item) return null;

  // Calculate unit price = base price + sum of selected options
  const optionsAddonPrice = selectedOptions.reduce((sum, opt) => sum + opt.price, 0);
  const unitPrice = item.price + optionsAddonPrice;
  const totalPrice = unitPrice * quantity;

  const handleSelectOption = (
    groupId: string,
    groupName: string,
    optionId: string,
    optionLabel: string,
    price: number,
    isMultiple: boolean = false
  ) => {
    if (isMultiple) {
      // Toggle multiple selection
      const exists = selectedOptions.some((o) => o.optionId === optionId);
      if (exists) {
        setSelectedOptions((prev) => prev.filter((o) => o.optionId !== optionId));
      } else {
        setSelectedOptions((prev) => [
          ...prev,
          { groupId, groupName, optionId, optionLabel, price },
        ]);
      }
    } else {
      // Single selection in group
      setSelectedOptions((prev) => {
        const filtered = prev.filter((o) => o.groupId !== groupId);
        return [...filtered, { groupId, groupName, optionId, optionLabel, price }];
      });
    }
  };

  const handleConfirm = () => {
    onAddToCart(item, selectedOptions, quantity, notes.trim() || undefined, unitPrice);
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-item-title"
      className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-lg bg-[#FAF8F5] rounded-2xl shadow-2xl border border-stone-200 overflow-hidden my-6">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-stone-900/50 hover:bg-stone-900/80 text-white backdrop-blur-sm transition-colors cursor-pointer"
          aria-label="Close customizer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Item Preview Header */}
        <div className="relative h-48 sm:h-56 bg-stone-100 overflow-hidden">
          <img
            src={item.image}
            alt={item.name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1F1612] via-transparent to-transparent opacity-80" />
          
          <div className="absolute bottom-3 left-4 right-4 text-white">
            {item.tag && (
              <span className="inline-block text-[11px] font-semibold text-amber-300 mb-1">
                {item.tag}
              </span>
            )}
            <h2 id="modal-item-title" className="font-serif-display text-xl sm:text-2xl font-bold leading-tight">
              {item.name}
            </h2>
            {item.teluguName && (
              <p className="text-xs text-amber-200/90 font-medium">
                {item.teluguName}
              </p>
            )}
          </div>
        </div>

        {/* Customization Body */}
        <div className="p-5 max-h-[50vh] overflow-y-auto space-y-6 text-stone-800">
          
          {/* Description & dietary */}
          <div>
            <div className="flex items-center gap-2 text-xs text-stone-500 mb-2">
              <span className="font-medium text-stone-700">{item.categoryLabel}</span>
              <span aria-hidden="true">·</span>
              <span>Prep: {item.prepTime}</span>
              <span aria-hidden="true">·</span>
              <span>⭐ {item.rating} ({item.reviewsCount})</span>
            </div>
            <p className="text-sm text-stone-600 leading-relaxed mb-3">
              {item.description}
            </p>

            {/* Difference Explainer Callout */}
            {item.differenceExplainer && (
              <div className="p-3 bg-amber-50/90 border border-amber-200 rounded-xl text-xs text-amber-950 mb-3">
                <span className="font-bold text-amber-900 block mb-0.5">
                  🔍 {item.differenceExplainer.differsFrom}:
                </span>
                <p>{item.differenceExplainer.explanation}</p>
              </div>
            )}

            {/* Cup Composition Bar */}
            {item.composition && (
              <div className="p-3 bg-stone-100 rounded-xl border border-stone-200 space-y-1.5 mb-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-stone-600 block">
                  Drink Composition & Texture
                </span>
                <div className="h-4 w-full rounded-md overflow-hidden flex shadow-inner">
                  {item.composition.layers.map((l, i) => (
                    <div
                      key={i}
                      style={{ width: `${l.percentage}%`, backgroundColor: l.color }}
                      title={`${l.name}: ${l.percentage}%`}
                    />
                  ))}
                </div>
                <div className="flex justify-between text-[10px] text-stone-500 font-mono">
                  {item.composition.layers.map((l, i) => (
                    <span key={i}>{l.name} ({l.percentage}%)</span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Customization Options */}
          {item.customizationGroups && item.customizationGroups.length > 0 && (
            <div className="space-y-5 pt-2 border-t border-stone-200">
              {item.customizationGroups.map((group) => {
                const isGroupSelected = (optId: string) =>
                  selectedOptions.some((o) => o.optionId === optId);

                return (
                  <div key={group.id} className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold uppercase tracking-wider text-stone-700">
                        {group.name}
                      </label>
                      <span className="text-[11px] text-stone-400">
                        {group.required ? 'Required (Choose 1)' : 'Optional'}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {group.options.map((option) => {
                        const selected = isGroupSelected(option.id);
                        return (
                          <button
                            type="button"
                            key={option.id}
                            onClick={() =>
                              handleSelectOption(
                                group.id,
                                group.name,
                                option.id,
                                option.label,
                                option.price,
                                !group.required
                              )
                            }
                            className={`flex items-center justify-between p-3 rounded-xl border text-left text-xs transition-all cursor-pointer ${
                              selected
                                ? 'bg-amber-50/80 border-amber-600 text-amber-950 font-medium shadow-xs'
                                : 'bg-white border-stone-200 text-stone-700 hover:border-stone-300'
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              <div
                                className={`w-4 h-4 rounded-${
                                  group.required ? 'full' : 'md'
                                } flex items-center justify-center border text-[9px] ${
                                  selected
                                    ? 'bg-amber-600 border-amber-600 text-white'
                                    : 'border-stone-300'
                                }`}
                              >
                                {selected && <Check className="w-2.5 h-2.5" />}
                              </div>
                              <span>{option.label}</span>
                            </div>
                            {option.price > 0 ? (
                              <span className="font-mono text-stone-600 tabular-nums">
                                +₹{option.price}
                              </span>
                            ) : (
                              <span className="text-stone-400 text-[10px]">Free</span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Cooking notes */}
          <div className="space-y-1.5 pt-2 border-t border-stone-200">
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-700">
              Kitchen Instructions (Optional)
            </label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g., extra hot, less cinnamon, crisp crust..."
              className="w-full text-xs p-2.5 rounded-lg border border-stone-200 bg-white focus:outline-none focus:ring-1 focus:ring-amber-600"
            />
          </div>

        </div>

        {/* Modal Footer: Quantity & Add Button */}
        <div className="p-4 bg-stone-100/80 border-t border-stone-200 flex items-center justify-between gap-4">
          {/* Quantity Stepper */}
          <div className="flex items-center gap-3 bg-white px-3 py-1.5 rounded-xl border border-stone-200 shadow-2xs">
            <button
              type="button"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              disabled={quantity <= 1}
              className="p-1 rounded text-stone-600 hover:text-stone-900 disabled:opacity-30 cursor-pointer"
              aria-label="Decrease quantity"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="font-mono font-bold text-sm text-stone-900 w-4 text-center tabular-nums">
              {quantity}
            </span>
            <button
              type="button"
              onClick={() => setQuantity(quantity + 1)}
              className="p-1 rounded text-stone-600 hover:text-stone-900 cursor-pointer"
              aria-label="Increase quantity"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Add to Order Button */}
          <button
            type="button"
            onClick={handleConfirm}
            className="flex-1 py-3 px-5 rounded-xl bg-amber-900 hover:bg-amber-800 text-white font-semibold text-xs transition-all flex items-center justify-between shadow-sm cursor-pointer active:scale-98"
          >
            <span>Add to Order Bag</span>
            <span className="font-mono tabular-nums font-bold">
              ₹{totalPrice}
            </span>
          </button>
        </div>

      </div>
    </div>
  );
};
