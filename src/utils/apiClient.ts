import {
  AcademyDataPayload,
  AdCampaign,
  AffiliatePartner,
  ContactMessage,
  Course,
  DonationRecord,
  MatrimonialProfile,
  NewsletterSubscriber,
  PaymentReceipt,
  ReferralRecord,
  SiteSettings,
  SocialAccount,
  StudentRecord,
  TeacherApplication,
  ZTProduct,
} from '../types';

const API_BASE = '/api';

async function safeFetch<T>(endpoint: string, options?: RequestInit): Promise<T | null> {
  try {
    const res = await fetch(`${API_BASE}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...(options?.headers || {}),
      },
      ...options,
    });

    if (!res.ok) {
      console.warn(`[Cloud DB API] Request to ${endpoint} returned HTTP ${res.status}`);
      return null;
    }

    const json = await res.json();
    return json as T;
  } catch (err) {
    console.warn(`[Cloud DB API] Network exception calling ${endpoint}:`, err);
    return null;
  }
}

export async function fetchCloudData(): Promise<AcademyDataPayload | null> {
  const result = await safeFetch<{ success: boolean; data: AcademyDataPayload }>('/data');
  if (result && result.success && result.data) {
    return result.data;
  }
  return null;
}

export async function saveCloudSettings(settings: Partial<SiteSettings>): Promise<SiteSettings | null> {
  const res = await safeFetch<{ success: boolean; settings: SiteSettings }>('/settings', {
    method: 'PUT',
    body: JSON.stringify(settings),
  });
  return res?.success ? res.settings : null;
}

export async function saveCloudPayment(payment: PaymentReceipt): Promise<PaymentReceipt | null> {
  const res = await safeFetch<{ success: boolean; payment: PaymentReceipt }>('/payments', {
    method: 'POST',
    body: JSON.stringify(payment),
  });
  return res?.success ? res.payment : null;
}

export async function updateCloudPaymentStatus(
  id: string,
  status: 'Approved' | 'Pending Verification' | 'Rejected'
): Promise<PaymentReceipt | null> {
  const res = await safeFetch<{ success: boolean; payment: PaymentReceipt }>(`/payments/${encodeURIComponent(id)}`, {
    method: 'PUT',
    body: JSON.stringify({ status }),
  });
  return res?.success ? res.payment : null;
}

export async function saveCloudStudent(student: StudentRecord): Promise<StudentRecord | null> {
  const res = await safeFetch<{ success: boolean; student: StudentRecord }>('/students', {
    method: 'POST',
    body: JSON.stringify(student),
  });
  return res?.success ? res.student : null;
}

export async function saveCloudCourse(course: Course): Promise<Course | null> {
  const res = await safeFetch<{ success: boolean; course: Course }>('/courses', {
    method: 'POST',
    body: JSON.stringify(course),
  });
  return res?.success ? res.course : null;
}

export async function updateCloudCourse(id: string, course: Partial<Course>): Promise<Course | null> {
  const res = await safeFetch<{ success: boolean; course: Course }>(`/courses/${encodeURIComponent(id)}`, {
    method: 'PUT',
    body: JSON.stringify(course),
  });
  return res?.success ? res.course : null;
}

export async function deleteCloudCourse(id: string): Promise<boolean> {
  const res = await safeFetch<{ success: boolean }>(`/courses/${encodeURIComponent(id)}`, {
    method: 'DELETE',
  });
  return !!res?.success;
}

export async function saveCloudTeacherApplication(app: TeacherApplication): Promise<TeacherApplication | null> {
  const res = await safeFetch<{ success: boolean; application: TeacherApplication }>('/careers', {
    method: 'POST',
    body: JSON.stringify(app),
  });
  return res?.success ? res.application : null;
}

export async function updateCloudTeacherApplication(
  id: string,
  status: TeacherApplication['status']
): Promise<TeacherApplication | null> {
  const res = await safeFetch<{ success: boolean; application: TeacherApplication }>(`/careers/${encodeURIComponent(id)}`, {
    method: 'PUT',
    body: JSON.stringify({ status }),
  });
  return res?.success ? res.application : null;
}

export async function saveCloudContactMessage(msg: ContactMessage): Promise<ContactMessage | null> {
  const res = await safeFetch<{ success: boolean; message: ContactMessage }>('/contact', {
    method: 'POST',
    body: JSON.stringify(msg),
  });
  return res?.success ? res.message : null;
}

export async function markCloudContactMessageReplied(id: string): Promise<ContactMessage | null> {
  const res = await safeFetch<{ success: boolean; message: ContactMessage }>(`/contact/${encodeURIComponent(id)}`, {
    method: 'PUT',
    body: JSON.stringify({ status: 'Replied' }),
  });
  return res?.success ? res.message : null;
}

export async function saveCloudDonation(donation: DonationRecord): Promise<DonationRecord | null> {
  const res = await safeFetch<{ success: boolean; donation: DonationRecord }>('/donations', {
    method: 'POST',
    body: JSON.stringify(donation),
  });
  return res?.success ? res.donation : null;
}

export async function saveCloudZTProduct(prod: ZTProduct): Promise<ZTProduct | null> {
  const res = await safeFetch<{ success: boolean; product: ZTProduct }>('/zt-products', {
    method: 'POST',
    body: JSON.stringify(prod),
  });
  return res?.success ? res.product : null;
}

export async function updateCloudZTProduct(id: string, prod: Partial<ZTProduct>): Promise<ZTProduct | null> {
  const res = await safeFetch<{ success: boolean; product: ZTProduct }>(`/zt-products/${encodeURIComponent(id)}`, {
    method: 'PUT',
    body: JSON.stringify(prod),
  });
  return res?.success ? res.product : null;
}

export async function deleteCloudZTProduct(id: string): Promise<boolean> {
  const res = await safeFetch<{ success: boolean }>(`/zt-products/${encodeURIComponent(id)}`, {
    method: 'DELETE',
  });
  return !!res?.success;
}

export async function saveCloudMatrimonialProfile(profile: MatrimonialProfile): Promise<MatrimonialProfile | null> {
  const res = await safeFetch<{ success: boolean; profile: MatrimonialProfile }>('/matrimonial', {
    method: 'POST',
    body: JSON.stringify(profile),
  });
  return res?.success ? res.profile : null;
}

export async function deleteCloudMatrimonialProfile(id: string): Promise<boolean> {
  const res = await safeFetch<{ success: boolean }>(`/matrimonial/${encodeURIComponent(id)}`, {
    method: 'DELETE',
  });
  return !!res?.success;
}

export async function saveCloudAdCampaign(ad: AdCampaign): Promise<AdCampaign | null> {
  const res = await safeFetch<{ success: boolean; ad: AdCampaign }>('/ads', {
    method: 'POST',
    body: JSON.stringify(ad),
  });
  return res?.success ? res.ad : null;
}

export async function updateCloudAdCampaign(id: string, ad: Partial<AdCampaign>): Promise<AdCampaign | null> {
  const res = await safeFetch<{ success: boolean; ad: AdCampaign }>(`/ads/${encodeURIComponent(id)}`, {
    method: 'PUT',
    body: JSON.stringify(ad),
  });
  return res?.success ? res.ad : null;
}

export async function deleteCloudAdCampaign(id: string): Promise<boolean> {
  const res = await safeFetch<{ success: boolean }>(`/ads/${encodeURIComponent(id)}`, {
    method: 'DELETE',
  });
  return !!res?.success;
}

export async function recordCloudAdMetric(id: string, metric: 'click' | 'impression' | 'lead'): Promise<boolean> {
  const res = await safeFetch<{ success: boolean }>(`/ads/${encodeURIComponent(id)}/metric`, {
    method: 'POST',
    body: JSON.stringify({ metric }),
  });
  return !!res?.success;
}

export async function saveCloudReferral(ref: ReferralRecord): Promise<ReferralRecord | null> {
  const res = await safeFetch<{ success: boolean; referral: ReferralRecord }>('/referrals', {
    method: 'POST',
    body: JSON.stringify(ref),
  });
  return res?.success ? res.referral : null;
}

export async function saveCloudAffiliate(aff: AffiliatePartner): Promise<AffiliatePartner | null> {
  const res = await safeFetch<{ success: boolean; affiliate: AffiliatePartner }>('/affiliates', {
    method: 'POST',
    body: JSON.stringify(aff),
  });
  return res?.success ? res.affiliate : null;
}

export async function saveCloudSocialAccount(acc: SocialAccount): Promise<SocialAccount | null> {
  const res = await safeFetch<{ success: boolean; account: SocialAccount }>('/social-accounts', {
    method: 'POST',
    body: JSON.stringify(acc),
  });
  return res?.success ? res.account : null;
}

export async function updateCloudSocialAccount(id: string, acc: Partial<SocialAccount>): Promise<SocialAccount | null> {
  const res = await safeFetch<{ success: boolean; account: SocialAccount }>(`/social-accounts/${encodeURIComponent(id)}`, {
    method: 'PUT',
    body: JSON.stringify(acc),
  });
  return res?.success ? res.account : null;
}

export async function subscribeCloudNewsletter(email: string): Promise<NewsletterSubscriber | null> {
  const res = await safeFetch<{ success: boolean; subscriber: NewsletterSubscriber }>('/newsletter', {
    method: 'POST',
    body: JSON.stringify({ email }),
  });
  return res?.success ? res.subscriber : null;
}
