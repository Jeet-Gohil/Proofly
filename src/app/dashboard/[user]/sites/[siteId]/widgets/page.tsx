"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useParams } from "next/navigation";

export default function AddWidget() {
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [position, setPosition] = useState("bottom-right");
  const [endTime, setEndTime] = useState("");
  const [textTemplate, setTextTemplate] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ Chatbot config states
  const [botName, setBotName] = useState("Proofly Assistant");
  const [welcomeMessage, setWelcomeMessage] = useState("Hi! How can I help you today?");
  const [persona, setPersona] = useState("Friendly and Helpful");
  const [themeColor, setThemeColor] = useState("#6C63FF");
    const [faq, setFaq] = useState(""); // <-- new
  const { siteId } = useParams();

  const widgets = [
    {
      type: "social-proof",
      name: "Social Proof Popup",
      description: "Show recent signups to build trust.",
    },
    {
      type: "countdown",
      name: "Countdown Timer",
      description: "Create urgency for offers and sales.",
    },
    {
      type: "visitor-counter",
      name: "Live Visitor Counter",
      description: "Display live visitors to boost credibility.",
    },
    {
      type: "reviews",
      name: "Reviews Rotator",
      description: "Show rotating customer reviews.",
    },
    {
      type: "cta-popup",
      name: "CTA Popup",
      description: "Drive clicks with call-to-action popups.",
    },
    {
      type: "ai-chatbot",
      name: "AI Chatbot",
      description: "Engage visitors with an AI-powered assistant.",
    },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const config: any = { position };

    if (selectedType === "countdown") config.endTime = endTime;
    if (selectedType === "social-proof") config.textTemplate = textTemplate;

    // ✅ Extra config for AI Chatbot
    if (selectedType === "ai-chatbot") {
      config.botName = botName;
      config.welcomeMessage = welcomeMessage;
      config.persona = persona;
      config.themeColor = themeColor;
    }

    const res = await fetch(`/api/sites/${siteId}/Widgets`, {
      method: "POST",
      body: JSON.stringify({
        siteId: siteId,
        type: selectedType,
        config,
      }),
    });

    if (res.ok) {
      alert("✅ Widget saved!");
      setSelectedType(null);
    } else {
      alert("❌ Failed to save.");
    }

    setLoading(false);
  };

  return (
    <main className="min-h-screen flex flex-col items-center bg-gray-100 dark:bg-black px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
        Choose a Widget
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl w-full">
        {widgets.map((w) => (
          <motion.div
            key={w.type}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className={`cursor-pointer rounded-xl p-6 border border-gray-300 dark:border-gray-700 bg-white dark:bg-zinc-900 hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors ${
              selectedType === w.type ? "ring-2 ring-blue-500" : ""
            }`}
            onClick={() => setSelectedType(w.type)}
          >
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              {w.name}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {w.description}
            </p>
            <div className="h-24 bg-gray-100 dark:bg-zinc-800 rounded-lg flex items-center justify-center text-gray-500 dark:text-gray-400 text-sm">
              Demo Preview
            </div>
          </motion.div>
        ))}
      </div>

      {selectedType && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-xl mt-10 p-6 bg-white dark:bg-zinc-900 rounded-2xl shadow-xl"
        >
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
            Configure {widgets.find((w) => w.type === selectedType)?.name}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block mb-1 font-medium text-gray-800 dark:text-gray-200">
                Position
              </label>
              <select
                value={position}
                onChange={(e) => setPosition(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-zinc-800 text-gray-900 dark:text-gray-100"
              >
                <option value="top-left">Top Left</option>
                <option value="top-center">Top Center</option>
                <option value="top-right">Top Right</option>
                <option value="bottom-left">Bottom Left</option>
                <option value="bottom-center">Bottom Center</option>
                <option value="bottom-right">Bottom Right</option>
              </select>
            </div>

            {selectedType === "countdown" && (
              <div>
                <label className="block mb-1 font-medium text-gray-800 dark:text-gray-200">
                  End Time
                </label>
                <input
                  type="datetime-local"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  required
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-zinc-800 text-gray-900 dark:text-gray-100"
                />
              </div>
            )}

            {selectedType === "social-proof" && (
              <div>
                <label className="block mb-1 font-medium text-gray-800 dark:text-gray-200">
                  Text Template
                </label>
                <input
                  type="text"
                  value={textTemplate}
                  onChange={(e) => setTextTemplate(e.target.value)}
                  placeholder="e.g. {count} people signed up today"
                  required
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-zinc-800 text-gray-900 dark:text-gray-100"
                />
              </div>
            )}

            {selectedType === "ai-chatbot" && (
              <>
                <div>
                  <label className="block mb-1 font-medium text-gray-800 dark:text-gray-200">
                    Bot Name
                  </label>
                  <input
                    type="text"
                    value={botName}
                    onChange={(e) => setBotName(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-zinc-800 text-gray-900 dark:text-gray-100"
                  />
                </div>

                <div>
                  <label className="block mb-1 font-medium text-gray-800 dark:text-gray-200">
                    Welcome Message
                  </label>
                  <input
                    type="text"
                    value={welcomeMessage}
                    onChange={(e) => setWelcomeMessage(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-zinc-800 text-gray-900 dark:text-gray-100"
                  />
                </div>

                <div>
                  <label className="block mb-1 font-medium text-gray-800 dark:text-gray-200">
                    Persona
                  </label>
                  <input
                    type="text"
                    value={persona}
                    onChange={(e) => setPersona(e.target.value)}
                    placeholder="e.g. Friendly and Helpful"
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-zinc-800 text-gray-900 dark:text-gray-100"
                  />
                </div>
                   <div>
              <label className="block mb-1 font-medium text-gray-800 dark:text-gray-200">
                FAQs / Instructions
              </label>
              <textarea
                value={faq}
                onChange={(e) => setFaq(e.target.value)}
                placeholder="Add example FAQs or important context for the chatbot..."
                rows={4}
                className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-zinc-800 text-gray-900 dark:text-gray-100"
              ></textarea>
            </div>
                <div>
                  <label className="block mb-1 font-medium text-gray-800 dark:text-gray-200">
                    Theme Color
                  </label>
                  <input
                    type="color"
                    value={themeColor}
                    onChange={(e) => setThemeColor(e.target.value)}
                    className="w-16 h-10 border-none rounded-md cursor-pointer"
                  />
                </div>
              </>
            )}

            <div className="flex items-center gap-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 transition text-white font-semibold shadow"
              >
                {loading ? "Saving..." : "Save Widget"}
              </button>
              <button
                type="button"
                onClick={() => setSelectedType(null)}
                className="flex-1 py-3 rounded-lg border border-gray-400 dark:border-gray-600 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-zinc-800 transition"
              >
                Cancel
              </button>
            </div>
          </form>
        </motion.div>
      )}
    </main>
  );
}
