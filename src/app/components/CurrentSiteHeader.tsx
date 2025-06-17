'use client';

interface CurrentSiteHeaderProps {
  siteName: string;
}

export default function CurrentSiteHeader({ siteName }: CurrentSiteHeaderProps) {
  return (
    <div className="w-full rounded-xl bg-gradient-to-br from-[#111827] via-[#1f2937] to-[#0f172a] p-4 mb-6 shadow-md border border-[#2a2e36]">
      <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-white tracking-wide">
        
        <span className="ml-2 inline-block text-indigo-400 font-bold bg-indigo-900/40 px-3 py-1 rounded-lg shadow-sm">
          {siteName}
        </span>
      </h2>
    </div>
  );
}
