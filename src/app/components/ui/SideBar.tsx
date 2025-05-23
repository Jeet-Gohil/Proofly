"use client";
import React, { useEffect, useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/SideBar";
import {
  IconArrowLeft,
  IconBrandTabler,
  IconSettings,
  IconUserBolt,
} from "@tabler/icons-react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

function MetricCard({ label, value }: { label: string; value: string }) {
  return (
    <div className={`bg-[#0f172a] text-white p-6 shadow-lg transform hover:scale-[1.03] transition-transform`}>
      <h3 className="text-sm uppercase font-semibold opacity-80">{label}</h3>
      <p className="text-3xl font-extrabold mt-2">{value}</p>
    </div>
  )
}

export function SidebarDemo() {

  const [data, setData] = useState({});
  useEffect(()=> {
    fetch('/api/users')
    .then((res)=> res.json())
    .then((data)=> {
      setData(data);

    });
  }, []);
  
  
  
  const links = [
    {
      label: "Dashboard",
      href: "#",
      icon: (
        <IconBrandTabler className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "Profile",
      href: "#",
      icon: (
        <IconUserBolt className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "Settings",
      href: "#",
      icon: (
        <IconSettings className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "Logout",
      href: "#",
      icon: (
        <IconArrowLeft className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
  ];
  const [open, setOpen] = useState(false);
  return (
    <div
      className={cn(
        "mx-auto flex w-full max-w-9xl flex-1 flex-col overflow-hidden rounded-md border border-neutral-200 bg-gray-100 md:flex-row dark:border-neutral-700 dark:bg-neutral-800",
        "h-[60vh]", // for your use case, use `h-screen` instead of `h-[60vh]`
      )}
    >
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>
          </div>
          <div>
            <SidebarLink
              link={{
                label: "Manu Arora",
                href: "#",
                icon: (
                  <img
                    src="https://assets.aceternity.com/manu.png"
                    className="h-7 w-7 shrink-0 rounded-full"
                    width={50}
                    height={50}
                    alt="Avatar"
                  />
                ),
              }}
            />
          </div>
        </SidebarBody>
      </Sidebar>
      <Dashboard />
    </div>
  );
}
export const Logo = () => {
  return (
    <a
      href="#"
      className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black"
    >
      <div className="h-5 w-6 shrink-0 rounded-tl-lg rounded-tr-sm rounded-br-lg rounded-bl-sm bg-black dark:bg-white" />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium whitespace-pre text-black dark:text-white"
      >
        Proofly.com
      </motion.span>
    </a>
  );
};
export const LogoIcon = () => {
  return (
    <a
      href="#"
      className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black"
    >
      <div className="h-5 w-6 shrink-0 rounded-tl-lg rounded-tr-sm rounded-br-lg rounded-bl-sm bg-black dark:bg-white" />
    </a>
  );
};

// Dummy dashboard component with content
const Dashboard = () => {
  return (
    <div className="flex flex-1">
      <div className="flex h-full w-full flex-1 flex-col gap-2 rounded-tl-2xl border border-neutral-200 bg-white p-2 md:p-10 dark:border-neutral-700 dark:bg-neutral-900">
        <div className="flex gap-2">
           <div className="h-20 w-full animate-pulse rounded-lg bg-gray-100 dark:bg-neutral-800">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 ">
          <MetricCard label="📈 Daily Logins" value="123" />
          <MetricCard label="👥 Total Users" value="1,234" />
          <MetricCard label="🌐 Site Visits" value="5,678" />
        </div>
           </div>
        </div>
        <div className="flex flex-1 gap-8 mt-10">
        <div className="box w-full">
             <div className="bg-white rounded-2xl shadow-lg p-6 mx-8 mb-10">
            <h3 className="text-xl font-semibold text-indigo-800 mb-4 flex items-center gap-2">
              📋 Recent Activity
            </h3>
            <div className="space-y-4 text-sm">
              <div className="flex items-center justify-between">
                <p className="flex items-center gap-2"><span>✅</span>User logged in using Google</p>
                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs">5 mins ago</span>
              </div>
              <div className="flex items-center justify-between">
                <p className="flex items-center gap-2"><span>👀</span>43 new visitors today</p>
                <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-xs">20 mins ago</span>
              </div>
              <div className="flex items-center justify-between">
                <p className="flex items-center gap-2"><span>🆕</span>New website added by user</p>
                <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs">1 hour ago</span>
              </div>
              <div className="flex items-center justify-between">
                <p className="flex items-center gap-2"><span>📣</span>Notification sent to 12 users</p>
                <span className="bg-pink-100 text-pink-600 px-3 py-1 rounded-full text-xs">2 hours ago</span>
              </div>
              
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};
