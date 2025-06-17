// pages/dashboard/[uuid]/sites/page.tsx
"use client";

import AddSiteForm from "@/app/components/AddSites";

export default function SitesPage() {
  return (
    <>
    <div className="min-h-screen p-6 bg-black">
      <AddSiteForm/>
    </div>
    </>
  )
}
