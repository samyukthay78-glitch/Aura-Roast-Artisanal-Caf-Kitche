import React from 'react';
import { X, Sparkles, Coffee, Gift, Award, Check, ArrowRight } from 'lucide-react';
import { LoyaltyProfile } from '../types/cafe';
import { LOYALTY_REWARDS_CATALOG } from '../data/menuData';

interface LoyaltyRewardsModalProps {
  isOpen: boolean;
  onClose: () => void;
  loyalty: LoyaltyProfile;
  onRedeemReward: (rewardId: string, beansCost: number) => void;
}

export const LoyaltyRewardsModal: React.FC<LoyaltyRewardsModalProps> = ({
  isOpen,
  onClose,
  loyalty,
  onRedeemReward,
}) => {
  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="loyalty-heading"
      className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-xl bg-[#FAF8F5] rounded-2xl shadow-2xl border border-stone-200 overflow-hidden my-6">
        
        {/* Header */}
        <div className="p-5 border-b border-stone-200 flex items-center justify-between bg-white">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-600" />
            <h2 id="loyalty-heading" className="font-serif-display text-xl font-bold text-stone-900">
              Brew Club Loyalty Rewards
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors cursor-pointer"
            aria-label="Close Brew Club rewards modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 max-h-[75vh] overflow-y-auto space-y-6 text-stone-800">
          
          {/* Aesthetic Membership Card */}
          <div className="relative rounded-2xl p-6 bg-gradient-to-br from-[#2E1E17] via-[#21150F] to-[#120B08] text-white shadow-xl overflow-hidden border border-amber-900/40">
            <div className="absolute right-0 top-0 w-48 h-48 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />
            
            <div className="flex justify-between items-start mb-6">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-amber-300/80 block">
                  Aura & Roast Exclusive
                </span>
                <h3 className="font-serif-display text-2xl font-bold text-white mt-0.5">
                  Brew Club Pass
                </h3>
              </div>
              <div className="px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-300 text-xs font-semibold flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-amber-400" />
                <span>{loyalty.tier}</span>
              </div>
            </div>

            {/* Beans Balance */}
            <div className="mb-6">
              <span className="text-xs text-stone-400 block font-medium">Available Balance</span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="font-mono text-4xl font-extrabold text-amber-200 tabular-nums">
                  {loyalty.beans}
                </span>
                <span className="text-sm font-semibold text-stone-300">Café Beans</span>
              </div>
            </div>

            {/* Progress to next tier */}
            <div>
              <div className="flex justify-between text-xs text-stone-300 mb-1.5 font-medium">
                <span>Next Tier: Gold Connoisseur</span>
                <span>{loyalty.beansToNextTier} Beans needed</span>
              </div>
              <div className="w-full bg-stone-800/80 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-amber-400 h-full rounded-full transition-all duration-500"
                  style={{ width: `${loyalty.tierProgress}%` }}
                />
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-stone-800 flex justify-between text-[11px] text-stone-400 font-mono">
              <span>Member ID: {loyalty.memberId}</span>
              <span>Joined: {loyalty.joinedDate}</span>
            </div>
          </div>

          {/* How Beans Work */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="bg-white p-3 rounded-xl border border-stone-200 text-center">
              <span className="text-xs font-bold text-amber-950 block mb-0.5">1. Sip & Dine</span>
              <p className="text-[11px] text-stone-500">Earn 1 Bean for every ₹10 spent on online or dine-in orders</p>
            </div>
            <div className="bg-white p-3 rounded-xl border border-stone-200 text-center">
              <span className="text-xs font-bold text-amber-950 block mb-0.5">2. Accumulate</span>
              <p className="text-[11px] text-stone-500">Beans never expire. Level up from Bronze to Gold status</p>
            </div>
            <div className="bg-white p-3 rounded-xl border border-stone-200 text-center">
              <span className="text-xs font-bold text-amber-950 block mb-0.5">3. Free Rewards</span>
              <p className="text-[11px] text-stone-500">Redeem for complimentary coffees, pizzas, or cart discounts</p>
            </div>
          </div>

          {/* Redeemable Rewards Catalog */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-stone-700">
              Redeemable Free Delicacies
            </h3>

            <div className="space-y-2.5">
              {LOYALTY_REWARDS_CATALOG.map((reward) => {
                const canAfford = loyalty.beans >= reward.beansRequired;

                return (
                  <div
                    key={reward.id}
                    className="bg-white p-4 rounded-xl border border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-xs font-bold text-stone-900">{reward.title}</h4>
                        <span className="text-[11px] text-stone-400">Worth {reward.value}</span>
                      </div>
                      <p className="text-[11px] text-stone-500 mt-0.5">{reward.description}</p>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <span className="font-mono text-xs font-bold text-amber-900">
                        {reward.beansRequired} Beans
                      </span>

                      <button
                        type="button"
                        onClick={() => onRedeemReward(reward.id, reward.beansRequired)}
                        disabled={!canAfford}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                          canAfford
                            ? 'bg-amber-900 hover:bg-amber-800 text-white shadow-xs'
                            : 'bg-stone-100 text-stone-400 border border-stone-200 cursor-not-allowed'
                        }`}
                      >
                        {canAfford ? 'Redeem Item' : 'Need More Beans'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
