'use client';

import { useState } from 'react';

export default function SitePreferences() {
  const [trackingEnabled, setTrackingEnabled] = useState(true);
  const [geoLocation, setGeoLocation] = useState(false);

  const handleSave = () => {
    alert('Site preferences saved!');
  };

  return (
    <div className="max-w-xl space-y-6">
      <h3 className="text-xl font-semibold text-zinc-800 dark:text-white">Site Preferences</h3>

      <div className="flex items-center justify-between">
        <span className="text-zinc-700 dark:text-zinc-200">Enable Visit Tracking</span>
        <input
          type="checkbox"
          checked={trackingEnabled}
          onChange={() => setTrackingEnabled(!trackingEnabled)}
          className="w-5 h-5 text-purple-600"
        />
      </div>

      <div className="flex items-center justify-between">
        <span className="text-zinc-700 dark:text-zinc-200">Enable Geo Location</span>
        <input
          type="checkbox"
          checked={geoLocation}
          onChange={() => setGeoLocation(!geoLocation)}
          className="w-5 h-5 text-purple-600"
        />
      </div>

      <button
        onClick={handleSave}
        className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700"
      >
        Save Preferences
      </button>
    </div>
  );
}
