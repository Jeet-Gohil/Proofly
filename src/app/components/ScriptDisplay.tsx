'use client';

import { useState } from 'react';
import { Copy, ChevronDown, ChevronUp } from 'lucide-react';

interface Props {
  userId: string;
  siteId: string;
}

export default function TrackerEmbed({ userId, siteId }: Props) {
  const [copied, setCopied] = useState(false);
  const [showMore, setShowMore] = useState(false);

  const scriptCode = `<script src="http://localhost:3000/api/tracker" data-user-id="${userId}" data-site-id="${siteId}"></script>`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(scriptCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy script', err);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-4 p-6 bg-zinc-900 text-white rounded-xl border border-zinc-700 shadow-md">
      <h6 className="text-lg sm:text-md mb-3">
        Please refer the below instructions to embed the Tracker script in your website's codebase. 
      </h6>

      <div className="relative bg-zinc-800 text-blue-300 font-mono text-sm rounded-lg p-4 overflow-auto">
        <code>{scriptCode}</code>

        <button
          onClick={handleCopy}
          className="absolute top-2 right-2 text-xs bg-zinc-700 hover:bg-zinc-600 px-3 py-1.5 rounded-md flex items-center gap-1 transition"
        >
          <Copy size={14} />
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>

      <button
        onClick={() => setShowMore(!showMore)}
        className="mt-4 flex items-center text-sm text-indigo-400 hover:text-indigo-300 transition"
      >
        {showMore ? (
          <>
            <ChevronUp size={16} className="mr-1" />
            Hide Instructions
          </>
        ) : (
          <>
            <ChevronDown size={16} className="mr-1" />
            View Instructions
          </>
        )}
      </button>

      {showMore && (
        <div className="mt-4 bg-zinc-800 rounded-lg p-4 text-sm space-y-4">
          <div>
            <h3 className="text-indigo-400 font-semibold mb-1">📄 In HTML file:</h3>
                <pre className="bg-zinc-900 p-3 rounded text-sm overflow-auto whitespace-pre-wrap leading-relaxed">
  <code>
    <span className="text-pink-400">&lt;!DOCTYPE html&gt;</span>{'\n'}
    <span className="text-pink-400">&lt;html&gt;</span>{'\n'}
    {'  '}<span className="text-pink-400">&lt;head&gt;</span>{'\n'}
    {'    '}<span className="text-pink-400">&lt;script</span>{' '}
    <span className="text-yellow-300">src</span>=<span className="text-green-400">"http://localhost:3000/api/tracker"</span>{' '}
    <span className="text-yellow-300">data-user-id</span>=<span className="text-green-400">"{userId}"</span>{' '}
    <span className="text-yellow-300">data-site-id</span>=<span className="text-green-400">"{siteId}"</span>
    <span className="text-pink-400">&gt;&lt;/script&gt;</span>{'\n'}
    {'  '}<span className="text-pink-400">&lt;/head&gt;</span>{'\n'}
    {'  '}<span className="text-pink-400">&lt;body&gt;</span>{'\n'}
    {'    '}{'<!-- Your content -->'}{'\n'}
    {'  '}<span className="text-pink-400">&lt;/body&gt;</span>{'\n'}
    <span className="text-pink-400">&lt;/html&gt;</span>
  </code>
</pre>

          </div>

          <div>
            <h3 className="text-indigo-400 font-semibold mb-1">⚛️ In Next.js (e.g., app/layout.tsx or _app.tsx):</h3>
            <pre className="bg-zinc-900 p-3 rounded text-sm overflow-auto whitespace-pre-wrap leading-relaxed">
  <code>
    <span className="text-pink-400">&lt;head&gt;</span>{'\n'}
    {'  '}{'{/* Other tags */'}{'}'}{'\n'}
    {'  '}<span className="text-pink-400">&lt;script</span>{' '}
    <span className="text-yellow-300">src</span>=<span className="text-green-400">"http://localhost:3000/api/tracker"</span>{' '}
    <span className="text-yellow-300">data-user-id</span>=<span className="text-green-400">"{userId}"</span>{' '}
    <span className="text-yellow-300">data-site-id</span>=<span className="text-green-400">"{siteId}"</span>
    <span className="text-pink-400">&gt;&lt;/script&gt;</span>{'\n'}
    <span className="text-pink-400">&lt;/head&gt;</span>
  </code>
</pre>

          </div>
        </div>
      )}
    </div>
  );
}
