// Safe client-side Google Tag (gtag.js) and Google Ads Conversion Dispatcher

declare global {
  interface Window {
    dataLayer?: any[];
    gtag?: (...args: any[]) => void;
  }
}

export interface ConversionPayload {
  send_to?: string;
  value?: number;
  currency?: string;
  transaction_id?: string;
  event_category?: string;
  event_label?: string;
  [key: string]: any;
}

/**
 * Dispatches a conversion event to Google Ads / Google Analytics
 * @param eventName e.g. 'conversion', 'enrollment_submission', 'whatsapp_contact_click'
 * @param params event attributes like send_to, value, currency, transaction_id
 */
export const trackGoogleConversion = (eventName: string, params?: ConversionPayload): void => {
  try {
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      window.gtag('event', eventName, params || {});
      console.log(`[Google Tracking] Dispatched event: ${eventName}`, params);
    } else {
      // If gtag is not loaded or during development preview, log safely
      console.debug(`[Google Tracking Simulation] Event: ${eventName}`, params);
    }
  } catch (err) {
    console.warn('[Google Tracking] Failed to dispatch event:', err);
  }
};

/**
 * Dispatches a conversion event specifically for tuition fee payment receipts
 */
export const trackPaymentReceiptSubmission = (payload: {
  transactionId: string;
  amountPKR: number;
  currency: string;
  method: string;
  courseTitle: string;
}): void => {
  trackGoogleConversion('purchase', {
    transaction_id: payload.transactionId,
    value: payload.amountPKR,
    currency: payload.currency || 'PKR',
    event_category: 'Tuition Payment',
    event_label: `${payload.method} - ${payload.courseTitle}`,
    payment_type: payload.method,
  });
};

