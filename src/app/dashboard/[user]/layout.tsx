// app/dashboard/layout.tsx
import DashboardLayout from '@/app/components/DashboardLayout';
import type { ReactNode } from 'react';

export default function DashboardMainLayout({ children }: { children: ReactNode }) {
  return (
    <>
  <DashboardLayout>
    {children}
  </DashboardLayout>
  </>
  )
}
