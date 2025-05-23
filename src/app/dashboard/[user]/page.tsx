import { SidebarDemo } from "@/app/components/ui/SideBar";

export default function() {
  return (
    <div className="mt-4 mb-4">
    <SidebarDemo/>
    </div>
  );
}





// import { DashBoardHead } from '@/app/components/DashBoardHead';
// import { getServerSession } from 'next-auth';
// import { authOptions } from '@/app/api/auth/[...nextauth]/route';
// import { SideBar } from '@/app/components/SideBar';
// import { Tracker } from '@/app/components/Tracker';
// interface DashboardProps {
//   params: {
//     user: string;
//   };
// }

// export default async function UserDashboard({ params }: DashboardProps) {
//   const session = await getServerSession(authOptions);

//   return (
//     <div className="flex h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 text-gray-900">
      
//     {/* Sidebar */}
//     <SideBar/>


//     {/* Main */}
//     <div className="flex-1 flex flex-col">
      
//       {/* Top Navbar */}
//       <DashBoardHead/>

//       {/* Main Content */}
//       <main className="p-6 space-y-8 overflow-y-auto">
//         {/* Metric Cards */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 ">
//           <MetricCard label="📈 Daily Logins" value="123" />
//           <MetricCard label="👥 Total Users" value="1,234" />
//           <MetricCard label="🌐 Site Visits" value="5,678" />
//         </div>

//         {/* Recent Activity */}
//        <div className="bg-white rounded-2xl shadow-lg p-6 mx-8 mb-10">
//   <h3 className="text-xl font-semibold text-indigo-800 mb-4 flex items-center gap-2">
//     📋 Recent Activity
//   </h3>
//   <div className="space-y-4 text-sm">
//     <div className="flex items-center justify-between">
//       <p className="flex items-center gap-2"><span>✅</span>User logged in using Google</p>
//       <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs">5 mins ago</span>
//     </div>
//     <div className="flex items-center justify-between">
//       <p className="flex items-center gap-2"><span>👀</span>43 new visitors today</p>
//       <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-xs">20 mins ago</span>
//     </div>
//     <div className="flex items-center justify-between">
//       <p className="flex items-center gap-2"><span>🆕</span>New website added by user</p>
//       <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs">1 hour ago</span>
//     </div>
//     <div className="flex items-center justify-between">
//       <p className="flex items-center gap-2"><span>📣</span>Notification sent to 12 users</p>
//       <span className="bg-pink-100 text-pink-600 px-3 py-1 rounded-full text-xs">2 hours ago</span>
//     </div>
//     <Tracker/>
//   </div>
// </div>


//       </main>
//     </div>
//   </div>
//   );
// }

// function ActivityItem({
//   icon,
//   message,
//   timestamp,
//   badgeColor,
// }: {
//   icon: string
//   message: string
//   timestamp: string
//   badgeColor: string
// }) {
//   return (
//     <li className="flex items-start gap-4 border-l-4 border-indigo-300 pl-4 py-2 hover:bg-indigo-50/30 rounded-md transition-all duration-200">
//       <div className="text-2xl">{icon}</div>
//       <div className="flex-1">
//         <p className="text-sm font-medium text-gray-800">{message}</p>
//         <span className={`text-xs mt-1 inline-block rounded-md px-2 py-0.5 ${badgeColor}`}>
//           {timestamp}
//         </span>
//       </div>
//     </li>
//   )
// }


// function MetricCard({ label, value }: { label: string; value: string }) {
//   return (
//     <div className={`bg-gradient-to-r from-[#0f172a] via-[#0e7490] to-[#38bdf8] text-white p-6 shadow-lg transform hover:scale-[1.03] transition-transform`}>
//       <h3 className="text-sm uppercase font-semibold opacity-80">{label}</h3>
//       <p className="text-3xl font-extrabold mt-2">{value}</p>
//     </div>
//   )
// }


// function SidebarLink({
//   icon,
//   label,
//   active = false,
// }: {
//   icon: string
//   label: string
//   active?: boolean
// }) {
//   return (
//     <div
//       className={`flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-colors
//         ${active
//           ? 'bg-indigo-600 text-white font-semibold'
//           : 'hover:bg-zinc-800 text-zinc-300'}
//       `}
//     >
//       <span className="text-lg">{icon}</span>
//       <span className="text-sm">{label}</span>
//     </div>
//   )
// }

