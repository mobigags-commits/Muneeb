export type WeeklyClassFrequency = 1 | 2 | 3 | 4 | 5 | 6;

export interface WeeklyClassPlanInfo {
  daysPerWeek: WeeklyClassFrequency;
  classesPerMonth: number;
  labelEn: string;
  labelUrdu: string;
  shortLabel: string;
  badge?: string;
  descriptionEn: string;
  descriptionUrdu: string;
}

export const WEEKLY_CLASS_PLANS: WeeklyClassPlanInfo[] = [
  {
    daysPerWeek: 1,
    classesPerMonth: 4,
    labelEn: '1 Class / Week (4 Classes / Month)',
    labelUrdu: 'ہفتے میں 1 کلاس (ماہانہ 4 کلاسز)',
    shortLabel: '1 Day/wk',
    badge: 'Starter',
    descriptionEn: 'Light beginner or weekend review schedule',
    descriptionUrdu: 'ہفتہ وار ایک دن ہلکی رفتار سے تعلیمی پروگرام',
  },
  {
    daysPerWeek: 2,
    classesPerMonth: 8,
    labelEn: '2 Classes / Week (8 Classes / Month)',
    labelUrdu: 'ہفتے میں 2 کلاسز (ماہانہ 8 کلاسز)',
    shortLabel: '2 Days/wk',
    badge: 'Flexible',
    descriptionEn: 'Weekend or 2 days/week steady pace',
    descriptionUrdu: 'ہفتے میں 2 دن (ہفتہ و اتوار یا اپنی مرضی کے دن)',
  },
  {
    daysPerWeek: 3,
    classesPerMonth: 12,
    labelEn: '3 Classes / Week (12 Classes / Month)',
    labelUrdu: 'ہفتے میں 3 کلاسز (ماہانہ 12 کلاسز)',
    shortLabel: '3 Days/wk',
    badge: 'Popular',
    descriptionEn: 'Alternate days schedule (Mon/Wed/Fri or Tue/Thu/Sat)',
    descriptionUrdu: 'ایک دن چھوڑ کر ایک دن (سوموار، بدھ، جمعہ)',
  },
  {
    daysPerWeek: 4,
    classesPerMonth: 16,
    labelEn: '4 Classes / Week (16 Classes / Month)',
    labelUrdu: 'ہفتے میں 4 کلاسز (ماہانہ 16 کلاسز)',
    shortLabel: '4 Days/wk',
    badge: 'Recommended',
    descriptionEn: 'Accelerated 4 days/week continuous progression',
    descriptionUrdu: 'ہفتے میں 4 دن مسلسل مشق اور سیکھنے کا عمل',
  },
  {
    daysPerWeek: 5,
    classesPerMonth: 20,
    labelEn: '5 Classes / Week (20 Classes / Month)',
    labelUrdu: 'ہفتے میں 5 کلاسز (ماہانہ 20 کلاسز - معیاری)',
    shortLabel: '5 Days/wk (Standard)',
    badge: 'Standard',
    descriptionEn: 'Standard full week regular classes (Monday to Friday)',
    descriptionUrdu: 'مکمل ہفتہ وار معیاری روٹین (پیر تا جمعہ باقاعدہ کلاسز)',
  },
  {
    daysPerWeek: 6,
    classesPerMonth: 24,
    labelEn: '6 Classes / Week (24 Classes / Month)',
    labelUrdu: 'ہفتے میں 6 کلاسز (ماہانہ 24 کلاسز - انتہائی تیز)',
    shortLabel: '6 Days/wk (Intensive)',
    badge: 'Intensive Hifz',
    descriptionEn: 'Intensive 6 days/week fast-track Hifz & Nazra course',
    descriptionUrdu: 'تیز رفتار حفظ قرآن و ناظرہ کے لیے 6 دن کلاسز',
  },
];

export interface CalculatedPlanPricing extends WeeklyClassPlanInfo {
  feePKR: number;
  feeUSD: number;
  perClassPKR: number;
  perClassUSD: number;
}

/**
 * Calculates fee for any course based on days per week (1 to 6).
 * The base fee (feePKR, feeUSD) is the standard 5 days/week fee (20 classes/mo).
 * Per-day unit is base / 5, multiplied by daysPerWeek.
 */
export function calculateWeeklyFee(
  basePKR: number,
  baseUSD: number,
  daysPerWeek: WeeklyClassFrequency = 5
): CalculatedPlanPricing {
  const planInfo =
    WEEKLY_CLASS_PLANS.find((p) => p.daysPerWeek === daysPerWeek) ||
    WEEKLY_CLASS_PLANS[4]; // Default to 5 days

  // Base fee represents 5 days/week standard (20 classes)
  const feePKR = Math.round((basePKR / 5) * daysPerWeek);
  const feeUSD = Math.round((baseUSD / 5) * daysPerWeek);

  const classesCount = planInfo.classesPerMonth;
  const perClassPKR = Math.round(feePKR / classesCount);
  const perClassUSD = Number((feeUSD / classesCount).toFixed(2));

  return {
    ...planInfo,
    feePKR,
    feeUSD,
    perClassPKR,
    perClassUSD,
  };
}

/**
 * Returns all 6 weekly frequency plans (1 to 6 days/week) with calculated PKR and USD fees.
 */
export function getAllWeeklyPlansForCourse(
  basePKR: number,
  baseUSD: number
): CalculatedPlanPricing[] {
  return WEEKLY_CLASS_PLANS.map((plan) =>
    calculateWeeklyFee(basePKR, baseUSD, plan.daysPerWeek)
  );
}
