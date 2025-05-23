'use client'
import { DashBoardHead } from '@/app/components/DashBoardHead'
import { SideBar } from '@/app/components/SideBar'
import React, { useState } from 'react'
import LoginSuccessPopup from '@/app/components/LoginSuccessPopup'

export default function page() {

  const [Popup, showPopup] = useState(false);
  const [data, setData] = useState(null);

  const [formData, setFormData] = useState({
    email: '',
    site_url: '',
    site_name: '',
    description: '',
    tracking_type: 'visits',
    status: 'active',
    domain_verified: false,
    tracking_script_injected: false,
    geo_tracking_enabled: false,
    logo_url: '',
    tags: ''
  });

  

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Send form data to backend API
    try {
      const response = await fetch('/api/sites', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      const siteId = data.siteId;
      console.log(siteId);



      if (!response.ok) {
        throw new Error('Failed to submit the site data.')
      }
      <LoginSuccessPopup site_id={siteId} user_id= '123'/>
      // Handle success (e.g., show a success message or redirenct)
    } catch (error) {
      console.error('Error:', error)
      // Handle error (e.g., show an error message)
    }
  }
  

  return (
    <div className="flex h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 text-gray-900 overflow-hidden">
  {/* Sidebar */}
  <SideBar />

  {/* Main Dashboard Content */}
  <div className="flex-1 flex flex-col overflow-y-auto">
    {/* Dashboard Header */}
    <DashBoardHead />

    {/* Main Content Area */}
    <main className="flex-1 p-6 sm:p-10 overflow-y-auto">
      <div className="max-w-5xl mx-auto p-10  shadow-2xl rounded-3xl border border-gray-200 dark:border-gray-700 transition-all duration-300">
        {/* Heading */}
        <div className="mb-10 text-center">
          <h2 className="text-4xl font-bold text-gray-800 dark:text-white">
            🛰️ Add a New Website to Track
          </h2>
          <p className="mt-2 text-gray-600 dark:text-gray-400 text-sm">
            Provide details about your site for tracking and analytics.
          </p>
        </div>

        {/* Form */}
        <form  className="space-y-10" onSubmit={handleSubmit}>
          {/* Site Info Section */}
          <div>
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4">📄 Site Info</h3>
            <div className="grid md:grid-cols-2 gap-6">
            <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1 text-gray-600 dark:text-gray-300">
                  email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  onChange={handleChange}
                  placeholder="xxx@gmail.com"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-white focus:ring-2 focus:ring-indigo-400 outline-none transition"
                />
              </div>
              {/* Site URL */}
              <div>
                <label htmlFor="site_url" className="block text-sm font-medium mb-1 text-gray-600 dark:text-gray-300">
                  Site URL
                </label>
                <input
                  id="site_url"
                  name="site_url"
                  type="url"
                  required
                  onChange={handleChange}
                  placeholder="https://example.com"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-white focus:ring-2 focus:ring-indigo-400 outline-none transition"
                />
              </div>

              {/* Site Name */}
              <div>
                <label onChange={handleChange} htmlFor="site_name" className="block text-sm font-medium mb-1 text-gray-600 dark:text-gray-300">
                  Site Name
                </label>
                <input
                  id="site_name"
                  onChange={handleChange}
                  name="site_name"
                  type="text"
                  required
                  placeholder="My Cool Startup"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-white focus:ring-2 focus:ring-indigo-400 outline-none transition"
                />
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium mb-1 text-gray-600 dark:text-gray-300">
              📃 Description
            </label>
            <textarea
              id="description"
              onChange={handleChange}
              name="description"
              rows={4}
              placeholder="Tell us more about what your site does..."
              className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-white focus:ring-2 focus:ring-indigo-400 outline-none transition resize-none"
            />
          </div>

          {/* Tracking Options */}
          <div>
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4">📊 Tracking Settings</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {/* Tracking Type */}
              <div>
                <label htmlFor="tracking_type" className="block text-sm font-medium mb-1 text-gray-600 dark:text-gray-300">
                  Tracking Type
                </label>
                <select
                onChange={handleChange}
                  id="tracking_type"
                  name="tracking_type"
                  defaultValue="visits"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:ring-2 focus:ring-indigo-400 outline-none transition"
                >
                  <option value="visits">Visits</option>
                  <option value="logins">Logins</option>
                  <option value="signups">Signups</option>
                </select>
              </div>

              {/* Status */}
              <div>
                <label htmlFor="status" className="block text-sm font-medium mb-1 text-gray-600 dark:text-gray-300">
                  Status
                </label>
                <select
                onChange={handleChange}
                  id="status"
                  name="status"
                  defaultValue="active"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:ring-2 focus:ring-indigo-400 outline-none transition"
                >
                  <option value="active">Active</option>
                  <option value="paused">Paused</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>
          </div>

          {/* Booleans */}
          <div>
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4">🧪 Features</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { id: "domain_verified", label: "Domain Verified" },
                { id: "tracking_script_injected", label: "Script Injected" },
                { id: "geo_tracking_enabled", label: "Geo Tracking" },
              ].map(({ id, label }) => (
                <label key={id} className="flex items-center space-x-3 cursor-pointer">
                  <input
                  onChange={handleChange}
                    type="checkbox"
                    id={id}
                    name={id}
                    className="h-5 w-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-400"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">{label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Logo and Tags */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="logo_url" className="block text-sm font-medium mb-1 text-gray-600 dark:text-gray-300">
                🌐 Logo URL (Optional)
              </label>
              <input
              onChange={handleChange}
                id="logo_url"
                name="logo_url"
                type="url"
                placeholder="https://yourcdn.com/logo.png"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-white focus:ring-2 focus:ring-indigo-400 outline-none transition"
              />
            </div>

            <div>
              <label htmlFor="tags" className="block text-sm font-medium mb-1 text-gray-600 dark:text-gray-300">
                🏷️ Tags (comma-separated)
              </label>
              <input
              onChange={handleChange}
                id="tags"
                name="tags"
                type="text"
                placeholder="startup, marketing, analytics"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-white focus:ring-2 focus:ring-indigo-400 outline-none transition"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="inline-block w-full md:w-auto px-8 py-3 bg-indigo-600 text-white text-lg font-semibold rounded-xl shadow-md hover:bg-indigo-700 transition duration-300"
            >
              🚀 Add Site
            </button>
          </div>
        </form>
      </div>
    </main>
  </div>
</div>

  )
}
