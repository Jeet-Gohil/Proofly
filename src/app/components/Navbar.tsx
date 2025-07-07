"use client";
import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, LogIn, LogOut } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();
  const { data: session, status } = useSession();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Explore", path: "/Explore" },
    { name: "How it works", path: "/HowItWorks" },
    { name: "Reviews", path: "/reviews" },
    {
      name: "Dashboard",
      path: session?.user?.uuid
        ? `/dashboard/${session.user.uuid}`
        : "/login",
    },
    { name: "Pricing", path: "/pricing" },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-black/30 dark:bg-black/50 border-b border-white/10">
      <div className="mx-auto flex max-w-7xl items-center justify-between p-4">
        {/* Logo */}
        <Link href="/" className="flex items-center h-12"> 
  <div className="h-full w-auto flex items-center">
    <Image
      src="/Logo.png"
      alt="Proofly Logo"
      width={120}   // Large internal pixel size, good for sharpness
      height={120}
      className="h-full w-auto object-contain"
      priority
    />
  </div>
</Link>
        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-8 items-center">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.path}
              className="text-sm text-white/80 hover:text-purple-400 transition"
            >
              {item.name}
            </Link>
          ))}

          <ThemeToggle />

          {status === "loading" ? null : !session ? (
            <button
              onClick={() => router.push("/login")}
              className="ml-4 flex items-center gap-2 px-4 py-2 bg-[#2A0E61] text-purple-300 rounded-lg border border-[#3c1a75] hover:bg-[#3c1a75] transition"
            >
              <LogIn size={16} />
              <span className="text-sm font-medium">Login</span>
            </button>
          ) : (
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="ml-4 flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg border border-red-700 hover:bg-red-700 transition"
            >
              <LogOut size={16} />
              <span className="text-sm font-medium">Logout</span>
            </button>
          )}
        </nav>

        {/* Mobile Toggle */}
        <button
          className="md:hidden flex items-center justify-center w-8 h-8 rounded-full hover:bg-white/10 transition"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden px-4 pb-4"
          >
            <div className="flex flex-col gap-4 bg-black/70 backdrop-blur-md rounded-md p-4 border border-white/10">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.path}
                  onClick={() => setMenuOpen(false)}
                  className="text-sm text-white/80 hover:text-purple-400 transition"
                >
                  {item.name}
                </Link>
              ))}

              <ThemeToggle />

              {status === "loading" ? null : !session ? (
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    router.push("/login");
                  }}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-[#2A0E61] text-purple-300 rounded-lg border border-[#3c1a75] hover:bg-[#3c1a75] transition"
                >
                  <LogIn size={16} />
                  <span className="text-sm font-medium">Login</span>
                </button>
              ) : (
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    signOut({ callbackUrl: "/" });
                  }}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg border border-red-700 hover:bg-red-700 transition"
                >
                  <LogOut size={16} />
                  <span className="text-sm font-medium">Logout</span>
                </button>
              )}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
