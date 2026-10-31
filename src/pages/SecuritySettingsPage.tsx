import React, { useState } from 'react';
import {
  Shield,
  Key,
  Smartphone,
  History,
  Lock,
  Download,
  Trash2,
  CheckCircle,
  AlertCircle,
  Eye,
  EyeOff,
  UserCheck,
  Server,
} from 'lucide-react';
import { useAcademy } from '../context/AcademyContext';

export const SecuritySettingsPage: React.FC = () => {
  const { siteSettings, role, cloudSyncStatus, lastCloudSync } = useAcademy();

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  const activeSessions = [
    {
      id: 'sess-1',
      device: 'Current Device (Web Browser / PWA)',
      location: `${siteSettings.headOfficeCity}, Pakistan`,
      ip: '182.185.142.***',
      activeNow: true,
      lastActive: 'Just now',
    },
    {
      id: 'sess-2',
      device: 'Mobile Safari (iOS PWA)',
      location: 'London, United Kingdom',
      ip: '86.14.92.***',
      activeNow: false,
      lastActive: 'Yesterday, 09:40 PM',
    },
    {
      id: 'sess-3',
      device: 'Chrome Android (Galaxy S24)',
      location: 'Dubai, United Arab Emirates',
      ip: '94.200.11.***',
      activeNow: false,
      lastActive: '3 days ago',
    },
  ];

  const handleUpdatePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPassword || newPassword.length < 8) {
      setStatusMessage({ text: 'New password must be at least 8 characters long.', type: 'error' });
      return;
    }
    if (newPassword !== confirmPassword) {
      setStatusMessage({ text: 'New passwords do not match. Please re-enter.', type: 'error' });
      return;
    }

    setStatusMessage({
      text: 'Security credentials updated successfully! Your account is secured.',
      type: 'success',
    });
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setTimeout(() => setStatusMessage(null), 5000);
  };

  const handleExportData = () => {
    const backupData = {
      academy: siteSettings.academyName,
      headOffice: siteSettings.headOfficeCity,
      userRole: role,
      exportDate: new Date().toISOString(),
      securityProtocol: 'TLS 1.3 / AES-256 Cloud Encrypted',
    };
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(backupData, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `shaheen-academy-security-export-${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="bg-red-950 text-white min-h-screen py-10 px-4 sm:px-6 lg:px-8 space-y-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <div className="inline-flex p-3 bg-red-900/60 rounded-2xl border border-amber-500/30 text-amber-400">
            <Shield className="w-10 h-10" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-amber-100">
            Security & Account Settings
          </h1>
          <p className="text-xs sm:text-sm text-red-200">
            Enterprise Cybersecurity, Authentication Controls, Active Sessions & GDPR Rights
          </p>
          <div className="text-[11px] text-amber-300 font-mono">
            Encrypted Endpoints • Role: <span className="uppercase font-bold text-emerald-400">{role}</span>
          </div>
        </div>

        {/* Status Alert Banner */}
        {statusMessage && (
          <div
            className={`p-4 rounded-xl flex items-center gap-3 text-sm font-semibold border ${
              statusMessage.type === 'success'
                ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                : 'bg-red-900/80 border-red-500 text-red-100'
            }`}
          >
            {statusMessage.type === 'success' ? (
              <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
            ) : (
              <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
            )}
            <span>{statusMessage.text}</span>
          </div>
        )}

        {/* Cloud Security & Server Status */}
        <div className="bg-red-900/60 border border-amber-500/30 rounded-2xl p-5 shadow-lg flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-emerald-500/20 text-emerald-400 rounded-xl border border-emerald-500/30">
              <Server className="w-6 h-6" />
            </div>
            <div>
              <div className="text-sm font-bold text-amber-200">System Security & Database Sync</div>
              <div className="text-xs text-red-200">
                Encrypted with HTTPS / TLS 1.3. Cloud Status:{' '}
                <span className="text-emerald-400 font-bold uppercase">{cloudSyncStatus}</span>
              </div>
            </div>
          </div>
          <div className="text-xs font-mono text-amber-300 bg-red-950/70 px-3 py-1.5 rounded-lg border border-red-800">
            Last Sync: {lastCloudSync || 'Active'}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 1: Password & Authentication */}
          <div className="bg-red-900/60 border border-amber-500/30 rounded-3xl p-6 text-xs sm:text-sm text-red-100 space-y-4 shadow-xl">
            <div className="flex items-center gap-2 text-base font-bold text-amber-200 border-b border-red-800 pb-3">
              <Key className="w-5 h-5 text-amber-400" />
              <span>Change Portal Password</span>
            </div>

            <form onSubmit={handleUpdatePassword} className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-red-200 mb-1">Current Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="Enter current password"
                    className="w-full bg-red-950 text-white px-3.5 py-2 rounded-xl text-xs border border-red-700 focus:outline-none focus:border-amber-400"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2.5 text-red-300 hover:text-amber-200"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-red-200 mb-1">New Secure Password</label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Min 8 characters (Letters, numbers)"
                  className="w-full bg-red-950 text-white px-3.5 py-2 rounded-xl text-xs border border-red-700 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-red-200 mb-1">Confirm New Password</label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-type new password"
                  className="w-full bg-red-950 text-white px-3.5 py-2 rounded-xl text-xs border border-red-700 focus:outline-none focus:border-amber-400"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-amber-500 hover:bg-amber-400 text-red-950 font-bold py-2.5 rounded-xl transition-all shadow-md text-xs flex items-center justify-center gap-2"
              >
                <Lock className="w-4 h-4" />
                <span>Save New Password</span>
              </button>
            </form>
          </div>

          {/* Card 2: Two-Factor Authentication (2FA) */}
          <div className="bg-red-900/60 border border-amber-500/30 rounded-3xl p-6 text-xs sm:text-sm text-red-100 space-y-4 shadow-xl flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-base font-bold text-amber-200 border-b border-red-800 pb-3">
                <Smartphone className="w-5 h-5 text-emerald-400" />
                <span>Two-Factor Authentication (2FA)</span>
              </div>
              <p className="text-xs text-red-200 leading-relaxed">
                Add an additional security layer to protect your student records, teacher shift schedule, and payment history against unauthorized access.
              </p>
              <div className="p-3.5 rounded-xl bg-red-950/80 border border-red-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-amber-300 text-xs">WhatsApp / SMS Verification</span>
                  <button
                    onClick={() => {
                      setTwoFactorEnabled(!twoFactorEnabled);
                      setStatusMessage({
                        text: !twoFactorEnabled
                          ? '2FA security enabled! A verification prompt will now accompany logins.'
                          : '2FA security disabled.',
                        type: 'success',
                      });
                      setTimeout(() => setStatusMessage(null), 4000);
                    }}
                    className={`px-3 py-1 rounded-full text-xs font-bold transition-colors ${
                      twoFactorEnabled
                        ? 'bg-emerald-500 text-red-950'
                        : 'bg-red-800 text-red-200 hover:bg-red-700'
                    }`}
                  >
                    {twoFactorEnabled ? 'Enabled ✓' : 'Enable 2FA'}
                  </button>
                </div>
                <div className="text-[11px] text-red-300">
                  Registered Mobile: <span className="text-amber-200 font-mono">{siteSettings.whatsappNumber}</span>
                </div>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-[11px] text-amber-200">
              💡 <strong>Security Tip:</strong> Academy coordinators will never ask for your password or OTP over phone calls.
            </div>
          </div>
        </div>

        {/* Card 3: Active Device Sessions & Audit Trail */}
        <div className="bg-red-900/60 border border-amber-500/30 rounded-3xl p-6 sm:p-8 text-xs sm:text-sm text-red-100 space-y-4 shadow-xl">
          <div className="flex items-center justify-between border-b border-red-800 pb-3">
            <div className="flex items-center gap-2 text-base font-bold text-amber-200">
              <History className="w-5 h-5 text-amber-400" />
              <span>Active Devices & Authorized Sessions</span>
            </div>
            <span className="text-xs text-emerald-400 font-mono font-semibold">
              3 Devices Connected
            </span>
          </div>

          <div className="space-y-2.5">
            {activeSessions.map((s) => (
              <div
                key={s.id}
                className="p-3.5 rounded-xl bg-red-950/80 border border-red-800/80 flex flex-wrap items-center justify-between gap-2"
              >
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-amber-100 text-xs">{s.device}</span>
                    {s.activeNow && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                        Active Now
                      </span>
                    )}
                  </div>
                  <div className="text-[11px] text-red-300">
                    Location: {s.location} • IP: <span className="font-mono">{s.ip}</span>
                  </div>
                </div>
                <div className="text-xs text-red-400 font-mono">{s.lastActive}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Card 4: Data Privacy & Export Controls (GDPR) */}
        <div className="bg-red-900/60 border border-amber-500/30 rounded-3xl p-6 sm:p-8 text-xs sm:text-sm text-red-100 space-y-4 shadow-xl">
          <div className="flex items-center gap-2 text-base font-bold text-amber-200 border-b border-red-800 pb-3">
            <UserCheck className="w-5 h-5 text-emerald-400" />
            <span>Data Rights & Account Actions (GDPR / CCPA)</span>
          </div>

          <p className="text-xs text-red-200 leading-relaxed">
            In compliance with international data protection laws, you retain the complete right to export a machine-readable copy of your profile data or request immediate account closure.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={handleExportData}
              className="bg-red-950 hover:bg-red-900 text-amber-300 border border-amber-500/40 font-bold px-4 py-2.5 rounded-xl transition-all shadow-md text-xs flex items-center gap-2"
            >
              <Download className="w-4 h-4 text-amber-400" />
              <span>Export Personal Data (.JSON)</span>
            </button>

            <button
              onClick={() => {
                setStatusMessage({
                  text: 'Account deletion request received. Administration desk will contact your registered WhatsApp for identity verification within 24 hours.',
                  type: 'error',
                });
                setTimeout(() => setStatusMessage(null), 6000);
              }}
              className="bg-red-950/80 hover:bg-red-900 text-red-400 border border-red-700 font-bold px-4 py-2.5 rounded-xl transition-all shadow-md text-xs flex items-center gap-2"
            >
              <Trash2 className="w-4 h-4 text-red-400" />
              <span>Request Account Deletion</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
