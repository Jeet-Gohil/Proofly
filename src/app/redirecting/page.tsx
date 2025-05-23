'use client';

import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function Redirecting() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'authenticated' && session?.user?.id) {
      router.push(`/dashboard/${session.user.id}`);
    }
  }, [status, session, router]);

  return <p>Redirecting to your dashboard...</p>;
}
