import React from 'react';
import { Calendar, Clock, Check, Sparkles } from 'lucide-react';
import {
  WeeklyClassFrequency,
  getAllWeeklyPlansForCourse,
  CalculatedPlanPricing,
} from '../utils/weeklyPlanPricing';

interface WeeklyPricingGridProps {
  feePKR: number;
  feeUSD: number;
  selectedDays?: WeeklyClassFrequency;
  onSelectPlan?: (days: WeeklyClassFrequency) => void;
  compact?: boolean;
}

export const WeeklyPricingGrid: React.FC<WeeklyPricingGridProps> = ({
  feePKR,
  feeUSD,
  selectedDays = 5,
  onSelectPlan,
  compact = false,
}) => {
  const plans: CalculatedPlanPricing[] = getAllWeeklyPlansForCourse(feePKR, feeUSD);

  if (compact) {
    return (
      <div className="space-y-2">
        <div className="flex items-center justify-between text-[11px] text-amber-300 font-bold mb-1">
          <span className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-emerald-400" />
            <span>Select Weekly Class Schedule (1 to 6 Days):</span>
          </span>
          <span className="text-[10px] text-red-200">USD ($) & PKR (Rs.)</span>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5">
          {plans.map((p) => {
            const isSelected = selectedDays === p.daysPerWeek;
            return (
              <button
                key={p.daysPerWeek}
                type="button"
                onClick={() => onSelectPlan && onSelectPlan(p.daysPerWeek)}
                className={`p-2 rounded-xl border text-center transition-all flex flex-col items-center justify-between ${
                  isSelected
                    ? 'bg-amber-500 text-red-950 border-amber-300 font-bold shadow-md scale-102'
                    : 'bg-red-950/80 border-red-800 text-red-100 hover:border-amber-400/60 hover:bg-red-900/60'
                }`}
              >
                <span className="text-[11px] font-bold leading-tight">
                  {p.daysPerWeek} {p.daysPerWeek === 1 ? 'Day' : 'Days'}/wk
                </span>
                <span className={`text-[10px] ${isSelected ? 'text-red-900 font-semibold' : 'text-red-300'}`}>
                  {p.classesPerMonth} classes/mo
                </span>
                <div className="mt-1 pt-1 border-t border-red-800/40 w-full text-center">
                  <div className="text-[11px] font-extrabold text-emerald-400 group-hover:text-emerald-300">
                    Rs. {p.feePKR.toLocaleString()}
                  </div>
                  <div className={`text-[10px] ${isSelected ? 'text-red-950 font-bold' : 'text-amber-300'}`}>
                    ${p.feeUSD} USD
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-red-800/60 pb-3">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[11px] font-bold">
            <Sparkles className="w-3 h-3" />
            <span>Flexible Weekly Class Plans (1 to 6 Classes per Week)</span>
          </div>
          <h4 className="font-serif font-bold text-lg text-amber-200 mt-1">
            Weekly Frequency Fee Distribution
          </h4>
          <p className="text-xs text-red-200">
            Choose how many days per week you or your child want to take classes. Fees are distributed proportionally in both USD and PKR.
          </p>
        </div>
        <div className="text-xs text-amber-300 bg-red-900/60 px-3 py-1.5 rounded-lg border border-red-700/50 self-start sm:self-center">
          1-on-1 Dedicated Tutor • 30 Mins / Class
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {plans.map((plan) => {
          const isSelected = selectedDays === plan.daysPerWeek;
          return (
            <div
              key={plan.daysPerWeek}
              onClick={() => onSelectPlan && onSelectPlan(plan.daysPerWeek)}
              className={`relative rounded-2xl p-4 border transition-all cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'bg-gradient-to-b from-red-900 to-red-950 border-amber-400 shadow-xl ring-2 ring-amber-400/50'
                  : 'bg-red-950/70 border-red-800/80 hover:border-amber-500/50 hover:bg-red-900/40'
              }`}
            >
              {plan.badge && (
                <span
                  className={`absolute -top-2.5 right-4 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                    plan.daysPerWeek === 5
                      ? 'bg-emerald-500 text-red-950 shadow'
                      : plan.daysPerWeek === 3
                      ? 'bg-amber-500 text-red-950 shadow'
                      : 'bg-red-800 text-amber-200 border border-amber-500/30'
                  }`}
                >
                  {plan.badge}
                </span>
              )}

              <div>
                <div className="flex items-center justify-between mb-1">
                  <div className="font-serif font-bold text-amber-200 text-base flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-emerald-400" />
                    <span>{plan.daysPerWeek} {plan.daysPerWeek === 1 ? 'Class' : 'Classes'} / Week</span>
                  </div>
                  {isSelected && (
                    <span className="w-5 h-5 rounded-full bg-amber-400 text-red-950 flex items-center justify-center">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </span>
                  )}
                </div>

                <div className="text-[11px] text-red-200 mb-2 font-medium">
                  {plan.labelUrdu}
                </div>

                <div className="flex items-center gap-2 text-[11px] text-red-300 mb-3 bg-red-900/50 px-2.5 py-1 rounded-lg">
                  <Clock className="w-3 h-3 text-amber-400 shrink-0" />
                  <span>{plan.classesPerMonth} live classes per month (~{plan.daysPerWeek * 30} mins/wk)</span>
                </div>
              </div>

              <div className="border-t border-red-800/80 pt-3 mt-2">
                <div className="flex items-baseline justify-between">
                  <div>
                    <span className="text-xl font-serif font-black text-amber-300">
                      Rs. {plan.feePKR.toLocaleString()}
                    </span>
                    <span className="text-[11px] text-red-300 ml-1">PKR / mo</span>
                  </div>
                  <div className="text-right">
                    <span className="text-base font-serif font-black text-emerald-400">
                      ${plan.feeUSD}
                    </span>
                    <span className="text-[11px] text-red-300 ml-1">USD / mo</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[10px] text-red-400 mt-1">
                  <span>~Rs. {plan.perClassPKR.toLocaleString()} / class</span>
                  <span>~${plan.perClassUSD} / class</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
