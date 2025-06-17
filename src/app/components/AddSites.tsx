'use client';

import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

export default function AddSiteForm() {
  const [formData, setFormData] = useState({
    email: '',
    site_url: '',
    site_name: '',
    description: '',
    tracking_type: 'visits',
    domain_verified: false,
    tracking_script_injected: false,
    geo_tracking_enabled: false,
    logo_url: '',
    tags: '',
    status: 'active',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

   const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;

    setFormData({
      ...formData,
      [name]: type === 'checkbox'
        ? (e.target as HTMLInputElement).checked
        : value,
    });
  };

  
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
         toast.success('✅ Your site has been successfully registered!', {
        position: 'top-center',
      });
         
         // Handle success (e.g., show a success message or redirenct)
       } catch (error) {
         console.error('Error:', error)
          toast.error('❌ Something went wrong!');
         // Handle error (e.g., show an error message)
       }
     }
  

  return (
    <>
    <Toaster/>
    <div className="bg-[#1f1f1f] text-white p-6 rounded-2xl shadow-md max-w-3xl w-full mx-auto">
      <h2 className="text-2xl font-bold mb-6">Add a New Site</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm mb-1">Email</label>
          <input
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg bg-[#2a2a2a] border border-gray-700"
            placeholder= "Please enter logged in Email"
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Site URL</label>
          <input
            type="url"
            name="site_url"
            required
            value={formData.site_url}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg bg-[#2a2a2a] border border-gray-700"
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Site Name</label>
          <input
            type="text"
            name="site_name"
            required
            value={formData.site_name}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg bg-[#2a2a2a] border border-gray-700"
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Tracking Type</label>
          <select
            name="tracking_type"
            value={formData.tracking_type}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg bg-[#2a2a2a] border border-gray-700"
          >
            <option value="visits">Visits</option>
            <option value="heatmap">Heatmap</option>
            <option value="realtime">Real-time</option>
          </select>
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm mb-1">Description</label>
          <textarea
            name="description"
            required
            value={formData.description}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg bg-[#2a2a2a] border border-gray-700"
            rows={3}
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Logo URL</label>
          <input
            type="url"
            name="logo_url"
            value={formData.logo_url}
            onChange={handleChange}
            placeholder="https://example.com/logo.png"
            className="w-full px-4 py-2 rounded-lg bg-[#2a2a2a] border border-gray-700"
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Tags (comma-separated)</label>
          <input
            type="text"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            placeholder='e.g. {"start-ups"}'
            className="w-full px-4 py-2 rounded-lg bg-[#2a2a2a] border border-gray-700"
          />
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="domain_verified"
            checked={formData.domain_verified}
            onChange={handleChange}
            className="w-5 h-5 accent-blue-500"
          />
          <label className="text-sm">Domain Verified</label>
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="tracking_script_injected"
            checked={formData.tracking_script_injected}
            onChange={handleChange}
            className="w-5 h-5 accent-blue-500"
          />
          <label className="text-sm">Tracking Script Injected</label>
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="geo_tracking_enabled"
            checked={formData.geo_tracking_enabled}
            onChange={handleChange}
            className="w-5 h-5 accent-blue-500"
          />
          <label className="text-sm">Geo Tracking Enabled</label>
        </div>

        <div>
          <label className="block text-sm mb-1">Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg bg-[#2a2a2a] border border-gray-700"
          >
            <option value="active">Active</option>
            <option value="paused">Paused</option>
            <option value="archived">Archived</option>
          </select>
        </div>

        <div className="md:col-span-2">
          <button
          onClick={handleSubmit}
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 px-4 mt-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all"
          >
            {isSubmitting ? 'Submitting...' : 'Add Site'}
          </button>
        </div>
      </form>
    </div>
    </>
  );
}
