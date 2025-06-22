'use client';

import { useState } from 'react';

export default function NotificationSettings() {
  const [emailNotifs, setEmailNotifs] = useState(true);
  const [pushNotifs, setPushNotifs] = useState(false);

  const handleSave = () => {
    alert('Notification preferences saved!');
  };

  return (
    <div className="max-w-xl space-y-6">
      <h3 className="text-xl font-semibold text-zinc-800 dark:text-white">Notification Settings</h3>

      <div className="flex items-center justify-between">
        <span className="text-zinc-700 dark:text-zinc-200">Email Notifications</span>
        <input
          type="checkbox"
          checked={emailNotifs}
          onChange={() => setEmailNotifs(!emailNotifs)}
          className="w-5 h-5 text-purple-600"
        />
      </div>

      <div className="flex items-center justify-between">
        <span className="text-zinc-700 dark:text-zinc-200">Push Notifications</span>
        <input
          type="checkbox"
          checked={pushNotifs}
          onChange={() => setPushNotifs(!pushNotifs)}
          className="w-5 h-5 text-purple-600"
        />
      </div>

      <button
        onClick={handleSave}
        className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700"
      >
        Save Changes
      </button>
    </div>
  );
}
