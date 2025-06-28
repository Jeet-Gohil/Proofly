
'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import toast, { Toaster } from 'react-hot-toast'
import { Loader2, CheckCircle, XCircle } from 'lucide-react'

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
}

interface SiteFormData {
  email: string
  site_url: string
  site_name: string
  type_of_site: string
  tags: string
  status: string
  description: string
  domain_verified: boolean
  geo_tracking_enabled: boolean
  logo_url: string
  Is_public: boolean
}

const AddSiteForm = () => {
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState<SiteFormData>({
    email: '',
    site_url: '',
    site_name: '',
    type_of_site: '',
    tags: '',
    status: 'active',
    description: '',
    domain_verified: false,
    geo_tracking_enabled: false,
    logo_url: '',
    Is_public: false,
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target
    setForm({
      ...form,
      [name]: type === 'checkbox'
        ? (e.target as HTMLInputElement).checked
        : value
    })
  }


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await fetch('/api/sites', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      const data = await res.json()

      if (res.ok) {
        toast.success(
          <div className="flex items-center gap-2">
            <CheckCircle className="text-green-500" /> Site created successfully!
          </div>
        )
        setForm({
          email: '',
          site_url: '',
          site_name: '',
          type_of_site: '',
          tags: '',
          status: 'active',
          description: '',
          domain_verified: false,
          geo_tracking_enabled: false,
          logo_url: '',
          Is_public: false,
        })
      } else {
        toast.error(
          <div className="flex items-center gap-2">
            <XCircle className="text-red-500" /> {data.error || 'Failed to create site'}
          </div>
        )
      }
    } catch (error) {
      toast.error(
        <div className="flex items-center gap-2">
          <XCircle className="text-red-500" /> Something went wrong
        </div>
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.div
      className="max-w-4xl mx-auto p-6"
      initial="hidden"
      animate="visible"
      variants={fadeIn}
    >
      <Toaster position="top-right" />
      <h2 className="text-3xl font-bold text-white mb-6">Add a New Site</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 text-white">
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          className="bg-black border border-gray-700 p-3 rounded"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          type="url"
          name="site_url"
          placeholder="https://example.com"
          className="bg-black border border-gray-700 p-3 rounded"
          value={form.site_url}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="site_name"
          placeholder="e.g. My Portfolio"
          className="bg-black border border-gray-700 p-3 rounded"
          value={form.site_name}
          onChange={handleChange}
        />
        <select
          name="type_of_site"
          className="bg-black border border-gray-700 p-3 rounded"
          value={form.type_of_site}
          onChange={handleChange}
        >
          <option value="">Select type</option>
          <option value="SaaS">SaaS</option>
          <option value="portfolio">Portfolio</option>
          <option value="blog">Blog</option>
          <option value="ecommerce">E-commerce</option>
        </select>
        <input
          type="text"
          name="tags"
          placeholder="e.g. startup, tech"
          className="bg-black border border-gray-700 p-3 rounded"
          value={form.tags}
          onChange={handleChange}
        />
        <select
          name="status"
          className="bg-black border border-gray-700 p-3 rounded"
          value={form.status}
          onChange={handleChange}
        >
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>

        <input
          type="text"
          name="logo_url"
          placeholder="Logo URL"
          className="bg-black border border-gray-700 p-3 rounded col-span-full"
          value={form.logo_url}
          onChange={handleChange}
        />

        <textarea
          name="description"
          placeholder="Describe your site..."
          rows={4}
          className="bg-black border border-gray-700 p-3 rounded col-span-full"
          value={form.description}
          onChange={handleChange}
        />

        <div className="flex items-center gap-4 col-span-full">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="domain_verified"
              checked={form.domain_verified}
              onChange={handleChange}
            />
            Domain Verified
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="geo_tracking_enabled"
              checked={form.geo_tracking_enabled}
              onChange={handleChange}
            />
            Geo Tracking Enabled
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="is_public"
              checked={form.Is_public}
              onChange={handleChange}
            />
            Metrics data public
          </label>
        </div>

        <div className="col-span-full">
          <button
            type="submit"
            disabled={loading}
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded font-semibold flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" /> Submitting...
              </>
            ) : (
              'Submit Site'
            )}
          </button>
        </div>
      </form>
    </motion.div>
  )
}

export default AddSiteForm
