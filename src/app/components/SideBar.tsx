'use client'
import Link from "next/link";

  

export const SideBar = () => {
  return (
    <div className="h-screen w-64 bg-[#0e0e10] text-white flex flex-col py-6 px-4 shadow-lg">
  <h1 className="text-2xl font-bold text-white mb-10">Proofly</h1>
  <nav className="space-y-4 text-sm font-medium">
    <Link className="flex items-center gap-3 px-3 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 shadow-md" href={""}>
      <span>🏠</span> Dashboard
    </Link>
    <Link href= {'/dashboard/${user}/sites'} className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-800 transition">
      🌐 Sites
    </Link>
    <Link href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-800 transition">
      📊 Analytics
    </Link>
    <Link href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-800 transition">
      ⚙️ Settings
    </Link>
    <Link href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg text-red-400 hover:bg-red-900/30 transition mt-auto">
      🔓 Logout
    </Link>
  </nav>
</div>

  )
}

