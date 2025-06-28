'use client';

import { useState } from 'react';
import ProfileSettings from '@/app/components/settings/profileSettings';
import SitePreferences from '@/app/components/settings/sitePreferences';
import SecuritySettings from '@/app/components/settings/securitySettings';
import AppearanceSettings from '@/app/components/settings/appearanceSettings';
import NotificationSettings from '@/app/components/settings/notificationSettings';
import DangerZone from '@/app/components/settings/dangerZone';
import { useParams } from 'next/navigation';



export default function SettingsPage() {
  const {siteId} = useParams();
  const tabs = [
  { name: 'Profile', component: <ProfileSettings /> },
  { name: 'Site Preferences', component: <SitePreferences /> },
  { name: 'Security', component: <SecuritySettings /> },
  { name: 'Appearance', component: <AppearanceSettings /> },
  { name: 'Notifications', component: <NotificationSettings /> },
  { name: 'Danger Zone', component: <DangerZone siteId={siteId as string} /> },
];
  const [activeTab, setActiveTab] = useState('Profile');

  const ActiveComponent = tabs.find((tab) => tab.name === activeTab)?.component;

  return (
    <div className="flex-1 px-6 py-8">
      <h1 className="text-3xl font-bold text-zinc-800 dark:text-white mb-6">Settings</h1>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-zinc-300 dark:border-zinc-700 pb-2 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.name}
            onClick={() => setActiveTab(tab.name)}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
              activeTab === tab.name
                ? 'bg-purple-600 text-white'
                : 'bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-200'
            }`}
          >
            {tab.name}
          </button>
        ))}
      </div>

      <div className="mt-4">{ActiveComponent}</div>
    </div>
  );
}
